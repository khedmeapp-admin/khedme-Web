import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Provider Dashboard - Unified version
 * - Full profile editing with category/district dropdowns (meta)
 * - Availability toggle (update-status)
 * - Available Jobs + My Applications tabs
 * - Uses NEXT_PUBLIC_API_URL if available, otherwise fallback to Render URL
 */

const API = process.env.NEXT_PUBLIC_API_URL || "https://khedme-api.onrender.com";

export default function ProviderDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [provider, setProvider] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editing, setEditing] = useState(false);

  // form state
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    category_id: "",
    district_id: "",
  });

  // Load provider from localStorage and fetch all needed data
  useEffect(() => {
    const saved = (() => {
      try {
        return JSON.parse(localStorage.getItem("provider"));
      } catch {
        return null;
      }
    })();

    if (!saved) {
      toast.error("No provider found — please log in");
      setLoading(false);
      return;
    }

    setProvider(saved);
    setForm({
      full_name: saved.full_name || "",
      phone: saved.phone || "",
      category_id: saved.category_id ?? "",
      district_id: saved.district_id ?? "",
    });

    async function fetchAll() {
      try {
        // fetch jobs, applications and meta in parallel
        const [jobsRes, appsRes, metaRes] = await Promise.all([
          fetch(`${API}/api/jobs/all`),
          fetch(`${API}/api/providers/applications/${saved.id}`),
          fetch(`${API}/api/meta`),
        ]);

        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();
        const metaData = await metaRes.json();

        setJobs(jobsData.jobs || []);
        setApplications(appsData.applications || []);
        setCategories(metaData.categories || []);
        setDistricts(metaData.districts || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // Toggle availability and sync with backend + localStorage
  async function toggleAvailability() {
    if (!provider) return;
    setIsUpdating(true);

    try {
      const newStatus = !provider.available;
      const res = await fetch(`${API}/api/providers/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id: provider.id, available: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        const updated = { ...provider, available: newStatus };
        setProvider(updated);
        localStorage.setItem("provider", JSON.stringify(updated));
        toast.success(newStatus ? "You are now Available ✅" : "You are now Unavailable 🚫");
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    } catch (err) {
      console.error("toggleAvailability error:", err);
      toast.error("Network error updating status");
    } finally {
      setIsUpdating(false);
    }
  }

  // Save profile updates
  async function handleProfileUpdate(e) {
    e.preventDefault();
    if (!provider) return;
    setIsUpdating(true);

    // prepare typed values (numbers or null)
    const body = {
      id: provider.id,
      full_name: form.full_name,
      phone: form.phone,
      category_id: form.category_id === "" ? null : Number(form.category_id),
      district_id: form.district_id === "" ? null : Number(form.district_id),
    };

    try {
      const res = await fetch(`${API}/api/providers/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setProvider(data.provider);
        localStorage.setItem("provider", JSON.stringify(data.provider));
        toast.success("Profile updated ✅");
        setEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("handleProfileUpdate error:", err);
      toast.error("Network error while saving profile");
    } finally {
      setIsUpdating(false);
    }
  }

  // Apply to a job
  async function handleApply(jobId) {
    if (!provider) {
      toast.error("Please log in");
      return;
    }
    try {
      const res = await fetch(`${API}/api/providers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, provider_id: provider.id, message: "I'm interested in this job" }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted ✅");
        // append a minimal representation to applications to reflect applied state
        setApplications(prev => [{ application_id: data.application?.id ?? Date.now(), job_id: jobId, status: "pending", message: data.application?.message ?? "No message" }, ...prev]);
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (err) {
      console.error("handleApply error:", err);
      toast.error("Network error applying to job");
    }
  }

  // Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  // Utility: find label by id (useful if meta arrays are objects with name/name_ar)
  const findCategoryLabel = (id) => {
    const c = categories.find(x => Number(x.id) === Number(id));
    return c ? (c.name || c.name_en || c.name_ar || String(c.id)) : "—";
  };
  const findDistrictLabel = (id) => {
    const d = districts.find(x => Number(x.id) === Number(id));
    return d ? (d.name || d.name_en || d.name_ar || String(d.id)) : "—";
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Provider Dashboard</h1>

        {/* Provider info + controls */}
        {provider && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800">{provider.full_name || "Unnamed Provider"}</p>
                <p className="text-sm text-gray-600">
                  ID: {provider.id} • Category: {findCategoryLabel(provider.category_id)} • District: {findDistrictLabel(provider.district_id)}
                </p>
                <p className="text-sm mt-1">
                  Status: <span className={`font-medium ${provider.available ? "text-green-600" : "text-red-600"}`}>{provider.available ? "Available" : "Unavailable"}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={toggleAvailability}
                  disabled={isUpdating}
                  className={`px-4 py-2 rounded-md text-white font-medium transition ${provider.available ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}`}
                >
                  {isUpdating ? "Updating..." : provider.available ? "Set Unavailable" : "Set Available"}
                </button>

                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
                >
                  {editing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {/* Edit form */}
            {editing && (
              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full name</label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone</label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Category</label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={form.category_id ?? ""}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name || c.name_en || c.name_ar || c.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">District</label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={form.district_id ?? ""}
                    onChange={(e) => setForm({ ...form, district_id: e.target.value })}
                    required
                  >
                    <option value="">Select district</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name || d.name_en || d.name_ar || d.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button type="submit" disabled={isUpdating} className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button onClick={() => setActiveTab("available")} className={`px-4 py-2 rounded-md font-medium ${activeTab === "available" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}>Available Jobs</button>
          <button onClick={() => setActiveTab("applications")} className={`px-4 py-2 rounded-md font-medium ${activeTab === "applications" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}>My Applications</button>
        </div>

        {/* Tab content */}
        {activeTab === "available" ? (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500">No jobs available yet.</p>
            ) : (
              jobs.map((job) => {
                const alreadyApplied = applications.some(a => Number(a.job_id) === Number(job.id));
                return (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{job.service}</h3>
                        <p className="text-sm text-gray-500">District: {job.district}</p>
                        <p className="text-gray-600 mt-2">{job.description}</p>
                        <p className="text-orange-600 font-semibold mt-2">${parseFloat(job.budget).toFixed(2)}</p>
                      </div>

                      <div className="w-40 flex items-center justify-end">
                        <button
                          onClick={() => handleApply(job.id)}
                          disabled={alreadyApplied}
                          className={`ml-4 py-2 px-4 rounded-md font-medium transition ${alreadyApplied ? "bg-orange-100 text-gray-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}
                        >
                          {alreadyApplied ? "Already Applied" : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500">You haven’t applied for any jobs yet.</p>
            ) : (
              applications.map((a) => (
                <div key={a.application_id || a.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-gray-800 flex items-center justify-between">
                    <span>Job #{a.job_id} — {a.service ? a.service : ""}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${a.status === "approved" ? "bg-green-100 text-green-700" : a.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
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
"// redeploy trigger $(date /t) $(time /t)" 
