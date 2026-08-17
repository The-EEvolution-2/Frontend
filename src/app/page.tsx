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
    <div className="w-full px-4 sm:px-8 lg:px-16 py-4 space-y-12 font-sans bg-[#F9F9F9] dark:bg-[#121212] text-[#1A1C1C] dark:text-[#F0F1F1]">
      {/* Google OAuth Password Creation Modal Prompt */}
      <SetPasswordModal />

      {/* Floating Canvas Hero Area */}
      <Hero />

      {/* Main Content Grid: Technical Documentation, Projects & Bulletins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto pt-6">
        {/* Main Left Column (8 cols): Documentation & Projects */}
        <div className="lg:col-span-8 space-y-10">
          {/* Section I: Technical Documentation */}
          <section className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-wrap justify-between items-baseline gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-light text-black dark:text-white tracking-wide uppercase">
                Section I: Technical Documentation &amp; Specifications
              </h2>
              <span className="text-xs font-mono text-stone-500 font-light">[{resources.length} ENTRIES]</span>
            </div>

            {resources.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl font-mono space-y-2">
                <FolderPlus className="w-8 h-8 mx-auto text-stone-400 font-light" />
                <p className="text-xs font-semibold text-black dark:text-white uppercase">Nothing to Show</p>
                <p className="text-[11px] text-stone-500 font-light">No documentation entries exist in the database archive.</p>
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
          <section className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 relative h-44 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                <Image
                  src="/pcb_schematic.jpg"
                  alt="PCB Multilayer Layering Diagram"
                  fill
                  className="object-cover filter grayscale contrast-110"
                />
              </div>
              <div className="md:col-span-7 space-y-2.5 text-xs font-sans">
                <span className="font-mono text-[11px] text-stone-500 uppercase tracking-widest font-light">
                  TECHNICAL DIAGRAM 2.1
                </span>
                <h4 className="font-serif text-lg font-light text-black dark:text-white leading-snug">
                  Multi-Layer PCB Trace Isolation &amp; Noise Reduction
                </h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  High-speed signal trace routing guidelines for reducing ground bounce and capacitive crosstalk in multi-layer board stackups.
                </p>
                <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs text-black dark:text-white font-medium underline">
                  <span>Explore Resource Index</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Section II: Active Engineering Repositories */}
          <section className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-wrap justify-between items-baseline gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-light text-black dark:text-white tracking-wide uppercase">
                Section II: Active Engineering Repositories
              </h2>
              <span className="text-xs font-mono text-stone-500 font-light">[{projects.length} ENTRIES]</span>
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
          <section className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-4 font-sans">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex items-baseline justify-between">
              <h3 className="font-serif text-base font-light text-black dark:text-white uppercase tracking-wide">
                Admin Bulletins
              </h3>
              <span className="text-xs font-mono text-stone-400 font-light">[LATEST]</span>
            </div>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="text-xs space-y-1.5 border-b border-stone-100 dark:border-stone-800/80 pb-3.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500">
                    <span className="font-medium text-black dark:text-white">[{ann.tag}]</span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="font-serif text-sm font-light text-black dark:text-white leading-snug">{ann.title}</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-[11px]">{ann.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Research Spotlight */}
          <section className="p-6 bg-stone-900 dark:bg-stone-100 text-white dark:text-black rounded-2xl shadow-lg space-y-4 font-sans border border-stone-800 dark:border-stone-200">
            <div className="border-b border-stone-800 dark:border-stone-200 pb-3 flex items-baseline justify-between">
              <h3 className="font-serif text-base font-light uppercase tracking-wide">
                Spotlight Papers
              </h3>
              <span className="text-xs font-mono opacity-60 font-light">[PEER REVIEWED]</span>
            </div>
            <div className="space-y-4">
              {FEATURED_PUBLICATIONS.map((pub) => (
                <div key={pub.id} className="text-xs space-y-1.5">
                  <span className="font-mono text-[10px] opacity-80 font-medium">[{pub.category}]</span>
                  <h4 className="font-serif text-sm font-light leading-snug">{pub.title}</h4>
                  <p className="opacity-80 font-light leading-relaxed text-[11px]">{pub.abstract}</p>
                  <div className="pt-1 font-mono text-[10px] opacity-70 flex justify-between">
                    <span>{pub.author}</span>
                    <a href={pub.url} className="underline hover:opacity-100 transition-opacity">Download &rarr;</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section III: Community Correspondence */}
          <section className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex justify-between items-baseline">
              <h2 className="font-serif text-base font-light text-black dark:text-white uppercase tracking-wide">Section III: Correspondence</h2>
              <span className="text-xs font-mono text-stone-500 font-light">[{posts.length} THREADS]</span>
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
