import { loadSession } from '@/utils/loadSession';
import { blue } from '@mui/material/colors';
import { CSSProperties } from 'react';
import db from 'dbconfig';
import { BottomNav } from './BottomNav';
import { TopLabel } from '@/components/UI/TopLabel';
import { ProfileCoin } from '@/components/UI/ProfileCoin';
import { Menu } from '@/components/Feature/Menu';
import Link from 'next/link';

export default async function DashboardLayout({ children }: TODO) {
  const session = await loadSession();
  const containerStyle: CSSProperties = {
    backgroundColor: blue[800],
  };
  const [defaultWalletId] = await db('data_defaultWallets')
    .where({ userId: session.user.id })
    .pluck('walletId');
  const [wallet] = await db('data_wallets').where({ id: defaultWalletId });
  const [walletCurrency] = await db('data_currencies')
    .where({ id: wallet.currencyId })
    .pluck('symbol');

  const balanceClasses = [
    'text-sm font-bold',
    wallet.balance < 0 ? 'text-warning' : wallet.balance > 0 ? 'text-success' : 'text-white',
  ];
  return (
    <div
      className='flex-1 bg-slate-100 text-slate-600 h-full flex flex-col'
      id='dashboard-layout'>
      <header className='w-full flex pt-8 pb-4 px-2 items-center bg-darkGrey sticky top-0 z-10 text-white justify-between shadow-md'>
        <Menu
          trigger={
            <ProfileCoin
              content={session.user.email}
              contentSliceLength={2}
            />
          }>
          <Link href='/logout'>Logout</Link>
        </Menu>

        <TopLabel
          labelText='Balance'
          labelPosition='right'>
          <span className={balanceClasses.join(' ')}>
            {wallet.balance.toLocaleString('en')}
            <span className='text-[8pt]'>{walletCurrency}</span>
          </span>
        </TopLabel>
      </header>
      {children}
      {BottomNav}
    </div>
  );
}
