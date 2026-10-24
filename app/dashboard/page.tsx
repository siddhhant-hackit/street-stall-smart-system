import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { data } from '@/lib/restaurant-data';

export default async function DashboardPage() {
  await requireUser();

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">RS</div>
          <div>
            <strong>RestaurantOS</strong>
            <small>Operations</small>
          </div>
        </div>

        <nav className="nav-menu">
          {['Overview', 'Orders', 'Reservations', 'Customers', 'Menu', 'Marketing', 'QR Menu'].map((label) => (
            <button key={label} className={label === 'Overview' ? 'nav-item active' : 'nav-item'}>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="tiny-label">Quick actions</div>
          <a href="/pricing" className="secondary-btn full">Plans</a>
          <a href="/login" className="primary-btn full">Logout</a>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <div className="tiny-label">Restaurant dashboard</div>
            <h1>MasalaCraft</h1>
          </div>
          <div className="header-actions">
            <button className="primary-btn">New booking</button>
          </div>
        </header>

        <section className="stats-grid">
          {[
            ['Gross Sales', '₹2,48,000', '+12.4%'],
            ['Active Orders', '18', '+6 today'],
            ['Bookings', '54', '+9 this week'],
            ['Repeat Guests', '71%', '+4.1%'],
          ].map(([label, value, change]) => (
            <div key={label} className="stat-card">
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel wide">
            <div className="panel-header">
              <h3>Live kitchen queue</h3>
              <span className="badge">12 in queue</span>
            </div>
            <div className="queue-list">
              {data.orders.map((order) => (
                <div key={order.id} className="queue-row">
                  <div>
                    <strong>{order.item}</strong>
                    <small>{order.table}</small>
                  </div>
                  <div className="status-group">
                    <span className={`pill ${order.status.toLowerCase()}`}>{order.status}</span>
                    <span>{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Guest insight</h3>
              <span className="badge success">Healthy</span>
            </div>
            <div className="insight-box">
              <div className="insight-row"><span>🍽️</span><span>High-spice guests are driving premium biryani sales.</span></div>
              <div className="insight-row"><span>💸</span><span>Weekend family bundles are increasing average ticket value.</span></div>
              <div className="insight-row"><span>👥</span><span>Jain-friendly dining campaigns show stronger repeat visits.</span></div>
            </div>
          </div>
        </section>

        <section className="table-panel">
          <div className="panel-header">
            <h3>Reservations</h3>
            <span className="tiny-label muted">Today</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Time</th>
                <th>Party</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.reservations.map((booking) => (
                <tr key={booking.name}>
                  <td>{booking.name}</td>
                  <td>{booking.time}</td>
                  <td>{booking.party}</td>
                  <td><span className={`pill ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
