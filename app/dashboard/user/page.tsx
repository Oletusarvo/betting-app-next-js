import { DialogControl } from '@/components/Feature/DialogControl';
import { List } from '@/components/Feature/List';
import { GameItemBox } from '@/components/UI/GameItemBox';
import { Main } from '@/components/UI/Main';
import { ProfileCoin } from '@/components/UI/ProfileCoin';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { TopLabel } from '@/components/UI/TopLabel';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { BidType } from '@/utils/classes/Bid';
import { GameType } from '@/utils/classes/Game';
import { getBidStatus } from '@/utils/getBidStatus';
import { loadSession } from '@/utils/loadSession';
import { green, red } from '@mui/material/colors';
import db from 'dbconfig';
import { WalletType } from 'types/WalletType';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import { Heading } from '@/components/UI/Heading';

export default async function UserPage() {
  const session = await loadSession();
  const [gamesCreated, gamesParticipatedIn, [wallet]] = (await Promise.all([
    db('data_games').where({ authorId: session.user.id }),
    db('data_bids')
      .where({ userId: session.user.id })
      .pluck('gameId')
      .then(gameIds => {
        return db('data_games').whereIn('id', gameIds);
      }),
    db('data_wallets').where({ userId: session.user.id }),
  ])) as [GameType[], GameType[], [WalletType]];

  const [walletCurrency] = await db('data_currencies')
    .where({ id: wallet.currencyId })
    .pluck('symbol');

  return (
    <Main>
      <RoundedBox className='flex w-full flex-col gap-2 mt-2'>
        <div className='flex w-full items-center gap-4 justify-between'>
          <UserMenu session={session} />

          <TopLabel labelText='Balance'>
            <span
              style={{
                color: wallet.balance < 0 ? red[600] : wallet.balance > 0 ? green[500] : 'white',
              }}>
              {wallet.balance.toLocaleString() + walletCurrency}
            </span>
          </TopLabel>
        </div>
      </RoundedBox>
      <Heading>Games Created</Heading>
      <List
        data={gamesCreated}
        onEmptyElement={<span>No games created yet.</span>}
        ListItemComponent={async ({ item }) => {
          const [[bid], [{ pool }], [currencySymbol]] = (await Promise.all([
            db('data_bids').where({ gameId: item.id, userId: session.user.id }),
            db('data_bids').where({ gameId: item.id }).sum('amount', { as: 'pool' }),
            db('data_currencies').where({ id: item.currencyId }).pluck('symbol'),
          ])) as [[BidType], [{ pool: number | undefined }], [string]];

          const status = getBidStatus(bid, item);

          return (
            <GameItemBox
              withControls
              id={item.id}
              title={item.title}
              status={status}
              pool={pool && pool / 100}
              currencySymbol={currencySymbol}
            />
          );
        }}
      />

      <Heading className='mt-4'>Games Participated In</Heading>
      <List
        data={gamesParticipatedIn}
        onEmptyElement={<span>No games participated in yet.</span>}
        ListItemComponent={async ({ item }) => {
          const [[bid], [{ pool }], [currencySymbol]] = (await Promise.all([
            db('data_bids').where({ gameId: item.id, userId: session.user.id }),
            db('data_bids').where({ gameId: item.id }).sum('amount', { as: 'pool' }),
            db('data_currencies').where({ id: item.currencyId }).pluck('symbol'),
          ])) as [[BidType], [{ pool: number | undefined }], [string]];

          const status = getBidStatus(bid, item);

          return (
            <GameItemBox
              title={item.title}
              status={status}
              pool={pool}
              currencySymbol={currencySymbol}
            />
          );
        }}
      />
    </Main>
  );
}
