import React from 'react';
import Link from 'next/link';

export interface CategoryMeta {
  slug: string;
  name: string;
  description: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  accentTextLight: string;
  accentTextDark: string;
  badgeBgLight: string;
  badgeBgDark: string;
}

export const RESOURCE_CATEGORIES: CategoryMeta[] = [
  {
    slug: 'academics',
    name: 'Academics',
    description: 'Peer-reviewed research papers and theoretical electromagnetics.',
    bgLight: 'bg-blue-50/70',
    bgDark: 'dark:bg-blue-950/30',
    borderLight: 'border-blue-300',
    borderDark: 'dark:border-blue-800',
    accentTextLight: 'text-blue-900',
    accentTextDark: 'dark:text-blue-300',
    badgeBgLight: 'bg-blue-100',
    badgeBgDark: 'dark:bg-blue-900/50',
  },
  {
    slug: 'general',
    name: 'General',
    description: 'Comprehensive fundamentals: subatomic physics, circuit laws, electrostatics, semiconductors, and electromagnetism.',
    bgLight: 'bg-emerald-50/70',
    bgDark: 'dark:bg-emerald-950/30',
    borderLight: 'border-emerald-300',
    borderDark: 'dark:border-emerald-800',
    accentTextLight: 'text-emerald-900',
    accentTextDark: 'dark:text-emerald-300',
    badgeBgLight: 'bg-emerald-100',
    badgeBgDark: 'dark:bg-emerald-900/50',
  },
  {
    slug: 'experimental',
    name: 'Experimental',
    description: 'Laboratory telemetry, Thévenin-Norton network verification, Superposition theorem, Transformer OC/SC tests, and GaN power datasets.',
    bgLight: 'bg-amber-50/70',
    bgDark: 'dark:bg-amber-950/30',
    borderLight: 'border-amber-300',
    borderDark: 'dark:border-amber-800',
    accentTextLight: 'text-amber-900',
    accentTextDark: 'dark:text-amber-300',
    badgeBgLight: 'bg-amber-100',
    badgeBgDark: 'dark:bg-amber-900/50',
  },
  {
    slug: 'books',
    name: 'Books',
    description: 'Textbooks, micro-controller firmware references, and DSP handbooks.',
    bgLight: 'bg-purple-50/70',
    bgDark: 'dark:bg-purple-950/30',
    borderLight: 'border-purple-300',
    borderDark: 'dark:border-purple-800',
    accentTextLight: 'text-purple-900',
    accentTextDark: 'dark:text-purple-300',
    badgeBgLight: 'bg-purple-100',
    badgeBgDark: 'dark:bg-purple-900/50',
  },
  {
    slug: 'practice-sets',
    name: 'Practice Sets',
    description: 'Problem sets, op-amp design assessments, and Verilog state machines.',
    bgLight: 'bg-rose-50/70',
    bgDark: 'dark:bg-rose-950/30',
    borderLight: 'border-rose-300',
    borderDark: 'dark:border-rose-800',
    accentTextLight: 'text-rose-900',
    accentTextDark: 'dark:text-rose-300',
    badgeBgLight: 'bg-rose-100',
    badgeBgDark: 'dark:bg-rose-900/50',
  },
  {
    slug: 'history',
    name: 'History of Electrical Engineering',
    description: 'Historical milestones, Faraday-Maxwell discoveries, early galvanism, and AC vs DC power grid evolution.',
    bgLight: 'bg-indigo-50/70',
    bgDark: 'dark:bg-indigo-950/30',
    borderLight: 'border-indigo-300',
    borderDark: 'dark:border-indigo-800',
    accentTextLight: 'text-indigo-900',
    accentTextDark: 'dark:text-indigo-300',
    badgeBgLight: 'bg-indigo-100',
    badgeBgDark: 'dark:bg-indigo-900/50',
  },
  {
    slug: 'career',
    name: 'Career & Industry Paths',
    description: 'Career roadmaps, hardware engineering interview guides, and specialization paths.',
    bgLight: 'bg-teal-50/70',
    bgDark: 'dark:bg-teal-950/30',
    borderLight: 'border-teal-300',
    borderDark: 'dark:border-teal-800',
    accentTextLight: 'text-teal-900',
    accentTextDark: 'dark:text-teal-300',
    badgeBgLight: 'bg-teal-100',
    badgeBgDark: 'dark:bg-teal-900/50',
  },
];

export const ALL_RESOURCES: any[] = [];
