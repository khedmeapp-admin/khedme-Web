"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isActive = (href) => pathname === href;

  const links = [
    { href: "/admin/approve", label: "Approve Providers" },
    { href: "/jobs", label: "View Jobs" },
    { href: "/provider", label: "Provider Dashboard" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-orange-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🔸 Logo */}
        <Link
          href="/admin/approve"
          className="flex items-center gap-2 select-none"
        >
          <ShieldCheck className="text-orange-600 w-6 h-6" />
          <motion.span
            className="text-xl font-bold tracking-tight text-orange-600"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Khedme Admin
          </motion.span>
        </Link>

        {/* 🔸 Navigation Links */}
        <div className="flex items-center space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-medium transition-all duration-200 ${
                isActive(href)
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600"
              }`}
            >
              {label}
              {isActive(href) && (
                <motion.div
                  layoutId="activeAdminNav"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-600 rounded-full"
                />
              )}
            </Link>
          ))}

          {/* 🔸 Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 p-2
