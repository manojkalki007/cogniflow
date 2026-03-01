import Link from 'next/link';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Agents', '/agents'],
  ['Integrations', '/integrations'],
  ['Campaigns', '/campaigns'],
  ['Billing', '/billing'],
  ['Public API', '/api-docs'],
  ['Settings', '/settings'],
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 p-6">
      <h1 className="text-xl font-semibold text-white">COGNIFLOW</h1>
      <p className="mt-1 text-xs text-slate-400">AI Calling Agent Platform</p>
      <nav className="mt-8 space-y-2">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
