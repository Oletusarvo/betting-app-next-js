import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { TypeText } from '@/components/Feature/TypeText';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { Main } from '@/components/UI/Main';
import { BidType } from '@/utils/classes/Bid';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export default async function GamesPage({ searchParams }: TODO) {
  const search = searchParams?.q;
  const session = await loadSession();
  const games = await db('data_games')
    .where(function () {
      const query = `%${search}%`;
      this.whereILike('title', query).orWhereILike('description', query);
    })
    .orderBy('createdAt', 'desc')
    .limit(10);

  return (
    <Main>
      <AddButtonWithSearchBar
        searchPlaceholder='Search for games...'
        queryName='q'
        addUrl='/dashboard/createGame'
      />

      <div className='flex flex-col gap-1 flex-1'>
        <List
          data={games}
          onEmptyElement={<TypeText text='No bets yet.' />}
          ListItemComponent={async ({ item }) => {
            const [[{ pool }], [currencySymbol], [bid]] = (await Promise.all([
              db('data_bids').where({ gameId: item.id }).sum('amount', { as: 'pool' }),
              db('data_currencies').where({ id: item.currencyId }).pluck('symbol'),

              db('data_bids').where({ userId: session.user.id, gameId: item.id }),
            ])) as [[{ pool: number }], [string], [BidType]];

            const bidStatus = getBidStatus(bid, item);

            return (
              <GameItemBox
                withControls={item.authorId == session.user.id}
                game={item}
                pool={pool}
                userBid={bid}
                currencySymbol={currencySymbol}
                status={bidStatus}
              />
            );
          }}
        />
      </div>
    </Main>
  );
}
