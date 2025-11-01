"use client";
import { useState, useEffect } from "react";
import { Briefcase, ClipboardList, CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const [provider, setProvider] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(false);

  // ✅ Load provider data from localStorage
  useEffect(() => {
    const storedProvider = JSON.parse(localStorage.getItem("provider"));
    if (storedProvider) setProvider(storedProvider);
  }, []);

  // ✅ Fetch all jobs
  useEffect(() => {
    if (!provider) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/all`)
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load jobs");
        setLoading(false);
      });
  }, [provider]);

  // ✅ Fetch provider's applications
  const fetchApplications = async () => {
    if (!provider) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/providers/applications/${provider.id}`);
      const data = await res.json();
      if (data.success) setApplications(data.applications || []);
      else toast.error("Failed to fetch applications");
    } catch {
      toast.error("Error loading applications");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "applications") fetchApplications();
  }, [activeTab]);

  // ✅ Apply to a job
  const handleApply = async (jobId) => {
    if (!provider) return toast.error("Please log in first");
    const message = prompt("Enter a short message for your application:");
    if (!message) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/providers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, provider_id: provider.id, message }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted!");
        fetchApplications(); // refresh
      } else {
        toast.error("Failed to apply");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const renderStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      approved: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded border ${colors[status] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Provider Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`pb-2 px-3 font-semibold ${activeTab === "jobs" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-600 hover:text-orange-500"}`}
        >
          <Briefcase className="inline mr-2 w-4 h-4" /> Available Jobs
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`pb-2 px-3 font-semibold ${activeTab === "applications" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-600 hover:text-orange-500"}`}
        >
          <ClipboardList className="inline mr-2 w-4 h-4" /> My Applications
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-10 text-gray-500">
          <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading...
        </div>
      ) : activeTab === "jobs" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <h2 className="font-semibold text-lg text-gray-900">{job.service}</h2>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                <span className="block">📍 {job.district}</span>
                <span className="block">💰 {job.budget} USD</span>
              </div>
              <button
                onClick={() => handleApply(job.id)}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications yet.</p>
          ) : (
            applications.map(app => (
              <div key={app.application_id} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <h2 className="font-semibold text-lg text-gray-900">{app.service}</h2>
                <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <span className="block">📍 {app.district}</span>
                  <span className="block">💰 {app.budget} USD</span>
                </div>
                <p className="text-sm text-gray-700 mt-3 italic">"{app.message}"</p>
                <div className="mt-3 flex items-center justify-between">
                  {renderStatusBadge(app.status)}
                  {app.status === "approved" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {app.status === "rejected" && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
