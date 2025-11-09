"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Users, Briefcase, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: "Pending Providers", href: "/admin/approve", icon: <Users size={18} /> },
    { name: "Jobs", href: "/admin/jobs", icon: <Briefcase size={18} /> },
    { name: "Applications", href: "/admin/applications", icon: <FileText size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white flex flex-col justify-between p-4">
        <div>
          <h1 className="text-xl font-bold mb-6">Khedme Admin</h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start text-white hover:bg-orange-600 ${
                    pathname === item.href ? "bg-orange-600" : ""
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-4 border-t border-white/20 pt-3">
          <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex justify-between bg-transparent text-white border-white/30 hover:bg-white/10"
          >
            {theme === "dark" ? (
              <>
                <Sun size={16} /> Light Mode
              </>
            ) : (
              <>
                <Moon size={16} /> Dark Mode
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
