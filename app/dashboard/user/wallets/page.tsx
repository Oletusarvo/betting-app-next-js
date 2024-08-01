import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { Main } from '@/components/UI/Main';
import { ProfileCoinBox } from '@/components/UI/ProfileCoinBox';
import { loadSession } from '@/utils/loadSession';
import { green, red } from '@mui/material/colors';
import db from 'dbconfig';

export default async function WalletsPage() {
  const session = await loadSession();
  const wallets = await db('data_wallets').where({ userId: session.user.id });

  return (
    <Main>
      <AddButtonWithSearchBar
        searchPlaceholder='Search wallets...'
        queryName='q'
        addUrl='wallets/create'
      />
      <h1>Wallets</h1>
      <List
        data={wallets}
        ListItemComponent={async ({ item }) => {
          const [currency] = await db('data_currencies')
            .where({ id: item.currencyId })
            .select('name', 'symbol', 'id');

          return (
            <ProfileCoinBox
              coinContent={currency.symbol}
              titleText={currency.name}
              topLabelContent={
                <span
                  style={{
                    color: item.balance < 0 ? red[600] : item.balance > 0 ? green[500] : 'white',
                  }}>
                  {(item.balance / 100).toLocaleString()}
                </span>
              }
              topLabelText='Balance'
            />
          );
        }}
      />
    </Main>
  );
}
