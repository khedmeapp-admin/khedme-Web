// components/MyApplications.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCcw, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function MyApplications({ providerId }) {
  const API_BASE = "https://khedme-api.onrender.com";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeAgo, setTimeAgo] = useState("never");

  // Fetch applications
  const fetchApplications = async (showToast = false) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/applications/${providerId}`);
      const data = await res.json();

      if (data.success) {
        setApplications(data.applications);
        setLastUpdated(new Date());
        if (showToast) toast.success("Applications refreshed ✅");
      } else {
        toast.error("Failed to fetch applications");
      }
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
      toast.error("Could not load applications");
    } finally {
      setLoading(false);
    }
  };

  // mount
  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-refresh every 60s when tab is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchApplications();
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update "last updated" text every second
  useEffect(() => {
    const tick = () => {
      if (!lastUpdated) {
        setTimeAgo("never");
        return;
      }
      const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      if (diff < 5) setTimeAgo("just now");
      else if (diff < 60) setTimeAgo(`${diff} sec ago`);
      else if (diff < 3600) setTimeAgo(`${Math.floor(diff / 60)} min ago`);
      else setTimeAgo(`${Math.floor(diff / 3600)} hr ago`);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  const renderStatus = (status) => {
    const base = "inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium";
    if (status === "approved") {
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <CheckCircle2 size={14} /> Approved
        </span>
      );
    }
    if (status === "rejected") {
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <XCircle size={14} /> Rejected
        </span>
      );
    }
    return (
      <span className={`${base} bg-gray-100 text-gray-600`}>
        <Clock size={14} /> Pending
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-semibold text-orange-600">My Applications</h2>
          <p className="text-xs text-gray-500 mt-1">Last updated: {timeAgo}</p>
        </div>

        <button
          onClick={() => fetchApplications(true)}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <RefreshCcw size={16} className={`${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-6">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.application_id}
              className="border rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-gray-800">{app.service}</p>
                <p className="text-sm text-gray-500">{app.description}</p>
                <p className="text-sm text-gray-500">
                  {app.district} • ${app.budget}
                </p>
                <div className="mt-1">{renderStatus(app.status)}</div>
              </div>

              <p className="text-xs text-gray-400">
                Applied on {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
