import { useEffect, useState } from "react";
import axios from "axios";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FaHistory, FaClock, FaFileVideo, FaExclamationTriangle } from "react-icons/fa";

const HistorySection = () => {
    const [historyClips, setHistoryClips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoryClips = async () => {
            try {
                const response = await axios.get("http://localhost:5000/history_clips");
                const clipsData = response.data.clips_array || response.data;

                const clipsWithUrls = await Promise.all(
                    clipsData.map(async (clip) => {
                        try {
                            const storage = getStorage();
                            const videoRef = ref(storage, `clips/${clip.filename}`);
                            const url = await getDownloadURL(videoRef);
                            return { ...clip, videoUrl: url };
                        } catch (error) {
                            console.error(`Error getting URL for ${clip.filename}:`, error);
                            return { ...clip, videoUrl: null };
                        }
                    })
                );

                setHistoryClips(clipsWithUrls);
            } catch (err) {
                console.error("Failed to fetch clips: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryClips();
    }, []);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaHistory className="text-[#2db8e6]" /> History Clips
            </h2>

            {loading ? (
                <p className="text-gray-300">Loading clips...</p>
            ) : historyClips.length === 0 ? (
                <p className="text-gray-400">No clips available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historyClips.map((clip) => {
                        const readableTime = new Date(clip.timestamp).toLocaleString();

                        return (
                            <div
                                key={clip.id}
                                className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow"
                            >
                                <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                                    <FaClock className="text-[#47A5C5]" /> {readableTime}
                                </p>

                                {clip.videoUrl ? (
                                    <video
                                        className="w-full h-auto rounded-md"
                                        controls
                                        preload="metadata"
                                        onError={(e) => {
                                            console.error(`Error loading video: ${clip.videoUrl}`, e);
                                            e.target.poster =
                                                "https://via.placeholder.com/400x300?text=Video+Unavailable";
                                        }}
                                    >
                                        <source src={clip.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="w-full h-48 bg-gray-700 rounded-md flex flex-col items-center justify-center text-gray-400">
                                        <FaExclamationTriangle className="text-2xl mb-2 text-red-400" />
                                        <p>Video unavailable</p>
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-2 truncate flex items-center gap-1">
                                    <FaFileVideo className="text-[#2db8e6]" /> {clip.filename}
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
