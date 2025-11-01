// src/components/admin/ApproveClient.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ApproveClient() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingProviders = async () => {
      try {
        const res = await axios.get(
          "https://khedme-api.onrender.com/api/providers/pending"
        );
        setProviders(res.data.providers || []);
      } catch (err) {
        console.error("Error fetching providers:", err);
      }
    };
    fetchPendingProviders();
  }, []);

  const approveProvider = async (id) => {
    setLoading(true);
    try {
      await axios.post(
        `https://khedme-api.onrender.com/api/providers/approve/${id}`
      );
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error approving provider:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Pending Providers</h1>
      {providers.length === 0 ? (
        <p>No pending providers.</p>
      ) : (
        <div className="grid gap-4">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-gray-100 border border-orange-200 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{p.name || "Unnamed"}</p>
                <p className="text-gray-600 text-sm">{p.service}</p>
              </div>
              <button
                onClick={() => approveProvider(p.id)}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
              >
                {loading ? "Approving..." : "Approve"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
