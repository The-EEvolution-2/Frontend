'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { toggleTheme } from '../redux/themeSlice';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
      className="p-1.5 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-slate-700 dark:text-stone-200 transition-colors flex items-center justify-center"
    >
      {mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
    </button>
  );
}
