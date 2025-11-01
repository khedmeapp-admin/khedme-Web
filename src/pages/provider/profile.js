// pages/provider/profile.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProviderProfile() {
  const API_BASE = "https://khedme-api.onrender.com";
  const [provider, setProvider] = useState({
    id: 1, // placeholder until auth added
    name: "",
    phone: "",
    district: "",
    branch: "",
    service: "",
    available: true,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------------------------------------------------
     ✅ Fetch Provider Profile
  --------------------------------------------------- */
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/${provider.id}`);
      const data = await res.json();

      if (data.success && data.provider) {
        setProvider(data.provider);
      } else {
        toast.error("Failed to load profile");
      }
    } catch (err) {
      console.error("❌ Error fetching provider:", err);
      toast.error("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------------------------------------------------
     ✅ Save Profile Updates
  --------------------------------------------------- */
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/providers/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(provider),
      });

      const data = await res.json();
      if (data.success) toast.success("Profile updated ✅");
      else toast.error("Failed to update");
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------------------------------------------
     ✅ Toggle Availability
  --------------------------------------------------- */
  const toggleAvailability = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/providers/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: provider.id,
          available: !provider.available,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProvider((prev) => ({ ...prev, available: !prev.available }));
        toast.success(
          `Now marked as ${!provider.available ? "available ✅" : "unavailable ⛔"}`
        );
      } else toast.error("Failed to update availability");
    } catch (err) {
      console.error("❌ Toggle error:", err);
      toast.error("Error toggling availability");
    }
  };

  /* ---------------------------------------------------
     🧱 UI
  --------------------------------------------------- */
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
        Provider Profile
      </h1>

      <form onSubmit={saveProfile} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={provider.name}
            onChange={(e) => setProvider({ ...provider, name: e.target.value })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            value={provider.phone}
            onChange={(e) => setProvider({ ...provider, phone: e.target.value })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">District</label>
          <input
            type="text"
            value={provider.district}
            onChange={(e) => setProvider({ ...provider, district: e.target.value })}
            className="w-full border rounded-lg p-2"
            placeholder="e.g. Beirut"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Branch</label>
          <select
            value={provider.branch}
            onChange={(e) => setProvider({ ...provider, branch: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select a branch</option>
            <option value="On-site">On-site</option>
            <option value="Online">Online</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Service</label>
          <input
            type="text"
            value={provider.service}
            onChange={(e) => setProvider({ ...provider, service: e.target.value })}
            className="w-full border rounded-lg p-2"
            placeholder="e.g. Plumbing, Graphic Design..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            provider.available
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-400 hover:bg-gray-500 text-white"
          }`}
        >
          {provider.available ? "Available ✅" : "Unavailable ⛔"}
        </button>
      </div>
    </div>
  );
}
