import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    district: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("signupData", JSON.stringify(form));
        router.push("/verify-otp");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="date" name="dob" placeholder="Date of Birth" value={form.dob} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input name="district" placeholder="District / Residency" value={form.district} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input name="phone" placeholder="Phone (Wish Money)" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <p className="text-xs text-gray-500">This phone number will be used for payments via Wish Money.</p>
        <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white p-2 rounded">
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
