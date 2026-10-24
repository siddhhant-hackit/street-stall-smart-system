import DashboardShell from '@/components/dashboard-shell';

const menuItems = [
  { name: 'Royal Hyderabadi Dum Biryani', category: 'Signature', price: '₹520', status: 'Available' },
  { name: 'Old Delhi Butter Chicken', category: 'Main Course', price: '₹420', status: 'Available' },
  { name: 'Dal Makhani Bowl', category: 'Vegetarian', price: '₹360', status: 'Available' },
  { name: 'Paneer Tikka Platter', category: 'Starters', price: '₹280', status: 'Low stock' },
];

export default function MenuPage() {
  return (
    <DashboardShell title="Menu">
      <section className="stats-grid">
        {[
          ['Menu items', '76', '+5 this month'],
          ['Best seller', 'Biryani', '+18%'],
          ['Low stock', '4', 'Need review'],
          ['Avg margin', '31%', 'Strong'],
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
          <h3>Menu manager</h3>
          <span className="badge">Updated 1h ago</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td><span className={`pill ${item.status === 'Available' ? 'confirmed' : 'pending'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  );
}
