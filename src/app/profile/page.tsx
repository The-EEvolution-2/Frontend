'use client';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserProfile() {
      setLoading(true);
      try {
        // 1. Check if guest session exists
        const guestData = localStorage.getItem('ee_guest_user');
        if (guestData) {
          const parsed = JSON.parse(guestData);
          setProfileData({
            id: 'guest',
            name: parsed.full_name,
            email: 'guest@eevolution.edu',
            role: 'Guest Access',
            bio: `Guest researcher exploring Department of Electrical Engineering technical archives.`,
          });
          setLoading(false);
          return;
        }

        // 2. Check Supabase authenticated user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
          return;
        }

        const user = session.user;
        const { data: dbProfile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileErr || !dbProfile || !dbProfile.full_name) {
          router.push('/login');
          return;
        }

        const isStudent = dbProfile.role === 'student';
        const roleLabel = isStudent
          ? `Student (Batch ${dbProfile.batch_year || '2026'} - Group ${dbProfile.batch_group || '1'})`
          : dbProfile.role === 'faculty'
          ? 'Faculty / Teacher'
          : dbProfile.role.toUpperCase();

        const detailsBio = isStudent
          ? `Roll No: ${dbProfile.roll_number || 'N/A'} | Department: ${dbProfile.department || 'Electrical Engineering'}`
          : `Mobile: ${dbProfile.mobile_no || 'N/A'} | Department: ${dbProfile.department || 'Electrical Engineering'}`;

        setProfileData({
          id: user.id,
          name: dbProfile.full_name || user.email?.split('@')[0] || 'Member',
          email: user.email || '',
          role: roleLabel,
          bio: detailsBio,
        });
      } catch (err) {
        console.log('Profile loading error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="py-16 px-4 text-center font-mono text-xs text-stone-500">
        Fetching profile details from Supabase user table...
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <span>domain / profile</span>
      </div>

      <div className="max-w-2xl mx-auto border border-stone-300 dark:border-stone-800 rounded">
        <ProfileCard user={profileData} />
      </div>
    </div>
  );
}
