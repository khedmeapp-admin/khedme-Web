// src/pages/jobs.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JobsPage() {
  const API_BASE = "https://khedme-api.onrender.com";
  const [jobs, setJobs] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState({}); // Track which job is being applied to

  /* ---------------------------------------------------
     ✅ Load provider from localStorage
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
     ✅ Fetch Jobs
  --------------------------------------------------- */
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jobs/all`);
      const data = await res.json();

      if (data.success) setJobs(data.jobs);
      else toast.error("Failed to load jobs");
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
      toast.error("Error loading jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ---------------------------------------------------
     ✅ Apply for a Job (with duplicate prevention)
  --------------------------------------------------- */
  const handleApply = async (jobId) => {
    if (!provider) {
      toast.error("Please log in as a provider first");
      return;
    }

    setApplying((prev) => ({ ...prev, [jobId]: true }));

    try {
      const res = await fetch(`${API_BASE}/api/providers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          provider_id: provider.id,
          message: "I'd like to take this job.",
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Application submitted ✅");
        // Mark job as applied locally
        setJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, applied: true } : job
          )
        );
      } else {
        toast.error(data.message || "Already applied ❗");
      }
    } catch (err) {
      console.error("❌ Apply error:", err);
      toast.error("Server error while applying");
    } finally {
      setApplying((prev) => ({ ...prev, [jobId]: false }));
    }
  };

  /* ---------------------------------------------------
     🧱 UI
  --------------------------------------------------- */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading jobs...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Available Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-5 shadow-md border border-orange-100 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {job.service}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {job.district} • Budget: ${job.budget}
              </p>
              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : job.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {job.status}
                </span>

                {job.applied ? (
                  <button
                    disabled
                    className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-default"
                  >
                    ✅ Applied
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={applying[job.id]}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {applying[job.id] ? "Applying..." : "Apply Now"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
