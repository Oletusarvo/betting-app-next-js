'use client';

import { GameItemBoxProps, StatusBadge } from '@/components/UI/GameItemBox';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useGameContext } from './GameContext';

export function GameOverview() {
  const {
    game: { title },
  } = useGameContext();
  const router = useRouter();

  return (
    <RoundedBox>
      <div className='flex item-center w-full justify-between'>
        <div className='flex gap-2 items-center'>
          <IconButton onClick={() => router.back()}>
            <ArrowBack sx={{ color: 'white' }} />
          </IconButton>

          <h1 className='text-xl'>{title}</h1>
        </div>
      </div>
    </RoundedBox>
  );
}
