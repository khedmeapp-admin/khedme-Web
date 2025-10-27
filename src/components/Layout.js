import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/provider", label: "Provider" },
    { href: "/admin/approve", label: "Admin" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-2"
            : "bg-white/60 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            <span className="text-orange-500">Khedme</span>
            <span className="ml-1">بال</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative transition ${
                  router.pathname === href
                    ? "text-orange-600 font-semibold"
                    : "hover:text-orange-500"
                }`}
              >
                {label}
                {router.pathname === href && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* "Post a Job" Button */}
          {router.pathname === "/jobs" && (
            <button
              onClick={() => router.push("/post-job")}
              className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md transition"
            >
              Post a Job
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 text-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 transition ${
                  router.pathname === href
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile "Post a Job" Button */}
            {router.pathname === "/jobs" && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/post-job");
                }}
                className="w-11/12 mx-auto my-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md transition"
              >
                Post a Job
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-4">{children}</main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">Khedmeبال</span>. All
        rights reserved.
      </footer>
    </div>
  );
}
