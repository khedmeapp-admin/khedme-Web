"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  CheckCircle,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* ---------------------------------------------------
     🌙 Load / Save Dark Mode
  --------------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("khedme_admin_dark");
    if (saved === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("khedme_admin_dark", darkMode);
  }, [darkMode]);

  /* ---------------------------------------------------
     🧭 Navigation Links
  --------------------------------------------------- */
  const navItems = [
    { href: "/admin/home", label: "Dashboard", icon: Home },
    { href: "/admin/approve", label: "Approvals", icon: CheckCircle },
    { href: "/admin/providers", label: "Providers", icon: Users },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully 👋");
    setTimeout(() => router.push("/"), 1000);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    toast(`Switched to ${!darkMode ? "🌙 Dark" : "☀️ Light"} mode`, {
      icon: !darkMode ? "🌙" : "☀️",
    });
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-gray-100" : "bg-orange-50 text-gray-900"
      }`}
    >
      {/* 🔔 Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? "#1f2937" : "#fff",
            color: darkMode ? "#f3f4f6" : "#333",
            border: darkMode ? "1px solid #374151" : "1px solid #f5f5f5",
          },
        }}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {(mobileOpen || !collapsed) && (
          <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${
              collapsed ? "w-20" : "w-64"
            } ${
              darkMode
                ? "bg-zinc-800 border-zinc-700"
                : "bg-white border-orange-100"
            } shadow-md border-r flex flex-col justify-between fixed md:static z-30 h-full`}
          >
            <div>
              {/* Logo */}
              <div className="p-5 border-b flex items-center justify-between">
                {!collapsed && (
                  <h1
                    className={`text-2xl font-bold ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    Khedme
                  </h1>
                )}
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className={`transition ml-auto ${
                    darkMode
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-500 hover:text-orange-600"
                  }`}
                >
                  {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
              </div>

              {/* Navigation */}
              <nav className="mt-4 flex flex-col gap-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const active = router.pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition-all ${
                        active
                          ? "bg-orange-500 text-white shadow-md"
                          : darkMode
                          ? "text-gray-300 hover:bg-zinc-700 hover:text-orange-400"
                          : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                      }`}
                    >
                      <Icon size={18} />
                      {!collapsed && <span className="font-medium">{label}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer (Dark Mode + Logout) */}
            <div
              className={`p-4 border-t flex flex-col gap-3 ${
                darkMode ? "border-zinc-700" : "border-orange-100"
              }`}
            >
              <button
                onClick={handleToggleDarkMode}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-2"
                } transition ${
                  darkMode
                    ? "text-orange-400 hover:text-orange-300"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {!collapsed && (
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-2"
                } transition ${
                  darkMode
                    ? "text-gray-300 hover:text-red-400"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                <LogOut size={18} />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Header */}
        <header
          className={`flex items-center justify-between sticky top-0 z-10 px-6 py-3 shadow-sm border-b ${
            darkMode
              ? "bg-zinc-800 border-zinc-700"
              : "bg-white border-orange-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className={`md:hidden transition ${
                darkMode
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-600"
              }`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Admin Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="font-medium">Admin</span>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Superuser
              </span>
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow ${
                darkMode ? "bg-orange-400" : "bg-orange-500"
              }`}
            >
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Main Body */}
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-8 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
