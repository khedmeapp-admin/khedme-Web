import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: 'Arial', background: '#fff' }}>
      <h1 style={{ color: '#C32865' }}>بالخدمة</h1>
      <p>أول منصة خدمات موثّقة في كل لبنان</p>
      <Link href="/post-job">
        <a style={{ marginRight: 20, background: '#C32865', color: '#fff', padding: '10px 20px', borderRadius: 6 }}>
          انشر مهمة
        </a>
      </Link>
      <Link href="/provider/register">
        <a style={{ background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 6 }}>
          كن مزوّد خدمة
        </a>
      </Link>
    </div>
  );
}
