import React from 'react';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';
import { ALL_RESOURCES } from '@/constants/nestedResourcesData';
import { notFound } from 'next/navigation';

interface TopicPageProps {
  params: Promise<{
    category: string;
    topic: string;
  }>;
}

export default async function ResourceTopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params;
  const { category, topic } = resolvedParams;

  const topicResources = ALL_RESOURCES.filter(
    (r) => r.categorySlug === category && r.topicSlug === topic
  );

  if (topicResources.length === 0) {
    notFound();
  }

  const topicLabel = topicResources[0].topicLabel;

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      {/* Breadcrumb Path */}
      <div className="text-xs font-mono text-stone-500">
        <Link href="/resources" className="hover:underline">domain</Link>
        {' / '}
        <Link href="/resources" className="hover:underline">resources</Link>
        {' / '}
        <Link href={`/resources/${category}`} className="hover:underline">{category}</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">{topic}</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">
          TOPIC: {topicLabel.toUpperCase()}
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
          FILTERED TOPIC ARCHIVE IN [{category.toUpperCase()}].
        </p>
      </div>

      {/* Topic Documents List */}
      <div className="divide-y divide-stone-200 dark:divide-stone-800">
        {topicResources.map((res) => (
          <ResourceCard key={res.id} resource={res} />
        ))}
      </div>
    </div>
  );
}
