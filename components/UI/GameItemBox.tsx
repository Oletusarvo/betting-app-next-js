import { ReactNode } from 'react';
import { ItemBox } from './ItemBox';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { DialogControl } from '../Feature/DialogControl';
import { Menu } from '../Feature/Menu';
import { ProfileCoin } from './ProfileCoin';
import Link from 'next/link';

export type GameItemBoxProps = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  pool?: number;
  currencySymbol?: string;
  status: 'must_call' | 'meets_bid' | 'no_bid' | 'at_max_bid' | 'folded';
  withControls?: boolean;
};

export function StatusBadge({ status }: { status: GameItemBoxProps['status'] }) {
  const classNames = [
    'rounded-full aspect-square w-4 h-4',
    status == 'no_bid' ? 'bg-green-400' : status == 'must_call' ? 'bg-yellow-500' : 'bg-white',
  ];

  return (
    <div
      className={classNames.join(' ')}
      title={
        status == 'meets_bid'
          ? 'You have participated in this bet.'
          : status == 'no_bid'
          ? 'You have yet to participate in this bet.'
          : 'The minimum bid has increased. You must either call or fold your bid.'
      }
    />
  );
}

export function GameItemBox({
  id,
  title,
  description,
  pool,
  currencySymbol,
  status,
  withControls,
}: GameItemBoxProps) {
  return (
    <ItemBox>
      <div className='flex items-center w-full justify-between mb-4'>
        <h2 className='text-lg text-white font-semibold overflow-hidden text-ellipsis text-nowrap w-[70%]'>
          {title}
        </h2>
        <StatusBadge status={status} />
      </div>
      <p>{description || 'No description.'}</p>
      <div className='flex w-full justify-between items-center mt-4'>
        {withControls && (
          <Menu
            trigger={
              <MoreHoriz
                sx={{ color: 'white' }}
                className='cursor-pointer'
              />
            }>
            <Link href={`/dashboard/games/${id}/close`}>Close Bet</Link>
          </Menu>
        )}

        <span>{(pool && `${pool.toLocaleString()}${currencySymbol}`) || 'No bids yet.'}</span>
      </div>
    </ItemBox>
  );
}
