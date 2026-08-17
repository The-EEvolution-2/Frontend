'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Sparkles, ShieldAlert, KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface AccessGuardProps {
  children: React.ReactNode;
  category: string; // e.g. 'academics', 'practice-sets', 'experimental', 'career', 'downloads', 'tutorial', 'research'
}

// 1. MEMBER ONLY SECTIONS: Practice Set, Career Path, Research, Software Tutorial
const MEMBER_ONLY_CATEGORIES = ['practice-sets', 'career', 'research', 'tutorial'];

// 2. LOGIN REQUIRED SECTIONS: Academics, Practice Set, Experimental, Software Download
const LOGIN_REQUIRED_CATEGORIES = ['academics', 'practice-sets', 'experimental', 'downloads'];

export default function AccessGuard({ children, category }: AccessGuardProps) {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const cleanCategory = category.toLowerCase().trim();
  const requiresMember = MEMBER_ONLY_CATEGORIES.includes(cleanCategory);
  const requiresLogin = LOGIN_REQUIRED_CATEGORIES.includes(cleanCategory);

  useEffect(() => {
    async function checkUserAccess() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      let guestUser = null;
      const guestData = localStorage.getItem('ee_guest_user');
      if (guestData) {
        try {
          guestUser = JSON.parse(guestData);
        } catch {
          // ignore
        }
      }

      if (session?.user) {
        setSessionUser(session.user);
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(userProfile);
      } else if (guestUser) {
        setSessionUser({ is_guest: true, name: guestUser.full_name });
      }

      setLoading(false);
    }

    checkUserAccess();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center font-mono text-xs text-stone-500">
        Verifying security accession privileges...
      </div>
    );
  }

  const isLoggedIn = !!sessionUser;
  const isMember = profile?.is_member || profile?.role === 'superadmin' || profile?.role === 'admin';

  // RULE 1: MEMBER ONLY ACCESS RESTRICTION
  if (requiresMember && (!isLoggedIn || !isMember)) {
    return (
      <div className="py-12 px-4 max-w-2xl mx-auto font-sans text-stone-900 dark:text-stone-100">
        <div className="border-2 border-stone-800 dark:border-stone-200 bg-[#FCFCF9] dark:bg-[#141414] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block">
              [ RESTRICTED MEMBER ARCHIVE ]
            </span>
            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">
              Paid Member Pass Required
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed max-w-md mx-auto">
              This technical section is restricted to verified EEvolution 2.0 Paid Members. Please redeem your Treasurer Activation Key or log in to access.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold uppercase rounded-xl hover:opacity-90 transition-opacity"
              >
                Sign In / Register &rarr;
              </Link>
            ) : (
              <Link
                href="/membership"
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Redeem Treasurer Key &rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RULE 2: LOGIN REQUIRED ACCESS RESTRICTION
  if (requiresLogin && !isLoggedIn) {
    return (
      <div className="py-12 px-4 max-w-2xl mx-auto font-sans text-stone-900 dark:text-stone-100">
        <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-300 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider block">
              [ AUTHENTICATION REQUIRED ]
            </span>
            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">
              Sign In to View Academic Content
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed max-w-md mx-auto">
              Please sign in with your student, faculty, or guest account to view this resource module and download technical documents.
            </p>
          </div>

          <div className="pt-2 flex justify-center font-mono text-xs">
            <Link
              href="/login"
              className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold uppercase rounded-xl hover:opacity-90 transition-opacity"
            >
              Sign In to Account &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Permitted -> Render Page Content
  return <>{children}</>;
}
