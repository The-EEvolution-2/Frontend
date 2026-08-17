'use client';

import React, { Suspense } from 'react';
import CommunityClientContent from './CommunityClientContent';

export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="py-16 text-center font-mono text-xs text-stone-500">
        Loading Community Hub...
      </div>
    }>
      <CommunityClientContent />
    </Suspense>
  );
}
