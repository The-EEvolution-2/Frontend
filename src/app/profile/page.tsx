'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ProfileCard from '@/components/ProfileCard';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUserProfile = useCallback(async () => {
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
          department: 'Department of Electrical Engineering',
          is_member: false,
          membership_duration: 'None',
          is_admin: false,
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

      const roleLabel = dbProfile.role === 'student'
        ? 'STUDENT'
        : dbProfile.role === 'faculty'
        ? 'FACULTY / TEACHER'
        : (dbProfile.role || 'MEMBER').toUpperCase();

      const detailsBio = dbProfile.role === 'student'
        ? `Enrolled student in the Department of Electrical Engineering. Access privileges include peer research papers, circuit telemetry, and lab specifications.`
        : dbProfile.role === 'faculty'
        ? `Faculty member in the Department of Electrical Engineering. Privileges include research repository contribution and academic curriculum evaluation.`
        : `Registered ${dbProfile.role} of EEvolution 2.0 Academic Portal.`;

      setProfileData({
        id: user.id,
        name: dbProfile.full_name || user.email?.split('@')[0] || 'Member',
        email: user.email || '',
        role: roleLabel,
        department: dbProfile.department || 'Department of Electrical Engineering',
        mobile_no: dbProfile.mobile_no,
        batch_year: dbProfile.batch_year,
        roll_number: dbProfile.roll_number,
        batch_group: dbProfile.batch_group,
        is_member: dbProfile.is_member || false,
        membership_duration: dbProfile.membership_duration || 'None',
        is_admin: dbProfile.is_admin || false,
        bio: detailsBio,
      });
    } catch (err) {
      console.log('Profile loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

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
      {/* Breadcrumb Path */}
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2 flex justify-between items-center">
        <div>
          <Link href="/" className="hover:underline">domain</Link>
          {' / '}
          <span className="text-black dark:text-white font-bold">profile</span>
        </div>
        <span>EEVOLUTION 2.0 MEMBER DOSSIER</span>
      </div>

      {/* Expanded Full Width Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-mono text-xs">
        {/* Left Side Quick Info & Quick Links Panel */}
        <div className="lg:col-span-1 border-2 border-stone-800 dark:border-stone-200 bg-[#FCFCF9] dark:bg-[#121212] p-5 space-y-5">
          <div className="border-b border-stone-300 dark:border-stone-800 pb-3">
            <h3 className="font-bold text-black dark:text-white uppercase">[ SYSTEM STATUS ]</h3>
            <p className="text-stone-500 mt-1">SESSION: AUTHENTICATED</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-stone-700 dark:text-stone-300 uppercase">&gt; QUICK PORTAL ACCESS</h4>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-400">
              <li><Link href="/resources" className="hover:underline hover:text-black dark:hover:text-white">&rarr; Technical Resources Index</Link></li>
              <li><Link href="/projects" className="hover:underline hover:text-black dark:hover:text-white">&rarr; Engineering Repositories</Link></li>
              <li><Link href="/research" className="hover:underline hover:text-black dark:hover:text-white">&rarr; Peer Research Archive</Link></li>
              <li><Link href="/software" className="hover:underline hover:text-black dark:hover:text-white">&rarr; Software Tools &amp; Patches</Link></li>
            </ul>
          </div>

          <div className="pt-3 border-t border-stone-300 dark:border-stone-800 text-[11px] text-stone-500">
            <p>DEPARTMENT OF ELECTRICAL ENGINEERING</p>
            <p className="mt-0.5">TELEMETRY &amp; SCHOLAR ARCHIVE</p>
          </div>
        </div>

        {/* Center-Right Main Dossier Section */}
        <div className="lg:col-span-3">
          <ProfileCard user={profileData} onProfileUpdate={loadUserProfile} />
        </div>
      </div>
    </div>
  );
}
