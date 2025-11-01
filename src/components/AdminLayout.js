// D:\Khedme\Khedme-Web\src\components\AdminLayout.js
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-orange-500 text-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Khedme Logo" className="w-8 h-8 rounded" />
          <h1 className="text-lg font-semibold">Khedme Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/home" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/approve" className="hover:underline">
            Approvals
          </Link>
          <Link
            href="/"
            className="bg-white text-orange-600 px-3 py-1 rounded-lg font-medium hover:bg-orange-100"
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
