import React from 'react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="py-4 border-b border-stone-200 dark:border-stone-800 font-serif">
      <div className="flex items-baseline justify-between text-xs font-mono text-stone-500 mb-1">
        <span className="font-bold text-black dark:text-white">{project.name}</span>
        <span className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">{project.status}</span>
      </div>

      <p className="text-xs text-stone-800 dark:text-stone-300 leading-relaxed mb-2">
        {project.summary}
      </p>

      <div className="text-xs font-mono text-stone-600 dark:text-stone-400 mb-2">
        Tech Stack: {project.techStack.join(', ')}
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-900 dark:text-blue-400">
            Source Repository &rarr;
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className="underline text-blue-900 dark:text-blue-400">
            System Telemetry Demo &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
