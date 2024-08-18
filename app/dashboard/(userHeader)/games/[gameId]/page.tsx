import { Main } from '@/components/UI/Main';
import db from 'dbconfig';
import { PoolDisplay } from './PoolDisplay';

import { GameControls } from './GameControls';
import { loadSession } from '@/utils/loadSession';
import { GameProvider } from './GameContext';
import { GameInfo } from './GameInfo';
import { BidType } from '@/utils/classes/Bid';
import { GameType } from '@/utils/classes/Game';

export default async function GamePage({ params }: TODO) {
  const [game] = (await db('data_games').where({ id: params.gameId })) as [GameType | undefined];
  if (!game) throw new Error('Failed to load game!');

  const [{ pool }] = await db('data_bids')
    .where({ gameId: params.gameId })
    .sum('amount', { as: 'pool' });

  const [currencySymbol] = await db('data_currencies')
    .where({ id: game.currencyId })
    .pluck('symbol');

  const positions = await db('data_gamePositions')
    .where({ gameId: params.gameId })
    .select('id', 'value');

  const session = await loadSession();
  const [userBid] = (await db('data_bids').where({
    gameId: params.gameId,
    userId: session.user.id,
  })) as [BidType | undefined];

  return (
    <GameProvider
      game={{ ...game, pool }}
      gamePositions={positions}
      gameCurrency={currencySymbol}
      userBid={userBid}>
      <GameInfo />
      <PoolDisplay />
      <GameControls />
    </GameProvider>
  );
}
