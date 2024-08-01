import { Knex } from 'knex';
import db from './dbconfig';

class Transaction {
  private m_trx: Knex.Transaction | null = null;
  private m_transactionOpen: boolean = false;

  public async getTransaction() {
    if (this.m_transactionOpen && this.m_trx) {
      return this.m_trx;
    } else {
      return await db.transaction();
    }
  }

  public async commit() {
    if (this.m_trx) {
      await this.m_trx.commit();
      this.m_transactionOpen = false;
      this.m_trx = null;
    }
  }

  public async rollback() {
    if (this.m_trx) {
      await this.m_trx.rollback();
      this.m_transactionOpen = false;
      this.m_trx = null;
    }
  }
}

export const transaction = new Transaction();
