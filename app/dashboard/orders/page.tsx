import DashboardShell from '@/components/dashboard-shell';
import { data } from '@/lib/restaurant-data';

export default function OrdersPage() {
  return (
    <DashboardShell title="Orders">
      <section className="stats-grid">
        {[
          ['Open orders', '18', '+6 today'],
          ['Preparing', '7', '+2 hot queue'],
          ['Completed', '42', '+14%'],
          ['Avg ticket', '₹1,420', '+8.1%'],
        ].map(([label, value, change]) => (
          <div key={label} className="stat-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </div>
        ))}
      </section>

      <section className="table-panel">
        <div className="panel-header">
          <h3>Kitchen order queue</h3>
          <span className="badge">Live</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Table</th>
              <th>Items</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.table}</td>
                <td>{order.item}</td>
                <td>{order.time}</td>
                <td><span className={`pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  );
}
