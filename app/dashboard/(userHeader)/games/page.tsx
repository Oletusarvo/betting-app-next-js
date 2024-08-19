import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { TypeText } from '@/components/Feature/TypeText';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { Main } from '@/components/UI/Main';
import { BidType } from '@/utils/classes/Bid';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export default async function GameListPage({ searchParams }: TODO) {
  const search = searchParams?.q;
  const query = `%${search}%`;
  const session = await loadSession();
  const games = await db('data_games')
    .whereILike('title', query)
    .orWhereILike('description', query)
    .orderBy('createdAt', 'desc')
    .limit(10);

  return (
    <>
      <AddButtonWithSearchBar
        searchPlaceholder='Search for bets...'
        queryName='q'
        addUrl='/dashboard/createGame'
      />

      <div className='flex flex-col gap-1 flex-1'>
        <List
          data={games}
          onEmptyElement={
            <div className='flex w-full h-full justify-center items-center'>
              <TypeText text='No bets yet.' />
            </div>
          }
          ListItemComponent={async ({ item, ...props }) => {
            const [[{ pool }], [currencySymbol], [bid]] = (await Promise.all([
              db('data_bids').where({ gameId: item.id }).sum('amount', { as: 'pool' }),
              db('data_currencies').where({ id: item.currencyId }).pluck('symbol'),

              db('data_bids').where({ userId: session.user.id, gameId: item.id }),
            ])) as [[{ pool: number }], [string], [BidType]];

            return (
              <GameItemBox
                {...props}
                withControls={item.authorId == session.user.id}
                game={item}
                pool={pool}
                userBid={bid}
                currencySymbol={currencySymbol}
              />
            );
          }}
        />
      </div>
    </>
  );
}
