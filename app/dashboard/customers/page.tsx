import DashboardShell from '@/components/dashboard-shell';

const customers = [
  { name: 'Aarav Mehta', tier: 'VIP', spend: '₹18,600', visits: 12, favorite: 'Biryani' },
  { name: 'Riya Sethi', tier: 'Gold', spend: '₹12,400', visits: 9, favorite: 'Paneer' },
  { name: 'Kabir Shah', tier: 'Standard', spend: '₹8,900', visits: 5, favorite: 'Butter Chicken' },
  { name: 'Diya Kapoor', tier: 'VIP', spend: '₹21,200', visits: 14, favorite: 'Thali' },
];

export default function CustomersPage() {
  return (
    <DashboardShell title="Customers">
      <section className="stats-grid">
        {[
          ['Total guests', '1,482', '+12%'],
          ['VIP segment', '136', '+9 this month'],
          ['Repeat rate', '71%', '+4.1%'],
          ['Churn risk', '8%', 'Stable'],
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
          <h3>Customer directory</h3>
          <span className="badge">Filtered</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tier</th>
              <th>Total spend</th>
              <th>Visits</th>
              <th>Favorite dish</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.name}>
                <td>{customer.name}</td>
                <td><span className="pill confirmed">{customer.tier}</span></td>
                <td>{customer.spend}</td>
                <td>{customer.visits}</td>
                <td>{customer.favorite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  );
}
