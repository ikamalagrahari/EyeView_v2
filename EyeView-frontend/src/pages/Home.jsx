import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../Home.css";

const Home = () => {
  const sentence = "Secure Focus";
  const words = sentence.split(" ");
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const blurAmount = 5;
  const borderColor = "red";
  const glowColor = "rgba(255, 0, 0, 0.6)";
  const animationDuration = 0.5;

  useEffect(() => {
    if (!wordRef.current || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRef.current.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left - 5, // Adjusting for centering
      y: activeRect.top - parentRect.top - 5,
      width: activeRect.width + 10, // Adding padding
      height: activeRect.height + 10,
    });
  }, []);

  return (
    <div className="home-container">
      <div className="focus-container" ref={containerRef}>
        <motion.span
          ref={wordRef}
          className="focus-word"
          initial={{ filter: `blur(${blurAmount}px)`, opacity: 0.5 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            "--border-color": borderColor,
            "--glow-color": glowColor,
          }}
        >
          {sentence}
        </motion.span>

        <motion.div
          className="focus-frame"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
            opacity: 1,
          }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
          style={{ "--border-color": borderColor, "--glow-color": glowColor }}
        >
          <span className="corner top-left"></span>
          <span className="corner top-right"></span>
          <span className="corner bottom-left"></span>
          <span className="corner bottom-right"></span>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;