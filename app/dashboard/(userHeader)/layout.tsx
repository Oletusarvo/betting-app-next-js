import { loadSession } from '@/utils/loadSession';
import { blue } from '@mui/material/colors';
import { CSSProperties } from 'react';
import db from 'dbconfig';
import { BottomNav } from '../BottomNav';
import { DashboardHeader } from './DashboardHeader';

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

  return (
    <div
      className='flex-1 bg-gradient-to-b from-white to-slate-200 text-slate-600 h-full flex flex-col'
      id='dashboard-layout'>
      <DashboardHeader
        wallet={wallet}
        walletCurrency={walletCurrency}
        session={session}
      />
      <main className='flex flex-col gap-1 flex-1 overflow-y-scroll px-1'>{children}</main>

      {BottomNav}
    </div>
  );
}
