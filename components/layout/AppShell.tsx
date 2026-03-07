import type { ReactNode } from 'react';
import Link from 'next/link';

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1260px] flex-col gap-5 px-4 py-6 md:px-6">
      <header className="space-y-3">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-4xl text-sm text-slate-300 md:text-lg">{subtitle}</p>
        ) : null}
        <nav className="flex items-center gap-4 text-lg font-medium text-slate-300">
          <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
            World
          </Link>
          <Link href="/canada" className="underline-offset-4 hover:text-white hover:underline">
            Canada
          </Link>
        </nav>
      </header>

      <section className="flex-1">{children}</section>
    </main>
  );
}
