'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ItemBox } from './ItemBox';
import { IconButton, MenuItem } from '@mui/material';
import { MoreHoriz, MoreVert } from '@mui/icons-material';
import { DialogControl } from '../Feature/DialogControl';
import { Menu } from '../Feature/Menu';
import { ProfileCoin } from './ProfileCoin';
import Link from 'next/link';
import { Chip } from './Chip';
import { TopLabel } from './TopLabel';
import { GameType } from '@/utils/classes/Game';
import { BidType } from '@/utils/classes/Bid';
import { IconButtonLink } from '../Feature/IconButtonLink';
import { CurrencySymbolContainer } from './CurrencySymbolContainer';
import { isExpired } from '@/utils/isExpired';
import { socket } from 'app/socket.mjs';
import toast from 'react-hot-toast';

export type GameItemBoxProps = {
  game: GameType;
  userBid?: BidType;
  pool?: number;
  currencySymbol?: string;
  status: 'must_call' | 'meets_bid' | 'no_bid' | 'at_max_bid' | 'folded' | 'expired';
  withControls?: boolean;
};

export function StatusBadge({ status }: { status: GameItemBoxProps['status'] }) {
  return (
    <Chip
      color={
        status == 'must_call'
          ? 'call'
          : status == 'no_bid'
          ? 'primary'
          : status == 'folded'
          ? 'folded'
          : status == 'expired'
          ? 'warning'
          : 'secondary'
      }>
      {status == 'no_bid'
        ? 'No Bid'
        : status == 'folded'
        ? 'Folded'
        : status == 'must_call'
        ? 'Must Call'
        : status == 'expired'
        ? 'Expired'
        : 'Bid'}
    </Chip>
  );
}

const DataContainer = ({ children }: TODO) => (
  <div className='bg-slate-300 rounded-md text-white p-2 w-full'>{children}</div>
);
export function GameItemBox({
  game,
  userBid,
  pool,
  currencySymbol,
  status,
  withControls,
}: GameItemBoxProps) {
  const [gameState, setGameState] = useState({
    ...game,
    pool,
  });

  const { title, description, id } = gameState;
  const expired = isExpired(game.expiresAt);

  useEffect(() => {
    socket.on('game_update', updatedGame => {
      if (updatedGame.id !== game.id) return;
      toast.success('game updated!');
    });

    return () => {
      socket.off('game_update');
    };
  }, []);

  return (
    <ItemBox>
      <ItemBox.Header>
        <div className='flex gap-2 items-center'>
          {withControls && (
            <Menu trigger={<MoreVert sx={{ cursor: 'pointer' }} />}>
              <Link href={`/dashboard/games/${id}/close`}>Close</Link>
            </Menu>
          )}

          <Link
            href={`/dashboard/games/${id}`}
            className='text-gray-600 font-semibold overflow-hidden text-ellipsis text-nowrap w-full'>
            {title}
          </Link>
        </div>

        <StatusBadge status={expired ? 'expired' : status} />
      </ItemBox.Header>

      <ItemBox.Body>
        <p className='mb-8'>{description || 'No description.'}</p>

        <div className='flex items-center justify-between w-full mb-4'>
          <span className='font-semibold'>Pool</span>
          <span className='text-lg font-semibold'>
            {(pool && pool.toLocaleString('en')) || 'No Bids'}
            {pool && (
              <>
                {currencySymbol}
                {(game.tax && (
                  <span className='text-sm text-warning'> (-{game.tax}% tax)</span>
                )) || <span className='text-sm text-success'> (No tax)</span>}
              </>
            )}
          </span>
        </div>
        <div className='flex w-full justify-between gap-2'>
          <TopLabel labelText='Your bid'>
            {(userBid && userBid.amount.toLocaleString('en')) || 'No bid'}
            {userBid && <CurrencySymbolContainer>{currencySymbol}</CurrencySymbolContainer>}
          </TopLabel>
          <TopLabel
            labelPosition='left'
            labelText='Minimum'>
            {game.minBid.toLocaleString('en')}
            <CurrencySymbolContainer>{currencySymbol}</CurrencySymbolContainer>
          </TopLabel>

          <TopLabel
            labelPosition='left'
            labelText='Raise'>
            {(game.minRaise && game.minRaise.toLocaleString('en')) || 'No minimum'}
            <CurrencySymbolContainer>{game.minRaise && currencySymbol}</CurrencySymbolContainer>
          </TopLabel>
        </div>
      </ItemBox.Body>
    </ItemBox>
  );
}
