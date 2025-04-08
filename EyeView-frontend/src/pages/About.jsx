import React from "react";
import {
  FiZap,
  FiPhoneCall,
  FiVideo,
  FiLock,
  FiSmartphone,
} from "react-icons/fi";
import { AiOutlineRobot, AiOutlineRocket } from "react-icons/ai";

function About() {
  return (
    <div className="min-h-screen bg-[var(--color-richblack-900)] text-white px-6 md:px-20 py-16">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-richblack-5)]">
         EyeView
        </h1>

        <p className="text-lg text-[var(--color-richblack-100)] leading-relaxed">
          <strong>EyeView</strong> is an advanced real-time surveillance solution powered by artificial intelligence. Built with security, accuracy, and scalability in mind, EyeView is designed to detect violence, alert authorities instantly, and store critical evidence — all without human intervention.
        </p>

        <p className="text-lg text-[var(--color-richblack-100)] leading-relaxed">
          The system uses a pretrained YOLO v11 deep learning model to analyze live video feeds. Once an act of violence is detected, EyeView captures a 10-second clip and pushes real-time alerts via <strong>Twilio</strong>, while the data is securely stored in <strong>Firebase</strong> for later review. This ensures a proactive approach to surveillance and incident response.
        </p>

        <p className="text-lg text-[var(--color-richblack-100)] leading-relaxed">
          Whether deployed in public spaces, educational institutions, offices, or residential societies, EyeView provides an additional layer of smart security. It is equipped with a user-friendly dashboard, mobile camera support, and seamless integration capabilities, making it suitable for both small-scale and enterprise-grade environments.
        </p>

        <p className="text-lg text-[var(--color-richblack-100)] leading-relaxed">
          EyeView is not just a project — it’s a step towards building smarter, safer communities. With modern UI, responsive design, and robust backend infrastructure, EyeView aims to revolutionize how surveillance is conducted across the globe.
        </p>

        {/* Feature List */}
        <div className="border-t border-[var(--color-richblack-700)] pt-8 mt-8">
          <h2 className="text-2xl font-semibold text-[var(--color-richblack-25)] mb-4">
            Why Choose EyeView?
          </h2>
          <ul className="space-y-4 text-[var(--color-richblack-100)] text-lg">
            <li className="flex items-center gap-3">
              <FiZap className="text-[#FFD60A]" size={24} />
              Real-time violence detection with high accuracy
            </li>
            <li className="flex items-center gap-3">
              <FiPhoneCall className="text-[#47A5C5]" size={24} />
              Instant alerts to admin using Twilio
            </li>
            <li className="flex items-center gap-3">
              <FiVideo className="text-[#38BDF8]" size={24} />
              Automated incident clip recording
            </li>
            <li className="flex items-center gap-3">
              <FiLock className="text-[#4ADE80]" size={24} />
              Firebase-backed secure storage
            </li>
            <li className="flex items-center gap-3">
              <FiSmartphone className="text-[#C084FC]" size={24} />
              Mobile and desktop friendly UI
            </li>
            <li className="flex items-center gap-3">
              <AiOutlineRobot className="text-[#F472B6]" size={24} />
             Trained on YOLO v11 AI model
            </li>
            <li className="flex items-center gap-3">
              <AiOutlineRocket className="text-[#FACC15]" size={24} />
              Easy integration with existing surveillance systems
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
