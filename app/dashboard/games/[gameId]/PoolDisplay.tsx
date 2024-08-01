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
    <RoundedBox className='flex flex-1 flex-col justify-center relative'>
      <div className='w-full flex flex-col gap-2 justify-center items-center'>
        <div
          className='flex aspect-square w-[200px] border-[2px] items-center justify-center rounded-full'
          style={ringColorStyle}>
          <span className='text-2xl'>
            {(pool && pool.toLocaleString()) || 0}
            <span className='text-base'>{currencySymbol}</span>
          </span>
        </div>
      </div>
    </RoundedBox>
  );
}
