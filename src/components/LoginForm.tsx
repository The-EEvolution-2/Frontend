'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../hooks/useRedux';
import { login } from '../redux/authSlice';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('alex.rivera@eevolution.io');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    dispatch(
      login({
        id: 'usr-1',
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'Engineering Lead',
        bio: 'Platform user managing hardware designs and connected admin services.',
      })
    );
    router.push('/profile');
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-black font-mono text-black dark:text-white">
      <div className="text-left mb-6 pb-4">
        <h1 className="text-xl font-bold uppercase">[ USER LOGIN ]</h1>
        <p className="text-xs uppercase mt-1">ENTER CREDENTIALS TO ACCESS SYSTEM</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase">
        <div>
          <label className="block mb-1">&gt; EMAIL ADDRESS:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-slate-100 text-black dark:bg-slate-900 dark:text-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1">&gt; PASSWORD:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-slate-100 text-black dark:bg-slate-900 dark:text-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase"
        >
          [ AUTHENTICATE SYSTEM ]
        </button>
      </form>
    </div>
  );
}
