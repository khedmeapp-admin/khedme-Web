import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [role, setRole] = useState("provider");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [providerId, setProviderId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const requestOtp = async () => {
    if (!phone.startsWith("+961")) {
      toast.error("Please use a valid Lebanese number (+961...)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://khedme-api.onrender.com/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message || "OTP sent ✅");
      setProviderId(data.providerId || "");
      setStep(2);
    } catch (err) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Enter the OTP code");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://khedme-api.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Phone verified successfully 🎉");

      // Save temporary session
      localStorage.setItem("providerId", providerId);
      localStorage.setItem("phone", phone);
      localStorage.setItem("role", role);

      setStep(3);

      // Redirect based on role
      setTimeout(() => {
        if (role === "provider") router.push("/provider");
        else router.push("/post-job");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-black text-white px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FF6600",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
          },
        }}
      />

      <div className="bg-black/50 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center backdrop-blur-md">
        {/* Step 1: Role + Request OTP */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4">Sign in to Khedme</h1>

            <div className="flex justify-center gap-3 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  role === "provider"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => setRole("provider")}
              >
                Provider
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  role === "client"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => setRole("client")}
              >
                Client
              </button>
            </div>

            <input
              type="tel"
              placeholder="+961XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && requestOtp()}
              className="w-full p-3 rounded-lg mb-4 text-black focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <button
              onClick={requestOtp}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-70"
            >
              {loading ? "Sending..." : `Request OTP (${role})`}
            </button>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
            <input
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
              className="w-full p-3 rounded-lg mb-4 text-black focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-orange-300 hover:underline text-sm"
            >
              ← Change phone number
            </button>
          </>
        )}

        {/* Step 3: Verified */}
        {step === 3 && (
          <div className="space-y-2">
            <h1 className="text-3xl font-bold mb-2 text-green-400">✅ Verified!</h1>
            <p className="text-gray-200">Welcome to Khedme</p>
          </div>
        )}
      </div>
    </div>
  );
}
