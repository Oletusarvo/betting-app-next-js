'use client';

import { RoundedBox } from '@/components/UI/RoundedBox';
import { useGameContext } from './GameContext';
import { Chip, IconButton } from '@mui/material';
import { ChipLabel } from '@/components/UI/ChipLabel';
import { StatusBadge } from '@/components/UI/GameItemBox';
import { ArrowBack } from '@mui/icons-material';
import { BackButton } from './BackButton';
import { ItemBox } from '@/components/UI/ItemBox';

export function GameInfo() {
  const { userBid, game, bidStatus, gameCurrency } = useGameContext();

  const getCurrencyValue = (value?: number, onUndefined?: number | string) => {
    if (value) {
      return value.toLocaleString() + gameCurrency;
    }
    return onUndefined || 0 + gameCurrency;
  };

  const DataRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className='flex items-baseline justify-between border-b border-white'>
      <span className='font-semibold'>{label}</span>
      <span>{value}</span>
    </div>
  );

  const hasPool = game.pool && game.pool > 0 ? 1 : 0;

  return (
    <ItemBox>
      <ItemBox.Header>
        <ItemBox.Title>{game.title}</ItemBox.Title>
      </ItemBox.Header>

      <ItemBox.Body>
        <p>{game.description || 'No description.'}</p>
      </ItemBox.Body>
    </ItemBox>
  );
}
