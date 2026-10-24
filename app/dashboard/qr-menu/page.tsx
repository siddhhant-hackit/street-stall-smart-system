import DashboardShell from '@/components/dashboard-shell';

export default function QRMenuPage() {
  return (
    <DashboardShell title="QR Menu">
      <section className="content-grid">
        <div className="panel wide">
          <div className="panel-header">
            <h3>Table QR preview</h3>
            <span className="badge success">Active</span>
          </div>
          <div className="qr-box">
            <div className="qr-code">QR</div>
            <div>
              <h4>MasalaCraft Digital Menu</h4>
              <p>Scan to browse the dine-in menu and place orders from the table.</p>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Menu details</h3>
          </div>
          <div className="insight-box">
            <div className="insight-row"><span>📍</span><span>Tables: 12</span></div>
            <div className="insight-row"><span>🧾</span><span>Average order value: ₹790</span></div>
            <div className="insight-row"><span>📈</span><span>QR orders: 26% of total sales</span></div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
