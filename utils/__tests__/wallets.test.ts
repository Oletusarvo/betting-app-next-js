import { Wallets } from '../../actions/utils/wallets';
import { DatabaseTable } from '../databaseTable';

jest.mock('../databaseTable');

test('Creates a wallet correctly.', async () => {
  const wallets = new Wallets();
  await wallets.create(0, 'TST');
  expect(DatabaseTable.prototype.add).toHaveBeenCalledWith(
    {
      amount: 0,
      currencySymbol: 'TST',
      userId: 0,
    },
    'id'
  );
});
