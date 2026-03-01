'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { apiGet, apiPost } from '@/lib/api';

type Catalog = {
  llm: { id: string; label: string }[];
  stt: { id: string; label: string }[];
  tts: { id: string; label: string }[];
  templates: string[];
};

type Agent = { id: string; name: string; llmProvider: string; sttProvider: string; ttsProvider: string };

const defaultCatalog: Catalog = {
  llm: [
    { id: 'gemini-2-flash', label: 'Gemini 2 Flash' },
    { id: 'gpt-4o', label: 'GPT-4o' },
  ],
  stt: [
    { id: 'deepgram-nova-3', label: 'Deepgram Nova-3' },
    { id: 'smallest-pulse', label: 'Smallest AI Pulse' },
  ],
  tts: [
    { id: 'sarvam-bulbul-v2', label: 'Sarvam Bulbul v2' },
    { id: 'smallest-lightning', label: 'Smallest AI Lightning' },
  ],
  templates: ['sales-outreach', 'booking-agent', 'student-counselor', 'customer-support'],
};

export default function AgentsPage() {
  const [catalog, setCatalog] = useState<Catalog>(defaultCatalog);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    name: 'Sales Agent',
    template: 'sales-outreach',
    llmProvider: 'gemini-2-flash',
    sttProvider: 'deepgram-nova-3',
    ttsProvider: 'sarvam-bulbul-v2',
    voiceSpeed: 1,
    voicePitch: 1,
    interruptSensitivity: 0.65,
    maxCallDurationSec: 900,
    voicemailDetection: true,
    transferTarget: '',
    greetingMessage: 'Hello, this is Cogniflow virtual assistant.',
    systemPrompt: 'You are a high-conversion outreach caller.',
  });

  useEffect(() => {
    (async () => {
      try {
        const [catalogResp, agentsResp] = await Promise.all([apiGet<Catalog>('/agents/catalog'), apiGet<Agent[]>('/agents')]);
        setCatalog(catalogResp);
        setAgents(agentsResp);
      } catch {
        setStatus('Backend unavailable. Running in local-only preview mode.');
      }
    })();
  }, []);

  async function createAgent() {
    setStatus('Creating agent...');
    try {
      const created = await apiPost<Agent>('/agents', form as unknown as Record<string, unknown>);
      setAgents((prev) => [created, ...prev]);
      setStatus(`Agent created: ${created.name}`);
    } catch {
      const localAgent: Agent = {
        id: `local_${Date.now()}`,
        name: form.name,
        llmProvider: form.llmProvider,
        sttProvider: form.sttProvider,
        ttsProvider: form.ttsProvider,
      };
      setAgents((prev) => [localAgent, ...prev]);
      setStatus('Backend unavailable. Agent saved locally in UI state.');
    }
  }

  return (
    <AppShell title="Agent Builder">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Build AI Agent</h3>
          <div className="mt-4 grid gap-3">
            <input className="rounded bg-slate-800 p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select className="rounded bg-slate-800 p-2" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })}>
              {catalog.templates.map((template) => <option key={template}>{template}</option>)}
            </select>
            <select className="rounded bg-slate-800 p-2" value={form.llmProvider} onChange={(e) => setForm({ ...form, llmProvider: e.target.value })}>
              {catalog.llm.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <select className="rounded bg-slate-800 p-2" value={form.sttProvider} onChange={(e) => setForm({ ...form, sttProvider: e.target.value })}>
              {catalog.stt.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <select className="rounded bg-slate-800 p-2" value={form.ttsProvider} onChange={(e) => setForm({ ...form, ttsProvider: e.target.value })}>
              {catalog.tts.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <button onClick={createAgent} className="rounded bg-accent px-3 py-2 text-sm font-semibold">Create Agent</button>
            {status ? <p className="text-xs text-emerald-400">{status}</p> : null}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Created Agents</h3>
          <div className="mt-3 space-y-2">
            {agents.length === 0 ? <p className="text-sm text-slate-400">No agents yet. Use the form to create one.</p> : null}
            {agents.map((agent) => (
              <div key={agent.id} className="rounded-lg border border-slate-700 p-3 text-sm">
                <p className="font-medium">{agent.name}</p>
                <p className="text-slate-400">{agent.llmProvider} · {agent.sttProvider} · {agent.ttsProvider}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
