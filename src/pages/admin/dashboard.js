// D:\Khedme\Khedme-web\src\pages\admin\dashboard.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, UserPlus, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://khedme-api.onrender.com/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      })
      .catch((err) => console.error("Error fetching admin stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: "Total Jobs", icon: <Briefcase className="w-8 h-8 text-orange-500" />, value: stats?.totalJobs },
    { title: "Total Providers", icon: <Users className="w-8 h-8 text-orange-500" />, value: stats?.totalProviders },
    { title: "Pending Providers", icon: <UserPlus className="w-8 h-8 text-orange-500" />, value: stats?.pendingProviders },
    { title: "Total Applications", icon: <FileText className="w-8 h-8 text-orange-500" />, value: stats?.totalApplications },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] flex flex-col items-center justify-center px-4 py-10 transition-colors">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-8"
      >
        Admin Dashboard
      </motion.h1>

      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#1c1c1c] rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all"
            >
              {card.icon}
              <h3 className="text-gray-600 dark:text-gray-300 mt-3">{card.title}</h3>
              <p className="text-3xl font-semibold text-orange-500 mt-2">
                {card.value ?? "-"}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
