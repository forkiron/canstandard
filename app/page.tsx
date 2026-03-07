'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { TestAnalyzerForm } from '@/components/analyzer/TestAnalyzerForm';
import { TestAnalyzerResult } from '@/components/analyzer/TestAnalyzerResult';
import { cn } from '@/lib/utils';
import { Scales } from '@/components/ui/scales';
import { Spotlight } from '@/components/ui/spotlight';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

interface AnalysisResult {
  estimatedDifficulty: number;
  adjustmentFactor: number;
  rationale: string;
  curriculumAlignment?: string;
  questionStyle?: string;
  questionCount?: number;
}

export default function LandingPage() {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!isAnalyzerOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAnalyzerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isAnalyzerOpen]);

  const verticalMask = {
    maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
  } as const;

  const horizontalMask = {
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  } as const;

  return (
    <main className={`relative isolate min-h-screen overflow-hidden text-zinc-100 ${displayFont.className}`}>
      <div className="pointer-events-none absolute inset-0 z-0 axiom-atmosphere" />
      <div className="pointer-events-none absolute inset-0 z-0 axiom-stars opacity-30" />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1] select-none opacity-35 [background-size:42px_42px]',
          '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <Spotlight className="-top-[34rem] left-1/2 h-[72rem] w-[72rem] -translate-x-1/2" fill="white" />
        <Spotlight className="top-[18%] -left-40 h-[40rem] w-[40rem]" fill="#93c5fd" />
        <Spotlight className="top-[8%] -right-44 h-[40rem] w-[40rem]" fill="#a5b4fc" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-95">
        <div
          className="absolute -inset-y-[18%] left-3 h-[136%] w-10 sm:left-5"
          style={verticalMask}
        >
          <Scales size={8} className="rounded-lg" />
        </div>
        <div
          className="absolute -inset-y-[18%] right-3 h-[136%] w-10 sm:right-5"
          style={verticalMask}
        >
          <Scales size={8} className="rounded-lg" />
        </div>
        <div
          className="absolute -inset-x-[12%] top-3 h-10 w-[124%] sm:top-5"
          style={horizontalMask}
        >
          <Scales size={8} className="rounded-lg" />
        </div>
        <div
          className="absolute -inset-x-[12%] bottom-3 h-10 w-[124%] sm:bottom-5"
          style={horizontalMask}
        >
          <Scales size={8} className="rounded-lg" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[980px] flex-col items-center justify-center px-4 py-16 text-center sm:px-8"
      >
        <section className="w-full">
          <p className={`mb-4 text-xs tracking-[0.22em] text-zinc-400 ${monoFont.className}`}>AXIOM</p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl md:text-6xl">
            AI agents for standardization
          </h1>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/globe"
              className={`rounded-md border border-white/15 bg-white px-7 py-3 text-xs font-medium tracking-[0.12em] text-black transition hover:bg-zinc-100 ${monoFont.className}`}
            >
              ENTER AXIOM
            </Link>
          </div>
        </section>
      </motion.div>

      <button
        type="button"
        onClick={() => setIsAnalyzerOpen((open) => !open)}
        className={`fixed right-0 top-1/2 z-[60] -translate-y-1/2 rounded-l-xl border border-r-0 border-white/15 bg-zinc-950/95 px-3 py-5 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-200 shadow-xl backdrop-blur-sm transition hover:bg-zinc-900 ${monoFont.className}`}
      >
        {isAnalyzerOpen ? 'Close Analyzer' : 'Open Analyzer'}
      </button>

      <AnimatePresence>
        {isAnalyzerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close analyzer overlay"
              onClick={() => setIsAnalyzerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: 520, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 520, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed right-2 top-1/2 z-50 max-h-[92vh] w-[min(44rem,calc(100vw-1rem))] -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-[#05070de8] p-4 shadow-2xl backdrop-blur-xl sm:right-4 sm:w-[min(48rem,calc(100vw-2rem))] sm:p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className={`text-[11px] uppercase tracking-[0.2em] text-zinc-500 ${monoFont.className}`}>AXIOM ANALYZER</p>
                  <h2 className="mt-1 text-2xl font-semibold text-zinc-100">AI Test Evaluator</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnalyzerOpen(false)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              {!analysisResult ? (
                <TestAnalyzerForm onResult={setAnalysisResult} />
              ) : (
                <TestAnalyzerResult
                  result={analysisResult}
                  onReset={() => setAnalysisResult(null)}
                />
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
