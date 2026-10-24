import DashboardShell from '@/components/dashboard-shell';

const campaigns = [
  { title: 'Diwali Family Feast', channel: 'WhatsApp', status: 'Scheduled', reach: '842', conversion: '18.2%' },
  { title: 'Sunday Maharaja Lunch', channel: 'SMS', status: 'Draft', reach: '620', conversion: '13.4%' },
  { title: 'VIP Re-engagement', channel: 'DM', status: 'Sent', reach: '289', conversion: '22.1%' },
];

export default function MarketingPage() {
  return (
    <DashboardShell title="Marketing">
      <section className="stats-grid">
        {[
          ['Campaigns', '12', '+3 this month'],
          ['Open rate', '84.6%', '+9.1%'],
          ['Revenue generated', '₹42.8k', '+16.2%'],
          ['Avg conversion', '17.3%', 'Strong'],
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
          <h3>Campaign planner</h3>
          <span className="badge">Live</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Reach</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.title}>
                <td>{campaign.title}</td>
                <td>{campaign.channel}</td>
                <td><span className={`pill ${campaign.status === 'Sent' ? 'completed' : campaign.status === 'Scheduled' ? 'confirmed' : 'pending'}`}>{campaign.status}</span></td>
                <td>{campaign.reach}</td>
                <td>{campaign.conversion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  );
}
