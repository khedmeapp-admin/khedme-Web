// components/AdminSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sun, Moon, Home, Users, Briefcase, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/admin/providers", label: "Pending Providers", icon: <Users size={18} /> },
    { href: "/admin/jobs", label: "Jobs", icon: <Briefcase size={18} /> },
    { href: "/admin/applications", label: "Applications", icon: <FileText size={18} /> },
  ];

  return (
    <aside
      className={`flex flex-col justify-between min-h-screen bg-orange-600 text-white transition-all duration-300 
      ${collapsed ? "w-16" : "w-56"} shadow-lg`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-orange-500">
          {!collapsed && <h1 className="font-semibold text-lg">Khedme Admin</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-gray-200 transition"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-xl transition-all duration-200 
                ${isActive ? "bg-white text-orange-600" : "hover:bg-orange-500/40"} 
                ${collapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-orange-500 flex flex-col items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-sm transition-all duration-300
          ${darkMode ? "bg-black/30 hover:bg-black/40" : "bg-white/20 hover:bg-white/30"}`}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>
    </aside>
  );
}
