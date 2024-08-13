'use client';

import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <IconButton onClick={() => router.back()}>
      <ArrowBack />
    </IconButton>
  );
}
