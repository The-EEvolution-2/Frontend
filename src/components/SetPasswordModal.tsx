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

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  useEffect(() => {
    async function checkPasswordStatus() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) return;

        const currentUser = session.user;
        setUser(currentUser);

        const isGoogleUser = currentUser.app_metadata?.provider === 'google' ||
          currentUser.app_metadata?.providers?.includes('google');

        if (!isGoogleUser) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('has_password')
          .eq('id', currentUser.id)
          .single();

        if (profile && profile.has_password === true) {
          return;
        }

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
      const { error: updateAuthErr } = await supabase.auth.updateUser({
        password,
      });

      if (updateAuthErr) throw updateAuthErr;

      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ has_password: true })
        .eq('id', user.id);

      if (profileErr) throw profileErr;

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-xs">
      <div className="bg-[#FCFCF9] dark:bg-[#161616] border border-stone-300 dark:border-stone-800 p-6 sm:p-7 max-w-sm w-full rounded-lg shadow-2xl space-y-4 relative text-stone-900 dark:text-stone-100">
        {/* Close Button */}
        <button
          onClick={handleIgnore}
          title="Close modal"
          className="absolute top-4 right-4 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 pr-4">
          <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-[11px] font-mono uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>ACCOUNT SECURITY</span>
          </div>
          <h3 className="text-base font-bold text-black dark:text-white">
            Set Account Password
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
            Create a password to enable email &amp; password sign-in alongside Google login.
          </p>
        </div>

        {error && (
          <div className="p-3 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs rounded flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-center space-y-1">
            <CheckCircle className="w-5 h-5 mx-auto text-black dark:text-white" />
            <h4 className="font-bold text-xs">Password Set Successfully</h4>
            <p className="text-[11px] text-stone-500">You can now log in using both methods.</p>
          </div>
        ) : (
          <form onSubmit={handleCreatePassword} className="space-y-3">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-mono uppercase">
                Account Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 text-stone-500 rounded font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-mono uppercase">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-mono uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleIgnore}
                className="px-3 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold uppercase rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Skip for now
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-black text-xs font-mono font-bold uppercase rounded hover:opacity-90 transition-opacity"
              >
                {loading ? 'Saving...' : 'Set Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
