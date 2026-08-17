import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-300 dark:border-stone-800 bg-[#F7F7F4] dark:bg-[#161616] text-stone-800 dark:text-stone-300 transition-colors font-sans mt-16">
      <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-stone-300 dark:border-stone-800">
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="font-bold text-xl text-black dark:text-white inline-block">
              EEvolution 2.0
            </Link>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              An academic and technical reference archive for electrical engineering, high-frequency PCB electromagnetics, and micro-controller firmware documentation. Connected to central administrator control services.
            </p>
          </div>

          {/* Col 2: Resources Navigation */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-bold font-mono text-black dark:text-white uppercase tracking-wider mb-3">
              Resource Archive
            </h4>
            <ul className="space-y-1.5 font-mono text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/resources/academics" className="hover:underline hover:text-black dark:hover:text-white">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/resources/general" className="hover:underline hover:text-black dark:hover:text-white">
                  General Specifications
                </Link>
              </li>
              <li>
                <Link href="/resources/experimental" className="hover:underline hover:text-black dark:hover:text-white">
                  Experimental Datasets
                </Link>
              </li>
              <li>
                <Link href="/resources/books" className="hover:underline hover:text-black dark:hover:text-white">
                  Books &amp; Reference Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/practice-sets" className="hover:underline hover:text-black dark:hover:text-white">
                  Practice Problem Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <h4 className="font-bold font-mono text-black dark:text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-mono text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/" className="hover:underline hover:text-black dark:hover:text-white">
                  Home Index
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:underline hover:text-black dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:underline hover:text-black dark:hover:text-white">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline hover:text-black dark:hover:text-white">
                  About Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline hover:text-black dark:hover:text-white">
                  Sign In / Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: System Information */}
          <div className="md:col-span-2 space-y-2 text-xs font-mono text-stone-600 dark:text-stone-400">
            <h4 className="font-bold text-black dark:text-white uppercase tracking-wider mb-3">
              System Spec
            </h4>
            <p>Version: 2.0.4</p>
            <p>Engine: Next.js App Router</p>
            <p>State: Redux Toolkit</p>
            <p>Admin Bridge: Synchronized</p>
          </div>
        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© 2026 EEvolution 2.0 Academic &amp; Technical Archive. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline hover:text-stone-800 dark:hover:text-stone-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline hover:text-stone-800 dark:hover:text-stone-200">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
