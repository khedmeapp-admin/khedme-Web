// src/components/Admin/ApproveProviders.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Phone, Calendar, User, MapPin, Briefcase } from "lucide-react";

export default function ApproveProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://khedme-api.onrender.com";

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/providers/pending`);
      const data = await res.json();
      if (data.success) setProviders(data.providers);
      else toast.error("Failed to load providers ❌");
    } catch {
      toast.error("Error fetching providers");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}/api/providers/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Provider ${action}ed ✅`);
        setProviders((prev) => prev.filter((p) => p.id !== id));
      } else toast.error(data.message || `Failed to ${action}`);
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-600 dark:text-orange-400 mb-8">
        Pending Provider Approvals
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      ) : providers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No pending providers 🎉
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-5">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    provider.profile_image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      provider.full_name
                    )}&background=ff7f11&color=fff`
                  }
                  alt={provider.full_name}
                  className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                    {provider.full_name || "Unnamed Provider"}
                  </h2>
                  <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                    <Phone size={14} className="mr-1" /> {provider.phone || "N/A"}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm mt-1">
                    {provider.category_id && (
                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                        <Briefcase size={14} className="mr-1" /> Category #{provider.category_id}
                      </span>
                    )}
                    {provider.district_id && (
                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="mr-1" /> District #{provider.district_id}
                      </span>
                    )}
                    <span className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={14} className="mr-1" />{" "}
                      Joined {new Date(provider.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:ml-4">
                <button
                  onClick={() => handleAction(provider.id, "approve")}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-1 transition"
                >
                  <User size={15} /> Approve
                </button>
                <button
                  onClick={() => handleAction(provider.id, "reject")}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center gap-1 transition"
                >
                  ✖ Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
