// pages/admin/index.js
export default function Admin() {
  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Admin Panel – Khedme بال</h1>
      <p>Login: admin@khdemebal.com / admin123</p>
      <button onClick={() => alert('Cities, Categories, Payment – coming soon!')}>
        Open Dashboard
      </button>
    </div>
  );
}
