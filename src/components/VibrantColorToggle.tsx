'use client';

import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

// Solid vibrant primary and secondary color pairs
const VIBRANT_COLOR_PAIRS = [
  { name: 'Royal Blue & Crimson', primary: '#2563EB', secondary: '#DC2626' },
  { name: 'Emerald Green & Amber', primary: '#059669', secondary: '#D97706' },
  { name: 'Purple & Teal', primary: '#7C3AED', secondary: '#0D9488' },
  { name: 'Indigo & Rose', primary: '#4F46E5', secondary: '#E11D48' },
  { name: 'Cyan & Violet', primary: '#0284C7', secondary: '#9333EA' },
  { name: 'Deep Orange & Cobalt', primary: '#EA580C', secondary: '#1D4ED8' },
];

export default function VibrantColorToggle() {
  const [activePair, setActivePair] = useState(0);

  const applyColorPair = (index: number) => {
    const pair = VIBRANT_COLOR_PAIRS[index];
    const root = document.documentElement;

    root.style.setProperty('--primary-vibrant', pair.primary);
    root.style.setProperty('--secondary-vibrant', pair.secondary);
  };

  useEffect(() => {
    // Generate a random vibrant color pair on load
    const randomIndex = Math.floor(Math.random() * VIBRANT_COLOR_PAIRS.length);
    setActivePair(randomIndex);
    applyColorPair(randomIndex);
  }, []);

  const triggerRandomColor = () => {
    let nextIndex = Math.floor(Math.random() * VIBRANT_COLOR_PAIRS.length);
    if (nextIndex === activePair) {
      nextIndex = (activePair + 1) % VIBRANT_COLOR_PAIRS.length;
    }
    setActivePair(nextIndex);
    applyColorPair(nextIndex);
  };

  return (
    <button
      onClick={triggerRandomColor}
      title={`Random Vibrant Theme (${VIBRANT_COLOR_PAIRS[activePair].name})`}
      className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center justify-center shadow-sm text-stone-800 dark:text-stone-200"
    >
      <Palette className="w-4 h-4 transition-transform hover:rotate-45" style={{ color: VIBRANT_COLOR_PAIRS[activePair].primary }} />
    </button>
  );
}
