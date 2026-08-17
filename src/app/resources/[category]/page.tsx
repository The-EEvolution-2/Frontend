import React from 'react';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';
import { RESOURCE_CATEGORIES } from '@/constants/nestedResourcesData';
import { notFound } from 'next/navigation';
import CategoryClientContent from './CategoryClientContent';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const categoryMeta = RESOURCE_CATEGORIES.find((c) => c.slug === category);

  if (!categoryMeta) {
    notFound();
  }

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

      <CategoryClientContent category={category} categoryMeta={categoryMeta} />
    </div>
  );
}
