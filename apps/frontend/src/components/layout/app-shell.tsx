import { ReactNode } from 'react';
import { Sidebar } from './sidebar';

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
