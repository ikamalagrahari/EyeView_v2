from flask import Flask, Response, jsonify, send_from_directory, abort, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import cv2
import firebase_admin
from firebase_admin import credentials, db
from twilio.rest import Client
from ultralytics import YOLO
import datetime
import time
import json
import requests
import os
import re
import subprocess
from dotenv import load_dotenv
from threading import Thread, Lock
from collections import deque
import hashlib
import uuid

app = Flask(__name__, static_folder="static")
CORS(app)  # Allow all origins

# JWT Setup
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
jwt = JWTManager(app)

# Simple user storage (in production, use a proper database)
USERS_FILE = 'users.json'
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump({}, f)

# --- Thread-safe Locks and Buffers ---
frame_lock = Lock()  # Lock for accessing shared resources (frame buffer)
video_stream_lock = Lock() # Lock for reading from the video stream

# --- Configuration ---
load_dotenv()
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
ADMIN_PHONE_NUMBER = os.getenv("ADMIN_PHONE_NUMBER")
ALERT_COOLDOWN = 10  # Seconds between alerts
CLIP_DURATION = 10 # Seconds

# --- YOLO Model ---
try:
    model = YOLO("best.pt")
    print("YOLO model loaded successfully.")
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    model = None

# --- Video Capture ---
video_stream = cv2.VideoCapture(0)
if not video_stream.isOpened():
    print("Error: Could not open webcam.")
else:
    video_stream.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    video_stream.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    # Get the actual FPS from the camera
    FPS = video_stream.get(cv2.CAP_PROP_FPS)
    if FPS == 0:
        FPS = 30 # Default if camera doesn't provide FPS
        video_stream.set(cv2.CAP_PROP_FPS, FPS)
    print(f"Webcam opened successfully. Resolution: 1280x720, FPS: {FPS}")

# --- Frame Buffer for Clip Saving ---
# Store the last CLIP_DURATION seconds of frames
MAX_BUFFER_SIZE = int(FPS * CLIP_DURATION) if 'FPS' in locals() else 300
frame_buffer = deque(maxlen=MAX_BUFFER_SIZE)

# --- Firebase Setup ---
firebase_initialized = False
try:
    # IMPORTANT: Update this path to your Firebase credentials file
    cred_path = os.path.join(os.path.dirname(__file__), "eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json")
    if not os.path.exists(cred_path):
        raise FileNotFoundError
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://eyeview-v2-default-rtdb.firebaseio.com/"
    })
    alert_ref = db.reference("violence_detections")
    history_ref = db.reference("history_clips")
    firebase_initialized = True
    print("Firebase initialized successfully.")
except FileNotFoundError:
    print("Firebase credentials file not found. Firebase features will be disabled.")
    alert_ref = None
    history_ref = None
except Exception as e:
    print(f"Error initializing Firebase: {e}. Firebase features will be disabled.")
    alert_ref = None
    history_ref = None

# --- Twilio Setup ---
try:
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    print("Twilio client initialized.")
except Exception as e:
    print(f"Error initializing Twilio client: {e}")
    client = None

# --- User Management Functions ---
def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except:
        return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(email, password, first_name, last_name):
    users = load_users()
    if email in users:
        return False, "User already exists"

    user_id = str(uuid.uuid4())
    users[email] = {
        'id': user_id,
        'email': email,
        'password': hash_password(password),
        'first_name': first_name,
        'last_name': last_name,
        'created_at': datetime.datetime.now().isoformat()
    }
    save_users(users)
    return True, user_id

def authenticate_user(email, password):
    users = load_users()
    user = users.get(email)
    if user and user['password'] == hash_password(password):
        return user
    return None

# --- Alert System ---
last_alert_time = 0

# --- Clip Saving Directory ---
# **REVERTED:** Save clips to the 'static/history_clips' folder within the backend directory.
clip_save_dir = os.path.abspath("static/history_clips")
os.makedirs(clip_save_dir, exist_ok=True)
print(f"Clip save directory set to: {clip_save_dir}")


def get_location():
    """Fetches the public IP based location."""
    try:
        response = requests.get("http://ip-api.com/json/", timeout=5)
        response.raise_for_status()
        data = response.json()
        return f"{data.get('city', 'N/A')}, {data.get('regionName', 'N/A')}, {data.get('country', 'N/A')}"
    except requests.exceptions.RequestException as e:
        print(f"Could not get location: {e}")
        return "Unknown Location"

def send_alert(confidence):
    """Handles the alerting logic: logging, Firebase push, and Twilio SMS."""
    global last_alert_time
    current_time = time.time()
    if current_time - last_alert_time < ALERT_COOLDOWN:
        print("Alert in cooldown period. Skipping.")
        return

    print("--- ALERT TRIGGERED ---")
    last_alert_time = current_time
    timestamp = datetime.datetime.now()
    location = get_location()

    # Generate clip filename
    clip_filename = f"clip_{timestamp.strftime('%Y%m%d_%H%M%S')}.mp4"

    alert_data = {
        "time": timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        "confidence": round(confidence, 2),
        "location": location,
        "video_url": f"http://localhost:5000/history_clips/{clip_filename}"
    }

    # Log alert locally
    with open("alert_log.json", "a") as log_file:
        log_file.write(json.dumps(alert_data) + "\n")

    # Push to Firebase
    if firebase_initialized:
        try:
            alert_ref.push(alert_data)
            print("Alert pushed to Firebase.")
        except Exception as e:
            print(f"Error pushing alert to Firebase: {e}")


    # Send SMS via Twilio
    if client:
        try:
            message_body = f"Violence detected at {alert_data['time']} | Confidence: {alert_data['confidence']:.2f} | Location: {alert_data['location']}"
            client.messages.create(
                body=message_body,
                from_=TWILIO_PHONE_NUMBER,
                to=ADMIN_PHONE_NUMBER
            )
            print("Twilio alert SMS sent.")
        except Exception as e:
            print(f"Error sending Twilio SMS: {e}")


    # Save the clip from the buffer in a new thread
    with frame_lock:
        frames_to_save = list(frame_buffer)
    
    Thread(target=save_clip, args=(clip_save_dir, clip_filename, frames_to_save)).start()

def save_clip(directory, filename, frames):
    """Saves a list of frames to a video file using ffmpeg."""
    if not frames:
        print("Clip save failed: No frames in the buffer.")
        return

    filepath = os.path.join(directory, filename)
    print(f"Saving clip to: {filepath} ({len(frames)} frames)")

    # Create temp dir for frames
    temp_dir = os.path.join(directory, f'temp_frames_{os.path.splitext(filename)[0]}')
    os.makedirs(temp_dir, exist_ok=True)

    # Save frames as png
    for i, frame in enumerate(frames):
        frame_path = os.path.join(temp_dir, f'frame_{i:04d}.png')
        cv2.imwrite(frame_path, frame)

    # Use ffmpeg to create mp4
    ffmpeg_cmd = [
        'C:\\ffmpeg-master-latest-win64-gpl-shared\\bin\\ffmpeg.exe',
        '-y',  # overwrite
        '-framerate', str(FPS),
        '-i', os.path.join(temp_dir, 'frame_%04d.png'),
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        filepath
    ]

    try:
        subprocess.run(ffmpeg_cmd, check=True)
        print(f"Clip successfully saved: {filename}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to create video with ffmpeg: {e}")
        # Clean up temp frames on failure
        for f in os.listdir(temp_dir):
            os.remove(os.path.join(temp_dir, f))
        os.rmdir(temp_dir)
        return

    # Clean up temp frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

    # Update history in Firebase
    if firebase_initialized:
        clip_metadata = {
            "filename": filename,
            "timestamp": datetime.datetime.now().isoformat(),
            "url": f"http://localhost:5000/history_clips/{filename}"
        }
        try:
            history_ref.push(clip_metadata)
            print(f"Clip metadata for {filename} pushed to Firebase history.")
        except Exception as e:
            print(f"Error pushing clip metadata to Firebase: {e}")


def detect_and_stream():
    """
    Main loop to read frames, run detection, update buffer, and yield frames for streaming.
    """
    if not model:
        print("YOLO model not loaded. Cannot start detection.")
        return

    while True:
        with video_stream_lock:
            if not video_stream.isOpened():
                print("Webcam is not available. Retrying...")
                time.sleep(2)
                continue
            success, frame = video_stream.read()

        if not success:
            continue

        # Add a copy of the frame to our buffer for potential clip saving
        with frame_lock:
            frame_buffer.append(frame.copy())
        
        # --- Run YOLO Detection ---
        resized_frame = cv2.resize(frame, (640, 640))
        results = model(resized_frame, imgsz=640, verbose=False)

        h_ratio = frame.shape[0] / 640
        w_ratio = frame.shape[1] / 640
        
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                confidence = float(box.conf[0])
                class_id = int(box.cls[0])
                
                x1, x2 = int(x1 * w_ratio), int(x2 * w_ratio)
                y1, y2 = int(y1 * h_ratio), int(y2 * h_ratio)
                
                if class_id == 1:
                    label = "Violence"
                    color = (0, 0, 255) # Red
                    if confidence > 0.40:
                        send_alert(confidence)
                else:
                    label = "Non-violence"
                    color = (0, 255, 0) # Green

                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"{label}: {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        
        _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# --- Authentication Routes ---

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    success, result = create_user(email, password, first_name, last_name)
    if success:
        access_token = create_access_token(identity=email)
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': {
                'id': result,
                'email': email,
                'first_name': first_name,
                'last_name': last_name
            }
        }), 201
    else:
        return jsonify({'error': result}), 409

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = authenticate_user(email, password)
    if user:
        access_token = create_access_token(identity=email)
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'first_name': user['first_name'],
                'last_name': user['last_name']
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    users = load_users()
    user = users.get(current_user)
    if user:
        return jsonify({
            'user': {
                'id': user['id'],
                'email': user['email'],
                'first_name': user['first_name'],
                'last_name': user['last_name']
            }
        }), 200
    return jsonify({'error': 'User not found'}), 404

# --- Flask Routes ---

@app.route('/video_feed')
def video_feed():
    """Route for the video stream."""
    return Response(detect_and_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/history_clips')
def list_clips():
    """
    Lists all saved video clips, providing a web-accessible URL for each.
    """
    clips_array = []
    
    if not os.path.exists(clip_save_dir):
        return jsonify([])

    files = sorted(
        [f for f in os.listdir(clip_save_dir) if f.endswith('.mp4')],
        key=lambda f: os.path.getmtime(os.path.join(clip_save_dir, f)),
        reverse=True
    )

    for filename in files:
        filepath = os.path.join(clip_save_dir, filename)
        timestamp = os.path.getmtime(filepath)
        clips_array.append({
            "id": filename,
            "filename": filename,
            "timestamp": datetime.datetime.fromtimestamp(timestamp).isoformat(),
            # This relative URL is used by the frontend to construct the full playable path.
            "url": f"/history_clips/{filename}"
        })
    return jsonify(clips_array)


@app.route('/alerts')
def get_alerts():
    """Gets alerts from the local log file."""
    alerts = []
    try:
        with open("alert_log.json", "r") as f:
            lines = f.readlines()
            for line in reversed(lines):
                if line.strip():
                    alert = json.loads(line)
                    alerts.append({
                        "timestamp": alert["time"],
                        "location": alert["location"],
                        "confidence": alert["confidence"],
                        "notified": True,
                        "alert_type": "Violence Detected",
                        "video_url": alert.get("video_url")
                    })
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    return jsonify({"alerts": alerts})

# **RE-ENABLED:** This route is necessary for the frontend to fetch the video files.
@app.route('/history_clips/<path:filename>')
def stream_video(filename):
    """Serves a specific video clip file."""
    return send_from_directory(clip_save_dir, filename, mimetype='video/mp4')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

