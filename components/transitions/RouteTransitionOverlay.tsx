'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMapStore } from '../../stores/useMapStore';

export function RouteTransitionOverlay() {
  const transition = useMapStore((state) => state.transition);

  return (
    <AnimatePresence>
      {transition.active ? (
        <motion.div
          key="route-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-0 z-50 bg-[#030611]"
        />
      ) : null}
    </AnimatePresence>
  );
}
