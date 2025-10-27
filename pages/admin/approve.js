import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function AdminApprove() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const modalRef = useRef(null);

  // ✅ Fetch pending providers
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchProviders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/providers/pending`);
        const data = await res.json();
        setProviders(data.providers || []);
      } catch (err) {
        console.error("Error fetching providers:", err);
        toast.error("Failed to load providers.", {
          style: { background: "#FFE4E1", color: "#E25822", border: "1px solid #E25822" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [router]);

  // ✅ Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelected(null);
      }
    };

    if (selected) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  // ✅ Confetti burst (orange & white theme)
const triggerConfetti = () => {
  const duration = 1.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1000,
    colors: ["#E25822", "#FFA94D", "#FFFFFF"],
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  }, 180);
};

  // ✅ Approve or Reject
  const handleAction = async (id, action) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/providers/${action}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id: id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProviders((prev) => prev.filter((p) => p.id !== id));
      setSelected(null);

      if (action === "approve") triggerConfetti();

      toast.success(
        action === "approve" ? "✅ Provider approved!" : "❌ Provider rejected!",
        {
          style: { background: "#FFF2E5", color: "#E25822", border: "1px solid #E25822" },
        }
      );
    } catch (err) {
      console.error("Action error:", err);
      toast.error(err.message || "Action failed.", {
        style: { background: "#FFE4E1", color: "#E25822", border: "1px solid #E25822" },
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast("👋 Logged out", {
      style: { background: "#FFF2E5", color: "#E25822", border: "1px solid #E25822" },
    });
    router.push("/admin/login");
  };

  if (loading) return <div className="text-center mt-20 text-orange-500">Loading providers...</div>;

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-orange-600">Pending Providers</h1>
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow rounded-xl border border-orange-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-orange-100 text-orange-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Branch</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No pending providers 🎉
                </td>
              </tr>
            ) : (
              providers.map((p) => (
                <tr key={p.id} className="border-t hover:bg-orange-50">
                  <td
                    onClick={() => setSelected(p)}
                    className="py-3 px-4 text-orange-600 font-medium cursor-pointer hover:underline"
                  >
                    {p.name}
                  </td>
                  <td className="py-3 px-4">{p.phone}</td>
                  <td className="py-3 px-4">{p.branch || "—"}</td>
                  <td className="py-3 px-4">{p.service || "—"}</td>
                  <td className="py-3 px-4">{p.district || "—"}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(p.id, "approve")}
                      className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(p.id, "reject")}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Reject
                    </motion.button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Animated Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-orange-200 relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">
                Provider Details
              </h2>

              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p><strong>Branch:</strong> {selected.branch || "—"}</p>
                <p><strong>Service:</strong> {selected.service || "—"}</p>
                <p><strong>District:</strong> {selected.district || "—"}</p>
                <p><strong>Created At:</strong> {selected.created_at?.split("T")[0] || "—"}</p>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(selected.id, "approve")}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(selected.id, "reject")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Reject
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
