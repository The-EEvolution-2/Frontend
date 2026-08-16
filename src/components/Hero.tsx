import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-6 font-serif border-b border-stone-300 dark:border-stone-800 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
        <div className="md:col-span-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-3 leading-tight">
            Electrical Engineering, Embedded Systems &amp; Circuit Telemetry Archive
          </h1>

          <p className="text-sm text-stone-800 dark:text-stone-300 leading-relaxed mb-4">
            EEvolution 2.0 serves as a technical reference portal containing peer-contributed documentation, hardware schematic analysis, micro-controller firmware guidelines, and dynamic project repositories maintained by the administration team.
          </p>

          <div className="flex gap-6 text-xs font-mono">
            <Link href="/resources" className="underline text-blue-900 dark:text-blue-400">
              &rarr; Index of Technical Resources
            </Link>
            <Link href="/projects" className="underline text-blue-900 dark:text-blue-400">
              &rarr; System Project Repositories
            </Link>
          </div>
        </div>

        {/* Hero Visual Image Banner Frame */}
        <div className="md:col-span-4 relative h-48 sm:h-56 rounded border border-stone-300 dark:border-stone-800 overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src="/lab_banner.jpg"
            alt="Electrical Engineering Lab Workbench"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white font-mono text-[10px] p-1.5 px-2">
            FIG 1.0: EE TELEMETRY TEST WORKBENCH SETUP
          </div>
        </div>
      </div>
    </section>
  );
}
