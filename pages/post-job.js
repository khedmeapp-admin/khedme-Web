// pages/post-job.js
import { useState } from "react";
import { toast } from "sonner";

export default function PostJob() {
  const [form, setForm] = useState({
    description: "",
    service: "",
    district: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ handle field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.description || !form.service || !form.district) {
      toast.error("Please fill all required fields", {
        style: { background: "#FFE4E1", color: "#E25822", border: "1px solid #E25822" },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          service: form.service,
          district: form.district,
          budget: form.budget || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create job");

      toast.success("✅ Job posted successfully!", {
        style: { background: "#FFF2E5", color: "#E25822", border: "1px solid #E25822" },
      });

      setForm({ description: "", service: "", district: "", budget: "" });
    } catch (err) {
      console.error("❌ Job post error:", err);
      toast.error(err.message || "Something went wrong", {
        style: { background: "#FFE4E1", color: "#E25822", border: "1px solid #E25822" },
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-orange-100"
      >
        <h1 className="text-2xl font-semibold text-orange-600 mb-6">Post a Job</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="service"
            placeholder="Service (e.g., Plumbing)"
            value={form.service}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District (e.g., Beirut)"
            value={form.district}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget (e.g., 50)"
            value={form.budget}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <textarea
            name="description"
            placeholder="Job description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
