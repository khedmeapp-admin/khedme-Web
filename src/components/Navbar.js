"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onRefresh }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/provider/dashboard", label: "Provider" },
    { href: "/admin/approve", label: "Admin" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Animated Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight flex items-baseline select-none"
        >
          <motion.span
            className="text-orange-600"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Khedme
          </motion.span>
          <motion.span
            className="text-black ml-1 text-[1.6rem] font-extrabold leading-none"
            initial={{ opacity: 0, y: 8, rotate: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
            whileInView={{
              scale: [1, 1.08, 1],
              transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            }}
          >
            بال
          </motion.span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-medium ${
                  active
                    ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                    : "text-gray-700 hover:text-orange-600"
                } transition-colors`}
              >
                {label}
              </Link>
            );
          })}

          {/* Refresh Button */}
          {onRefresh && (
            <Button
              onClick={onRefresh}
              className="ml-3 bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1"
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
