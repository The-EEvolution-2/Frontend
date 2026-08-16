'use client';

import React from 'react';
import { useFontSize } from './FontSizeContext';

export default function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="flex items-center gap-1.5 font-sans text-xs text-stone-600 dark:text-stone-400">
      <button
        onClick={() => setFontSize('sm')}
        title="Small Font Size"
        className={`px-1.5 py-0.5 rounded text-[11px] font-bold border transition-colors ${
          fontSize === 'sm'
            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black border-transparent'
            : 'border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800'
        }`}
      >
        A-
      </button>
      <button
        onClick={() => setFontSize('base')}
        title="Default Font Size"
        className={`px-1.5 py-0.5 rounded text-xs font-bold border transition-colors ${
          fontSize === 'base'
            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black border-transparent'
            : 'border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800'
        }`}
      >
        A
      </button>
      <button
        onClick={() => setFontSize('lg')}
        title="Large Font Size"
        className={`px-1.5 py-0.5 rounded text-sm font-bold border transition-colors ${
          fontSize === 'lg'
            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black border-transparent'
            : 'border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800'
        }`}
      >
        A+
      </button>
    </div>
  );
}
