'use client';

import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

// Vibrant preset palettes for instant dynamic accent changes
const VIBRANT_PALETTES = [
  { name: 'Electric Cyan', primary: '#00F0FF', secondary: '#7000FF', bgGlow: 'rgba(0, 240, 255, 0.15)' },
  { name: 'Neon Purple', primary: '#A855F7', secondary: '#EC4899', bgGlow: 'rgba(168, 85, 247, 0.15)' },
  { name: 'Sunset Amber', primary: '#F59E0B', secondary: '#EF4444', bgGlow: 'rgba(245, 158, 11, 0.15)' },
  { name: 'Emerald Cyber', primary: '#10B981', secondary: '#06B6D4', bgGlow: 'rgba(16, 185, 129, 0.15)' },
  { name: 'Hot Coral', primary: '#FF0055', secondary: '#FF7700', bgGlow: 'rgba(255, 0, 85, 0.15)' },
  { name: 'Ultramarine', primary: '#3B82F6', secondary: '#8B5CF6', bgGlow: 'rgba(59, 130, 246, 0.15)' },
];

export default function VibrantColorToggle() {
  const [activePalette, setActivePalette] = useState(0);

  // Apply CSS custom properties dynamically to root
  const applyPalette = (index: number) => {
    const palette = VIBRANT_PALETTES[index];
    const root = document.documentElement;

    root.style.setProperty('--vibrant-primary', palette.primary);
    root.style.setProperty('--vibrant-secondary', palette.secondary);
    root.style.setProperty('--vibrant-glow', palette.bgGlow);
  };

  useEffect(() => {
    // Generate a random vibrant palette on page load
    const randomIndex = Math.floor(Math.random() * VIBRANT_PALETTES.length);
    setActivePalette(randomIndex);
    applyPalette(randomIndex);
  }, []);

  const triggerRandomColor = () => {
    let nextIndex = Math.floor(Math.random() * VIBRANT_PALETTES.length);
    if (nextIndex === activePalette) {
      nextIndex = (activePalette + 1) % VIBRANT_PALETTES.length;
    }
    setActivePalette(nextIndex);
    applyPalette(nextIndex);
  };

  return (
    <button
      onClick={triggerRandomColor}
      title={`Random Vibrant Theme (${VIBRANT_PALETTES[activePalette].name})`}
      className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center justify-center shadow-sm text-stone-800 dark:text-stone-200"
    >
      <Palette className="w-4 h-4 transition-transform hover:rotate-45" style={{ color: VIBRANT_PALETTES[activePalette].primary }} />
    </button>
  );
}
