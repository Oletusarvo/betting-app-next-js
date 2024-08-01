import db from '../dbconfig';
import { Knex } from 'knex';

export class DatabaseTable<T> {
  private m_tablename: string;
  private m_connection: any;

  constructor(tablename: string, trx?: Knex.Transaction) {
    this.m_tablename = tablename;
    this.m_connection = trx || db;
  }

  get tablename() {
    return this.m_tablename;
  }

  get connection() {
    return this.m_connection;
  }

  protected set connection(connection: TODO) {
    this.m_connection = connection;
  }

  get(query?: any) {
    if (!query) {
      return this.connection(this.tablename);
    } else {
      return this.connection(this.tablename).where(query);
    }
  }

  add(data: Partial<T>, returning?: string | string[]) {
    return this.connection(this.tablename).insert(data, returning);
  }

  update(data: Partial<T>, query: any) {
    return this.connection(this.tablename).where(query).update(data);
  }

  select(columns: string | string[], query: any) {
    return this.connection(this.tablename).where(query).select(columns);
  }
}

export abstract class DatabaseTableSingleton<T extends {}> extends DatabaseTable<T> {
  constructor(tablename: string) {
    super(tablename);
  }

  /**Resets the internal db-connection to the provided transaction object. */
  connectTransaction(trx: Knex.Transaction) {
    (super.connection as TODO) = trx;
  }

  /*Sets the internal db-connection to the default db object.*/
  disconnectTransaction() {
    super.connection = db;
  }
}
