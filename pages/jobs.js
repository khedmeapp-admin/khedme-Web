import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Loader2,
  LogIn,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function JobDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchJob() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/all`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Find the job by id from the list
        const foundJob = (data.jobs || []).find((j) => String(j.id) === String(id));
        if (!foundJob) throw new Error("Job not found");
        setJob(foundJob);
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    toast("Please log in or sign up to apply for jobs.", {
      description: "Redirecting you to the login page...",
      duration: 1500,
    });
    setTimeout(() => router.push("/auth"), 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin text-orange-600 w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-black py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-orange-100 rounded-2xl shadow-md p-8">
        <Link
          href="/jobs"
          className="flex items-center gap-1 text-orange-600 hover:text-orange-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-orange-700 mb-3 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-orange-500" /> {job.service}
          </h1>

          <p className="text-gray-700 mb-6">{job.description}</p>

          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>{job.district}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange-400" />
              <span>{Number(job.budget).toFixed(2)} USD</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>
                {new Date(job.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                job.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {job.status}
            </span>

            <button
              onClick={handleApplyClick}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              <LogIn className="w-4 h-4" /> Login to Apply
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
