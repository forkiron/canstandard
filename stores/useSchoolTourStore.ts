'use client';

import { create } from 'zustand';

interface SchoolTourState {
  schoolIds: string[];
  currentIndex: number;
  source: string | null;
  setTour: (schoolIds: string[], source?: string | null) => void;
  addSchools: (schoolIds: string[], source?: string | null) => void;
  clearTour: () => void;
  nextSchool: () => void;
  prevSchool: () => void;
  setIndex: (index: number) => void;
}

function uniqueSchoolIds(input: string[]) {
  return Array.from(new Set(input.filter((value) => typeof value === 'string' && value.trim().length > 0)));
}

export const useSchoolTourStore = create<SchoolTourState>((set) => ({
  schoolIds: [],
  currentIndex: 0,
  source: null,
  setTour: (schoolIds, source = null) =>
    set(() => {
      const unique = uniqueSchoolIds(schoolIds);
      return {
        schoolIds: unique,
        currentIndex: 0,
        source,
      };
    }),
  addSchools: (schoolIds, source = null) =>
    set((state) => {
      const merged = uniqueSchoolIds([...state.schoolIds, ...schoolIds]);
      return {
        schoolIds: merged,
        currentIndex: state.currentIndex >= merged.length ? Math.max(0, merged.length - 1) : state.currentIndex,
        source: source ?? state.source,
      };
    }),
  clearTour: () =>
    set(() => ({
      schoolIds: [],
      currentIndex: 0,
      source: null,
    })),
  nextSchool: () =>
    set((state) => {
      if (state.schoolIds.length === 0) return state;
      return {
        currentIndex: (state.currentIndex + 1) % state.schoolIds.length,
      };
    }),
  prevSchool: () =>
    set((state) => {
      if (state.schoolIds.length === 0) return state;
      return {
        currentIndex: (state.currentIndex - 1 + state.schoolIds.length) % state.schoolIds.length,
      };
    }),
  setIndex: (index) =>
    set((state) => {
      if (state.schoolIds.length === 0) return state;
      const bounded = Math.max(0, Math.min(state.schoolIds.length - 1, Math.floor(index)));
      return { currentIndex: bounded };
    }),
}));
