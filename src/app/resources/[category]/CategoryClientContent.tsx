'use client';

import React from 'react';
import ResourceCard from '@/components/ResourceCard';
import { useAppSelector } from '@/hooks/useRedux';
import { Resource } from '@/types/resource';
import { FolderPlus } from 'lucide-react';
import AccessGuard from '@/components/AccessGuard';

export default function CategoryClientContent({
  category,
  categoryMeta,
}: {
  category: string;
  categoryMeta: { name: string; description: string };
}) {
  const resources: Resource[] = useAppSelector((state) => state.resources.items);
  const categoryResources = resources.filter((r) => r.categorySlug === category);

  return (
    <AccessGuard category={category}>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-stone-300 dark:border-stone-800 pb-2">
          <h2 className="text-sm font-bold font-mono text-stone-600 dark:text-stone-400 uppercase">
            Archived Entries in {categoryMeta.name}
          </h2>
          <span className="text-xs font-mono text-stone-500">[{categoryResources.length} ENTRIES]</span>
        </div>

        {categoryResources.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-stone-300 dark:border-stone-800 rounded space-y-2 font-mono">
            <FolderPlus className="w-8 h-8 mx-auto text-stone-400" />
            <h3 className="text-sm font-bold text-black dark:text-white uppercase">Nothing to Show</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No technical entries are published under {categoryMeta.name} yet. Use the Admin Panel to publish new entries to this category.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {categoryResources.map((res: Resource) => (
              <ResourceCard key={res.id || res._id} resource={res} />
            ))}
          </div>
        )}
      </div>
    </AccessGuard>
  );
}
