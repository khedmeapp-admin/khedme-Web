import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PostJob() {
  const [form, setForm] = useState({
    branch: "",
    service: "",
    district: "",
    description: "",
    budget: "",
  });
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch meta (categories + districts)
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch("https://khedme-api.onrender.com/api/meta");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories || []);
          setDistricts(data.districts || []);
        } else {
          toast.error("Failed to load data");
        }
      } catch (err) {
        console.error("❌ Meta fetch error:", err);
        toast.error("Could not connect to Khedme API");
      }
    };
    fetchMeta();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://khedme-api.onrender.com/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.job) {
        toast.success("Job posted successfully!");
        setForm({
          branch: "",
          service: "",
          district: "",
          description: "",
          budget: "",
        });
      } else {
        toast.error("Failed to post job");
      }
    } catch (err) {
      console.error("❌ Error posting job:", err);
      toast.error("Error posting job");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter services based on selected branch
  const filteredServices = form.branch
    ? categories.filter((c) => c.branch === form.branch)
    : [];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-center text-orange-600 mb-4">
        Post a Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Branch */}
        <div>
          <label className="block font-medium mb-1">Main Branch</label>
          <select
            name="branch"
            value={form.branch}
            onChange={(e) => {
              handleChange(e);
              setForm((prev) => ({ ...prev, service: "" })); // reset service
            }}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select a branch</option>
            <option value="On-site">On-site</option>
            <option value="Online">Online</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block font-medium mb-1">Service</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
            disabled={!form.branch}
          >
            <option value="">
              {form.branch ? "Select a service" : "Select a branch first"}
            </option>
            {filteredServices.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name} — {cat.name_ar}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block font-medium mb-1">District</label>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select a district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} — {d.name_ar}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            className="w-full border rounded-lg p-2"
            rows={3}
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium mb-1">Budget (USD)</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g. 50"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
