// src/pages/provider/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);

  // ✅ Load provider info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("provider");
    if (stored) {
      setProvider(JSON.parse(stored));
    } else {
      toast.error("Please log in first");
      router.push("/provider/login");
    }
  }, [router]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("provider");
    toast.success("Logged out successfully");
    router.push("/provider/login");
  };

  if (!provider) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          Welcome, {provider.full_name || "Provider"} 👋
        </h1>

        <p className="text-gray-600 mb-6">
          You are logged in as <strong>{provider.phone}</strong>
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push("/provider/profile")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
          >
            View Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
