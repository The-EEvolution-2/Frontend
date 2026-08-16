'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'sm' | 'base' | 'lg';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 'base',
  setFontSize: () => {},
});

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>('base');

  useEffect(() => {
    const saved = localStorage.getItem('eevolution_font_size') as FontSize;
    if (saved && ['sm', 'base', 'lg'].includes(saved)) {
      setFontSizeState(saved);
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('eevolution_font_size', size);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      <div className={`font-size-${fontSize}`}>{children}</div>
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
