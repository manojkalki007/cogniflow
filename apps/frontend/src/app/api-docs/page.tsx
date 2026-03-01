import { AppShell } from '@/components/layout/app-shell';

export default function ApiDocsPage() {
  return <AppShell title="Public API"><div className="rounded-xl border border-slate-800 bg-slate-900 p-5">REST endpoints for agents, campaigns, calls, analytics, webhooks. Swagger served from backend /api/docs.</div></AppShell>;
}
