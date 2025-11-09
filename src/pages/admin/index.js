import AdminLayout from '@/src/components/AdminLayout'

export default function AdminHome() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Welcome to the Admin Dashboard 👋</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Use the sidebar to manage providers, jobs, and applications.
        </p>
      </div>
    </AdminLayout>
  );
}
