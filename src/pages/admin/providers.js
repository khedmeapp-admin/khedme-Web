"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "@/layouts/AdminLayout";
import { CheckCircle, XCircle, Loader2, UserCheck, UserX } from "lucide-react";

export default function ManageProviders() {
  const API_BASE = "https://khedme-api.onrender.com";
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------------------------------------
     ✅ Fetch all providers (approved + rejected)
  --------------------------------------------------- */
  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/all`);
      const data = await res.json();

      if (data.success) {
        setProviders(data.providers);
      } else {
        toast.error("Failed to fetch providers ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error fetching providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  /* ---------------------------------------------------
     ✅ Approve / Reject existing providers
  --------------------------------------------------- */
  const handleAction = async (id, action) => {
    try {
      const endpoint =
        action === "approve"
          ? `${API_BASE}/api/providers/approve?id=${id}`
          : `${API_BASE}/api/providers/reject?id=${id}`;

      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();

      if (data.success) {
        toast.success(
          action === "approve"
            ? "✅ Provider approved!"
            : "🚫 Provider rejected."
        );
        setProviders((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: action, approved: action === "approve" } : p
          )
        );
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error performing action");
    }
  };

  /* ---------------------------------------------------
     🧭 Render
  --------------------------------------------------- */
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Manage All Providers
        </h1>

        {loading ? (
          <div className="flex items-center justify-center mt-20 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading providers...
          </div>
        ) : providers.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No providers found.
          </p>
        ) : (
          <div className="grid gap-4">
            {providers.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-white border border-orange-100 shadow-sm rounded-xl p-5 hover:shadow-md transition"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">{p.full_name}</h2>
                  <p className="text-sm text-gray-500">{p.phone}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    District ID: {p.district_id} | Category ID: {p.category_id}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* ✅ Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.approved
                        ? "bg-green-100 text-green-700"
                        : p.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.approved
                      ? "Approved"
                      : p.status === "rejected"
                      ? "Rejected"
                      : "Pending"}
                  </span>

                  {/* ✅ Action Buttons */}
                  <button
                    onClick={() => handleAction(p.id, "approve")}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <UserCheck size={16} /> Approve
                  </button>

                  <button
                    onClick={() => handleAction(p.id, "reject")}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <UserX size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
