import { AddButtonWithSearchBar } from '@/components/Feature/AddButtonWithSearchBar';
import { List } from '@/components/Feature/List';
import { Main } from '@/components/UI/Main';
import { ProfileCoin } from '@/components/UI/ProfileCoin';
import { ProfileCoinBox } from '@/components/UI/ProfileCoinBox';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { TopLabel } from '@/components/UI/TopLabel';
import db from 'dbconfig';
import knex from 'knex';

export default async function CurrenciesPage() {
  const currencies = await db('data_currencies');
  return (
    <Main>
      <AddButtonWithSearchBar
        searchPlaceholder='Search for currencies....'
        addUrl='/dashboard/currencies/create'
        queryName='q'
      />

      <h1>Currencies</h1>
      <List
        data={currencies}
        onEmptyElement={<span>No currencies.</span>}
        ListItemComponent={async ({ item }) => {
          const [res] = await db('data_wallets')
            .where({ currencyId: item.id })
            .sum({ circulation: db.raw('ABS(balance)') });
          return (
            <ProfileCoinBox
              topLabelText='Circulation'
              coinContent={item.symbol}
              topLabelContent={(res.circulation / 100).toLocaleString()}
              titleText={item.name}
            />
          );
        }}
      />
    </Main>
  );
}
