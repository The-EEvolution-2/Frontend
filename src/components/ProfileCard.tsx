'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    full_name?: string;
    mobile_no?: string;
    batch_year?: string;
    roll_number?: string;
    batch_group?: string;
    department?: string;
    is_guest?: boolean;
    is_member?: boolean;
    membership_duration?: string;
    is_admin?: boolean; // Hidden attribute
  };
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('ee_guest_user');
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isStudent = user.role?.toLowerCase().includes('student');
  const isFaculty = user.role?.toLowerCase().includes('faculty') || user.role?.toLowerCase().includes('teacher');

  return (
    <div className="bg-[#FCFCF9] dark:bg-[#121212] border-2 border-stone-800 dark:border-stone-200 p-6 font-mono text-xs text-stone-900 dark:text-stone-100 space-y-6">
      {/* Old-School Header Bar */}
      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-4 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="text-[11px] text-stone-500 font-bold uppercase">
            [ EEVOLUTION 2.0 ACADEMIC RECORD ]
          </div>
          <h2 className="text-xl font-bold uppercase text-black dark:text-white mt-1">
            MEMBER: {user.name.toUpperCase()}
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 border-2 border-stone-800 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-black font-bold uppercase hover:underline"
        >
          [ LOGOUT SESSION ]
        </button>
      </div>

      {/* Tabular Data View */}
      <div className="divide-y divide-stone-300 dark:divide-stone-800 border border-stone-400 dark:border-stone-700 bg-white dark:bg-stone-900">
        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">ACADEMIC ROLE:</span>
          <span className="font-bold text-black dark:text-white uppercase">{user.role}</span>
        </div>

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">MEMBERSHIP STATUS:</span>
          <span className={`font-bold uppercase ${user.is_member ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-500'}`}>
            {user.is_member ? `ACTIVE MEMBER (${user.membership_duration || '1 YEAR'})` : 'INACTIVE / STANDARD ACCESS'}
          </span>
        </div>

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">EMAIL ADDRESS:</span>
          <span className="text-stone-900 dark:text-stone-200">{user.email}</span>
        </div>

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">DEPARTMENT:</span>
          <span className="text-stone-900 dark:text-stone-200">{user.department || 'Department of Electrical Engineering'}</span>
        </div>

        {isFaculty && user.mobile_no && (
          <div className="p-3 flex justify-between">
            <span className="font-bold text-stone-500">MOBILE CONTACT (TEACHER):</span>
            <span className="text-stone-900 dark:text-stone-200">{user.mobile_no}</span>
          </div>
        )}

        {isStudent && (
          <>
            <div className="p-3 flex justify-between">
              <span className="font-bold text-stone-500">ROLL NUMBER:</span>
              <span className="font-bold text-black dark:text-white">{user.roll_number || 'N/A'}</span>
            </div>

            <div className="p-3 flex justify-between">
              <span className="font-bold text-stone-500">BATCH YEAR &amp; GROUP:</span>
              <span className="text-stone-900 dark:text-stone-200">
                BATCH {user.batch_year || '2026'} | GROUP {user.batch_group || '1'}
              </span>
            </div>
          </>
        )}

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">ACCOUNT ID (UUID):</span>
          <span className="text-stone-600 dark:text-stone-400">{user.id}</span>
        </div>
      </div>

      {/* Biography Block */}
      <div className="p-4 border border-stone-400 dark:border-stone-800 bg-[#F5F5F0] dark:bg-[#181818] space-y-1">
        <div className="font-bold text-[11px] text-stone-500 uppercase">&gt; RECORD ACCESS &amp; SCOPE STATEMENT:</div>
        <p className="text-stone-800 dark:text-stone-300 leading-relaxed">{user.bio}</p>
      </div>
    </div>
  );
}
