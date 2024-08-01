'use server';

import { currencies } from 'actions/utils/currencies';
import { users } from 'actions/utils/users';
import { wallets } from 'actions/utils/wallets';
import db from 'dbconfig';
import { CurrencyType } from 'types/CurrencyType';
import { WalletType } from 'types/WalletType';

export async function getDefaultWallet(userId: number): Promise<WalletType> {
  const [wallet] = await wallets.get({ userId, default: true });
  return wallet;
}

export async function getDefaultWalletCurrency(userId: number): Promise<CurrencyType> {
  const defaultWallet = await getDefaultWallet(userId);
  const [currency] = await currencies.get({ symbol: defaultWallet.currency });
  return currency;
}

export async function checkBalance(walletId: number, amount: number) {
  const [wallet] = await db('wallets').where({ id: walletId });
  if (!wallet) return false;

  return wallet.balance >= amount;
}
