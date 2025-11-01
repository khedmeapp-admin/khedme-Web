"use client";

import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    pendingProviders: 0,
    totalProviders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ Fetch live stats from your backend
        const res = await axios.get("https://khedme-api.onrender.com/api/admin/stats");
        if (res.data.success) setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Admin Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading stats...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard title="Total Jobs" value={stats.totalJobs} color="bg-blue-100 text-blue-700" />
              <StatCard title="Pending Providers" value={stats.pendingProviders} color="bg-orange-100 text-orange-700" />
              <StatCard title="Total Providers" value={stats.totalProviders} color="bg-green-100 text-green-700" />
            </div>

            <div className="mt-12 text-center">
              <a
                href="/admin/approve"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Go to Approvals
              </a>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-md border ${color} text-center font-semibold`}
    >
      <p className="text-lg">{title}</p>
      <p className="text-4xl mt-2">{value}</p>
    </div>
  );
}
