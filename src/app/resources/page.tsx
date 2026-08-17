'use client';

import React from 'react';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';
import { RESOURCE_CATEGORIES } from '@/constants/nestedResourcesData';
import { useAppSelector } from '@/hooks/useRedux';
import { Resource } from '@/types/resource';
import { FolderPlus } from 'lucide-react';

export default function ResourcesIndexPage() {
  const resources: Resource[] = useAppSelector((state) => state.resources.items);

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-8">
      {/* Breadcrumb Path */}
      <div className="text-xs font-mono text-stone-500">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">resources</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">
          TECHNICAL RESOURCES INDEX &amp; ARCHIVE DIRECTORY
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
          CATEGORIZED ARCHIVE OF ELECTROMAGNETIC SPECIFICATIONS, EXPERIMENTAL TELEMETRY, AND REFERENCE GUIDES.
        </p>
      </div>

      {/* 7 Categorized Cards with Distinct Primary & Secondary Color Shades */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold font-mono text-stone-600 dark:text-stone-400 uppercase">
          Resource Categories Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-serif">
          {RESOURCE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resources/${cat.slug}`}
              className={`p-5 border ${cat.borderLight} ${cat.borderDark} ${cat.bgLight} ${cat.bgDark} rounded-lg hover:shadow-md transition-all block space-y-2 group`}
            >
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className={`font-bold uppercase ${cat.accentTextLight} ${cat.accentTextDark}`}>
                  {cat.name}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${cat.badgeBgLight} ${cat.badgeBgDark} ${cat.accentTextLight} ${cat.accentTextDark}`}>
                  Category &rarr;
                </span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* All Available Resources Index */}
      <section className="space-y-4 pt-4 border-t border-stone-300 dark:border-stone-800">
        <div className="flex justify-between items-baseline border-b border-stone-300 dark:border-stone-800 pb-2">
          <h2 className="text-base font-bold text-black dark:text-white">
            ALL ARCHIVED DOCUMENTATION ENTRIES
          </h2>
          <span className="text-xs font-mono text-stone-500">[{resources.length} TOTAL ENTRIES]</span>
        </div>

        {resources.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-stone-300 dark:border-stone-800 rounded space-y-2 font-mono">
            <FolderPlus className="w-8 h-8 mx-auto text-stone-400" />
            <h3 className="text-sm font-bold text-black dark:text-white uppercase">Nothing to Show</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No technical resources have been published in the database yet. Use the Admin Control Panel to add new topics.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {resources.map((res: Resource) => (
              <ResourceCard key={res.id || res._id} resource={res} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
