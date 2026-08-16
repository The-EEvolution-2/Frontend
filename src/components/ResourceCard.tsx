import React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const categorySlug = resource.categorySlug || 'general';
  const topicSlug = resource.topicSlug || 'current';
  const detailHref = `/resources/${categorySlug}/${topicSlug}/${resource.id}`;

  return (
    <article className="py-4 border-b border-stone-200 dark:border-stone-800 font-serif">
      <div className="flex items-baseline justify-between text-xs font-mono text-stone-500 mb-1">
        <span>
          <Link href={`/resources/${categorySlug}`} className="hover:underline text-black dark:text-white font-bold">
            {(resource.categoryLabel || resource.category || 'General').toUpperCase()}
          </Link>
          {resource.topicLabel && (
            <>
              {' / '}
              <Link href={`/resources/${categorySlug}/${topicSlug}`} className="hover:underline">
                {resource.topicLabel}
              </Link>
            </>
          )}
        </span>
        <span>Date: {resource.date}</span>
      </div>

      <h3 className="text-base font-bold text-black dark:text-white mb-1">
        <Link href={detailHref} className="hover:underline">
          {resource.title}
        </Link>
      </h3>

      <p className="text-xs text-stone-800 dark:text-stone-300 leading-relaxed mb-2">
        {resource.description}
      </p>

      <div className="text-xs font-mono text-stone-500 flex items-center justify-between">
        <span>Author: {resource.author}</span>
        <Link href={detailHref} className="underline text-blue-900 dark:text-blue-400">
          View Full Document &rarr;
        </Link>
      </div>
    </article>
  );
}
