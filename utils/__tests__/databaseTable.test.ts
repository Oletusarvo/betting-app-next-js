import db from '../../dbconfig';
import { DatabaseTable } from '../databaseTable';

jest.mock('../../dbconfig');

test('Correctly assigns the tablename and sets the connection to db, if a trx is not passed.', () => {
  const table = new DatabaseTable('test');
  expect(table.tablename).toBe('test');
  expect(table.connection).toEqual(db);
});

test('Correctly assigns the trx, when passed.', async () => {
  const trx = {};
  const table = new DatabaseTable('test', trx as any);
  expect(table.connection).toEqual(trx);
});
