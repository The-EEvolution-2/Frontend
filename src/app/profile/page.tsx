'use client';

import React from 'react';
import Link from 'next/link';
import ProfileCard from '../../components/ProfileCard';
import { useAppSelector } from '../../hooks/useRedux';
import { LogIn } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-sky-400 flex items-center justify-center">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Authentication Required</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          Please sign in to view your profile and manage account details.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">User Profile</h1>
      <ProfileCard user={user} />
    </div>
  );
}
