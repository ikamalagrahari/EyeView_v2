import { useEffect, useState } from "react";
import axios from "axios";

// --- SVG Icon Components ---
// By using inline SVGs, we remove the need for the external 'react-icons' library.
const HistoryIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-248 50c-25.45 0-46-20.55-46-46s20.55-46 46-46 46 20.55 46 46-20.55 46-46 46zm-98.5-224.5L138 218c-5.15 11.9 4.2 22 17.5 22h189c13.3 0 22.65-10.1 17.5-22l-17.5-136.5C340.45 62.2 324.95 48 307.5 48h-103c-17.45 0-32.95 14.2-37 31.5z"></path>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-22.4 30.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
  </svg>
);

const VideoIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path>
  </svg>
);

const WarningIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-60.035-39.993-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.982 12.654z"></path>
  </svg>
);

const HistorySection = () => {
  const [historyClips, setHistoryClips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryClips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/history_clips");
        const clipsData = response.data || [];

        // The backend provides a relative URL (e.g., /history_clips/clip.mp4).
        // We prepend the backend's base URL to create a full, playable path for the video player.
        const clipsWithUrls = clipsData.map((clip) => ({
          ...clip,
          videoUrl: `http://localhost:5000${clip.url}`,
        }));

        setHistoryClips(clipsWithUrls);
      } catch (err) {
        console.error("Failed to fetch clips: ", err);
        setHistoryClips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryClips();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <HistoryIcon className="text-[#2db8e6]" /> History Clips
      </h2>

      {loading ? (
        <p className="text-gray-300">Loading clips...</p>
      ) : historyClips.length === 0 ? (
        <div className="text-center py-8 bg-gray-800 rounded-lg">
          <VideoIcon className="mx-auto text-4xl text-gray-500 mb-2" />
          <p className="text-gray-400">No clips available.</p>
          <p className="text-xs text-gray-500 mt-1">
            Recordings will appear here after an alert is triggered.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyClips.map((clip) => {
            const readableTime = new Date(clip.timestamp).toLocaleString();

            return (
              <div
                key={clip.id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300"
              >
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <ClockIcon className="text-cyan-400" />
                  <span>{readableTime}</span>
                </p>

                {clip.videoUrl ? (
                    <div className="w-full h-auto rounded-md bg-black overflow-hidden aspect-video">
                      <video
                        key={clip.videoUrl}
                        src={clip.videoUrl}
                        controls
                        className="w-full h-full"
                        preload="metadata"
                        onError={(e) => {
                          console.error(
                            `Error loading video: ${clip.videoUrl}`,
                            e.target.error ? `Error code: ${e.target.error.code}, message: ${e.target.error.message}` : 'Unknown error'
                          );
                        }}
                        onLoadedData={() => console.log(`Video loaded: ${clip.videoUrl}`)}
                        onCanPlay={() => console.log(`Video can play: ${clip.videoUrl}`)}
                        onCanPlayThrough={() => console.log(`Video can play through: ${clip.videoUrl}`)}
                        onLoadStart={() => console.log(`Video load start: ${clip.videoUrl}`)}
                        onStalled={() => console.log(`Video stalled: ${clip.videoUrl}`)}
                        onSuspend={() => console.log(`Video suspended: ${clip.videoUrl}`)}
                      />
                    </div>
                  ) : (
                   <div className="w-full h-48 bg-gray-700 rounded-md flex flex-col items-center justify-center text-gray-400">
                     <WarningIcon className="text-2xl mb-2 text-red-400" />
                     <p>Video unavailable</p>
                   </div>
                 )}

                <p className="text-xs text-gray-500 mt-2 truncate flex items-center gap-2">
                  <VideoIcon className="text-gray-400" />
                  <span>{clip.filename}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
