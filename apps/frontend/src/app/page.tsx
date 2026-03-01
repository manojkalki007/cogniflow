import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h1 className="text-3xl font-bold">COGNIFLOW</h1>
        <p className="mt-2 text-slate-400">Production-grade AI Calling Agent SaaS</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/auth/login" className="rounded-md bg-accent px-4 py-2 text-sm font-medium">Login</Link>
          <Link href="/dashboard" className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium">Open Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
