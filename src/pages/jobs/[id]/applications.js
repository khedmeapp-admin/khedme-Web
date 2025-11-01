import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function JobApplicationsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://khedme-api.onrender.com/api/jobs/${id}/applications`)
      .then((r) => r.json())
      .then((d) => setApps(d.applications || []))
      .catch((err) => {
        console.error('Fetch error:', err);
        toast.error('Failed to load');
      });
  }, [id]);

  const act = async (appId, action) => {
    const res = await fetch(
      `https://khedme-api.onrender.com/api/jobs/applications/${appId}/${action}`,
      { method: 'POST' }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success(`${action}ed`);
      setApps((a) => a.map((x) => (x.id === appId ? { ...x, status: action } : x)));
    } else toast.error(data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4 text-orange-600">Applications</h1>

      <button
        onClick={() => router.push(`/jobs/${id}`)}
        className="mb-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        ← Back to Job
      </button>

      {apps.map((a) => (
        <div
          key={a.id}
          className="border border-orange-200 p-4 rounded-2xl mb-4 bg-white shadow-sm"
        >
          <p className="text-gray-800">{a.message}</p>
          <p
            className={`text-sm font-medium mb-2 ${
              a.status === 'approved'
                ? 'text-green-600'
                : a.status === 'rejected'
                ? 'text-red-500'
                : 'text-orange-500'
            }`}
          >
            Status: {a.status}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => act(a.id, 'approve')}
              disabled={a.status === 'approved'}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
            >
              Approve
            </button>
            <button
              onClick={() => act(a.id, 'reject')}
              disabled={a.status === 'rejected'}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
