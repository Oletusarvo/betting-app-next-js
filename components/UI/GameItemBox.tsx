'use client';

import { ItemBox } from './ItemBox';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '../Feature/Menu';
import Link from 'next/link';
import { Chip } from './Chip';
import { TopLabel } from './TopLabel';
import { GameType } from '@/utils/classes/Game';
import { BidType } from '@/utils/classes/Bid';
import { CurrencySymbolContainer } from './CurrencySymbolContainer';
import { isExpired } from '@/utils/isExpired';
import { useGameUpdates } from '@/hooks/useGameUpdates';

export type GameItemBoxProps = {
  game: GameType;
  userBid?: BidType;
  pool?: number;
  currencySymbol?: string;
  status?: 'must_call' | 'meets_bid' | 'no_bid' | 'at_max_bid' | 'folded' | 'expired';
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

export function GameItemBox({
  game,
  userBid,
  pool,
  currencySymbol,
  withControls,
}: GameItemBoxProps) {
  console.log('Ryyppäks');
  const { currentGameState, currentBidStatus } = useGameUpdates({ ...game, pool }, userBid);
  const {
    title,
    description,
    id,
    pool: currentPool,
    tax,
    minRaise,
    minBid,
    maxBid,
    maxRaise,
  } = currentGameState;

  const expired = isExpired(game.expiresAt);

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

        <StatusBadge status={expired ? 'expired' : currentBidStatus} />
      </ItemBox.Header>

      <ItemBox.Body>
        <p className='mb-8'>{description || 'No description.'}</p>

        <div className='flex items-center justify-between w-full mb-4'>
          <span className='font-semibold'>Pool</span>
          <span className='text-lg font-semibold'>
            {(currentPool && currentPool.toLocaleString('en')) || 'No Bids'}
            {currentPool && (
              <>
                {currencySymbol}
                {(tax && <span className='text-sm text-warning'> (-{tax}% tax)</span>) || (
                  <span className='text-sm text-success'> (No tax)</span>
                )}
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
            {minBid.toLocaleString('en')}
            <CurrencySymbolContainer>{currencySymbol}</CurrencySymbolContainer>
          </TopLabel>

          <TopLabel
            labelPosition='left'
            labelText='Raise'>
            {(minRaise && minRaise.toLocaleString('en')) || 'No minimum'}
            <CurrencySymbolContainer>{minRaise && currencySymbol}</CurrencySymbolContainer>
          </TopLabel>
        </div>
      </ItemBox.Body>
    </ItemBox>
  );
}
