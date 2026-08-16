'use client';

import React, { useState, useEffect } from 'react';
import { FontSizeProvider } from './FontSizeContext';
import ResourceDataLoader from './ResourceDataLoader';
import ReduxProvider from './ReduxProvider';
import { useAppSelector } from '../hooks/useRedux';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return <>{children}</>;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ReduxProvider>{children}</ReduxProvider>;
  }

  return (
    <ReduxProvider>
      <FontSizeProvider>
        <ResourceDataLoader>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ResourceDataLoader>
      </FontSizeProvider>
    </ReduxProvider>
  );
}
