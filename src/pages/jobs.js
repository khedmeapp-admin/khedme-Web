// pages/jobs.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JobsPage() {
  // ✅ Ensure API_BASE does NOT include /api at the end
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState({}); // { jobId: boolean }

  // 🔸 Load all jobs on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/jobs/all`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Job load error:", err);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 🔸 Apply for a job
  const handleApply = async (jobId) => {
    // TODO: replace provider_id with real logged-in provider ID once auth is integrated
    const providerId = 1;
    const message = "Hello — I can take this job.";

    setApplying((s) => ({ ...s, [jobId]: true }));
    try {
      const res = await fetch(`${API_BASE}/api/jobs/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, provider_id: providerId, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to apply");
      toast.success("Application sent ✅");
    } catch (err) {
      console.error("Apply error:", err);
      toast.error(err.message || "Error applying");
    } finally {
      setApplying((s) => ({ ...s, [jobId]: false }));
    }
  };

  // 🔸 Render UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Open Jobs</h1>

        {loading ? (
          <p className="text-gray-500">Loading jobs…</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-orange-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {job.service || "Service"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {job.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      District:{" "}
                      <span className="font-medium">
                        {job.district || "—"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      ${job.budget || "—"}
                    </div>
                    <div className="text-sm text-gray-400">
                      Posted:{" "}
                      {job.created_at
                        ? new Date(job.created_at).toLocaleDateString()
                        : "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    disabled={!!applying[job.id]}
                    onClick={() => handleApply(job.id)}
                    className={`w-full rounded-xl py-2 font-medium transition ${
                      applying[job.id]
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    {applying[job.id] ? "Applying..." : "Apply Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
