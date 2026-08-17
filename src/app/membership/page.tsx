'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { KeyRound, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function MembershipPage() {
  const [activationKey, setActivationKey] = useState('');
  const [activating, setActivating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setCurrentUser({
          id: session.user.id,
          name: profile?.full_name || session.user.email?.split('@')[0] || 'Member',
          is_member: profile?.is_member || false,
          duration: profile?.membership_duration || null,
        });
      }
    }

    loadSession();
  }, []);

  const handleActivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationKey.trim()) return;

    if (!currentUser) {
      setStatusMessage({
        type: 'error',
        text: 'Please sign in to your account first before activating your membership key.',
      });
      return;
    }

    setActivating(true);
    setStatusMessage(null);

    try {
      const cleanKey = activationKey.trim().toUpperCase();

      // 1. Verify key in activation_keys table
      const { data: keyRecord, error: keyErr } = await supabase
        .from('activation_keys')
        .select('*')
        .eq('key_code', cleanKey)
        .single();

      if (keyErr || !keyRecord) {
        throw new Error('Invalid activation key. Please double-check with the department treasurer.');
      }

      if (keyRecord.is_used) {
        throw new Error('This activation key has already been redeemed.');
      }

      // 2. Mark key as used
      const { error: markErr } = await supabase
        .from('activation_keys')
        .update({
          is_used: true,
          used_by_user_id: currentUser.id,
          used_at: new Date().toISOString(),
        })
        .eq('id', keyRecord.id);

      if (markErr) throw markErr;

      // 3. Update user profile membership status
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({
          is_member: true,
          membership_duration: keyRecord.duration || '1 Year',
        })
        .eq('id', currentUser.id);

      if (profileErr) throw profileErr;

      setCurrentUser((prev: any) => ({
        ...prev,
        is_member: true,
        duration: keyRecord.duration || '1 Year',
      }));

      setStatusMessage({
        type: 'success',
        text: `Success! Your ${keyRecord.duration || '1 Year'} Membership Pass is now active.`,
      });
      setActivationKey('');
    } catch (err: unknown) {
      setStatusMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Activation failed. Please contact the treasurer.',
      });
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-8 text-stone-900 dark:text-stone-100 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">membership</span>
      </div>

      {/* Page Title & Instructions */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          Activate Your Academic Membership
        </h1>

        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
          Direct website online payments are disabled. To obtain your membership activation key, pay the official fees directly to the department treasurer. Enter your key below to redeem your pass.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {/* Column 1: Key Activation Input Box */}
        <div className="border-2 border-stone-800 dark:border-stone-200 bg-[#FCFCF9] dark:bg-[#141414] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="font-mono text-xs text-blue-900 dark:text-blue-400 font-bold uppercase block">
                [ REDEEM TREASURER KEY ]
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                Enter Activation Key
              </h3>
            </div>

            {/* Current Member Status Notification */}
            {currentUser?.is_member && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Active Member Pass: <strong>{currentUser.duration}</strong></span>
              </div>
            )}

            <form onSubmit={handleActivateKey} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                  Activation Key Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EE2026-KEY-XXXX-XXXX"
                  value={activationKey}
                  onChange={(e) => setActivationKey(e.target.value)}
                  className="w-full p-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl font-mono text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>

              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-900 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-900 dark:text-rose-300'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={activating || !activationKey.trim()}
                className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-extrabold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>{activating ? 'Verifying Key...' : 'Activate Membership Now'}</span>
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-500 space-y-1">
            <p className="font-bold text-black dark:text-white">&gt; Key Verification Protocol:</p>
            <p>Every activation code is uniquely issued by the treasurer and can only be redeemed once per student account.</p>
          </div>
        </div>

        {/* Column 2: How to Get Key & Treasurer Contact */}
        <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#161616] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="font-mono text-xs text-stone-500 font-bold uppercase block">
                OFFICIAL PAYMENT PROCEDURE
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                How to Obtain an Activation Key
              </h3>
            </div>

            <ol className="space-y-4 text-xs font-sans text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold font-mono text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-black dark:text-white">Contact Department Treasurer</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    Visit the Electrical Engineering Department office or contact the student council treasurer.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold font-mono text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-black dark:text-white">Pay Fee Amount</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    Pay <strong>₹49 (1 Month Pass)</strong> or <strong>₹469 (1 Year Annual Pass)</strong> directly via cash/UPI.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold font-mono text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-black dark:text-white">Receive Your Unique Activation Key</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    The treasurer will issue an official key code (e.g. <code className="font-mono text-black dark:text-white bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">EE2026-KEY-XXXX-XXXX</code>).
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 text-xs font-mono text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Authorized by Department of Electrical Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
}
