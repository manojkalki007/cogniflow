import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/ui/metric-card';

export default function DashboardPage() {
  const metrics = [
    ['Calls Made', '12,480'],
    ['Calls Pending', '1,202'],
    ['Live Campaigns', '18'],
    ['Avg Latency', '640ms'],
    ['Recordings', '9,231'],
    ['Transcriptions', '8,980'],
    ['Credit Used', '81,200'],
    ['Success Rate', '72.4%'],
  ];

  return (
    <AppShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map(([title, value]) => <MetricCard key={title} title={title} value={value} />)}
      </div>
    </AppShell>
  );
}
