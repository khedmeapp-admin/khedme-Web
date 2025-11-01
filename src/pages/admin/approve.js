import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/AdminNavbar";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function AdminApprove() {
  const [providers, setProviders] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);

  // ✅ Fetch pending providers
  const fetchPendingProviders = async () => {
    try {
      const res = await axios.get("https://khedme-api.onrender.com/api/providers/pending");
      if (res.data.success) setProviders(res.data.providers);
    } catch (err) {
      toast.error("Failed to load providers ❌");
    }
  };

  useEffect(() => {
    fetchPendingProviders();
  }, []);

  // ✅ Helper to track which provider is being processed
  const markLoading = (id, isLoading) => {
    setLoadingIds((prev) =>
      isLoading ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  // ✅ Approve provider
  const approveProvider = async (id) => {
    markLoading(id, true);
    try {
      await axios.post(`https://khedme-api.onrender.com/api/providers/approve?id=${id}`);
      toast.success("Provider approved ✅");
      setProviders((prev) => prev.filter((p) => p.id !== id)); // remove from list
    } catch (err) {
      toast.error("Error approving provider ❌");
      console.error(err);
    } finally {
      markLoading(id, false);
    }
  };

  // ✅ Reject provider
  const rejectProvider = async (id) => {
    markLoading(id, true);
    try {
      await axios.post(`https://khedme-api.onrender.com/api/providers/reject?id=${id}`);
      toast.success("Provider rejected ❌");
      setProviders((prev) => prev.filter((p) => p.id !== id)); // remove from list
    } catch (err) {
      toast.error("Error rejecting provider ❌");
      console.error(err);
    } finally {
      markLoading(id, false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Pending Providers
        </h1>

        {providers.length === 0 ? (
          <p className="text-gray-500 text-center">No pending providers.</p>
        ) : (
          <div className="grid gap-4">
            {providers.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-white shadow-sm border border-orange-100 p-5 rounded-2xl"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {p.full_name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    📞 {p.phone} • #{p.id}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    disabled={loadingIds.includes(p.id)}
                    onClick={() => approveProvider(p.id)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {loadingIds.includes(p.id) ? "..." : "Approve"}
                  </Button>

                  <Button
                    disabled={loadingIds.includes(p.id)}
                    onClick={() => rejectProvider(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {loadingIds.includes(p.id) ? "..." : "Reject"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
