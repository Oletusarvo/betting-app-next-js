'use client';

import { RoundedBox } from '@/components/UI/RoundedBox';
import { Divider } from '@mui/material';
import { useGameContext } from './GameContext';
import { CSSProperties, useEffect } from 'react';
import { blue, green, red, yellow } from '@mui/material/colors';
import { socket } from '../../../socket.mjs';

export function PoolDisplay() {
  const {
    game: { pool, currencySymbol },
    bidStatus,
  } = useGameContext();

  const ringClassName = [
    'flex aspect-square w-[200px] border-[2px] items-center justify-center rounded-full',
    bidStatus == 'must_call'
      ? 'border-call'
      : bidStatus == 'meets_bid'
      ? 'border-slate-500'
      : bidStatus == 'at_max_bid'
      ? 'border-warning'
      : bidStatus == 'folded'
      ? 'border-blue-300'
      : 'border-green-400',
  ];

  const ringColorStyle: CSSProperties = {
    borderColor:
      bidStatus == 'must_call'
        ? yellow[500]
        : bidStatus == 'meets_bid'
        ? 'white'
        : bidStatus == 'at_max_bid'
        ? red[700]
        : bidStatus == 'folded'
        ? blue[300]
        : green[500],
  };

  const getText = () =>
    bidStatus == 'folded' ? 'Folded' : bidStatus == 'must_call' ? 'Must Call' : 'Ok';

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
