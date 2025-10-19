export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: 'Arial', background: '#fff' }}>
      <h1 style={{ color: '#C32865' }}>بلخدمة</h1>
      <p>أول منصة خدمات موثّقة في كل لبنان</p>
      <a href="/post-job"   style={{ marginRight: 20, background: '#C32865', color: '#fff', padding: '10px 20px', borderRadius: 6 }}>انشر مهمة</a>
      <a href="/provider" style={{ background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 6 }}>كن مزوّد خدمة</a>
    </div>
  );
}
