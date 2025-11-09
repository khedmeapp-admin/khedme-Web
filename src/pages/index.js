// src/pages/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.25,
        type: "spring",
        stiffness: 300,
        damping: 18,
      },
    }),
  };

  return (
    <div className="relative overflow-hidden min-h-[100vh] flex flex-col items-center justify-center text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-500 px-4">
      {/* 🌓 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* 🔶 Background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-black"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundSize: "300% 300%" }}
      />

      {/* 📢 Ad Banner Top */}
      <div className="absolute top-0 w-full bg-orange-50 dark:bg-gray-800 py-3 text-center text-sm font-medium border-b border-orange-200 dark:border-gray-700">
        🔶 <span className="text-orange-500">Advertise Here!</span> Contact us to display your brand.
      </div>

      {/* ❤️ ECG Heartbeat Line */}
      <motion.svg
        className="absolute top-[38%] left-1/2 -translate-x-1/2 w-72 h-16"
        viewBox="0 0 200 50"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M0 25 H20 L40 25 L50 10 L60 40 L70 25 H90 L100 25 L110 5 L120 45 L130 25 H200"
          stroke="#f97316"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      {/* 💎 Main Card */}
      <motion.div
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-10 text-center max-w-2xl border border-orange-100 dark:border-gray-700 mt-12"
        animate={{
          scale: [1, 1.015, 1],
          boxShadow: [
            "0 8px 20px rgba(0,0,0,0.1)",
            "0 10px 25px rgba(255,140,0,0.25)",
            "0 8px 20px rgba(0,0,0,0.1)",
          ],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 🧡 Title */}
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Welcome to{" "}
          <span className="text-orange-500 font-extrabold">Khedmeبال</span>
        </motion.h1>

        {/* 🩶 Subtitle */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Connecting skilled providers with customers who need their services —
          fast, secure, and easy.
        </motion.p>

        {/* 🎯 Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-stretch gap-4 w-full"
          initial="hidden"
          animate="visible"
        >
          {[
            {
              href: "/signup",
              label: "Sign Up for Free",
              baseColor: "bg-orange-500",
              hoverColor: "hover:bg-orange-600",
              text: "text-white",
            },
            {
              href: "/login",
              label: "Log In",
              baseColor: "bg-black dark:bg-gray-700",
              hoverColor: "hover:bg-gray-800",
              text: "text-white",
            },
          ].map((btn, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={buttonVariants}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={btn.href}
                className={`block px-6 py-3 font-medium rounded-lg transition-all text-center shadow-md ${btn.baseColor} ${btn.hoverColor} ${btn.text}`}
              >
                {btn.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 📢 Ad Banner Bottom */}
      <div className="mt-20 w-full bg-orange-50 dark:bg-gray-800 py-4 text-center border-t border-orange-200 dark:border-gray-700">
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          🔸 Your Ad Could Be Here — Promote your business to thousands of users monthly!
        </span>
      </div>
    </div>
  );
}
