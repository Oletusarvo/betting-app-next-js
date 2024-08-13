import db from 'dbconfig';
import { Knex } from 'knex';

export class Bank {
  private static table = 'data_currencies';

  private static initConnection(trx?: Knex.Transaction) {
    return trx || db;
  }

  public static async deposit(walletId: string, amount: number, trx?: Knex.Transaction) {
    const con = this.initConnection(trx);
    const [wallet] = await con('data_wallets')
      .where({ id: walletId })
      .select('balance', 'currencyId');

    const balanceBeforeDeposit = wallet.balance;
    const balanceAfterDeposit = wallet.balance + amount;

    if (balanceBeforeDeposit < 0) {
      const amountToPutInReserve =
        balanceAfterDeposit < 0
          ? balanceAfterDeposit - balanceBeforeDeposit
          : Math.abs(balanceBeforeDeposit);

      await Bank.putInReserve(wallet.currencyId, amountToPutInReserve, trx);
    }

    await con('data_wallets').where({ id: walletId }).update({
      balance: balanceAfterDeposit,
    });
  }

  /**Mints new currency and increases its circulation. */
  private static async mintCurrency(id: string, amount: number, trx?: Knex.Transaction) {
    const con = this.initConnection(trx);
    await con(Bank.table).where({ id }).increment('inCirculation', amount);
  }

  /**Pulls more money from the current reserve of a currency, and mints more into circulation if the reserve is insufficient. */
  static async pullFromReserve(id: string, amount: number, trx?: Knex.Transaction) {
    const con = this.initConnection(trx);
    const [currentReserve] = await con(this.table).where({ id }).pluck('reserve');

    if (currentReserve >= amount) {
      await con(this.table).where({ id }).decrement('reserve', amount);
    } else {
      const amountToMint = amount - currentReserve;
      await this.mintCurrency(id, amountToMint, trx);
      await con(this.table).where({ id }).update({ reserve: 0 });
    }
  }

  static async putInReserve(id: string, amount: number, trx?: Knex.Transaction) {
    const con = this.initConnection(trx);
    await con(this.table).where({ id }).increment('reserve', amount);
  }
}
