'use client';

import { RoundedBox } from '@/components/UI/RoundedBox';
import { useGameContext } from './GameContext';
import { Chip, IconButton } from '@mui/material';
import { ChipLabel } from '@/components/UI/ChipLabel';
import { StatusBadge } from '@/components/UI/GameItemBox';
import { ArrowBack } from '@mui/icons-material';
import { BackButton } from './BackButton';

export function GameInfo() {
  const { userBid, game, bidStatus } = useGameContext();

  const getCurrencyValue = (value?: number, onUndefined?: number | string) => {
    if (value) {
      return value.toLocaleString() + game.currencySymbol;
    }
    return onUndefined || 0 + game.currencySymbol;
  };

  const DataRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className='flex items-baseline justify-between'>
      <span className='font-semibold'>{label}</span>
      <span>{value}</span>
    </div>
  );

  const hasPool = game.pool && game.pool > 0 ? 1 : 0;

  return (
    <RoundedBox className='flex flex-col gap-4 flex-1 w-full mt-2'>
      <div className='flex flex-col gap-1 flex-1 border-b border-slate-200'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-lg font-semibold'>{game.title}</h1>
          </div>

          <StatusBadge status={bidStatus} />
        </div>
      </div>

      <div className='flex flex-col gap-2 flex-1 mt-auto'>
        <DataRow
          label='Your bid'
          value={getCurrencyValue(userBid?.amount, 'No bid')}
        />
        <DataRow
          label='Min. bid'
          value={getCurrencyValue(game.minBid, 'No minimum')}
        />

        <DataRow
          label='Max. bid'
          value={getCurrencyValue(game.maxBid, 'No limit')}
        />

        <DataRow
          label='Max. raise'
          value={getCurrencyValue(game.maxRaise, 'No limit')}
        />

        <DataRow
          label='Expires at'
          value={(game.expiresAt && new Date(game.expiresAt).toLocaleDateString()) || 'No deadline'}
        />
      </div>
    </RoundedBox>
  );
}
