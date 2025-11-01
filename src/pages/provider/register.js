import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProviderRegister() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    district: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://khedme-api.onrender.com/api/providers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration submitted successfully!", { style: { background: "#ff7b00", color: "#fff" } });
        setForm({ name: "", phone: "", service: "", district: "" });
      } else {
        toast.error(data.message || "Error submitting form");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-orange-100"
      >
        <h1 className="text-2xl font-bold text-orange-600 mb-4 text-center">Provider Registration</h1>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-orange-400"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-orange-400"
          required
        />
        <input
          type="text"
          name="service"
          placeholder="Service (e.g. Plumbing)"
          value={form.service}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-orange-400"
          required
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={form.district}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-orange-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
