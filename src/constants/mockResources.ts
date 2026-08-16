import { Resource } from '../types/resource';

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Modern Electrical Systems Guide',
    description: 'A comprehensive handbook covering current distribution, smart grids, and safety protocols.',
    category: 'General',
    categorySlug: 'general',
    categoryLabel: 'General',
    topicSlug: 'current',
    topicLabel: 'Current & Conductors',
    url: '#',
    author: 'EEvolution Editorial',
    date: '2026-08-10',
  },
  {
    id: 'res-2',
    title: 'Embedded Firmware Architecture',
    description: 'Best practices for writing modular and efficient C/C++ micro-controller firmware.',
    category: 'Books',
    categorySlug: 'books',
    categoryLabel: 'Books',
    topicSlug: 'firmware',
    topicLabel: 'Embedded Firmware Books',
    url: '#',
    author: 'Hardware Dev Group',
    date: '2026-08-05',
  },
];
