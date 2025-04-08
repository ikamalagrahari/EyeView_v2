import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/alerts"); // Replace with your actual API endpoint
        setAlerts(response.data.alerts || []);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaExclamationTriangle className="text-red-500" /> Alert Section
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-gray-500">No alerts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert, index) => {
            const readableTime = new Date(alert.timestamp).toLocaleString();

            return (
              <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-red-400">
                    {alert.alert_type || "Violence Detected"}
                  </h3>
                  <span className="text-sm text-green-400">
                    {alert.notified ? "Notified ✅" : "Pending ⏳"}
                  </span>
                </div>

                <div className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FaClock /> {readableTime}
                </div>

                <div className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt /> {alert.location || "Unknown Location"}
                </div>

                {alert.video_url && (
                  <video
                    className="w-full h-auto mt-2 rounded-md"
                    controls
                    src={alert.video_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}

                {alert.confidence && (
                  <p className="text-sm text-yellow-400 mt-2">
                    Confidence: {(alert.confidence * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Alerts;
