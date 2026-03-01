'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function SettingsPage() {
  const [apiKeyName, setApiKeyName] = useState('Production Key');
  const [webhookUrl, setWebhookUrl] = useState('https://example.com/webhooks/calls');
  const [keys, setKeys] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  function createKey() {
    const key = `cgf_${Math.random().toString(36).slice(2, 16)}`;
    setKeys((prev) => [key, ...prev]);
    setMessage(`API key created for ${apiKeyName}. Store it securely.`);
  }

  function saveWebhook() {
    setMessage(`Webhook saved: ${webhookUrl}`);
  }

  return (
    <AppShell title="Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">API Key Management</h3>
          <input className="mt-3 w-full rounded bg-slate-800 p-2" value={apiKeyName} onChange={(e) => setApiKeyName(e.target.value)} />
          <button onClick={createKey} className="mt-3 rounded bg-accent px-3 py-2 text-sm">Create Key</button>
          <div className="mt-3 space-y-1 text-xs text-slate-300">
            {keys.map((key) => <p key={key}>{key}</p>)}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Webhook URL</h3>
          <input className="mt-3 w-full rounded bg-slate-800 p-2" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
          <button onClick={saveWebhook} className="mt-3 rounded bg-emerald-600 px-3 py-2 text-sm">Save Webhook</button>
        </section>
      </div>
      {message ? <p className="mt-4 text-xs text-emerald-400">{message}</p> : null}
    </AppShell>
  );
}
