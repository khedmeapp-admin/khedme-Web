// src/components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mobileHovered, setMobileHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/provider", label: "Provider" },
    { href: "/admin/approve", label: "Admin" },
  ];

  const isActive = (href) =>
    router.pathname === href || router.pathname.startsWith(`${href}/`);

  return (
    <header
      className={`w-full fixed top-0 z-50 border-b border-orange-100 backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm"
          : "bg-white/60 shadow-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-1 text-2xl font-bold text-orange-500"
        >
          <motion.span
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Khedme
          </motion.span>
          <span className="text-xl text-gray-800 font-semibold">بال</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const isHovered = hovered === item.href;

            return (
              <div
                key={item.href}
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    active
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </Link>

                {/* Active underline with glow */}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full shadow-[0_0_8px_2px_rgba(255,100,0,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Hover underline */}
                {!active && isHovered && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute left-0 -bottom-1 h-[2px] bg-orange-400 rounded-full shadow-[0_0_6px_1px_rgba(255,120,0,0.4)]"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-orange-500 transition-colors"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-orange-100 shadow-md"
          >
            <nav className="flex flex-col items-center py-4 space-y-3">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const isHovered = mobileHovered === item.href;

                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => setMobileHovered(item.href)}
                    onMouseLeave={() => setMobileHovered(null)}
                    className="relative w-fit"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`relative text-lg font-medium transition-colors duration-200 ${
                        active
                          ? "text-orange-600"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* Active underline glow */}
                    {active && (
                      <motion.div
                        layoutId="mobile-underline"
                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full shadow-[0_0_8px_2px_rgba(255,100,0,0.5)]"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}

                    {/* Hover underline for mobile */}
                    {!active && isHovered && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="absolute left-0 -bottom-1 h-[2px] bg-orange-400 rounded-full shadow-[0_0_6px_1px_rgba(255,120,0,0.4)]"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
