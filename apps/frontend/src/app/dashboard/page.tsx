'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/ui/metric-card';
import { apiGet } from '@/lib/api';

type Metrics = {
  callsMade: number;
  callsPending: number;
  liveCampaigns: number;
  successRate: number;
  avgLatencyMs: number;
  creditUsage: { used: number; remaining: number };
};

const fallback: Metrics = {
  callsMade: 12480,
  callsPending: 1202,
  liveCampaigns: 18,
  successRate: 72.4,
  avgLatencyMs: 640,
  creditUsage: { used: 81200, remaining: 18800 },
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>(fallback);
  const [status, setStatus] = useState('');

  async function refresh() {
    try {
      const data = await apiGet<Metrics>('/dashboard');
      setMetrics(data);
      setStatus('Live metrics synced.');
    } catch {
      setStatus('Backend unavailable. Showing demo metrics.');
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const cards = [
    ['Calls Made', metrics.callsMade.toLocaleString()],
    ['Calls Pending', metrics.callsPending.toLocaleString()],
    ['Live Campaigns', metrics.liveCampaigns.toString()],
    ['Avg Latency', `${metrics.avgLatencyMs}ms`],
    ['Credit Used', metrics.creditUsage.used.toLocaleString()],
    ['Credit Remaining', metrics.creditUsage.remaining.toLocaleString()],
    ['Success Rate', `${metrics.successRate}%`],
  ];

  return (
    <AppShell title="Dashboard">
      <div className="mb-4 flex gap-2">
        <button onClick={refresh} className="rounded bg-accent px-3 py-2 text-sm">Refresh Metrics</button>
        <button className="rounded border border-slate-700 px-3 py-2 text-sm">Download CSV</button>
        <button className="rounded border border-slate-700 px-3 py-2 text-sm">Download PDF</button>
      </div>
      {status ? <p className="mb-3 text-xs text-emerald-400">{status}</p> : null}
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map(([title, value]) => <MetricCard key={title} title={title} value={value} />)}
      </div>
    </AppShell>
  );
}
