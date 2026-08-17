'use client';

import React, { useState, useEffect } from 'react';
import { LogIn, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function TimedLoginPromptModal() {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    async function checkUserSession() {
      // 1. Check if user is already authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) return; // Authenticated -> do not show popup

      // 2. Check if guest session exists
      const guestData = localStorage.getItem('ee_guest_user');
      if (guestData) return; // Guest active -> do not show popup

      // 3. Check if user dismissed prompt in this session
      const dismissed = sessionStorage.getItem('ee_login_prompt_dismissed');
      if (dismissed) return;

      // 4. Set timer: trigger popup after 45 seconds of website browsing
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 45000);

      return () => clearTimeout(timer);
    }

    checkUserSession();
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('ee_login_prompt_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full font-sans text-xs animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#FCFCF9] dark:bg-[#161616] border border-stone-300 dark:border-stone-800 p-5 rounded-xl shadow-2xl space-y-3 relative text-stone-900 dark:text-stone-100">
        <button
          onClick={handleDismiss}
          title="Dismiss prompt"
          className="absolute top-3.5 right-3.5 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 pr-4">
          <span className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
            EEVOLUTION 2.0 ACCESSION
          </span>
          <h4 className="font-bold text-sm text-black dark:text-white">
            Unlock Full Academic Archive Access
          </h4>
          <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
            You are browsing as an unauthenticated visitor. Sign in or register to save research papers and access complete telemetry datasets.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href="/login"
            onClick={() => setShowPrompt(false)}
            className="flex-1 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-semibold text-center rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </Link>

          <button
            onClick={handleDismiss}
            className="px-3 py-2 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
