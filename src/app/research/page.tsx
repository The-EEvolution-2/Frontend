import React from 'react';
import Link from 'next/link';

export interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  date: string;
  abstract: string;
  doi: string;
  authors: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'res-paper-01',
    title: 'High-Frequency Electromagnetic Wave Attenuation in Multilayered Rogers Substrates',
    journal: 'IEEE Transactions on Microwave Theory and Techniques',
    date: '2026-08-10',
    abstract: 'Rigorous mathematical formulation of signal attenuation and dielectric loss tangent variation under gigahertz frequency sweeps.',
    doi: '10.1109/TMTT.2026.3104921',
    authors: 'Prof. R. Vance, Dr. K. Thorne, & E. Rostova',
  },
  {
    id: 'res-paper-02',
    title: 'Thermal Dissipation Dynamics in High-Voltage Gallium Nitride (GaN) Power Transistors',
    journal: 'Journal of Power Electronics & Solid-State Devices',
    date: '2026-08-04',
    abstract: 'Empirical junction temperature logging under continuous 2 MHz pulse-width modulation (PWM) power conversion.',
    doi: '10.1109/JPE.2026.4091823',
    authors: 'Dr. H. Sterling & Power Electronics Research Group',
  },
];

export default function ResearchPage() {
  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      <div className="text-xs font-mono text-stone-500">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">research</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">
          PEER-REVIEWED RESEARCH ARCHIVE
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
          INDEX OF PUBLISHED JOURNAL PAPERS, ELECTROMAGNETIC FORMULATIONS, AND SOLID-STATE DISCOVERIES.
        </p>
      </div>

      <div className="divide-y divide-stone-200 dark:divide-stone-800">
        {RESEARCH_PAPERS.map((paper) => (
          <article key={paper.id} className="py-5 space-y-2 font-serif">
            <div className="flex items-baseline justify-between text-xs font-mono text-stone-500">
              <span className="font-bold text-black dark:text-white">[{paper.journal.toUpperCase()}]</span>
              <span>Published: {paper.date}</span>
            </div>

            <h3 className="text-lg font-bold text-black dark:text-white">
              {paper.title}
            </h3>

            <p className="text-xs text-stone-800 dark:text-stone-300 leading-relaxed">
              {paper.abstract}
            </p>

            <div className="text-xs font-mono text-stone-500 flex items-center justify-between pt-2">
              <span>Authors: {paper.authors}</span>
              <span className="text-blue-900 dark:text-blue-400 underline">
                DOI: {paper.doi} &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
