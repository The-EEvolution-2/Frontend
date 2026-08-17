'use client';

import React, { use } from 'react';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';
import { RESOURCE_CATEGORIES } from '@/constants/nestedResourcesData';
import { useAppSelector } from '@/hooks/useRedux';
import { Resource } from '@/types/resource';
import { notFound } from 'next/navigation';
import { FolderPlus } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { category } = resolvedParams;

  const categoryMeta = RESOURCE_CATEGORIES.find((c) => c.slug === category);

  if (!categoryMeta) {
    notFound();
  }

  return <CategoryPageContent category={category} categoryMeta={categoryMeta} />;
}

function CategoryPageContent({ category, categoryMeta }: { category: string; categoryMeta: { name: string; description: string } }) {
  const resources: Resource[] = useAppSelector((state) => state.resources.items);
  const categoryResources = resources.filter((r) => r.categorySlug === category);

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      <div className="text-xs font-mono text-stone-500">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <Link href="/resources" className="hover:underline">resources</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">{category}</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1 uppercase">
          {categoryMeta.name} ARCHIVE INDEX
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
          {categoryMeta.description}
        </p>
      </div>

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
    </div>
  );
}
