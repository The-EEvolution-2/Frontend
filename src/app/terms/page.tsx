import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-6 text-stone-900 dark:text-stone-100 max-w-4xl mx-auto">
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">terms-and-conditions</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight uppercase">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-1">
          DEPARTMENT OF ELECTRICAL ENGINEERING • ACADEMIC &amp; RESEARCH ARCHIVE
        </p>
      </div>

      <div className="space-y-6 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans bg-[#FCFCF9] dark:bg-[#141414] border border-stone-300 dark:border-stone-800 p-6 sm:p-8 rounded-xl shadow-sm">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">1. Acceptance of Terms</h3>
          <p>
            By creating an account, logging in, or accessing the EEvolution 2.0 technical archive, you agree to comply with and be bound by these Terms and Conditions. These terms apply to all students, faculty members, and external research partners.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">2. Academic Archive &amp; Intellectual Property</h3>
          <p>
            All technical documentations, circuit schematics, Verilog code repositories, and research manuscripts published on EEvolution 2.0 are the intellectual property of the Department of Electrical Engineering and respective contributing authors. Redistribution without written consent from the department head is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">3. Membership Activation Keys</h3>
          <p>
            Membership passes are non-transferable and issued exclusively through official key codes provided by the department treasurer. Unapproved key sharing or fraudulent redemption attempts will result in immediate account suspension.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-black dark:text-white uppercase font-mono">4. Forum &amp; Community Conduct</h3>
          <p>
            Users are required to maintain academic integrity and professional decorum when posting on the community feed. Posts containing misinformation, offensive content, or unauthorized software cracks will be removed immediately by administrators.
          </p>
        </section>
      </div>
    </div>
  );
}
