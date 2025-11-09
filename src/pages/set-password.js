import { useState } from "react";
import { useRouter } from "next/router";

export default function SetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError("Passwords do not match");

    const signupData = JSON.parse(localStorage.getItem("signupData"));
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...signupData, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("signupData");
        localStorage.removeItem("otpVerified");
        router.push("/main");
      } else {
        setError(data.message || "Failed to create account");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Set Password</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded"/>
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full p-2 border rounded"/>
        <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white p-2 rounded">
          {loading ? "Creating Account..." : "Set Password"}
        </button>
      </form>
    </div>
  );
}
