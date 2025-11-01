import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-xl">Khedme Admin</div>

      <div className="flex gap-6">
        <Link href="/admin/home" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/admin/approve" className="hover:underline">
          Approvals
        </Link>
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </div>
    </nav>
  );
}
