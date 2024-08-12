import { List } from '@/components/Feature/List';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { GameType } from '@/utils/classes/Game';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export async function UserCreatedBets() {
  const session = await loadSession();
  const bets = (await db('data_games').where({ authorId: session.user.id })) as GameType[];

  return (
    <List
      data={bets}
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
