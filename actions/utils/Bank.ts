import db from 'dbconfig';
import { Knex } from 'knex';

export class Bank {
  private static table = 'data_currencies';

  private static initConnection(trx?: Knex.Transaction) {
    return trx || db;
  }

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
