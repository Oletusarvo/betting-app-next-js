import { Blinker } from '@/components/Feature/Blinker';
import { List } from '@/components/Feature/List';
import { TypeText } from '@/components/Feature/TypeText';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { GameType } from '@/utils/classes/Game';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export async function UserParticipatedBets() {
  const session = await loadSession();
  const bets = await db('data_bids')
    .join('data_games', { 'data_games.id': 'data_bids.gameId' })
    .where({ 'data_bids.userId': session.user.id })
    .select('data_games.*');

  return (
    <List
      data={bets}
      onEmptyElement={
        <span className='text-sm text-slate-500'>
          <TypeText text='No bets participated in yet.' />
        </span>
      }
      ListItemComponent={async ({ item }) => {
        const [{ pool }] = await db('data_bids')
          .where({ gameId: item.id })
          .sum('amount', { as: 'pool' });
        const [currencySymbol] = await db('data_currencies')
          .where({ id: item.currencyId })
          .pluck('symbol');
        const [bid] = await db('data_bids').where({ gameId: item.id, userId: session.user.id });
        const status = getBidStatus(bid, item);

        return (
          <GameItemBox
            withControls
            game={item}
            pool={pool}
            status={status}
            userBid={bid}
            currencySymbol={currencySymbol}
          />
        );
      }}
    />
  );
}
