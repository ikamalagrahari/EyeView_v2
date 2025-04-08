import React from "react";
import { FaVideo, FaBell, FaCloudUploadAlt, FaMobileAlt, FaLock } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const featuresData = [
  {
    title: "Live Video Detection",
    description:
      "Continuously analyzes video feed using an AI model (YOLO v11) to detect violent behavior in real-time, ensuring no threat goes unnoticed.",
    icon: <FaVideo size={28} />,
  },
  {
    title: "Real-Time Alerts to Admin",
    description:
      "Sends instant alerts to administrators via Twilio when violence is detected, enabling fast action and prevention.",
    icon: <FaBell size={28} />,
  },
  {
    title: "Incident Clip Recording",
    description:
      "Automatically records a 10-second clip of the detected incident and stores it securely for future review or evidence.",
    icon: <FaCloudUploadAlt size={28} />,
  },
  {
    title: "Firebase + Twilio Integration",
    description:
      "Utilizes Firebase for secure cloud storage of clips and Twilio to deliver SMS/email alerts instantly upon detection.",
    icon: <MdSecurity size={28} />,
  },
  {
    title: "Mobile-Friendly Interface",
    description:
      "Fully responsive design allows administrators to monitor activity and receive alerts directly from mobile devices.",
    icon: <FaMobileAlt size={28} />,
  },
  {
    title: "Secure & Private",
    description:
      "All data and clips are encrypted and securely stored to protect privacy and ensure tamper-proof incident logs.",
    icon: <FaLock size={28} />,
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-[var(--color-richblack-900)] text-white px-6 py-16 md:px-20">
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-richblack-5)] mb-12 text-center">
        EyeView Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="bg-[var(--color-richblack-800)] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="text-[#47A5C5] mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[var(--color-richblack-5)] mb-2">
              {feature.title}
            </h3>
            <p className="text-[var(--color-richblack-100)] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
