import React, { useState, useRef } from "react";

const videos = [
  {
    id: 1,
    title: "Live Detection - Camera 1",
    src: "http://127.0.0.1:5000/video_feed",
  },
];

const Dashboard = () => {
  const [pausedStates, setPausedStates] = useState({});
  const [fullscreenStates, setFullscreenStates] = useState({});
  const videoRefs = useRef({});

  const togglePause = (id, src) => {
    const isPaused = pausedStates[id] || false;
    const updatedPaused = { ...pausedStates, [id]: !isPaused };

    if (videoRefs.current[id]) {
      videoRefs.current[id].src = isPaused ? src : ""; // Reset or clear stream
    }

    setPausedStates(updatedPaused);
  };

  const toggleFullscreen = (id) => {
    const isFullscreen = fullscreenStates[id] || false;
    const updatedFullscreen = { ...fullscreenStates, [id]: !isFullscreen };

    const el = videoRefs.current[id];
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen();
    }

    setFullscreenStates(updatedFullscreen);
  };

  return (
    <div className="bg-[var(--color-richblack-900)] min-h-screen text-white w-full p-6">
      <h1 className="text-4xl font-bold mb-6">Live Detection Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-[var(--color-richblack-800)] p-4 rounded-lg shadow-lg"
          >
            <img
              ref={(el) => (videoRefs.current[video.id] = el)}
              src={video.src}
              alt="Live Stream"
              className="w-full h-40 object-cover rounded-lg cursor-pointer"
              onClick={() => toggleFullscreen(video.id)}
            />

            <h2 className="text-lg font-semibold mt-2">{video.title}</h2>

            <div className="flex gap-3 mt-2">
              <button
                className="bg-[var(--color-richblack-700)] text-white px-4 py-1 rounded-md"
                onClick={() => togglePause(video.id, video.src)}
              >
                {pausedStates[video.id] ? "Resume" : "Pause"}
              </button>
              <button
                className="bg-[var(--color-richblack-700)] text-white px-4 py-1 rounded-md"
                onClick={() => toggleFullscreen(video.id)}
              >
                {fullscreenStates[video.id] ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
