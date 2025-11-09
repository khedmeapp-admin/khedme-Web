import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from '@/components/AdminLayout'

export default function ProviderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const API_BASE = "https://khedme-api.onrender.com";
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProvider = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/providers/${id}`);
        const data = await res.json();
        if (data.success) setProvider(data.provider);
        else toast.error("Failed to load provider details");
      } catch (err) {
        console.error(err);
        toast.error("Error fetching provider");
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;
  if (!provider) return <AdminLayout><p>Provider not found.</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-orange-600 mb-6">
        Provider Details
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
        <p><strong>Name:</strong> {provider.full_name || "—"}</p>
        <p><strong>Phone:</strong> {provider.phone}</p>
        <p><strong>Role:</strong> {provider.role}</p>
        <p><strong>Status:</strong> {provider.status}</p>
        <p><strong>Available:</strong> {provider.available ? "✅ Yes" : "⛔ No"}</p>
        <p><strong>Approved:</strong> {provider.approved ? "✅" : "❌"}</p>
      </div>
    </AdminLayout>
  );
}
