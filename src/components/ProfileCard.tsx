'use client';

import React from 'react';
import { UserProfile } from '../types/auth';
import { useAppDispatch } from '../hooks/useRedux';
import { logout } from '../redux/authSlice';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="p-6 bg-white dark:bg-black font-mono text-black dark:text-white">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase">[ USER: {user.name.toUpperCase()} ]</h2>
          <p className="text-xs font-bold uppercase mt-1">ROLE: {user.role.toUpperCase()}</p>
          <p className="text-xs uppercase mt-1">EMAIL: {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-xs font-bold uppercase bg-black text-white dark:bg-white dark:text-black"
        >
          [ LOGOUT ]
        </button>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase mb-2">&gt; USER BIOGRAPHY:</h3>
        <p className="text-xs leading-relaxed bg-slate-100 dark:bg-slate-900 p-3">{user.bio}</p>
      </div>
    </div>
  );
}
