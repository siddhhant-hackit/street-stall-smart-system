import Link from 'next/link';
import { ArrowRight, Bell, BriefcaseBusiness, ChefHat, CircleDollarSign, Clock3, LayoutDashboard, MenuSquare, MessageSquareText, QrCode, Users } from 'lucide-react';
import { data } from '@/lib/restaurant-data';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: BriefcaseBusiness },
  { label: 'Reservations', icon: Clock3 },
  { label: 'Customers', icon: Users },
  { label: 'Menu', icon: MenuSquare },
  { label: 'Marketing', icon: MessageSquareText },
  { label: 'QR Menu', icon: QrCode },
];

const statCards = [
  { label: 'Gross Sales', value: '₹2,48,000', change: '+12.4%' },
  { label: 'Active Orders', value: '18', change: '+6 today' },
  { label: 'Bookings', value: '54', change: '+9 this week' },
  { label: 'Repeat Guests', value: '71%', change: '+4.1%' },
];

export default function DashboardPage() {
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
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={label === 'Overview' ? 'nav-item active' : 'nav-item'}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="tiny-label">Quick actions</div>
          <Link href="/" className="secondary-btn full">Back to landing</Link>
          <button className="primary-btn full">Launch campaign</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <div className="tiny-label">Restaurant dashboard</div>
            <h1>MasalaCraft</h1>
          </div>
          <div className="header-actions">
            <button className="icon-btn" aria-label="notifications"><Bell size={16} /></button>
            <button className="primary-btn">New booking</button>
          </div>
        </header>

        <section className="stats-grid">
          {statCards.map(card => (
            <div key={card.label} className="stat-card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <small>{card.change}</small>
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
              {data.orders.map(order => (
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
              <div className="insight-row">
                <ChefHat size={16} />
                <span>High-spice guests are driving premium biryani sales</span>
              </div>
              <div className="insight-row">
                <CircleDollarSign size={16} />
                <span>Weekend family bundles are increasing average ticket value</span>
              </div>
              <div className="insight-row">
                <Users size={16} />
                <span>Jain-friendly dining campaigns show stronger repeat visits</span>
              </div>
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
              {data.reservations.map(booking => (
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
