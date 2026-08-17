'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../constants/nav';
import ThemeToggle from './ThemeToggle';
import FontSizeControl from './FontSizeControl';
import { supabase } from '../lib/supabaseClient';
import { ChevronDown, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Fetch logged in user details directly from Supabase session
  useEffect(() => {
    async function checkAuthSession() {
      // 1. Check guest user in localStorage
      const guestData = localStorage.getItem('ee_guest_user');
      if (guestData) {
        try {
          const parsed = JSON.parse(guestData);
          setUserName(parsed.full_name || 'Guest User');
          setIsAuthenticated(true);
          return;
        } catch {
          // ignore
        }
      }

      // 2. Check Supabase Auth Session
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();

        const nameToShow = profile?.full_name ||
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split('@')[0] ||
          'Member';

        setUserName(nameToShow);
      } else {
        setIsAuthenticated(false);
        setUserName(null);
      }
    }

    checkAuthSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session && session.user) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();

        const nameToShow = profile?.full_name ||
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split('@')[0] ||
          'Member';

        setUserName(nameToShow);
      } else {
        const guestData = localStorage.getItem('ee_guest_user');
        if (!guestData) {
          setIsAuthenticated(false);
          setUserName(null);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] py-2.5 transition-colors shadow-sm text-stone-900 dark:text-stone-100 font-sans">
        <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Identity Logo & Ultra-Compact Dept. Subtitle */}
          <div className="flex-shrink-0">
            <Link href="/" className="group block leading-none">
              <span className="text-lg sm:text-xl font-extrabold text-black dark:text-white tracking-tight uppercase group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                EEvolution 2.0
              </span>
              <span className="block text-[8px] sm:text-[9px] font-mono text-stone-500 uppercase font-semibold mt-0.5 tracking-tighter">
                DEPT. OF ELECTRICAL ENGINEERING
              </span>
            </Link>
          </div>

          {/* Center-Aligned Desktop Navigation Bar */}
          <div className="hidden md:flex items-center justify-center flex-grow mx-2 lg:mx-6 text-xs font-medium" ref={navRef}>
            <nav className="flex items-center gap-3 lg:gap-5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isDropdownOpen = openDropdown === item.label;

                if (hasSubItems) {
                  return (
                    <div key={item.href} className="relative">
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                        className={`flex items-center gap-1 transition-colors ${
                          isActive ? 'font-bold text-black dark:text-white border-b-2 border-stone-800 dark:border-stone-200 pb-0.5' : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white dark:bg-[#181818] border border-stone-200 dark:border-stone-800 shadow-xl py-2 z-50 text-xs rounded-lg">
                          <Link
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold border-b border-stone-100 dark:border-stone-800"
                          >
                            All {item.label} Index
                          </Link>
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-black dark:hover:text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors ${
                      isActive ? 'font-bold text-black dark:text-white border-b-2 border-stone-800 dark:border-stone-200 pb-0.5' : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Controls & User Profile Name */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0 text-xs font-sans">
            <FontSizeControl />
            <span className="text-stone-300 dark:text-stone-800">|</span>
            <ThemeToggle />
            <span className="text-stone-300 dark:text-stone-800">|</span>
            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-semibold"
            >
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span>{isAuthenticated && userName ? userName : 'Sign In'}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2.5 md:hidden">
            <FontSizeControl />
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 border border-stone-300 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Side Drawer Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="relative ml-auto w-4/5 max-w-xs h-full bg-[#FCFCF9] dark:bg-[#141414] border-l border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between font-sans z-50 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 mb-6">
                <div>
                  <span className="font-extrabold text-lg text-black dark:text-white uppercase block leading-none">
                    EEvolution 2.0
                  </span>
                  <span className="text-[9px] font-mono text-stone-500 font-bold block mt-1 uppercase">
                    DEPT. OF ELECTRICAL ENGINEERING
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-stone-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-stone-500 mb-4 uppercase font-semibold">
                Navigation Archive
              </div>

              <nav className="flex flex-col gap-3 text-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <div key={item.href} className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block py-0.5 ${
                          isActive ? 'font-bold text-black dark:text-white' : 'text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>

                      {hasSubItems && (
                        <div className="pl-3 mt-1.5 flex flex-col gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className="hover:text-black dark:hover:text-white py-0.5"
                            >
                              &rarr; {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Font Size:</span>
                <FontSizeControl />
              </div>
              <Link
                href={isAuthenticated ? '/profile' : '/login'}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 rounded-lg text-stone-900 dark:text-stone-100 font-semibold"
              >
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>{isAuthenticated && userName ? userName : 'Sign In'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
