'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { apiGet, apiPost } from '@/lib/api';

type Campaign = {
  id: string;
  name: string;
  agentId: string;
  phoneNumber: string;
  status: string;
  totalContacts: number;
  processedContacts: number;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    name: 'Q1 Outreach',
    agentId: 'agent_default',
    phoneNumber: '+14155550100',
    concurrencyLimit: 10,
    totalContacts: 100,
    runNow: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const items = await apiGet<Campaign[]>('/campaigns');
        setCampaigns(items);
      } catch {
        setStatus('Backend unavailable. Campaign actions will run in preview mode.');
      }
    })();
  }, []);

  async function createCampaign() {
    try {
      const created = await apiPost<Campaign>('/campaigns', form as unknown as Record<string, unknown>);
      setCampaigns((prev) => [created, ...prev]);
      setStatus(`Campaign created: ${created.name}`);
    } catch {
      const local: Campaign = {
        id: `local_${Date.now()}`,
        name: form.name,
        agentId: form.agentId,
        phoneNumber: form.phoneNumber,
        status: form.runNow ? 'running' : 'scheduled',
        totalContacts: form.totalContacts,
        processedContacts: 0,
      };
      setCampaigns((prev) => [local, ...prev]);
      setStatus('Campaign created in local preview mode.');
    }
  }

  async function startCampaign(id: string) {
    try {
      const updated = await apiPost<{ processedContacts: number }>(`/campaigns/${id}/start`);
      setCampaigns((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'running', processedContacts: updated.processedContacts } : item)));
      setStatus('Campaign started.');
    } catch {
      setCampaigns((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'running', processedContacts: Math.min(item.totalContacts, item.processedContacts + 10) } : item)));
      setStatus('Campaign started in local preview mode.');
    }
  }

  return (
    <AppShell title="Bulk Calling Campaigns">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Create Campaign</h3>
          <div className="mt-3 grid gap-2">
            <input className="rounded bg-slate-800 p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded bg-slate-800 p-2" value={form.agentId} onChange={(e) => setForm({ ...form, agentId: e.target.value })} />
            <input className="rounded bg-slate-800 p-2" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
            <input className="rounded bg-slate-800 p-2" type="number" value={form.totalContacts} onChange={(e) => setForm({ ...form, totalContacts: Number(e.target.value) })} />
            <button onClick={createCampaign} className="rounded bg-accent px-3 py-2 text-sm font-semibold">Create & Queue</button>
          </div>
          {status ? <p className="mt-2 text-xs text-emerald-400">{status}</p> : null}
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Live Campaign Monitor</h3>
          <div className="mt-3 space-y-2">
            {campaigns.length === 0 ? <p className="text-sm text-slate-400">No campaigns yet.</p> : null}
            {campaigns.map((camp) => (
              <div key={camp.id} className="rounded border border-slate-700 p-3 text-sm">
                <p className="font-medium">{camp.name}</p>
                <p className="text-slate-400">{camp.status} · {camp.processedContacts}/{camp.totalContacts} processed</p>
                <button onClick={() => startCampaign(camp.id)} className="mt-2 rounded bg-emerald-600 px-2 py-1 text-xs">Start</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
