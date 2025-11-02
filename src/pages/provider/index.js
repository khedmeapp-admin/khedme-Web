// src/pages/provider/index.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const API_BASE = "https://khedme-api.onrender.com";
  const [provider, setProvider] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* ---------------------------------------------------
     ✅ Load provider info from localStorage
  --------------------------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem("provider");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProvider(parsed);
      } catch {
        console.error("Failed to parse provider data");
      }
    }
  }, []);

  /* ---------------------------------------------------
     ✅ Fetch Provider Applications
  --------------------------------------------------- */
  const fetchApplications = async () => {
    if (!provider?.id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/applications/${provider.id}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error("Failed to load applications");
      }
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
      toast.error("Error loading applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (provider?.id) fetchApplications();
  }, [provider]);

  /* ---------------------------------------------------
     🔁 Refresh Button
  --------------------------------------------------- */
  const handleRefresh = async () => {
    if (!provider?.id) return;
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
    toast.success("Applications refreshed ✅");
  };

  /* ---------------------------------------------------
     🧱 UI
  --------------------------------------------------- */
  if (!provider)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Please log in as a provider.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        Provider Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Welcome, <span className="font-medium">{provider.full_name}</span>
      </p>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading applications...</div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.application_id}
              className="bg-white rounded-2xl p-5 shadow-md border border-orange-100 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {app.service}
              </h2>
              <p className="text-gray-700">{app.description}</p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">
                  District: {app.district || "N/A"} | Budget: ${app.budget}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
