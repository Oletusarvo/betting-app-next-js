import db from 'dbconfig';
import knex, { Knex } from 'knex';

export abstract class AppObject<T extends {}> {
  protected m_data: T;
  constructor(data: T) {
    this.m_data = data;
  }

  public get data() {
    return this.m_data;
  }

  protected static async save(
    run: (trx: Knex.Transaction) => Promise<void>,
    trx?: Knex.Transaction
  ) {
    const con = trx || (await db.transaction());
    try {
      await run(con);

      if (!trx) {
        await con.commit();
      }
    } catch (err: any) {
      console.log(err.message);

      if (!trx) {
        await con.rollback();
      }

      throw err;
    }
  }
}
