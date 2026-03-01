'use client';

import { useState } from 'react';
import { apiPost } from '@/lib/api';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: 'Admin User',
    organizationName: 'Cogniflow Inc',
    email: 'admin@cogniflow.ai',
    password: 'Password@123',
  });
  const [status, setStatus] = useState('');

  async function signup() {
    setStatus('Creating account...');
    try {
      await apiPost('/auth/signup', form as unknown as Record<string, unknown>);
      setStatus('Account created. Check inbox for email verification (stub).');
    } catch {
      setStatus('Signup API unavailable. Backend may not be running.');
    }
  }

  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-xl font-semibold">Create Account</h1>
      <div className="mt-4 space-y-2">
        <input className="w-full rounded bg-slate-800 p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded bg-slate-800 p-2" value={form.organizationName} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} />
        <input className="w-full rounded bg-slate-800 p-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded bg-slate-800 p-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button onClick={signup} className="w-full rounded bg-accent p-2 text-sm font-medium">Sign Up</button>
        {status ? <p className="text-xs text-emerald-400">{status}</p> : null}
      </div>
    </main>
  );
}
