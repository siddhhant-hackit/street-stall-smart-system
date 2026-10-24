import DashboardShell from '@/components/dashboard-shell';

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings">
      <section className="content-grid">
        <div className="panel wide">
          <div className="panel-header">
            <h3>Restaurant profile</h3>
            <span className="badge">Owner</span>
          </div>
          <div className="settings-grid">
            <label>
              <span>Restaurant name</span>
              <input value="MasalaCraft" readOnly />
            </label>
            <label>
              <span>Brand email</span>
              <input value="hello@masalacraft.com" readOnly />
            </label>
            <label>
              <span>Phone</span>
              <input value="+91 98765 43210" readOnly />
            </label>
            <label>
              <span>Currency</span>
              <input value="INR" readOnly />
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Billing</h3>
            <span className="badge success">Active plan</span>
          </div>
          <div className="insight-box">
            <div className="insight-row"><span>💳</span><span>Growth plan · ₹3,999/month</span></div>
            <div className="insight-row"><span>🗓️</span><span>Next invoice: 15 Nov 2026</span></div>
            <div className="insight-row"><span>🔐</span><span>Secure billing portal enabled</span></div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
