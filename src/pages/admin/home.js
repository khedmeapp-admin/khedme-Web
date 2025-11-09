import AdminLayout from '@/components/AdminLayout'

export default function AdminHome() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-orange-100 text-orange-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold">Pending Providers</h2>
          <p className="text-sm mt-1">Review and approve provider accounts.</p>
        </div>

        <div className="bg-orange-100 text-orange-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold">Active Jobs</h2>
          <p className="text-sm mt-1">Manage posted jobs and applications.</p>
        </div>

        <div className="bg-orange-100 text-orange-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold">Reports</h2>
          <p className="text-sm mt-1">View activity and platform statistics.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
