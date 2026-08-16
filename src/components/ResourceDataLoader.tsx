'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { setResources } from '../redux/resourceSlice';

export default function ResourceDataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch('http://localhost:5000/api/resources');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            dispatch(setResources(data));
          }
        }
      } catch (err) {
        console.log('Backend API offline or empty, falling back to local state:', err);
      }
    }
    loadResources();
  }, [dispatch]);

  return <>{children}</>;
}
