'use client';

import { motion } from 'framer-motion';
import { GlobeScene } from '../components/globe/GlobeScene';
import { RouteTransitionOverlay } from '../components/transitions/RouteTransitionOverlay';
import { useRouteTransition } from '../lib/transitions';
import { useMapStore } from '../stores/useMapStore';

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

      <button
        type="button"
        onClick={handleCanadaSelect}
        className="absolute top-6 right-6 z-10 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
      >
        View Canada →
      </button>
    </main>
  );
}
