import { AppShell } from '@/components/layout/app-shell';

export default function AgentsPage() {
  return (
    <AppShell title="Agent Builder">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Create Agent</h3>
          <p className="mt-2 text-sm text-slate-400">Prompt-based creation + templates: sales, booking, counselor, support.</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>LLM: Gemini 2 Flash / GPT-4o</li>
            <li>STT: Deepgram Nova-3 / Smallest Pulse</li>
            <li>TTS: Sarvam Bulbul v2 / Smallest Lightning</li>
            <li>Interrupt sensitivity + voicemail detection + call transfer</li>
          </ul>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-medium">Real-time Test Console</h3>
          <p className="mt-2 text-sm text-slate-400">Simulated call UI, streaming transcript, latency and audio playback hooks.</p>
          <div className="mt-4 rounded-lg bg-slate-800 p-3 text-xs">Transcript stream placeholder...</div>
        </section>
      </div>
    </AppShell>
  );
}
