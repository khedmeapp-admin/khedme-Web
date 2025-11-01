import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const [provider, setProvider] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Load provider from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("provider");
    if (stored) {
      setProvider(JSON.parse(stored));
    }
  }, []);

  // ✅ Fetch applications when provider is loaded
  useEffect(() => {
    if (provider?.id) {
      fetchApplications();
    }
  }, [provider]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://khedme-api.onrender.com/api/providers/applications/${provider.id}`
      );
      const data = await res.json();
      if (data.success) setApplications(data.applications);
    } catch (err) {
      toast.error("Failed to load applications ❌");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">
              Provider Dashboard
            </h1>
            {provider && (
              <p className="text-gray-600 mt-1">
                Welcome, <span className="font-semibold">{provider.name}</span>
              </p>
            )}
          </div>

          <Button
            onClick={fetchApplications}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        ) : applications.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No applications yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {app.job_service}
                </h2>
                <p className="text-gray-500 text-sm">
                  {app.job_district} • Budget: ${app.job_budget}
                </p>
                <p className="mt-2 text-gray-700">{app.message}</p>
                <p
                  className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
