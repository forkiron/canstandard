'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackboardQuestionBox from '../../components/BackboardQuestionBox';
import { AppShell } from '../../components/layout/AppShell';
import { CanadaMap } from '../../components/map/CanadaMap';
import { RouteTransitionOverlay } from '../../components/transitions/RouteTransitionOverlay';
import { useRouteTransition } from '../../lib/transitions';
import { useMapStore } from '../../stores/useMapStore';

export default function CanadaPage() {
  const { transitionTo } = useRouteTransition(520);
  const setView = useMapStore((state) => state.setView);
  const selectCountry = useMapStore((state) => state.selectCountry);

  useEffect(() => {
    setView('canada');
    selectCountry('CA');
  }, [setView, selectCountry]);

  return (
    <AppShell
      title="Canada Academic Map"
      subtitle="Province intensity and school overlays"
    >
      <RouteTransitionOverlay />
      <BackboardQuestionBox />
      <motion.section
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-300">
            Starter map view centered on Canada. Attach province and school route
            navigation from layer click handlers.
          </p>
          <button
            type="button"
            onClick={() =>
              transitionTo({
                path: '/',
                view: 'world',
              })
            }
            className="rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            Back To Globe
          </button>
        </div>

        <CanadaMap />
      </motion.section>
    </AppShell>
  );
}
