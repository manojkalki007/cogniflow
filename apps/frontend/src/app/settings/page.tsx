import { AppShell } from '@/components/layout/app-shell';

export default function SettingsPage() {
  return <AppShell title="Settings"><div className="rounded-xl border border-slate-800 bg-slate-900 p-5">Profile, org settings, API keys, notifications, security, webhook URLs and integration management.</div></AppShell>;
}
