'use client';

import React from 'react';
import ProjectCard from '../../components/ProjectCard';
import { useAppSelector } from '../../hooks/useRedux';

export default function ProjectsPage() {
  const projects = useAppSelector((state) => state.projects.items);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Engineering Projects</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Explore flagship engineering systems, embedded modules, and cloud platform integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
}
