import { useEffect, useState } from "react";

const HistorySection = () => {
    const [historyClips, setHistoryClips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistoryClips = () => {
        fetch("http://127.0.0.1:5000/history_clips")
            .then((res) => res.json())
            .then((data) => {
                console.log(" Fetched clips:", data);
                setHistoryClips(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(" Error fetching clips:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchHistoryClips();
        const interval = setInterval(fetchHistoryClips, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">📹 History Clips</h2>

            {loading ? (
                <p className="text-gray-300">Loading clips...</p>
            ) : historyClips.length === 0 ? (
                <p className="text-gray-400">No clips available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historyClips.map((clip) => {
                        const videoUrl = `http://127.0.0.1:5000/history_clips/${clip.filename}`;
                        const readableTime = new Date(clip.timestamp).toLocaleString();

                        return (
                            <div key={clip.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
                                <p className="text-sm text-gray-400 mb-2">🕒 {readableTime}</p>

                                <video
                                    className="w-full h-auto rounded-md"
                                    controls
                                    preload="metadata"
                                    crossOrigin="anonymous"
                                    onError={(e) => {
                                        console.error(` Error loading video: ${videoUrl}`, e);
                                        e.target.poster =
                                            "https://via.placeholder.com/400x300?text=Video+Unavailable";
                                    }}
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                <p className="text-xs text-gray-500 mt-2 truncate">
                                    {clip.filename}
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
