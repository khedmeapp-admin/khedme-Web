import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const router = useRouter();
  const [phone, setPhone] = useState(router.query.phone || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter the OTP code first");
    setLoading(true);

    try {
      const res = await fetch("https://khedme-api.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      // ✅ Save provider info for dashboard access
      if (data.provider) {
        localStorage.setItem("provider", JSON.stringify(data.provider));
      } else {
        // fallback if backend doesn’t send provider yet
        localStorage.setItem(
          "provider",
          JSON.stringify({ id: 1, name: "Demo Provider", phone })
        );
      }

      toast.success("Login successful ✅");
      router.push("/provider/dashboard"); // ✅ Go straight to provider dashboard
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-black">
      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg w-96">
        <h1 className="text-center text-white text-xl font-bold mb-6">
          Verify OTP
        </h1>
        <p className="text-sm text-orange-200 text-center mb-4">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold">{phone}</span>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="123456"
          className="w-full mb-4 px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
