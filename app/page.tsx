"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { DitherShader } from "@/components/ui/dither-shader";
import { GlobeScene } from "@/components/globe/GlobeScene";

const heroFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ctaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function LandingPage() {
  return (
    <main
      className={`relative isolate bg-[#080B10] text-zinc-100 ${heroFont.className}`}
    >
      {/* ───────────────────────────────────────────────────────
          SECTION 1 — HERO  (full-height, product UI behind text)
      ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 z-0 axiom-atmosphere" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-screen opacity-[0.58]"
          style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
        >
          <DitherShader
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop"
            gridSize={7}
            ditherMode="bayer"
            colorMode="grayscale"
            invert={false}
            animated={false}
            animationSpeed={0.025}
            primaryColor="#0a0a0a"
            secondaryColor="#f5f5f5"
            threshold={0.55}
            className="h-full w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-screen opacity-[0.28]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        >
          <DitherShader
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2670&auto=format&fit=crop"
            gridSize={2}
            ditherMode="bayer"
            colorMode="grayscale"
            invert={false}
            animated={false}
            animationSpeed={0.02}
            primaryColor="#000000"
            secondaryColor="#f5f5f5"
            threshold={0.5}
            className="h-full w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-screen"
          style={{
            background:
              "linear-gradient(135deg, transparent calc(50% - 0.5px), rgba(8,11,16,0.45) 50%, transparent calc(50% + 0.5px))",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          <Spotlight
            className="-top-[34rem] left-1/2 h-[72rem] w-[72rem] -translate-x-1/2"
            fill="white"
          />
          <Spotlight
            className="top-[10%] -left-40 h-[50rem] w-[50rem]"
            fill="#a1a1aa"
          />
          <Spotlight
            className="top-[5%] -right-44 h-[40rem] w-[40rem]"
            fill="#71717a"
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-[7]">
          <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center px-8 sm:px-16 lg:px-24">
            <p className="text-[10px] tracking-[0.3em] text-zinc-300">AXIOM</p>
          </div>
        </div>

        {/* Fake product UI — blurred behind the headline */}
        <div className="absolute inset-0 z-[4] flex items-center justify-end pr-0 pointer-events-none">
          <div className="relative h-full w-[70%] sm:w-[64%] lg:w-[58%] opacity-85">
            <div
              className="absolute top-1/2 right-0 lg:right-[2%] -translate-y-1/2 w-[96%] lg:w-[92%] aspect-[4/3] overflow-hidden bg-transparent"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 62%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 62%, transparent 100%)",
              }}
            >
              <GlobeScene
                className="h-full min-h-0 rounded-none border-0"
                overlayStyle="white"
                interactive={false}
                showStars={false}
                cameraDistanceScale={1.28}
                transparentBackground
              />
            </div>
          </div>
          {/* Gradient mask over the right side ui to fade into the text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B10] via-[#080B10]/80 to-transparent" />
        </div>

        {/* Hero text — sits above the blurred UI */}
        <div className="relative z-[5] flex min-h-screen w-full max-w-3xl flex-col justify-center px-8 sm:px-16 lg:px-24 lg:ml-[5vw] xl:ml-[9vw] lg:-translate-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={`relative ${heroFont.className}`}
          >
            <div className="relative z-[2]">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
                Set the
                <br />
                <i>Standard.</i>
              </h1>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg">
                AI Agents for intelligent standardization platform.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/globe"
                  className={`rounded-none bg-white px-8 py-3.5 text-xs tracking-[0.08em] text-black transition hover:bg-zinc-100 ${ctaFont.className}`}
                >
                  ENTER AXIOM ↗
                </Link>
              </div>
            </div>
          </motion.div>
          <div className="absolute left-8 bottom-36 z-[6] flex items-center gap-2 text-xs tracking-[0.16em] text-zinc-100 sm:left-16 lg:left-24">
            <span>Powered by</span>
            <img
              src="/images/logos/backboardio-cropped.png"
              alt="Backboard.io logo"
              className="h-7 w-auto max-w-[150px] object-contain opacity-95 brightness-0 invert"
            />
          </div>
        </div>

      </section>

    </main>
  );
}
