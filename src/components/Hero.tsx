'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RESOURCE_CATEGORIES } from '../constants/nestedResourcesData';

export default function Hero() {
  return (
    <div className="w-full relative min-h-[1400px] sm:min-h-[1500px] lg:min-h-[1600px] py-6 font-sans">
      {/* Telemetry SVG Lines Background Canvas */}
      <svg className="absolute top-0 left-0 w-full h-[1800px] pointer-events-none z-0 opacity-25" preserveAspectRatio="none" viewBox="0 0 1440 1800" xmlns="http://www.w3.org/2000/svg">
        <path className="telemetry-line" d="M -100,200 C 300,100 500,600 800,400 C 1100,200 1300,800 1600,600" fill="none" stroke="currentColor" strokeWidth="1" />
        <path className="telemetry-line" d="M -100,600 C 200,800 400,300 700,500 C 1000,700 1200,400 1500,900" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path className="telemetry-line" d="M 200,100 C 100,500 600,700 800,1100 C 1000,1500 1200,1300 1500,1800" fill="none" stroke="currentColor" strokeDasharray="4,4" strokeWidth="0.5" />
      </svg>

      {/* Hero Area (Floating Elements) */}
      <div className="relative lg:absolute top-4 lg:top-12 left-0 lg:left-[5%] w-full lg:w-[50%] z-20 animate-float-slow">
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-black dark:text-white leading-[1.15] tracking-tight">
            Electrical Engineering,<br />Embedded Systems &amp;<br />Circuit Telemetry<br />Archive
          </h1>

          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-light leading-relaxed max-w-md">
            EEvolution 2.0 serves as a technical reference portal containing peer-contributed documentation, hardware schematic analysis, and micro-controller firmware guidelines.
          </p>

          <div className="flex flex-col gap-4 pt-2 font-mono text-xs sm:text-sm">
            <Link href="/resources" className="inline-flex items-center gap-3 text-black dark:text-white font-medium group">
              <span className="w-8 h-[1px] bg-black dark:bg-white group-hover:w-12 transition-all duration-300" />
              <span>Index of Technical Resources</span>
            </Link>

            <Link href="/projects" className="inline-flex items-center gap-3 text-black dark:text-white font-medium group">
              <span className="w-8 h-[1px] bg-black dark:bg-white group-hover:w-12 transition-all duration-300" />
              <span>System Project Repositories</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Frame 1 (Monochrome Telemetry Setup) */}
      <div className="relative lg:absolute top-8 lg:top-8 right-0 lg:right-[3%] w-full lg:w-[42%] z-10 animate-float-medium mt-6 lg:mt-0">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl lg:rotate-3 border border-stone-200 dark:border-stone-800">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10" />
          <div className="relative h-64 sm:h-80 lg:h-96 w-full">
            <Image
              src="/lab_banner.jpg"
              alt="Monochrome EE Telemetry Workbench"
              fill
              className="object-cover filter grayscale contrast-125"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl z-20 border border-stone-200 dark:border-stone-800">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-black dark:text-white m-0 font-medium">
              FIG 1.0: EE TELEMETRY TEST WORKBENCH SETUP
            </p>
          </div>
        </div>
      </div>

      {/* Floating Info Card */}
      <div className="relative lg:absolute top-[480px] lg:top-[520px] left-0 lg:left-[52%] w-full lg:w-[32%] z-30 animate-float-fast mt-6 lg:mt-0">
        <div className="bg-stone-900 dark:bg-stone-100 text-white dark:text-black p-6 sm:p-8 rounded-2xl shadow-2xl lg:-rotate-2 space-y-3 border border-stone-800 dark:border-stone-200">
          <span className="material-symbols-outlined text-4xl font-light block">memory</span>
          <h3 className="font-serif text-xl sm:text-2xl font-light">Micro-controller Guidelines</h3>
          <p className="text-xs sm:text-sm font-light text-stone-300 dark:text-stone-700 leading-relaxed">
            Updated documentation on firmware optimization and telemetry integration for robust embedded systems.
          </p>
        </div>
      </div>

      {/* Knowledge Clusters (Organic Cluster Map) */}
      <div className="relative lg:absolute top-[750px] lg:top-[780px] left-0 w-full z-20 mt-12 lg:mt-0">
        <h2 className="text-center font-serif text-2xl sm:text-3xl text-black dark:text-white font-light mb-10 tracking-wide uppercase">
          Knowledge Clusters
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto px-4">
          {RESOURCE_CATEGORIES.map((cat, idx) => {
            const floatAnimations = ['animate-float-medium', 'animate-float-slow', 'animate-float-fast'];
            const animClass = floatAnimations[idx % 3];

            return (
              <Link
                key={cat.slug}
                href={`/resources/${cat.slug}`}
                className={`w-36 h-36 sm:w-44 sm:h-44 bg-white dark:bg-stone-900 rounded-full shadow-lg flex items-center justify-center text-center p-4 border border-stone-200 dark:border-stone-800 hover:scale-110 hover:shadow-2xl transition-all duration-300 ${animClass} group`}
              >
                <span className="font-mono text-xs sm:text-sm text-black dark:text-white font-light group-hover:font-semibold transition-all">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
