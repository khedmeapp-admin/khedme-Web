import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { LogOut, User, Briefcase, ToggleLeft, ToggleRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ProviderDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [available, setAvailable] = useState(true);

  // --- Logout ---
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out 👋");
    setTimeout(() => router.push("/auth"), 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "jobs", label: "My Jobs", icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FF6600",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
          },
        }}
      />

      {/* Header */}
      <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">Khedme Provider</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAvailable(!available)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium ${
              available
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {available ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
            {available ? "Available" : "Offline"}
          </button>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex gap-3 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-lg p-6"
      >
        {activeTab === "profile" && <ProfileSection available={available} />}
        {activeTab === "jobs" && <JobsSection />}
      </motion.div>
    </div>
  );
}

// -------------------- Profile Section --------------------
function ProfileSection({ available }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const providerId = localStorage.getItem("providerId");
    if (!providerId) {
      window.location.href = "/auth";
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(
          `https://khedme-api.onrender.com/api/providers/${providerId}`
        );
        if (!res.ok) throw new Error("Failed to fetch provider data");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-red-500">No profile found</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Details</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Service:</strong> {profile.service}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Status:</strong> {available ? "Available" : "Offline"}</p>
      </div>
    </div>
  );
}

// -------------------- Jobs Section --------------------
function JobsSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const providerId = localStorage.getItem("providerId");
    if (!providerId) return;

    async function fetchJobs() {
      try {
        const res = await fetch(
          `https://khedme-api.onrender.com/api/providers/${providerId}/jobs`
        );
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <p className="text-gray-500">Loading jobs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">My Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs assigned yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: job.id * 0.05 }}
              className="p-4 rounded-xl border border-gray-100 shadow-sm bg-gray-50 hover:bg-orange-50 transition-all"
            >
              <h3 className="font-semibold text-gray-800">{job.service}</h3>
              <p className="text-sm text-gray-500">{job.district}</p>
              <p className="text-sm mt-1">{job.description}</p>
              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                  job.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {job.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
