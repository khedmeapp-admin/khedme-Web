// src/pages/admin/layout.js
"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <ShieldCheck size={16} /> },
    { name: "Pending Providers", href: "/admin/approve", icon: <Users size={16} /> },
    { name: "Jobs", href: "/admin/jobs", icon: <Briefcase size={16} /> },
    { name: "Applications", href: "/admin/applications", icon: <FileText size={16} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between bg-orange-500 text-white p-4 shadow-md transition-colors">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={22} />
            <h1 className="text-lg font-bold">Khedme Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    active
                      ? "bg-white/25 text-white"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Theme Toggle */}
        <div className="mt-6">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white text-sm"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          {children}
        </div>
      </main>
    </div>
  );
}
