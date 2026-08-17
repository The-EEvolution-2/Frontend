'use client';

import React, { useState } from 'react';
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
    is_admin?: boolean;
  };
  onProfileUpdate?: () => void;
}

export default function ProfileCard({ user, onProfileUpdate }: ProfileCardProps) {
  const router = useRouter();

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable Profile Attributes (Name & Email remain read-only)
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

  const isStudent = user.role?.toLowerCase().includes('student');
  const isFaculty = user.role?.toLowerCase().includes('faculty') || user.role?.toLowerCase().includes('teacher');

  return (
    <div className="bg-[#FCFCF9] dark:bg-[#121212] border-2 border-stone-800 dark:border-stone-200 p-6 font-mono text-xs text-stone-900 dark:text-stone-100 space-y-6">
      {/* Header Bar */}
      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-4 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="text-[11px] text-stone-500 font-bold uppercase">
            [ EEVOLUTION 2.0 ACADEMIC RECORD ]
          </div>
          <h2 className="text-xl font-bold uppercase text-black dark:text-white mt-1">
            MEMBER: {user.name.toUpperCase()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 border-2 border-stone-800 dark:border-stone-200 bg-white dark:bg-stone-900 text-black dark:text-white font-bold uppercase hover:bg-stone-200 dark:hover:bg-stone-800"
          >
            [ EDIT DETAILS ]
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 border-2 border-stone-800 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-black font-bold uppercase hover:underline"
          >
            [ LOGOUT SESSION ]
          </button>
        </div>
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
          <span className="font-bold text-stone-500">FULL NAME (READ-ONLY):</span>
          <span className="font-bold text-black dark:text-white">{user.name}</span>
        </div>

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">EMAIL ADDRESS (READ-ONLY):</span>
          <span className="text-stone-900 dark:text-stone-200">{user.email}</span>
        </div>

        <div className="p-3 flex justify-between">
          <span className="font-bold text-stone-500">DEPARTMENT:</span>
          <span className="text-stone-900 dark:text-stone-200">{user.department || 'Department of Electrical Engineering'}</span>
        </div>

        {isFaculty && (
          <div className="p-3 flex justify-between">
            <span className="font-bold text-stone-500">MOBILE CONTACT (TEACHER):</span>
            <span className="text-stone-900 dark:text-stone-200">{user.mobile_no || 'Not Set'}</span>
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

      {/* EDIT MODAL DIALOG */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FCFCF9] dark:bg-[#141414] border-2 border-stone-800 dark:border-stone-200 p-6 max-w-md w-full space-y-4 font-mono text-xs">
            <h3 className="font-bold text-sm text-black dark:text-white uppercase border-b border-stone-300 dark:border-stone-800 pb-2">
              [ EDIT ACADEMIC DETAILS ]
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-stone-500 mb-1">Full Name (Read-Only):</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 text-stone-500 cursor-not-allowed font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-500 mb-1">Email (Read-Only):</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 text-stone-500 cursor-not-allowed"
                />
              </div>

              {isFaculty && (
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Mobile Contact:</label>
                  <input
                    type="tel"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white"
                  />
                </div>
              )}

              {isStudent && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Batch Year:</label>
                      <select
                        value={batchYear}
                        onChange={(e) => setBatchYear(e.target.value)}
                        className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white"
                      >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Batch Group:</label>
                      <select
                        value={batchGroup}
                        onChange={(e) => setBatchGroup(e.target.value)}
                        className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white"
                      >
                        <option value="1">Group 1</option>
                        <option value="2">Group 2</option>
                        <option value="3">Group 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Roll Number (yy/EE/nn):</label>
                    <input
                      type="text"
                      required
                      pattern="^[0-9]{2}\/[eE][eE]\/[0-9]{2,3}$"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-300 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 border border-stone-400 text-stone-700 dark:text-stone-300 font-bold uppercase"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold uppercase"
                >
                  {saving ? 'Saving...' : '[ SAVE CHANGES ]'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
