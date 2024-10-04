// /pages/result/layout.tsx

import React, { Suspense } from 'react';

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      {children}
    </Suspense>
  );
}
