import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { SearchBar } from '@/components/Feature/SearchBar';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { Main } from '@/components/UI/Main';
import { RoundedBox } from '@/components/UI/RoundedBox';
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
      <h1>Bets</h1>
      <div className='flex flex-col gap-2'>
        <List
          data={games}
          onEmptyElement={<span>No bets yet.</span>}
          ListItemComponent={async ({ item }) => {
            const [{ pool }] = await db('data_bids')
              .where({ gameId: item.id })
              .sum('amount', { as: 'pool' });
            const [currencySymbol] = await db('data_currencies')
              .where({ id: item.currencyId })
              .pluck('symbol');

            const [bid] = await db('data_bids').where({ userId: session.user.id, gameId: item.id });
            const bidStatus = getBidStatus(bid, item);

            return (
              <Link
                className='no-underline'
                href={`games/${item.id}`}>
                <GameItemBox
                  title={item.title}
                  description={item.description}
                  pool={pool / 100}
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
