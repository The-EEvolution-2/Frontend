import React from 'react';
import Link from 'next/link';

export interface MembershipTier {
  id: string;
  name: string;
  badge: string;
  fee: string;
  benefits: string[];
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'tier-01',
    name: 'Student & Academic Member',
    badge: 'ACADEMIC ACCESS',
    fee: 'Complimentary / Verified Institutional Email',
    benefits: [
      'Access to full technical documentation archive & PDF spec downloads',
      'Participation in community Q&A and schematic peer-review threads',
      'Access to basic PCB calculation software & Verilog state simulators',
    ],
  },
  {
    id: 'tier-02',
    name: 'Professional Engineering Member',
    badge: 'FULL ACCESS',
    fee: '$45 / Annual Membership',
    benefits: [
      'Everything in Academic Member tier',
      'Direct API telemetry access for live experimental GaN & power dataset streaming',
      'Priority manuscript review and peer-publishing submission rights',
      'Admin control panel telemetry integration for enterprise hardware teams',
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      <div className="text-xs font-mono text-stone-500">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">membership</span>
      </div>

      <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">
          EEVOLUTION 2.0 ACADEMIC &amp; PROFESSIONAL MEMBERSHIP
        </h1>
        <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
          SELECT INSTITUTIONAL OR PROFESSIONAL MEMBERSHIP TIERS FOR ARCHIVE ACCESS, TELEMETRY APIS, AND MANUSCRIPT SUBMISSION RIGHTS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEMBERSHIP_TIERS.map((tier) => (
          <div key={tier.id} className="p-6 border border-stone-300 dark:border-stone-800 bg-[#F8F8F5] dark:bg-[#161616] space-y-4 font-serif">
            <div className="flex items-baseline justify-between border-b border-stone-300 dark:border-stone-800 pb-2">
              <span className="font-mono text-xs font-bold text-blue-900 dark:text-blue-400">[{tier.badge}]</span>
              <span className="font-mono text-xs text-stone-500">{tier.fee}</span>
            </div>

            <h3 className="text-xl font-bold text-black dark:text-white">
              {tier.name}
            </h3>

            <ul className="text-xs space-y-2 text-stone-800 dark:text-stone-300 font-mono">
              {tier.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>&rarr;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-stone-300 dark:border-stone-800 font-mono text-xs">
              <Link href="/login" className="inline-block px-4 py-2 border border-stone-800 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-black font-bold uppercase hover:underline">
                Register Membership &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
