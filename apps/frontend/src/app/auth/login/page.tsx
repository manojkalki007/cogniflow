export default function LoginPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-xl font-semibold">Login</h1>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded bg-slate-800 p-2" placeholder="Email" />
        <input className="w-full rounded bg-slate-800 p-2" placeholder="Password" type="password" />
        <button className="w-full rounded bg-accent p-2 text-sm font-medium">Sign In</button>
        <button className="w-full rounded border border-slate-700 p-2 text-sm">Continue with Google</button>
      </div>
    </main>
  );
}
