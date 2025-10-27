// src/components/Footer.js
import Link from "next/link";
import { Mail, Github, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-b from-white to-orange-50 border-t border-orange-100 mt-10 shadow-inner"
    >
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">Khedmeبال</h2>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            Khedmeبال connects skilled providers with people who need help — 
            reliable, fast, and local. Empowering communities one service at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/jobs", label: "Browse Jobs" },
              { href: "/provider", label: "Provider Portal" },
              { href: "/admin/approve", label: "Admin Dashboard" },
            ].map((item) => (
              <motion.li key={item.href} whileHover={{ x: 4 }}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 hover:text-orange-500 transition-colors"
            >
              <Mail size={16} />
              <a href="mailto:support@khedme.com">support@khedme.com</a>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 hover:text-orange-500 transition-colors"
            >
              <Globe size={16} />
              <a
                href="https://khedme.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.khedme.com
              </a>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 hover:text-orange-500 transition-colors"
            >
              <Github size={16} />
              <a
                href="https://github.com/haidarabouzeid"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </motion.li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-100 py-4 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-sm">
        © {new Date().getFullYear()}{" "}
        <motion.span
          whileHover={{ scale: 1.05, color: "#f97316" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-orange-500 font-medium cursor-pointer"
        >
          Khedmeبال
        </motion.span>
        . All rights reserved.
      </div>
    </motion.footer>
  );
}
