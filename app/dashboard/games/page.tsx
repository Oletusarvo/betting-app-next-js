import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { SearchBar } from '@/components/Feature/SearchBar';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { Heading } from '@/components/UI/Heading';
import { Main } from '@/components/UI/Main';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { BidType } from '@/utils/classes/Bid';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import db from 'dbconfig';
import Link from 'next/link';

export default async function GamesPage({ searchParams }: TODO) {
  const search = searchParams?.q;
  const session = await loadSession();
  const games = await db('data_games').where(function () {
    const query = `%${search}%`;
    this.whereLike('title', query).orWhereLike('description', query);
  });

  return (
    <Main>
      <AddButtonWithSearchBar
        searchPlaceholder='Search for games...'
        queryName='q'
        addUrl='/dashboard/games/create'
      />
      <Heading>Bets</Heading>
      <div className='flex flex-col gap-2 flex-1'>
        <List
          data={games}
          onEmptyElement={<div>No bets yet.</div>}
          ListItemComponent={async ({ item }) => {
            const [[{ pool }], [currencySymbol], [bid]] = (await Promise.all([
              db('data_bids').where({ gameId: item.id }).sum('amount', { as: 'pool' }),
              db('data_currencies').where({ id: item.currencyId }).pluck('symbol'),

              db('data_bids').where({ userId: session.user.id, gameId: item.id }),
            ])) as [[{ pool: number }], [string], [BidType]];

            const bidStatus = getBidStatus(bid, item);

            return (
              <Link
                className='no-underline'
                href={`games/${item.id}`}>
                <GameItemBox
                  title={item.title}
                  description={item.description}
                  pool={pool}
                  currencySymbol={currencySymbol}
                  status={bidStatus}
                />
              </Link>
            );
          }}
        />
      </div>
    </Main>
  );
}
