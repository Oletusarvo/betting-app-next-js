'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export function Pathname() {
  const pathname = usePathname();

  return <>{pathname}</>;
}
