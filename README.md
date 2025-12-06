# 👁️ EyeView – Real-time Violence Detection System

<div align="center">

![EyeView Logo](https://img.shields.io/badge/EyeView-AI%20Powered-blue?style=for-the-badge&logo=eye&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

**🚨 An AI-powered real-time violence detection and alert system designed to enhance public safety**

[🚀 Quick Start](#-run-locally) • [📖 Documentation](#-features) • [🤝 Contributing](#-open-source-contribution) • [⭐ Give us a star!](#)

---

</div>

## ✨ Features
<img width="970" height="595" alt="Screenshot 2025-10-06 215134" src="https://github.com/user-attachments/assets/e972cedb-4e5f-4952-8564-d9f4b8b6e050" />


EyeView leverages cutting-edge **YOLO deep learning** models integrated with **Flask** backend and **React** frontend to create a comprehensive safety monitoring solution.

### 🎯 Core Capabilities

| Feature                    | Description                                              | Status    |
| -------------------------- | -------------------------------------------------------- | --------- |
| 🔍 **Real-time Detection** | YOLO-powered violence detection with lag-free processing | ✅ Active |
| 📹 **Evidence Recording**  | Automatic clip recording and Firebase storage            | ✅ Active |
| 📱 **Instant Alerts**      | SMS/Call notifications via Twilio integration            | ✅ Active |
| 📊 **Live Dashboard**      | Real-time monitoring and incident management             | ✅ Active |
| 📱 **Mobile Support**      | Compatible with mobile camera feeds                      | ✅ Active |
| 🏙️ **Smart City Ready**    | Optimized for public safety and surveillance             | ✅ Active |

### 🛠️ When Suspicious Activity is Detected:

```
🎯 Detection → 📹 Recording → ☁️ Storage → 📱 Alert → 🚨 Response
```

- **📹 Evidence Capture**: System records and stores short clips in **Firebase**
- **⚡ Instant Alerts**: SMS/Calls sent via **Twilio** to authorities
- **📊 Dashboard Monitoring**: Real-time feed monitoring and incident history
- **🔍 Review System**: Comprehensive incident management interface

---

## 📁 Project Structure

```bash
📦 EyeView_v2
├── 🐍 Backend/                    # Flask backend (YOLO + Twilio + Firebase)
│   ├── 🎯 eye-view.py
│   ├── 📋 requirements.txt
│   ├── 🔧 config/
│   └── 📂 models/
│
├── ⚛️ EyeView-frontend/          # React frontend (Vite + Tailwind)
│   ├── 📁 public/
│   │   ├── 🖼️ assets/
│   │   └── 📄 index.html
│   ├── 📁 src/
│   │   ├── 🧩 components/
│   │   ├── 📄 pages/
│   │   ├── 🎨 styles/
│   │   └── ⚙️ utils/
│   ├── 🔒 .env
│   ├── 📦 package.json
│   ├── ⚡ vite.config.js
│   └── 🎨 tailwind.config.js
│
├── 📖 README.md
└── 📄 LICENSE
```

---

## 🔧 Environment Configuration

### 🐍 Backend Configuration (`Backend/.env`)

```bash
# 📞 Twilio Integration (SMS/Call Alerts)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890       # 📱 Twilio registered number
ADMIN_PHONE_NUMBER=+919876543210      # 🚨 Alert recipient number

# 🔥 Firebase Configuration
FIREBASE_CONFIG=your_firebase_config_json
FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

### ⚛️ Frontend Configuration (`EyeView-frontend/.env`)

```bash
# 🔥 Firebase Web SDK Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# 🌐 API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
```

---

## 🚀 Quick Start Guide

### 📥 Clone the Repository

```bash
git clone https://github.com/sahilhinge89/EyeView_v2.git
cd EyeView_v2
```

### 🐍 Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Ensure Firebase credentials file is present
# The file 'eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json' should be in this directory
ls eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json

# Create virtual environment
python -m venv venv
```

**🔄 Activate Virtual Environment:**

<details>
<summary>💻 Windows (PowerShell)</summary>

```bash
.\venv\Scripts\activate
```

</details>

<details>
<summary>🐧 macOS/Linux</summary>

```bash
source venv/bin/activate
```

</details>

**📦 Install Dependencies & Run:**

```bash
# Install required packages
pip install -r requirements.txt

# Start the backend server
python eye-view.py
```

> 🟢 **Backend Status**: Server running on `http://localhost:5000`

### ⚛️ Frontend Setup

```bash
# Navigate to frontend directory
cd EyeView-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

> 🟢 **Frontend Status**: Dashboard available at `http://localhost:5173`

### 🎉 Access Your Dashboard

Open your browser and navigate to the displayed URL (typically `http://localhost:5173`) to view the EyeView dashboard.

---

## 🛠️ Tech Stack

<div align="center">

### Backend

![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![YOLO](https://img.shields.io/badge/YOLO-00FFFF?style=for-the-badge&logo=yolo&logoColor=black)
![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white)

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Cloud Services

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white)

</div>

---

## 🤝 Open Source Contribution

<div align="center">

**🌟 EyeView thrives on community contributions! Join us in making public spaces safer.**

[![Contributors](https://img.shields.io/github/contributors/sahilhinge89/EyeView_v2?style=for-the-badge)](https://github.com/sahilhinge89/EyeView_v2/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/sahilhinge89/EyeView_v2?style=for-the-badge)](https://github.com/sahilhinge89/EyeView_v2/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/sahilhinge89/EyeView_v2?style=for-the-badge)](https://github.com/sahilhinge89/EyeView_v2/pulls)

</div>

### 🔥 How to Contribute

1. **🍴 Fork the Repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/<your-username>/EyeView_v2.git
   cd EyeView_v2
   ```

2. **🌿 Create Feature Branch**

   ```bash
   git checkout -b feature/awesome-feature-name
   ```

3. **💻 Make Your Changes**

   - Test both frontend and backend thoroughly
   - Follow existing code conventions
   - Add comments and documentation

4. **📝 Commit Your Work**

   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

5. **🚀 Push & Create PR**
   ```bash
   git push origin feature/awesome-feature-name
   ```
   Then create a Pull Request on GitHub!

### 📋 Contribution Guidelines

<details>
<summary>🎯 <strong>Code Standards</strong></summary>

- Follow **PEP 8** for Python code
- Use **ESLint** and **Prettier** for JavaScript/React
- Write **clear commit messages** using conventional commits
- Include **tests** for new features
- Update **documentation** as needed

</details>

<details>
<summary>🧪 <strong>Testing Requirements</strong></summary>

- Test new features locally before submitting
- Ensure existing functionality remains intact
- Add unit tests for critical functions
- Test on multiple browsers/devices when applicable

</details>

<details>
<summary>📚 <strong>Documentation</strong></summary>

- Add inline comments for complex logic
- Update README for new features
- Include usage examples
- Document API changes

</details>

### 🏆 Types of Contributions We Love

| Type                 | Description          | Examples                                |
| -------------------- | -------------------- | --------------------------------------- |
| 🐛 **Bug Fixes**     | Fix existing issues  | Memory leaks, UI bugs, API errors       |
| ✨ **New Features**  | Add functionality    | New detection models, dashboard widgets |
| 📚 **Documentation** | Improve docs         | Setup guides, API documentation         |
| 🎨 **UI/UX**         | Design improvements  | Better dashboard, mobile responsiveness |
| ⚡ **Performance**   | Speed & optimization | Faster detection, reduced latency       |
| 🧪 **Testing**       | Add test coverage    | Unit tests, integration tests           |

---

## 📈 Roadmap

- [ ] 🤖 **Advanced AI Models**: Integration with more sophisticated detection algorithms
- [ ] 🌐 **Multi-language Support**: Internationalization for global deployment
- [ ] 📊 **Analytics Dashboard**: Detailed reporting and insights
- [ ] 🔐 **Enhanced Security**: Advanced authentication and encryption
- [ ] 📱 **Mobile App**: Native mobile applications for field operations
- [ ] 🏗️ **Scalability**: Kubernetes deployment and microservices architecture

---

## 🐛 Troubleshooting

### Firebase Credentials Not Found

If you encounter the error "Firebase credentials file not found. Firebase features will be disabled":

1. **Verify File Location**: Ensure `eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json` is in the `Backend/` directory
2. **Download Credentials**: Get the service account key from Firebase Console → Project Settings → Service Accounts
3. **File Permissions**: Ensure the file is readable by the application
4. **Path Issues**: The application now uses relative paths, so running from the correct directory is crucial

### Backend Won't Start

- Check Python version (3.8+ recommended)
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Ensure webcam/camera is accessible
- Check for port conflicts on 5000

### Frontend Connection Issues

- Verify backend is running on `http://localhost:5000`
- Check CORS settings in Flask app
- Ensure `REACT_APP_API_BASE_URL` is set correctly in frontend `.env`

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **YOLO Team** for the incredible object detection framework
- **Open Source Community** for continuous support and contributions
- **Safety Advocates** who inspire us to build better security solutions

---

<div align="center">

**⭐ If EyeView helps keep your community safer, please give us a star!**

[![GitHub stars](https://img.shields.io/github/stars/sahilhinge89/EyeView_v2?style=social)](https://github.com/sahilhinge89/EyeView_v2/stargazers)

**📬 Questions? Issues? Ideas?**  
[💬 Start a Discussion](https://github.com/sahilhinge89/EyeView_v2/discussions) • [🐛 Report Bug](https://github.com/sahilhinge89/EyeView_v2/issues) • [💡 Request Feature](https://github.com/sahilhinge89/EyeView_v2/issues)

<img width="800" height="444" alt="image" src="https://github.com/user-attachments/assets/d4b23505-4483-4b4a-a70f-93764ae65727" />

---

**Built with ❤️ for a safer world**

</div>

