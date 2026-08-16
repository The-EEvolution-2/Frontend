import React from 'react';

export default function AboutPage() {
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">About EEvolution 2.0</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          EEvolution 2.0 is an integrated engineering portal connecting public frontend interfaces with admin control panel and backend services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Frontend</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Next.js App Router, Redux Toolkit, and Tailwind CSS.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Shared Backend</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Central API serving data and real-time state synchronization.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Admin Panel</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Management dashboard for controlling content dynamically.
          </p>
        </div>
      </div>
    </div>
  );
}
