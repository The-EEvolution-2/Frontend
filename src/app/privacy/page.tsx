import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-6 text-stone-900 dark:text-stone-100 max-w-4xl mx-auto">
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">privacy-policy</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight uppercase">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-1">
          DEPARTMENT OF ELECTRICAL ENGINEERING • DATA PROTECTION &amp; PRIVACY
        </p>
      </div>

      <div className="space-y-6 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans bg-[#FCFCF9] dark:bg-[#141414] border border-stone-300 dark:border-stone-800 p-6 sm:p-8 rounded-xl shadow-sm">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">1. Information We Collect</h3>
          <p>
            We collect academic profile details including full name, email address, roll number, batch year, and mobile contact details exclusively to verify student and faculty identity within the Department of Electrical Engineering.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">2. How We Use Your Data</h3>
          <p>
            Your information is strictly used for authentication, issuing membership passes, enabling community forum posts, and granting access to specialized software utilities and IEEE research archives.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">3. Security &amp; Row-Level Protection</h3>
          <p>
            All user data is encrypted and safeguarded by PostgreSQL Row-Level Security (RLS) policies. We do not sell, share, or disclose personal data to third-party advertisers or commercial entities.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">4. Authentication Providers</h3>
          <p>
            If you authenticate via Google OAuth, we retrieve your verified Gmail address and primary profile name to establish your academic identity record securely.
          </p>
        </section>
      </div>
    </div>
  );
}
