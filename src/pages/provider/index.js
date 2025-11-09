"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Provider Dashboard (Available Jobs + My Applications)
 * - Keep Refresh and Toggle (user requested)
 * - Expect env NEXT_PUBLIC_API_URL to be defined
 */

export default function ProviderDashboardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Local provider
  const [provider, setProvider] = useState(null);

  // Tabs: "jobs" | "applications"
  const [activeTab, setActiveTab] = useState("jobs");

  // Jobs
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  // Applications
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);

  // Action state (apply)
  const [actionLoading, setActionLoading] = useState(null);

  const API = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    // Load provider from localStorage
    const stored = localStorage.getItem("provider");
    if (stored) {
      try {
        setProvider(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse provider from localStorage:", e);
        setProvider(null);
      }
    }
    // initial fetch of jobs
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch jobs
  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs/all`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      } else {
        toast.error(data.message || "Failed to load jobs");
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Network error loading jobs");
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  // Fetch applications for provider
  const fetchApplications = async (provId) => {
    if (!provId) return;
    setAppsLoading(true);
    try {
      const res = await fetch(`${API}/api/providers/applications/${provId}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      } else {
        toast.error(data.message || "Failed to load applications");
        setApplications([]);
      }
    } catch (err) {
      console.error("Error loading applications:", err);
      toast.error("Network error loading applications");
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  };

  // When switching to applications tab, load them
  useEffect(() => {
    if (activeTab === "applications") {
      if (provider?.id) {
        fetchApplications(provider.id);
      } else {
        // Attempt to re-load provider from localStorage
        const stored = localStorage.getItem("provider");
        if (stored) {
          try {
            const p = JSON.parse(stored);
            setProvider(p);
            if (p?.id) fetchApplications(p.id);
          } catch {}
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, provider?.id]);

  // Apply to a job
  const handleApply = async (jobId) => {
    if (!provider?.id) {
      toast.error("No provider logged in. Please login");
      return;
    }
    setActionLoading(jobId);
    try {
      const res = await fetch(`${API}/api/jobs/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          provider_id: provider.id,
          message: "Hello — I can take this job.", // default message; could be enhanced
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Application submitted ✅");
        // Optionally remove the job from available list or mark as applied
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (err) {
      console.error("Apply error:", err);
      toast.error("Network error applying to job");
    } finally {
      setActionLoading(null);
    }
  };

  // Refresh handler
  const handleRefresh = async () => {
    if (activeTab === "jobs") {
      await fetchJobs();
      toast.success("Jobs refreshed");
    } else if (activeTab === "applications" && provider?.id) {
      await fetchApplications(provider.id);
      toast.success("Applications refreshed");
    } else {
      toast("Nothing to refresh");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-600">Provider Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome{provider ? `, ${provider.full_name}` : ""}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh */}
            <Button onClick={handleRefresh} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </Button>

            {/* Theme toggle (keeps consistent with next-themes usage) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
              title="Toggle theme"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "jobs"
                ? "bg-orange-500 text-white shadow"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            }`}
          >
            All Jobs
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "applications"
                ? "bg-orange-500 text-white shadow"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            }`}
          >
            My Applications
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "jobs" ? (
            <div>
              {jobsLoading ? (
                <div className="py-10 text-center text-gray-500">Loading jobs...</div>
              ) : jobs.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No jobs found.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{job.service}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{job.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            <span className="mr-3">📍 {job.district || job.district_id || "—"}</span>
                            <span>💵 {job.budget ? `$${job.budget}` : "—"}</span>
                          </p>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-sm px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">pending</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          onClick={() => handleApply(job.id)}
                          disabled={actionLoading === job.id}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {actionLoading === job.id ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {appsLoading ? (
                <div className="py-10 text-center text-gray-500">Loading applications...</div>
              ) : applications.length === 0 ? (
                <div className="py-10 text-center text-gray-500">You have no applications yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.map((app) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{app.service}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{app.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">{app.message}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">📍 {app.district || "—"}</p>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-sm px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 capitalize">{app.status}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2 justify-end">
                        <Link href={`/jobs/${app.job_id}`}>
                          <a className="text-xs px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700">View Job</a>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
