'use client';

import { motion } from 'framer-motion';
import { GlobeScene } from '../components/globe/GlobeScene';
import { RouteTransitionOverlay } from '../components/transitions/RouteTransitionOverlay';
import { useRouteTransition } from '../lib/transitions';
import { useMapStore } from '../stores/useMapStore';
import Link from 'next/link';

export default function LandingPage() {
  const { transitionTo } = useRouteTransition();
  const selectCountry = useMapStore((state) => state.selectCountry);

  const handleCanadaSelect = () => {
    transitionTo({
      path: '/canada',
      view: 'canada',
      countryCode: 'CA',
    });
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <RouteTransitionOverlay />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="h-full w-full"
      >
        <GlobeScene
          className="h-screen min-h-screen w-screen rounded-none border-0"
          onCountrySelect={selectCountry}
          onCanadaSelect={handleCanadaSelect}
        />
      </motion.div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4 md:p-6">
        <div className="max-w-4xl space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Academic Atlas Canada
          </h1>
          <p className="max-w-3xl text-sm text-slate-200 md:text-lg">
            A cinematic world view that transitions into Canadian academic intelligence
          </p>
          <nav className="pointer-events-auto flex items-center gap-4 text-lg font-medium text-slate-300">
            <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
              World
            </Link>
            <Link href="/canada" className="underline-offset-4 hover:text-white hover:underline">
              Canada
            </Link>
          </nav>
        </div>
      </header>

      <div className="pointer-events-none absolute bottom-4 right-4 z-20 md:bottom-6 md:right-6">
        <aside className="pointer-events-auto w-[min(92vw,320px)] space-y-4 rounded-xl border border-white/10 bg-black/55 p-5 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Start Here</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Click the Canada target on the 3D globe or use the CTA to enter a
            Canada-focused map view.
          </p>
          <button
            type="button"
            onClick={handleCanadaSelect}
            className="w-full rounded-md border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white"
          >
            Explore Canada
          </button>
        </aside>
      </div>
    </main>
  );
}
