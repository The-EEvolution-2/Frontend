'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../constants/nav';
import ThemeToggle from './ThemeToggle';
import FontSizeControl from './FontSizeControl';
import { useAppSelector } from '../hooks/useRedux';
import { ChevronDown, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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
      <header className="sticky top-0 z-40 w-full border-b border-blue-900/40 dark:border-blue-800/60 bg-[#1E293B] dark:bg-[#0F172A] text-slate-100 py-3.5 transition-colors shadow-md">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between font-serif">
          {/* Left: Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl text-white flex items-center gap-2 tracking-wide">
              <span>EEvolution 2.0</span>
            </Link>
          </div>

          {/* Center-Aligned Desktop Navigation Bar */}
          <div className="hidden md:flex items-center justify-center flex-grow mx-8 text-sm" ref={navRef}>
            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isDropdownOpen = openDropdown === item.label;

                if (hasSubItems) {
                  return (
                    <div key={item.href} className="relative">
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                        className={`flex items-center gap-1 font-serif transition-colors ${
                          isActive ? 'font-bold underline text-amber-300' : 'text-slate-300 hover:text-amber-300 hover:underline'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#1E293B] dark:bg-[#0F172A] border border-slate-700 text-slate-100 shadow-2xl py-2 z-50 font-serif text-xs rounded-md">
                          <Link
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-amber-300 hover:bg-slate-800 font-bold border-b border-slate-700"
                          >
                            All {item.label} Index
                          </Link>
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
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
                      isActive ? 'font-bold underline text-amber-300' : 'text-slate-300 hover:text-amber-300 hover:underline'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Controls & Profile */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 text-slate-100">
            <FontSizeControl />
            <span className="text-slate-600">|</span>
            <ThemeToggle />
            <span className="text-slate-600">|</span>
            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="text-slate-100 hover:text-white hover:underline font-mono text-xs flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 border border-blue-700/60 px-3 py-1.5 rounded transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAuthenticated ? 'Profile' : 'Sign In'}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <FontSizeControl />
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 border border-slate-700 rounded-md text-white hover:bg-slate-800"
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
            className="fixed inset-0 bg-black/60 transition-opacity"
          />

          <div className="relative ml-auto w-4/5 max-w-xs h-full bg-[#1E293B] text-slate-100 border-l border-slate-700 p-6 flex flex-col justify-between font-serif z-50 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <span className="font-bold text-lg text-white">
                  EEvolution 2.0
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400 mb-4 uppercase">
                Navigation Archive
              </div>

              <nav className="flex flex-col gap-3 text-base">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <div key={item.href} className="border-b border-slate-800 pb-2">
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block py-0.5 ${
                          isActive ? 'font-bold underline text-amber-300' : 'text-slate-300 hover:text-amber-300 hover:underline'
                        }`}
                      >
                        {item.label}
                      </Link>

                      {hasSubItems && (
                        <div className="pl-3 mt-1 flex flex-col gap-1 text-xs font-mono">
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className="text-slate-400 hover:text-white hover:underline py-0.5"
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

            <div className="border-t border-slate-700 pt-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span>Font Size:</span>
                <FontSizeControl />
              </div>
              <Link
                href={isAuthenticated ? '/profile' : '/login'}
                onClick={() => setSidebarOpen(false)}
                className="text-slate-200 hover:underline flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAuthenticated ? 'User Profile' : 'Sign In'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
