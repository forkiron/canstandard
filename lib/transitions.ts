'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { AppView } from './types';
import { useMapStore } from '../stores/useMapStore';

interface TransitionRequest {
  path: string;
  view: AppView;
  countryCode?: string;
}

export function useRouteTransition(durationMs = 620) {
  const router = useRouter();
  const routeTimeoutRef = useRef<number | null>(null);
  const overlayTimeoutRef = useRef<number | null>(null);
  const startTransition = useMapStore((state) => state.startTransition);
  const endTransition = useMapStore((state) => state.endTransition);
  const setView = useMapStore((state) => state.setView);
  const selectCountry = useMapStore((state) => state.selectCountry);

  const transitionTo = useCallback(
    ({ path, view, countryCode }: TransitionRequest) => {
      if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
      if (overlayTimeoutRef.current) window.clearTimeout(overlayTimeoutRef.current);

      if (countryCode) selectCountry(countryCode);
      startTransition(view);

      routeTimeoutRef.current = window.setTimeout(() => {
        setView(view);
        router.push(path);

        overlayTimeoutRef.current = window.setTimeout(() => {
          endTransition();
        }, 220);
      }, durationMs);
    },
    [durationMs, endTransition, router, selectCountry, setView, startTransition]
  );

  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
      if (overlayTimeoutRef.current) window.clearTimeout(overlayTimeoutRef.current);
    };
  }, []);

  return { transitionTo };
}
