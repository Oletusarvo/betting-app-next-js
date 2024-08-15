'use client';

import { RoundedBox } from '@/components/UI/RoundedBox';
import { useGameContext } from './GameContext';

export function PoolDisplay() {
  const {
    game: { pool },
    gameCurrency: currencySymbol,
    bidStatus,
    userBid,
  } = useGameContext();

  const ringClassName = [
    'flex aspect-square w-[200px] border-[2px] items-center justify-center rounded-full',
    bidStatus == 'must_call'
      ? 'border-call'
      : bidStatus == 'meets_bid'
      ? 'border-slate-500'
      : bidStatus
      ? 'border-warning'
      : bidStatus == 'folded'
      ? 'border-blue-300'
      : 'border-green-400',
  ];

  return (
    <RoundedBox className='flex flex-1 flex-col justify-center items-center relative h-full'>
      <div className={ringClassName.join(' ')}>
        <span className='text-2xl'>
          {(pool && pool.toLocaleString()) || 0}
          <span className='text-base'>{currencySymbol}</span>
        </span>
      </div>
    </RoundedBox>
  );
}
