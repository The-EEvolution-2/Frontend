'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-8 text-stone-900 dark:text-stone-100">
      {/* Breadcrumb Path */}
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">membership</span>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-mono text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AFORDABLE SCHOLAR &amp; PRACTICE SET ACCESS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          Upgrade Your Electrical Engineering Membership
        </h1>

        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Access complete practice set solutions, hardware project schematics, downloadable software tools, and peer-reviewed research archives.
        </p>

        {/* Monthly / Yearly Billing Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs">
          <span className={`font-medium ${billingCycle === 'monthly' ? 'text-black dark:text-white font-bold' : 'text-stone-500'}`}>
            Monthly Billing
          </span>

          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-stone-300 dark:bg-stone-800 rounded-full p-1 transition-colors duration-200 focus:outline-none"
          >
            <div
              className={`w-5 h-5 bg-stone-900 dark:bg-stone-100 rounded-full shadow-md transform transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>

          <span className={`font-medium flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-black dark:text-white font-bold' : 'text-stone-500'}`}>
            Annual Plan
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
        {/* Tier 1: Free Basic Access */}
        <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-stone-500 font-bold uppercase">FREE ACCESS</span>
                <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                  Basic Student Plan
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold">
                COMPLIMENTARY
              </span>
            </div>

            <div className="pt-2 border-b border-stone-200 dark:border-stone-800 pb-4">
              <span className="text-3xl font-extrabold text-black dark:text-white">₹0</span>
              <span className="text-stone-500 text-xs font-mono"> / forever</span>
            </div>

            <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-300 font-sans">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Access to free general documentation &amp; history articles</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>View open hardware projects &amp; circuit repositories</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Community correspondence &amp; discussion threads</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              href="/login"
              className="w-full py-3 border border-stone-400 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold text-xs uppercase tracking-wider text-center block rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Current Free Access
            </Link>
          </div>
        </div>

        {/* Tier 2: Premium Scholar Plan (₹49/month or ₹469/year) */}
        <div className="border-2 border-stone-900 dark:border-stone-100 bg-[#FCFCF9] dark:bg-[#161616] rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-[10px] font-bold uppercase rounded-full tracking-wider flex items-center gap-1 shadow-md">
            <Zap className="w-3 h-3 text-amber-400 dark:text-amber-600 fill-amber-400 dark:fill-amber-600" />
            MOST POPULAR
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-blue-900 dark:text-blue-400 font-bold uppercase">FULL ARCHIVE PASS</span>
                <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                  Premium Scholar Pass
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                UNLIMITED
              </span>
            </div>

            <div className="pt-2 border-b border-stone-200 dark:border-stone-800 pb-4">
              {billingCycle === 'monthly' ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-black dark:text-white">₹49</span>
                  <span className="text-stone-500 text-xs font-mono"> / month</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-black dark:text-white">₹469</span>
                  <span className="text-stone-500 text-xs font-mono"> / year</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono ml-2">(₹39/mo)</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 text-xs text-stone-800 dark:text-stone-200 font-sans">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-bold text-black dark:text-white">Unlimited access to practice set books &amp; solution manuals</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-bold text-black dark:text-white">Full download access for software utilities, patch notes &amp; installers</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Complete hardware project schematics &amp; embedded code repos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Peer-reviewed IEEE research paper downloads</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Priority manuscript review submission rights</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              href="/login"
              className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-extrabold text-xs uppercase tracking-wider text-center block rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Premium Access (₹{billingCycle === 'monthly' ? '49' : '469'})
            </Link>
          </div>
        </div>
      </div>

      {/* Guarantee Footer Banner */}
      <div className="max-w-2xl mx-auto p-4 border border-stone-200 dark:border-stone-800 rounded-lg text-center space-y-1 font-mono text-xs text-stone-500">
        <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600 dark:text-emerald-400" />
        <p className="font-bold text-black dark:text-white">Instant Activation • Cancel Anytime</p>
        <p className="text-[11px]">All student payments are protected under institutional access rules.</p>
      </div>
    </div>
  );
}
