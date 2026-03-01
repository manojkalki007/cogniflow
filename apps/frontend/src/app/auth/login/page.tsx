'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiPost } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('owner@cogniflow.ai');
  const [password, setPassword] = useState('Password@123');
  const [status, setStatus] = useState('');

  async function onLogin() {
    setStatus('Logging in...');
    try {
      const data = await apiPost<{ accessToken: string }>('/auth/login', { email, password });
      setStatus(`Logged in. Token received (${data.accessToken.slice(0, 14)}...)`);
    } catch {
      setStatus('Login API unavailable. Configure backend and retry.');
    }
  }

  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-xl font-semibold">Login</h1>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded bg-slate-800 p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded bg-slate-800 p-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button onClick={onLogin} className="w-full rounded bg-accent p-2 text-sm font-medium">Sign In</button>
        <button className="w-full rounded border border-slate-700 p-2 text-sm">Continue with Google</button>
        <p className="text-xs text-slate-400">Need account? <Link href="/auth/signup" className="text-accent">Sign up</Link></p>
        {status ? <p className="text-xs text-emerald-400">{status}</p> : null}
      </div>
    </main>
  );
}
