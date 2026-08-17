'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import {
  UserCheck,
  Mail,
  Building2,
  Phone,
  GraduationCap,
  Hash,
  Layers,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

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
    <div className="bg-[#FCFCF9] dark:bg-[#161616] border border-stone-300 dark:border-stone-800 rounded-xl p-6 sm:p-8 font-sans shadow-lg space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center font-bold text-2xl shadow-inner border border-slate-700">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {user.name}
              </h2>
              <span className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold uppercase border border-blue-200 dark:border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                {user.role}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 text-xs font-mono font-bold rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Grid of Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-stone-200 dark:border-stone-800 rounded-lg space-y-1">
          <span className="text-stone-500 flex items-center gap-1.5 text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            DEPARTMENT
          </span>
          <p className="font-bold text-black dark:text-white text-sm">
            {user.department || 'Department of Electrical Engineering'}
          </p>
        </div>

        {isFaculty && user.mobile_no && (
          <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-stone-200 dark:border-stone-800 rounded-lg space-y-1">
            <span className="text-stone-500 flex items-center gap-1.5 text-[11px]">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              MOBILE CONTACT (FACULTY)
            </span>
            <p className="font-bold text-black dark:text-white text-sm">
              {user.mobile_no}
            </p>
          </div>
        )}

        {isStudent && (
          <>
            <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-stone-200 dark:border-stone-800 rounded-lg space-y-1">
              <span className="text-stone-500 flex items-center gap-1.5 text-[11px]">
                <Hash className="w-3.5 h-3.5 text-slate-500" />
                ROLL NUMBER
              </span>
              <p className="font-bold text-black dark:text-white text-sm">
                {user.roll_number || 'N/A'}
              </p>
            </div>

            <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-stone-200 dark:border-stone-800 rounded-lg space-y-1">
              <span className="text-stone-500 flex items-center gap-1.5 text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                BATCH YEAR &amp; GROUP
              </span>
              <p className="font-bold text-black dark:text-white text-sm">
                Batch {user.batch_year || '2026'} • Group {user.batch_group || '1'}
              </p>
            </div>
          </>
        )}

        <div className="p-4 bg-[#F5F5F0] dark:bg-[#1C1C1C] border border-stone-200 dark:border-stone-800 rounded-lg space-y-1 md:col-span-2">
          <span className="text-stone-500 flex items-center gap-1.5 text-[11px]">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            ACADEMIC BIOGRAPHY &amp; ACCESS SCOPE
          </span>
          <p className="text-stone-800 dark:text-stone-300 font-sans leading-relaxed text-xs">
            {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
