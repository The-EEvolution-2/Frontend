'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import ProjectCard from '../components/ProjectCard';
import PostCard from '../components/PostCard';
import SetPasswordModal from '../components/SetPasswordModal';
import { useAppSelector } from '../hooks/useRedux';
import { FEATURED_PUBLICATIONS } from '../constants/featuredPublications';
import { ANNOUNCEMENTS } from '../constants/announcements';
import { RESOURCE_CATEGORIES } from '../constants/nestedResourcesData';
import { Resource } from '../types/resource';
import { FolderPlus } from 'lucide-react';

export default function Home() {
  const resources: Resource[] = useAppSelector((state) => state.resources.items);
  const projects = useAppSelector((state) => state.projects.items);
  const posts = useAppSelector((state) => state.community.posts);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-4 space-y-8 font-serif">
      {/* Google OAuth Password Creation Modal Prompt */}
      <SetPasswordModal />

      <Hero />

      {/* Quick Category Directory Index Bar */}
      <section className="p-4 border border-stone-300 dark:border-stone-800 bg-[#F7F7F4] dark:bg-[#161616]">
        <div className="flex items-baseline justify-between mb-3 border-b border-stone-300 dark:border-stone-800 pb-2">
          <h3 className="font-bold text-xs font-mono uppercase text-black dark:text-white">
            Category Directory Index
          </h3>
          <Link href="/resources" className="text-xs font-mono text-blue-900 dark:text-blue-400 hover:underline">
            View Complete Archive &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs font-mono">
          {RESOURCE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resources/${cat.slug}`}
              className="p-2 border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#121212] hover:border-stone-500 transition-colors block text-center"
            >
              <div className="font-bold text-black dark:text-white">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Left Column (8 cols): Documentation & Projects */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-1 mb-4 flex flex-wrap justify-between items-baseline gap-2">
              <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">
                SECTION I: TECHNICAL DOCUMENTATION &amp; SPECIFICATIONS
              </h2>
              <span className="text-xs font-mono text-stone-500">[{resources.length} ENTRIES]</span>
            </div>

            {resources.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded font-mono space-y-2">
                <FolderPlus className="w-8 h-8 mx-auto text-stone-400" />
                <p className="text-xs font-bold text-black dark:text-white uppercase">Nothing to Show</p>
                <p className="text-[11px] text-stone-500">No documentation entries exist in the database archive.</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-200 dark:divide-stone-800">
                {resources.map((res: Resource) => (
                  <ResourceCard key={res.id || res._id} resource={res} />
                ))}
              </div>
            )}
          </section>

          {/* Featured Technical Image Banner Box */}
          <section className="p-4 border border-stone-300 dark:border-stone-800 bg-[#F8F8F5] dark:bg-[#151515]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 relative h-40 rounded border border-stone-300 dark:border-stone-800 overflow-hidden">
                <Image
                  src="/pcb_schematic.jpg"
                  alt="PCB Multilayer Layering Diagram"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-7 space-y-2 text-xs">
                <span className="font-mono text-[11px] font-bold text-blue-900 dark:text-blue-400">
                  TECHNICAL DIAGRAM 2.1
                </span>
                <h4 className="font-bold text-sm text-black dark:text-white">
                  Multi-Layer PCB Trace Isolation &amp; Noise Reduction
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  High-speed signal trace routing guidelines for reducing ground bounce and capacitive crosstalk in multi-layer board stackups.
                </p>
                <Link href="/resources" className="inline-block font-mono text-blue-900 dark:text-blue-400 underline">
                  Explore Resource Index &rarr;
                </Link>
              </div>
            </div>
          </section>

          <section>
            <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-1 mb-4 flex flex-wrap justify-between items-baseline gap-2">
              <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">
                SECTION II: ACTIVE ENGINEERING REPOSITORIES
              </h2>
              <span className="text-xs font-mono text-stone-500">[{projects.length} ENTRIES]</span>
            </div>
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {projects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Right Column (4 cols): Bulletins, Spotlight Papers & Correspondence */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Admin Bulletins & Notices */}
          <section className="p-4 border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#121212]">
            <div className="border-b border-stone-400 dark:border-stone-700 pb-2 mb-3 flex items-baseline justify-between">
              <h3 className="font-bold text-sm text-black dark:text-white uppercase font-mono">
                ADMIN BULLETINS
              </h3>
              <span className="text-xs font-mono text-stone-500">[LATEST]</span>
            </div>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="text-xs space-y-1 border-b border-stone-200 dark:border-stone-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between font-mono text-[11px] text-stone-500">
                    <span className="font-bold text-blue-900 dark:text-blue-400">[{ann.tag}]</span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-black dark:text-white leading-snug">{ann.title}</h4>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">{ann.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Research Spotlight */}
          <section className="p-4 border border-stone-300 dark:border-stone-800 bg-[#F5F5F0] dark:bg-[#181818]">
            <div className="border-b border-stone-400 dark:border-stone-700 pb-2 mb-3 flex items-baseline justify-between">
              <h3 className="font-bold text-sm text-black dark:text-white uppercase font-mono">
                SPOTLIGHT PAPERS
              </h3>
              <span className="text-xs font-mono text-stone-500">[PEER REVIEWED]</span>
            </div>
            <div className="space-y-4">
              {FEATURED_PUBLICATIONS.map((pub) => (
                <div key={pub.id} className="text-xs space-y-1">
                  <span className="font-bold font-mono text-blue-900 dark:text-blue-400">[{pub.category}]</span>
                  <h4 className="font-bold text-black dark:text-white leading-snug">{pub.title}</h4>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{pub.abstract}</p>
                  <div className="pt-1 font-mono text-[11px] text-stone-500 flex justify-between">
                    <span>{pub.author}</span>
                    <a href={pub.url} className="underline text-blue-900 dark:text-blue-400">Download &rarr;</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section III: Community Correspondence */}
          <section>
            <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-1 mb-4 flex justify-between items-baseline">
              <h2 className="text-sm font-bold text-black dark:text-white">SECTION III: CORRESPONDENCE</h2>
              <span className="text-xs font-mono text-stone-500">[{posts.length} THREADS]</span>
            </div>
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
