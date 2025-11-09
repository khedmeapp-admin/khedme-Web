// src/layouts/AdminLayout.js
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-orange-500 text-white fixed h-full p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/home" className="hover:bg-orange-600 p-2 rounded">
            Home
          </Link>
          <Link href="/admin/providers" className="hover:bg-orange-600 p-2 rounded">
            Providers
          </Link>
          <Link href="/admin/approve" className="hover:bg-orange-600 p-2 rounded">
            Approvals
          </Link>
        </nav>
      </aside>

      <main className="ml-64 p-6">{children}</main>
    </div>
  );
}
