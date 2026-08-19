'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, UserCheck, ShieldAlert, ArrowRight, ShieldCheck, Cpu, BookOpen, KeyRound, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  // Auth Mode: 'signin' | 'signup' | 'onboarding' | 'guest'
  const [mode, setMode] = useState<'signin' | 'signup' | 'onboarding' | 'guest'>('signin');
  const [role, setRole] = useState<'student' | 'faculty'>('student');

  // Terms & Privacy Checkbox Agreements (Required only when creating a new account / guest)
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  // Login credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // First-time Onboarding Profile Data
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [batchYear, setBatchYear] = useState('2026');
  const [department] = useState('Department of Electrical Engineering');
  const [rollNumber, setRollNumber] = useState('');
  const [batchGroup, setBatchGroup] = useState('1');

  // Guest Onboarding
  const [guestName, setGuestName] = useState('');

  // Check session on load and handle first-time Google sign in redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkUserProfile(session.user);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        checkUserProfile(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserProfile = async (user: any) => {
    try {
      const { data, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileErr || !data || !data.full_name || !data.role || data.role === 'normal') {
        setFullName(data?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || '');
        setEmail(user.email || '');
        setMode('onboarding');
      } else {
        router.push('/profile');
      }
    } catch {
      setMode('onboarding');
    }
  };

  const validateAgreements = (): boolean => {
    if (mode === 'signup' && (!agreedTerms || !agreedPrivacy)) {
      setError('Please read and agree to both the Terms & Conditions and Privacy Policy before creating a new account.');
      return false;
    }
    return true;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAgreements()) return;

    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { data, error: authErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (authErr) throw authErr;
        if (data.user) {
          checkUserProfile(data.user);
        }
      } else {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authErr) throw authErr;
        if (data.user) {
          checkUserProfile(data.user);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!validateAgreements()) return;

    setLoading(true);
    setError(null);
    try {
      const { error: authErr } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
      if (authErr) throw authErr;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google authentication failed');
      setLoading(false);
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) throw new Error('No active user session found. Please sign in again.');

      const profilePayload = {
        id: user.id,
        email: user.email,
        full_name: fullName,
        role,
        mobile_no: role === 'faculty' ? mobileNo : null,
        batch_year: role === 'student' ? batchYear : null,
        department,
        roll_number: role === 'student' ? rollNumber : null,
        batch_group: role === 'student' ? batchGroup : null,
        is_guest: false,
      };

      const { error: profileErr } = await supabase
        .from('profiles')
        .upsert([profilePayload], { onConflict: 'id' });

      if (profileErr) throw profileErr;

      router.push('/profile');
    } catch (err: unknown) {
      console.log('Profile save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile details');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setError('Please enter your name to proceed as guest');
      return;
    }

    setLoading(true);
    localStorage.setItem('ee_guest_user', JSON.stringify({
      full_name: guestName,
      role: 'guest',
      department,
      is_guest: true,
    }));

    router.push('/profile');
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-sans text-stone-900 dark:text-stone-100">
      {/* Left Column: Academic Portal Branding & Perks (5 Grid Span) */}
      <div className="md:col-span-5 space-y-6 hidden md:block pr-4">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE ACADEMIC ACCESS</span>
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
            EEvolution 2.0 Accession Portal
          </h1>

          <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
            Welcome to the official repository for Electrical Engineering students and faculty. Access solution manuals, circuit schematics, and research papers.
          </p>
        </div>

        <div className="space-y-3 text-xs font-sans">
          <div className="p-3.5 border border-stone-200 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black dark:text-white">Practice Set Archives</h4>
              <p className="text-stone-500 text-[11px]">Comprehensive problem solutions for EE course modules.</p>
            </div>
          </div>

          <div className="p-3.5 border border-stone-200 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl flex items-start gap-3">
            <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black dark:text-white">Flagship Hardware Repos</h4>
              <p className="text-stone-500 text-[11px]">Downloadable Verilog codes and PCB design schematics.</p>
            </div>
          </div>

          <div className="p-3.5 border border-stone-200 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black dark:text-white">Treasurer Key Redemption</h4>
              <p className="text-stone-500 text-[11px]">Activate full member passes issued by department council.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sleek Auth Form Box (7 Grid Span) */}
      <div className="md:col-span-7 border-2 border-stone-800 dark:border-stone-200 bg-[#FCFCF9] dark:bg-[#141414] p-6 sm:p-8 font-sans shadow-2xl rounded-2xl space-y-6">
        {/* Header */}
        <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
          <h2 className="text-xl font-extrabold text-black dark:text-white uppercase tracking-tight">
            {mode === 'onboarding'
              ? 'FIRST-TIME ACCOUNT PROFILE SETUP'
              : mode === 'guest'
              ? 'GUEST ACCESS ACCESSION'
              : mode === 'signup'
              ? 'CREATE EEVOLUTION ACCOUNT'
              : 'MEMBER SIGN IN'}
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            {mode === 'onboarding'
              ? 'Specify academic credentials to complete accession'
              : mode === 'signup'
              ? 'Register a new student or faculty account'
              : 'Sign in to access your student or faculty account'}
          </p>
        </div>

        {error && (
          <div className="p-3 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2 font-mono">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Mandatory Policy Agreement Box ONLY FOR SIGN UP MODE */}
        {mode === 'signup' && (
          <div className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/60 rounded-xl space-y-2.5 text-xs">
            <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block tracking-wider">
              [ MANDATORY REGISTRATION POLICIES AGREEMENT ]
            </span>

            <label className="flex items-start gap-2.5 cursor-pointer text-stone-800 dark:text-stone-200 select-none">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => {
                  setAgreedTerms(e.target.checked);
                  if (error) setError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500 cursor-pointer"
              />
              <span>
                I have read and agree to the{' '}
                <Link href="/terms" target="_blank" className="font-bold underline text-blue-600 dark:text-blue-400 hover:opacity-80">
                  Terms &amp; Conditions
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-stone-800 dark:text-stone-200 select-none">
              <input
                type="checkbox"
                checked={agreedPrivacy}
                onChange={(e) => {
                  setAgreedPrivacy(e.target.checked);
                  if (error) setError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500 cursor-pointer"
              />
              <span>
                I have read and agree to the{' '}
                <Link href="/privacy" target="_blank" className="font-bold underline text-blue-600 dark:text-blue-400 hover:opacity-80">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        )}

        {/* 1. SIGN IN & SIGN UP FORM */}
        {(mode === 'signin' || mode === 'signup') && (
          <div className="space-y-4 text-xs">
            {/* Google OAuth Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 p-3 border border-stone-400 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl transition-all font-bold shadow-sm ${
                mode === 'signup' && (!agreedTerms || !agreedPrivacy) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.32 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 10.02 0 12s.46 3.83 1.26 5.42l4.02-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-stone-200 dark:border-stone-800"></div>
              <span className="px-2 font-mono text-[10px] text-stone-400 uppercase tracking-wider">OR EMAIL LOGIN</span>
              <div className="flex-1 border-t border-stone-200 dark:border-stone-800"></div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Email Address:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Password:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (mode === 'signup' && (!agreedTerms || !agreedPrivacy))}
                className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              </button>
            </form>

            {/* Mode Switchers */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2 text-xs text-center font-sans">
              {mode === 'signin' ? (
                <p className="text-stone-600 dark:text-stone-400">
                  Don&apos;t have an account?{' '}
                  <button onClick={() => setMode('signup')} className="underline font-bold text-black dark:text-white hover:opacity-80">
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-stone-600 dark:text-stone-400">
                  Already registered?{' '}
                  <button onClick={() => setMode('signin')} className="underline font-bold text-black dark:text-white hover:opacity-80">
                    Sign In
                  </button>
                </p>
              )}

              <button
                onClick={() => setMode('guest')}
                className="mt-1 text-stone-500 hover:text-black dark:hover:text-white underline font-mono text-[11px]"
              >
                [ Continue as Guest Access ]
              </button>
            </div>
          </div>
        )}

        {/* 2. FIRST TIME ONBOARDING PROFILE FORM */}
        {mode === 'onboarding' && (
          <form onSubmit={handleOnboardingSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Select Academic Role:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-2.5 border rounded-xl font-bold uppercase tracking-wider transition-colors ${
                    role === 'student'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black border-stone-900 dark:border-stone-100'
                      : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('faculty')}
                  className={`p-2.5 border rounded-xl font-bold uppercase tracking-wider transition-colors ${
                    role === 'faculty'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black border-stone-900 dark:border-stone-100'
                      : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Faculty / Teacher
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
                {role === 'student' ? 'Student Full Name:' : 'Faculty Full Name:'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prof. Alan Turing or Alex Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Department:</label>
              <input
                type="text"
                readOnly
                value={department}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 rounded-xl cursor-not-allowed font-medium"
              />
            </div>

            {role === 'faculty' && (
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Mobile Number (Teachers Only):</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>
            )}

            {role === 'student' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Batch Year:</label>
                    <select
                      value={batchYear}
                      onChange={(e) => setBatchYear(e.target.value)}
                      className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500"
                    >
                      <option value="2024">Batch 2024</option>
                      <option value="2025">Batch 2025</option>
                      <option value="2026">Batch 2026</option>
                      <option value="2027">Batch 2027</option>
                      <option value="2028">Batch 2028</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Batch Group:</label>
                    <select
                      value={batchGroup}
                      onChange={(e) => setBatchGroup(e.target.value)}
                      className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500"
                    >
                      <option value="1">Batch 1</option>
                      <option value="2">Batch 2</option>
                      <option value="3">Batch 3</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
                    Roll Number (Format: yy/EE/nn):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24/EE/05"
                    pattern="^[0-9]{2}\/[eE][eE]\/[0-9]{2,3}$"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-mono"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{loading ? 'Saving Profile...' : 'Complete Profile & Enter'}</span>
            </button>
          </form>
        )}

        {/* 3. GUEST ACCESS FORM */}
        {mode === 'guest' && (
          <form onSubmit={handleGuestSignIn} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Your Full Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Guest Researcher"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Access Level:</label>
              <input
                type="text"
                readOnly
                value="Guest Read-Only Access"
                className="w-full p-2.5 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 rounded-xl cursor-not-allowed font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Enter as Guest</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('signin')}
              className="w-full text-stone-500 hover:text-black dark:hover:text-white underline font-mono text-[11px] text-center"
            >
              [ Back to Sign In ]
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
