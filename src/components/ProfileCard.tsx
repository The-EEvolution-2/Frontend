'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import {
  UserCheck,
  Mail,
  Building2,
  Phone,
  GraduationCap,
  Hash,
  ShieldCheck,
  Edit3,
  LogOut,
  BadgeCheck,
  KeyRound,
  Lock,
  AlertCircle,
  CheckCircle2,
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
    is_member?: boolean;
    membership_duration?: string;
    is_admin?: boolean;
  };
  onProfileUpdate?: () => void;
}

export default function ProfileCard({ user, onProfileUpdate }: ProfileCardProps) {
  const router = useRouter();

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Change Password Modal State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Editable Profile Attributes
  const [mobileNo, setMobileNo] = useState(user.mobile_no || '');
  const [batchYear, setBatchYear] = useState(user.batch_year || '2026');
  const [rollNumber, setRollNumber] = useState(user.roll_number || '');
  const [batchGroup, setBatchGroup] = useState(user.batch_group || '1');

  const handleLogout = async () => {
    localStorage.removeItem('ee_guest_user');
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isStudent = user.role?.toLowerCase().includes('student');

      const payload = {
        mobile_no: !isStudent ? mobileNo : null,
        batch_year: isStudent ? batchYear : null,
        roll_number: isStudent ? rollNumber : null,
        batch_group: isStudent ? batchGroup : null,
      };

      const { error: updateErr } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user.id);

      if (updateErr) throw updateErr;

      setIsEditing(false);
      if (onProfileUpdate) onProfileUpdate();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: 'error',
        text: 'Passwords do not match.',
      });
      return;
    }

    setPasswordUpdating(true);
    try {
      // 1. Update password in Supabase Auth
      const { error: authErr } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authErr) throw authErr;

      // 2. Mark profile as having password set
      await supabase
        .from('profiles')
        .update({ has_password: true })
        .eq('id', user.id);

      setPasswordMessage({
        type: 'success',
        text: 'Password updated successfully!',
      });

      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordMessage(null);
      }, 1800);
    } catch (err: unknown) {
      setPasswordMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update password.',
      });
    } finally {
      setPasswordUpdating(false);
    }
  };

  const isStudent = user.role?.toLowerCase().includes('student');
  const isFaculty = user.role?.toLowerCase().includes('faculty') || user.role?.toLowerCase().includes('teacher');

  return (
    <div className="bg-[#FCFCF9] dark:bg-[#161616] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 font-sans shadow-lg space-y-6 text-stone-900 dark:text-stone-100">
      {/* Profile Header Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                {user.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                {user.role}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-700 dark:text-stone-300 font-bold">
                <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {user.is_member ? `Member (${user.membership_duration || '1 Year'})` : 'Standard Access'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors"
          >
            <Edit3 className="w-4 h-4 text-stone-500" />
            <span>Edit Details</span>
          </button>

          {!user.is_guest && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors"
            >
              <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Change Password</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Structured Details Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        <div className="p-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-xl space-y-1">
          <span className="text-stone-500 flex items-center gap-1.5 text-[11px] font-mono uppercase font-semibold">
            <Building2 className="w-3.5 h-3.5 text-stone-500" />
            Department
          </span>
          <p className="font-semibold text-black dark:text-white text-sm">
            {user.department || 'Department of Electrical Engineering'}
          </p>
        </div>

        {isFaculty && (
          <div className="p-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-xl space-y-1">
            <span className="text-stone-500 flex items-center gap-1.5 text-[11px] font-mono uppercase font-semibold">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              Mobile Contact (Teacher)
            </span>
            <p className="font-semibold text-black dark:text-white text-sm">
              {user.mobile_no || 'Not Specified'}
            </p>
          </div>
        )}

        {isStudent && (
          <>
            <div className="p-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-xl space-y-1">
              <span className="text-stone-500 flex items-center gap-1.5 text-[11px] font-mono uppercase font-semibold">
                <Hash className="w-3.5 h-3.5 text-stone-500" />
                Roll Number
              </span>
              <p className="font-semibold text-black dark:text-white text-sm font-mono">
                {user.roll_number || 'N/A'}
              </p>
            </div>

            <div className="p-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-xl space-y-1">
              <span className="text-stone-500 flex items-center gap-1.5 text-[11px] font-mono uppercase font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
                Batch Year &amp; Group
              </span>
              <p className="font-semibold text-black dark:text-white text-sm">
                Batch {user.batch_year || '2026'} • Group {user.batch_group || '1'}
              </p>
            </div>
          </>
        )}

        <div className="p-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-xl space-y-1 md:col-span-2">
          <span className="text-stone-500 text-[11px] font-mono uppercase font-semibold block">
            Academic Scope &amp; Privilege Statement
          </span>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
            {user.bio}
          </p>
        </div>
      </div>

      {/* EDIT DETAILS MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-stone-300 dark:border-stone-800 p-6 max-w-md w-full rounded-xl space-y-4 font-sans text-xs shadow-2xl">
            <h3 className="font-bold text-sm text-black dark:text-white border-b border-stone-200 dark:border-stone-800 pb-2">
              Edit Academic Profile Details
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-stone-500 text-[11px] mb-1 font-medium">Full Name (Read-Only)</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-500 rounded-lg cursor-not-allowed font-semibold"
                />
              </div>

              <div>
                <label className="block text-stone-500 text-[11px] mb-1 font-medium">Email (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-500 rounded-lg cursor-not-allowed"
                />
              </div>

              {isFaculty && (
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">Mobile Contact</label>
                  <input
                    type="tel"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              )}

              {isStudent && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">Batch Year</label>
                      <select
                        value={batchYear}
                        onChange={(e) => setBatchYear(e.target.value)}
                        className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg"
                      >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">Batch Group</label>
                      <select
                        value={batchGroup}
                        onChange={(e) => setBatchGroup(e.target.value)}
                        className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg"
                      >
                        <option value="1">Group 1</option>
                        <option value="2">Group 2</option>
                        <option value="3">Group 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">Roll Number (Format: yy/EE/nn)</label>
                    <input
                      type="text"
                      required
                      pattern="^[0-9]{2}\/[eE][eE]\/[0-9]{2,3}$"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {saving ? 'Saving...' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isChangingPassword && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-stone-300 dark:border-stone-800 p-6 max-w-md w-full rounded-2xl space-y-4 font-sans text-xs shadow-2xl">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="font-mono text-[10px] text-amber-900 dark:text-amber-300 uppercase tracking-wider font-extrabold block flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>[ ACCOUNT SECURITY ]</span>
              </span>
              <h3 className="font-bold text-lg text-black dark:text-white mt-1">
                Change Account Password
              </h3>
            </div>

            {passwordMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
                  passwordMessage.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-900 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-900 dark:text-rose-300'
                }`}
              >
                {passwordMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                )}
                <span>{passwordMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 text-[11px] mb-1 font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordMessage(null);
                  }}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={passwordUpdating}
                  className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{passwordUpdating ? 'Updating...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
