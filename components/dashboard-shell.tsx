import Link from 'next/link';
import { ArrowRight, Bell, BriefcaseBusiness, Clock3, LayoutDashboard, MenuSquare, MessageSquareText, QrCode, Users } from 'lucide-react';
import { ReactNode } from 'react';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Orders', href: '/dashboard/orders', icon: BriefcaseBusiness },
  { label: 'Reservations', href: '/dashboard/reservations', icon: Clock3 },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Menu', href: '/dashboard/menu', icon: MenuSquare },
  { label: 'Marketing', href: '/dashboard/marketing', icon: MessageSquareText },
  { label: 'QR Menu', href: '/dashboard/qr-menu', icon: QrCode },
];

export default function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
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
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} className={href === '/dashboard' ? 'nav-item active' : 'nav-item'}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="tiny-label">Quick actions</div>
          <Link href="/pricing" className="secondary-btn full">Plans</Link>
          <Link href="/login" className="primary-btn full">Logout</Link>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <div className="tiny-label">Restaurant dashboard</div>
            <h1>{title}</h1>
          </div>
          <div className="header-actions">
            <button className="icon-btn" aria-label="notifications"><Bell size={16} /></button>
            <button className="primary-btn">New booking</button>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
