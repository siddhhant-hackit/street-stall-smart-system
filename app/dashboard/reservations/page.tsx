import DashboardShell from '@/components/dashboard-shell';

const reservations = [
  { name: 'Aarav Mehta', time: '7:30 PM', party: '4 guests', status: 'Confirmed' },
  { name: 'Riya Sethi', time: '8:00 PM', party: '2 guests', status: 'Pending' },
  { name: 'Kabir Shah', time: '8:45 PM', party: '6 guests', status: 'Confirmed' },
  { name: 'Diya Kapoor', time: '9:15 PM', party: '3 guests', status: 'Pending' },
];

export default function ReservationsPage() {
  return (
    <DashboardShell title="Reservations">
      <section className="stats-grid">
        {[
          ['Today', '54', '+9 this week'],
          ['Confirmed', '36', '+4%'],
          ['Waitlist', '9', 'High demand'],
          ['Avg party', '3.7', 'family dining'],
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
          <h3>Reservation schedule</h3>
          <span className="badge">This week</span>
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
            {reservations.map((booking) => (
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
    </DashboardShell>
  );
}
