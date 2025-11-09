// src/pages/provider/applications.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyApplications() {
  const API_BASE = "https://khedme-api.onrender.com";
  const [provider, setProvider] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load provider from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("provider");
    if (stored) setProvider(JSON.parse(stored));
  }, []);

  // ✅ Fetch applications
  useEffect(() => {
    if (!provider) return;
    const fetchApps = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/providers/applications/${provider.id}`);
        const data = await res.json();
        if (data.success) setApplications(data.applications);
        else toast.error("Failed to load applications");
      } catch (err) {
        console.error(err);
        toast.error("Error fetching applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [provider]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading applications...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div key={app.application_id} className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{app.service}</h2>
              <p className="text-gray-600 mb-1">{app.description}</p>
              <p className="text-sm text-gray-500">📍 {app.district}</p>
              <p className="text-sm text-gray-500 mb-2">💰 Budget: ${app.budget}</p>
              <p className="text-sm text-gray-700 italic mb-2">
                💬 <span className="text-gray-600">{app.message}</span>
              </p>

              {/* ✅ Status Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  app.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
