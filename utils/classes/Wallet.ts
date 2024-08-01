import db from 'dbconfig';
import { Knex } from 'knex';
import { AppObject } from './AppObject';
import { WalletType } from 'types/WalletType';

export class Wallet extends AppObject<WalletType> {
  constructor(data: WalletType) {
    super(data);
  }

  public deposit(amount: number) {
    this.data.balance += amount;
  }

  public static async loadWallet(userId: string, currencyId: string, trx?: Knex.Transaction) {
    const con = trx || db;
    const [walletData] = await con('data_wallets').where({ userId, currencyId });
    return new Wallet(walletData);
  }

  public static async saveWallet(wallet: Wallet, trx?: Knex.Transaction) {
    const con = trx || db;
    if (wallet.data.id) {
      await con('data_wallets').where({ id: wallet.data.id }).update(wallet.data);
    } else {
      await con('data_wallets').insert(wallet.data);
    }
  }
}
