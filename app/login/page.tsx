import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8f5f1', color: '#1f2937', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 480, width: '100%', background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center', background: '#facc15', fontWeight: 700, color: '#111827' }}>
            RS
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.7rem' }}>Demo access</h1>
            <p style={{ margin: 0, color: '#6b7280' }}>This project is a public showcase.</p>
          </div>
        </div>

        <p style={{ lineHeight: 1.7, color: '#374151' }}>
          No authentication is required for this version. The app is designed to be shown publicly as a live product demo.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{ background: '#111827', color: '#fff', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>
            Open dashboard
          </Link>
          <Link href="/" style={{ background: '#f3f4f6', color: '#111827', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
