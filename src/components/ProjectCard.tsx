import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types/project';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.image_url || '/circuit_board.jpg';

  return (
    <article className="border-2 border-stone-800 dark:border-stone-200 bg-[#FCFCF9] dark:bg-[#141414] rounded-none overflow-hidden flex flex-col font-sans text-xs text-stone-900 dark:text-stone-100 shadow-sm transition-all hover:shadow-md">
      {/* Top Half: Cover Image Frame */}
      <div className="relative w-full h-48 sm:h-52 border-b-2 border-stone-800 dark:border-stone-200 bg-stone-200 dark:bg-stone-900 overflow-hidden">
        <Image
          src={coverImage}
          alt={project.name || 'Project Cover'}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {project.status && (
          <span className="absolute top-2 right-2 px-2 py-0.5 border border-stone-800 bg-stone-900 text-white font-mono text-[10px] font-bold uppercase">
            {project.status}
          </span>
        )}
      </div>

      {/* Bottom Half: Title, Description & Full Width "Read More" Button */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500">
            <span className="font-bold text-black dark:text-white uppercase">
              [{project.project_type || 'ENGINEERING PROJECT'}]
            </span>
          </div>

          <h3 className="text-base font-bold text-black dark:text-white line-clamp-1">
            {project.name}
          </h3>

          <p className="text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3 text-xs">
            {project.summary || project.description}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="text-[11px] font-mono text-stone-500 pt-1">
              Tech Stack: {project.techStack.join(', ')}
            </div>
          )}
        </div>

        {/* Full-width "read more" / "Explore Project" Button matching hand-drawn wireframe */}
        <div className="pt-2">
          <Link
            href={project.githubUrl || project.liveUrl || `/projects#${project.id}`}
            className="w-full py-2.5 px-4 border-2 border-stone-800 dark:border-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-black font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
          >
            <span>Read More</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
