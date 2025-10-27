import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProviderDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://khedme-api.onrender.com/api/jobs/all');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        toast.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Provider Dashboard</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-orange-200 bg-white rounded-2xl p-4 shadow-sm"
            >
              <h2 className="font-semibold text-lg text-gray-800">{job.service}</h2>
              <p className="text-gray-600 text-sm">{job.description}</p>
              <p className="text-sm text-gray-500 mt-2">District: {job.district}</p>
              <p className="text-sm text-gray-500">Budget: ${job.budget}</p>
              <button
                onClick={() =>
                  toast.success(`Applied for job #${job.id}`)
                }
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
