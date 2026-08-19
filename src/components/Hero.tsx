import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cpu, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="font-sans border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md mb-8 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Main Hero Content (7 Grid Span) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight leading-[1.15]">
            Electrical Engineering, Embedded Systems &amp; Circuit Telemetry
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
            EEvolution 2.0 serves as the primary academic reference portal containing peer-contributed documentation, high-frequency hardware schematics, firmware guidelines, and verified practice problem sets.
          </p>

          {/* Metric Badges Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2 max-w-xs font-mono text-xs border-y border-stone-200 dark:border-stone-800 py-3">
            <div>
              <span className="block font-bold text-base text-black dark:text-white">100%</span>
              <span className="text-[10px] text-stone-500 uppercase">Verified Spec</span>
            </div>
            <div>
              <span className="block font-bold text-base text-black dark:text-white">300+</span>
              <span className="text-[10px] text-stone-500 uppercase">EE Repositories</span>
            </div>
          </div>

          {/* Solid Vibrant CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
            <Link
              href="/resources"
              className="px-5 py-3 btn-primary-vibrant font-bold uppercase rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-md"
            >
              <span>Explore Technical Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/projects"
              className="px-5 py-3 border-2 border-primary-vibrant text-primary-vibrant bg-white dark:bg-stone-900 font-bold uppercase rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <span>Hardware Repositories</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase (5 Grid Span) */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-800 shadow-xl bg-stone-100 dark:bg-stone-900">
            <Image
              src="/lab_banner.jpg"
              alt="Electrical Engineering Telemetry Workbench"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Visual Overlay Card */}
            <div className="absolute bottom-3 left-3 right-3 bg-stone-900/90 backdrop-blur-sm border border-stone-700 text-white font-mono text-[11px] p-3 rounded-xl flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary-vibrant flex-shrink-0" />
                <span className="font-bold uppercase tracking-wide">FIG 1.0: EE TELEMETRY WORKBENCH</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded badge-primary-vibrant font-bold">
                LIVE SPEC
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
