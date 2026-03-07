'use client';

import { create } from 'zustand';
import type { AppView, TransitionState } from '../lib/types';

interface MapStoreState {
  view: AppView;
  selectedCountryCode: string | null;
  selectedProvinceSlug: string | null;
  selectedSchoolId: string | null;
  transition: TransitionState;
  setView: (view: AppView) => void;
  selectCountry: (countryCode: string | null) => void;
  selectProvince: (slug: string | null) => void;
  selectSchool: (id: string | null) => void;
  startTransition: (target: AppView) => void;
  endTransition: () => void;
}

export const useMapStore = create<MapStoreState>((set) => ({
  view: 'world',
  selectedCountryCode: null,
  selectedProvinceSlug: null,
  selectedSchoolId: null,
  transition: {
    active: false,
    target: null,
  },

  setView: (view) => set({ view }),
  selectCountry: (countryCode) => set({ selectedCountryCode: countryCode }),
  selectProvince: (slug) => set({ selectedProvinceSlug: slug }),
  selectSchool: (id) => set({ selectedSchoolId: id }),

  startTransition: (target) =>
    set({
      transition: {
        active: true,
        target,
      },
    }),

  endTransition: () =>
    set({
      transition: {
        active: false,
        target: null,
      },
    }),
}));
