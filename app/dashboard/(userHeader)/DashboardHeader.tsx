'use client';

import { Menu } from '@/components/Feature/Menu';
import { ProfileCoin } from '@/components/UI/ProfileCoin';
import { TopLabel } from '@/components/UI/TopLabel';
import { socket } from 'app/socket.mjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WalletType } from 'types/WalletType';

type DashboardHeaderProps = {
  wallet: WalletType;
  walletCurrency: string;
  session: TODO;
};
export function DashboardHeader({ wallet, session, walletCurrency }: DashboardHeaderProps) {
  const [currentWallet, setCurrentWallet] = useState(wallet);

  const balanceClasses = [
    'text-sm font-bold',
    wallet.balance < 0 ? 'text-warning' : wallet.balance > 0 ? 'text-success' : 'text-white',
  ];

  useEffect(() => {
    socket.emit('join_wallet', `wallet-${wallet.id}`);
    socket.on('wallet_update', balance => {
      setCurrentWallet(prev => ({
        ...prev,
        balance,
      }));
    });

    return () => {
      socket.off('wallet_update');
      socket.emit('leave_wallet', wallet.id);
    };
  }, []);

  return (
    <header className='w-full flex py-4 px-2 items-center bg-darkGrey sticky top-0 z-10 text-white justify-between shadow-md'>
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
          {currentWallet.balance.toLocaleString('en')}
          <span className='text-[8pt]'>{walletCurrency}</span>
        </span>
      </TopLabel>
    </header>
  );
}
