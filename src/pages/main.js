import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Main() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // Fetch jobs and ads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs/all");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setJobs(data.jobs || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads"); // assuming /api/ads returns banners
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setAds(data.ads || []);
      } catch (err) {
        console.log("Ads fetch error:", err.message);
      }
    };

    fetchJobs();
    fetchAds();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading jobs...</p>;

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Jobs</h1>

      {/* Ads Banner */}
      {ads.length > 0 && (
        <div className="mb-6 flex overflow-x-auto gap-4">
          {ads.map((ad, i) => (
            <div key={i} className="min-w-[300px] bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold">{ad.title}</p>
              <p className="text-sm text-gray-600">{ad.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && <p>No jobs available</p>}
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
            <h2 className="text-xl font-bold mb-2">{job.service}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-sm text-gray-500">District: {job.district}</p>
            <p className="text-orange-500 font-semibold mt-2">Budget: ${job.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
