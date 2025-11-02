import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [isUpdating, setIsUpdating] = useState(false);

  const API_BASE = "https://khedme-api.onrender.com";

  // ✅ Load provider from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("provider"));
    if (!saved) {
      toast.error("Please log in again");
      router.push("/provider/login");
      return;
    }
    setProvider(saved);
  }, [router]);

  // ✅ Fetch jobs and applications once provider is loaded
  useEffect(() => {
    if (!provider) return;

    async function fetchData() {
      try {
        console.log("📡 Fetching jobs + applications...");
        const [jobsRes, appsRes] = await Promise.all([
          fetch(`${API_BASE}/api/jobs/all`),
          fetch(`${API_BASE}/api/providers/applications/${provider.id}`),
        ]);

        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();

        setJobs(jobsData.jobs || []);
        setApplications(appsData.applications || []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        toast.error("Failed to load data ❌");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [provider]);

  // ✅ Toggle availability
  async function toggleAvailability() {
    if (!provider) return;
    setIsUpdating(true);

    try {
      const newStatus = !provider.available;
      const res = await fetch(`${API_BASE}/api/providers/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider_id: provider.id,
          available: newStatus,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const updated = { ...provider, available: newStatus };
        setProvider(updated);
        localStorage.setItem("provider", JSON.stringify(updated));
        toast.success(
          `Status updated to ${newStatus ? "Available 🟢" : "Unavailable 🔴"}`
        );
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error updating status");
    } finally {
      setIsUpdating(false);
    }
  }

  // ✅ Apply for job
  async function handleApply(jobId) {
    if (!provider) {
      toast.error("Please log in again");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/providers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          provider_id: provider.id,
          message: "I'm interested in this job",
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted ✅");
        setApplications([...applications, { job_id: jobId, status: "pending" }]);
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  }

  // 🌀 Loading state
  if (loading || !provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  // 🧭 Dashboard UI
  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Provider Dashboard
        </h1>

        {/* Provider Info */}
        {provider && (
          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div>
              <p className="font-semibold text-gray-800">
                {provider.full_name || "Unnamed Provider"}
              </p>
              <p className="text-sm text-gray-600">
                ID: {provider.id} • Status:{" "}
                <span
                  className={`font-medium ${
                    provider.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {provider.available ? "Available" : "Unavailable"}
                </span>
              </p>
            </div>
            <button
              onClick={toggleAvailability}
              disabled={isUpdating}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                provider.available
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {isUpdating
                ? "Updating..."
                : provider.available
                ? "Set Unavailable"
                : "Set Available"}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "available"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Available Jobs
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "applications"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            My Applications
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "available" ? (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500">No jobs available yet.</p>
            ) : (
              jobs.map((job) => {
                const alreadyApplied = applications.some(
                  (a) => a.job_id === job.id
                );
                return (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white"
                  >
                    <h3 className="font-semibold text-gray-800">{job.service}</h3>
                    <p className="text-sm text-gray-500">
                      District: {job.district}
                    </p>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                    <p className="text-orange-600 font-semibold mt-2">
                      ${parseFloat(job.budget).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={alreadyApplied}
                      className={`w-full mt-4 py-2 rounded-md font-medium transition-all ${
                        alreadyApplied
                          ? "bg-orange-100 text-gray-500 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {alreadyApplied ? "Already Applied" : "Apply Now"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500">
                You haven’t applied for any jobs yet.
              </p>
            ) : (
              applications.map((a) => (
                <div
                  key={a.application_id || a.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-semibold text-gray-800 flex items-center justify-between">
                    <span>Job #{a.job_id}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        a.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : a.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{a.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
