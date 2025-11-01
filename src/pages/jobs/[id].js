import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Simulated logged-in provider (hardcoded)
  const providerId = 1;

  // ✅ Fetch job details
  useEffect(() => {
    if (!id) return;
    fetch(`https://khedme-api.onrender.com/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data.job))
      .catch(() => toast.error("Failed to load job"));
  }, [id]);

  // ✅ Handle application submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://khedme-api.onrender.com/api/jobs/${id}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider_id: providerId,
            message: message || "",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Application submitted successfully!");
        setShowForm(false);
        setMessage("");
      } else {
        toast.error(data.message || "Error submitting application");
      }
    } catch (error) {
      toast.error("Network error — please try again");
    }
  };

  if (!job) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FFF4EB] flex flex-col items-center p-6">
      <Toaster position="top-center" />
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-lg mt-10">
        <h2 className="text-2xl font-bold text-orange-600 mb-3">
          {job.service}
        </h2>
        <p className="text-gray-700 mb-2">{job.description}</p>
        <p className="text-sm text-gray-500">
          <strong>District:</strong> {job.district}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Budget:</strong> ${job.budget}
        </p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Apply for this Job
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-xl p-5 mt-4 shadow-md"
          >
            <h3 className="text-lg font-semibold text-orange-600 mb-3">
              Apply for {job.service}
            </h3>

            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border w-full rounded-md p-2 mb-3"
            />

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
