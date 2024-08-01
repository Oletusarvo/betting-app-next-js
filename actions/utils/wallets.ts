import { Knex } from 'knex';
import { TableNames } from '../../utils/constants';
import { DatabaseTable, DatabaseTableSingleton } from '../../utils/databaseTable';
import { WalletType } from 'types/WalletType';

class Wallets extends DatabaseTableSingleton<WalletType> {
  constructor() {
    super('wallets');
  }

  async charge(id: number, amount: number) {
    return this.connection(this.tablename).where({ id }).decrement('balance', {
      amount,
    });
  }
}

export const wallets = new Wallets();
