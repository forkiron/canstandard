'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCHOOLS } from '../lib/constants';
import type { SchoolDatum } from '../lib/types';

interface SearchBarProps {
  onSelect: (school: SchoolDatum) => void;
  className?: string;
}

export function SearchBar({ onSelect, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSchools = query
    ? SCHOOLS.filter((school) =>
        school.name.toLowerCase().includes(query.toLowerCase()) ||
        school.city.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a school..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-md shadow-lg shadow-black/20"
        />
      </div>

      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-slate-900/95 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {filteredSchools.length > 0 ? (
              <ul className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                {filteredSchools.map((school) => (
                  <li key={school.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setIsOpen(false);
                        onSelect(school);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/80 transition-colors flex flex-col gap-1"
                    >
                      <span className="font-medium text-slate-200 text-sm">
                        {school.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {school.city}, {school.provinceSlug.toUpperCase()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">
                No schools found for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
