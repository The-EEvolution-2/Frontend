'use client';

import React, { useState, useEffect } from 'react';
import { LogIn, KeyRound, X, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function TimedLoginPromptModal() {
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const [showMembershipPopup, setShowMembershipPopup] = useState<boolean>(false);

  useEffect(() => {
    async function checkSessionAndSetPrompts() {
      // 1. Check active Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      let isMember = false;

      if (user) {
        // User logged in -> fetch profile membership status
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_member, role')
          .eq('id', user.id)
          .single();

        if (profile?.is_member || profile?.role === 'superadmin' || profile?.role === 'admin') {
          isMember = true;
        }
      }

      // 2. Login Prompt logic: strictly only for unauthenticated visitors (never if logged in or guest)
      const guestData = localStorage.getItem('ee_guest_user');
      const loginDismissed = sessionStorage.getItem('ee_login_prompt_dismissed');

      if (!user && !guestData && !loginDismissed) {
        // Trigger Login popup after 8 seconds of browsing for unauthenticated visitors
        const loginTimer = setTimeout(() => {
          setShowLoginPopup(true);
        }, 8000);
        return () => clearTimeout(loginTimer);
      }

      // 3. Membership Prompt logic: strictly only for logged-in non-members or guest users (never if already a verified member)
      const membershipDismissed = sessionStorage.getItem('ee_membership_prompt_dismissed');
      if (!isMember && (user || guestData) && !membershipDismissed) {
        // Trigger Membership Treasurer Activation Key popup after 12 seconds of browsing
        const membershipTimer = setTimeout(() => {
          setShowMembershipPopup(true);
        }, 12000);
        return () => clearTimeout(membershipTimer);
      }
    }

    checkSessionAndSetPrompts();
  }, []);

  const handleDismissLogin = () => {
    sessionStorage.setItem('ee_login_prompt_dismissed', 'true');
    setShowLoginPopup(false);
  };

  const handleDismissMembership = () => {
    sessionStorage.setItem('ee_membership_prompt_dismissed', 'true');
    setShowMembershipPopup(false);
  };

  if (!showLoginPopup && !showMembershipPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full font-sans text-xs flex flex-col-reverse gap-3 pointer-events-none max-h-[calc(100vh-100px)] overflow-y-auto pr-1">
      {/* POPUP 1: SIGN IN / REGISTER PROMPT (STRICTLY FOR UNAUTHENTICATED VISITORS) */}
      {showLoginPopup && (
        <div className="pointer-events-auto bg-[#FCFCF9] dark:bg-[#161616] border-2 border-stone-800 dark:border-stone-200 p-5 rounded-2xl shadow-2xl space-y-3 relative text-stone-900 dark:text-stone-100 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={handleDismissLogin}
            title="Dismiss prompt"
            className="absolute top-3.5 right-3.5 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1 pr-4">
            <span className="font-mono text-[10px] text-blue-900 dark:text-blue-400 uppercase tracking-wider font-extrabold block">
              [ EEVOLUTION 2.0 PORTAL ACCESS ]
            </span>
            <h4 className="font-bold text-sm text-black dark:text-white tracking-tight">
              Unlock Full Academic &amp; Research Archive
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
              You are browsing as an unauthenticated visitor. Sign in or create an account to access complete technical specifications.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/login"
              onClick={() => setShowLoginPopup(false)}
              className="flex-1 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider text-center rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </Link>

            <button
              onClick={handleDismissLogin}
              className="px-3.5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-mono text-xs font-bold uppercase rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* POPUP 2: TREASURER ACTIVATION KEY MEMBERSHIP PROMPT (STRICTLY FOR NON-MEMBERS) */}
      {showMembershipPopup && (
        <div className="pointer-events-auto bg-[#FCFCF9] dark:bg-[#161616] border-2 border-stone-800 dark:border-stone-200 p-5 rounded-2xl shadow-2xl space-y-3 relative text-stone-900 dark:text-stone-100 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={handleDismissMembership}
            title="Dismiss prompt"
            className="absolute top-3.5 right-3.5 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1 pr-4">
            <span className="font-mono text-[10px] text-amber-900 dark:text-amber-300 uppercase tracking-wider font-extrabold block flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>[ MEMBER PASS ACTIVATION ]</span>
            </span>
            <h4 className="font-bold text-sm text-black dark:text-white tracking-tight">
              Activate Your Academic Member Pass
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
              Obtain your official activation key from the department treasurer to unlock practice set solutions, research papers, and software downloads.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/membership"
              onClick={() => setShowMembershipPopup(false)}
              className="flex-1 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider text-center rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-md"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Redeem Key Now</span>
            </Link>

            <button
              onClick={handleDismissMembership}
              className="px-3.5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-mono text-xs font-bold uppercase rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
