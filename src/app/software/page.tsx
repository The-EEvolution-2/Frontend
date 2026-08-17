'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SOFTWARE_TOOLS } from '../../constants/softwareData';
import AccessGuard from '@/components/AccessGuard';

function SoftwareClientContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  // Map category param to AccessGuard rule category
  const guardCategory = categoryParam === 'downloads' ? 'downloads' : categoryParam === 'tutorial' ? 'tutorial' : 'downloads';

  return (
    <AccessGuard category={guardCategory}>
      <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-6 text-stone-900 dark:text-stone-100">
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-stone-500">
          <Link href="/" className="hover:underline">domain</Link>
          {' / '}
          <span className="text-black dark:text-white font-bold">software</span>
        </div>

        <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
            ENGINEERING SOFTWARE &amp; SIMULATION UTILITIES
          </h1>
          <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-0.5">
            INDEX OF VERIFIED ANALYSIS TOOLS, PCB CALCULATORS, FIRMWARE TELEMETRY LOGGERS, AND DIGITAL LOGIC SIMULATORS.
          </p>
        </div>

        {/* Software Tool List */}
        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {SOFTWARE_TOOLS.map((tool) => (
            <article key={tool.id} className="py-5 font-sans space-y-2">
              <div className="flex items-baseline justify-between text-xs font-mono text-stone-500">
                <span className="font-bold text-black dark:text-white">[{tool.category.toUpperCase()}]</span>
                <span>Version: {tool.version} | License: {tool.license}</span>
              </div>

              <h3 className="text-lg font-bold text-black dark:text-white">
                {tool.name}
              </h3>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {tool.description}
              </p>

              <div className="text-xs font-mono text-stone-500 flex flex-wrap gap-4 items-center justify-between pt-2">
                <Link href={tool.docUrl} className="underline text-blue-900 dark:text-blue-400">
                  Documentation &amp; Theoretical Spec &rarr;
                </Link>
                <a href={tool.downloadUrl} className="underline text-blue-900 dark:text-blue-400 font-bold">
                  Download Binary / Script Archive &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AccessGuard>
  );
}

export default function SoftwarePage() {
  return (
    <Suspense fallback={
      <div className="py-16 text-center font-mono text-xs text-stone-500">
        Loading Software Utilities...
      </div>
    }>
      <SoftwareClientContent />
    </Suspense>
  );
}
