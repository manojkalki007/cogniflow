'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { apiGet, apiPost } from '@/lib/api';

type Connection = { provider: string; type: string; connected: boolean; updatedAt: string };

const defaults: Connection[] = [
  { provider: 'twilio', type: 'telephony', connected: false, updatedAt: new Date().toISOString() },
  { provider: 'exotel', type: 'telephony', connected: false, updatedAt: new Date().toISOString() },
  { provider: 'salesforce', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
  { provider: 'zoho', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
  { provider: 'hubspot', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
];

export default function IntegrationsPage() {
  const [connections, setConnections] = useState<Connection[]>(defaults);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await apiGet<{ connections: Connection[] }>('/integrations');
        setConnections(response.connections);
      } catch {
        setStatus('Backend unavailable. Integration actions will update local state only.');
      }
    })();
  }, []);

  async function connect(provider: string) {
    try {
      const updated = await apiPost<Connection>(`/integrations/${provider}/connect`, { metadata: { connectedBy: 'dashboard-user' } });
      setConnections((prev) => prev.map((item) => (item.provider === provider ? updated : item)));
      setStatus(`${provider} connected.`);
    } catch {
      setConnections((prev) => prev.map((item) => (item.provider === provider ? { ...item, connected: true, updatedAt: new Date().toISOString() } : item)));
      setStatus(`${provider} connected locally (preview mode).`);
    }
  }

  async function disconnect(provider: string) {
    try {
      const updated = await apiPost<Connection>(`/integrations/${provider}/disconnect`);
      setConnections((prev) => prev.map((item) => (item.provider === provider ? updated : item)));
      setStatus(`${provider} disconnected.`);
    } catch {
      setConnections((prev) => prev.map((item) => (item.provider === provider ? { ...item, connected: false, updatedAt: new Date().toISOString() } : item)));
      setStatus(`${provider} disconnected locally (preview mode).`);
    }
  }

  return (
    <AppShell title="Telephony & CRM Integrations">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Connect Twilio/Exotel and CRM providers with real action buttons.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {connections.map((item) => (
            <div key={item.provider} className="rounded-lg border border-slate-700 p-3">
              <p className="font-medium capitalize">{item.provider}</p>
              <p className="text-xs text-slate-400">{item.type} · {item.connected ? 'Connected' : 'Disconnected'}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => connect(item.provider)} className="rounded bg-emerald-600 px-3 py-1 text-xs">Connect</button>
                <button onClick={() => disconnect(item.provider)} className="rounded bg-slate-700 px-3 py-1 text-xs">Disconnect</button>
              </div>
            </div>
          ))}
        </div>
        {status ? <p className="mt-4 text-xs text-emerald-400">{status}</p> : null}
      </div>
    </AppShell>
  );
}
