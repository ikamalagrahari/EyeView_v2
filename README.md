# EyeView – Real-time Violence Detection System

EyeView is an AI-powered real-time violence detection and alert system designed to enhance public safety.
It leverages a YOLO deep learning model integrated with **Flask** (backend) and a **React** (frontend) dashboard to analyze live video streams, detect violent activity, and respond instantly.

---

## Features

When suspicious activity is detected:

* The system records and stores a short clip in **Firebase** for evidence.
* Instant alerts (SMS/Calls) are sent via **Twilio** to authorities or admins.
* A web dashboard allows users to monitor live feeds, review incident history, and manage alerts in real time.

EyeView is optimized for **lag-free high-resolution detection**, supports mobile camera feeds, and is designed for smart surveillance, smart cities, and public safety solutions.

---

## Folder Structure

```bash
├── Backend/              # Flask backend (YOLO + Twilio + Firebase)
│   ├── eye-view.py
│   ├── requirements.txt
│   └── ...
│
├── EyeView-frontend/     # React frontend (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── ...
│
└── README.md             # Root documentation (this file)
```

---

## Environment Variables

### Backend (Backend/.env)

**Twilio (for SMS/Call alerts)**

```bash
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890       # Twilio registered number
ADMIN_PHONE_NUMBER=+919876543210      # Phone number to receive alerts
```

### Frontend (EyeView-frontend/.env)

**Firebase Web Config**

```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
```

---

## Run Locally

### Clone the project

```bash
git clone https://github.com/sahilhinge89/EyeView_v2.git
cd EyeView_v2
```

### Backend Setup

```bash
cd Backend
python -m venv venv           # Create virtual environment
```

**Activate venv**

```bash
# Windows PowerShell
.\venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

```bash
pip install -r requirements.txt
python eye-view.py            # Start the backend server
```

### Frontend Setup

```bash
cd EyeView-frontend
npm install
npm run dev                   # Start the frontend server
```

Open your browser at `http://localhost:5173` (or the port shown) to view the dashboard.

---

## Open Source Contribution

EyeView is open source and contributions are welcome! Anyone can contribute by following these steps:

### Steps to Contribute

1. **Fork the repository** to your GitHub account.
2. **Clone your fork** locally:

```bash
git clone https://github.com/<your-username>/EyeView_v2.git
cd EyeView_v2
```

3. **Create a new branch** for your changes:

```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes** and test them locally (frontend and backend).
5. **Commit your changes** with a clear message:

```bash
git add .
git commit -m "feat: describe your change here"
```

6. **Push your branch** to your fork:

```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request** from your fork to the main repository.
8. Wait for review, respond to feedback, and merge once approved.

### Guidelines

* Follow existing **code style and conventions**.
* Test new features and ensure existing functionality works.
* Add **documentation or comments** for clarity.
* Respect the **open-source code of conduct**.
