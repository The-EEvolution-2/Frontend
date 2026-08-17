'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, CheckCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function SetPasswordModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkPasswordStatus() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) return;

        const currentUser = session.user;
        setUser(currentUser);

        // Check if user logged in via Google OAuth
        const isGoogleUser = currentUser.app_metadata?.provider === 'google' ||
          currentUser.app_metadata?.providers?.includes('google');

        if (!isGoogleUser) return; // Email/password users already have a password

        // Check profiles table for has_password status
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_password')
          .eq('id', currentUser.id)
          .single();

        if (profile && profile.has_password === true) {
          return; // Password already created -> do not show modal
        }

        // Show popup modal on home screen for Google users without a password
        setShowModal(true);
      } catch (err) {
        console.log('Password check error:', err);
      }
    }

    checkPasswordStatus();
  }, []);

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // 1. Update user password in Supabase Auth
      const { error: updateAuthErr } = await supabase.auth.updateUser({
        password,
      });

      if (updateAuthErr) throw updateAuthErr;

      // 2. Mark has_password = true in public.profiles table
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ has_password: true })
        .eq('id', user.id);

      if (profileErr) throw profileErr;

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to set account password.');
    } finally {
      setLoading(false);
    }
  };

  const handleIgnore = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-mono text-xs">
      <div className="bg-[#FCFCF9] dark:bg-[#141414] border-2 border-stone-800 dark:border-stone-200 p-6 sm:p-8 max-w-md w-full rounded-lg shadow-2xl space-y-5 relative">
        {/* Close / Ignore Button */}
        <button
          onClick={handleIgnore}
          title="Ignore for now"
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-400 font-bold uppercase mb-1">
            <Lock className="w-4 h-4" />
            <span>[ ACCOUNT SECURITY ENHANCEMENT ]</span>
          </div>
          <h3 className="text-base font-bold text-black dark:text-white">
            Set Password for Dual Sign-In
          </h3>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed mt-1 text-[11px]">
            You signed in via Google. Add a password to enable logging in via both Google OAuth and Email/Password!
          </p>
        </div>

        {error && (
          <div className="p-3 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded text-center space-y-1">
            <CheckCircle className="w-6 h-6 mx-auto text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-sm">PASSWORD CREATED SUCCESSFULLY!</h4>
            <p className="text-[11px]">You can now log in using either Google or your email and password.</p>
          </div>
        ) : (
          <form onSubmit={handleCreatePassword} className="space-y-4">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Account Email (Read-Only):
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                New Password (Min 6 chars):
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleIgnore}
                className="flex-1 py-2.5 border border-stone-400 text-stone-700 dark:text-stone-300 font-bold uppercase rounded hover:bg-stone-200 dark:hover:bg-stone-800 text-center"
              >
                [ REMIND NEXT TIME ]
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold uppercase rounded hover:opacity-90 transition-opacity text-center"
              >
                {loading ? 'Securing...' : '[ SET PASSWORD NOW ]'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
