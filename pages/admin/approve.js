"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/src/components/ui/button";

export default function ApprovePage() {
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
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Pending Providers</h1>
      {providers.length === 0 ? (
        <p>No pending providers.</p>
      ) : (
        <div className="grid gap-4">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{p.name || "Unnamed"}</p>
                <p className="text-gray-400 text-sm">{p.service}</p>
              </div>
              <Button
                onClick={() => approveProvider(p.id)}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Approve
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
