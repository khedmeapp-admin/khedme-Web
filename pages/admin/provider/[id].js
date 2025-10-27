import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

export default function ProviderProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/providers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProvider(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );

  if (!provider)
    return (
      <p className="text-center mt-10 text-gray-400">Provider not found</p>
    );

  const status = provider.rejected
    ? { text: "Rejected", color: "bg-red-500" }
    : provider.approved
    ? { text: "Approved", color: "bg-green-500" }
    : { text: "Pending", color: "bg-yellow-500" };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
        <button
          onClick={() => router.push("/admin/approve")}
          className="text-orange-400 mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <img
            src={provider.profile_pic}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-neutral-700 object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">
              {provider.name}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
            >
              {status.text}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <p><strong>Email:</strong> {provider.email || "N/A"}</p>
          <p><strong>Phone:</strong> {provider.phone || "N/A"}</p>
          <p><strong>District:</strong> {provider.district || "N/A"}</p>
          <p><strong>Category:</strong> {provider.category_id}</p>
          <p><strong>Rating:</strong> ⭐ {provider.rating || "N/A"} ({provider.reviews_count} reviews)</p>
          <p><strong>Joined:</strong> {new Date(provider.created_at).toLocaleString()}</p>
        </div>

        {provider.resume_url && (
          <div className="mt-6">
            <h2 className="text-orange-400 font-semibold mb-2">Resume</h2>
            <a
              href={provider.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View Resume (PDF)
            </a>
          </div>
        )}

        {provider.portfolio_urls?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-orange-400 font-semibold mb-2">Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {provider.portfolio_urls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Work ${idx + 1}`}
                  className="rounded-lg border border-neutral-700"
                />
              ))}
            </div>
          </div>
        )}

        {provider.id_files?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-orange-400 font-semibold mb-2">ID Documents</h2>
            <div className="flex gap-3 flex-wrap">
              {provider.id_files.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`ID ${idx + 1}`}
                  className="w-40 rounded-lg border border-neutral-700"
                />
              ))}
            </div>
          </div>
        )}

        {provider.social_urls?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-orange-400 font-semibold mb-2">Social Links</h2>
            {provider.social_urls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 underline"
              >
                {url}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
