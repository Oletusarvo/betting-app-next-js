import { DatabaseTable } from '../databaseTable';
import { Users } from '../../actions/utils/users';
import bcrypt from 'bcrypt';
import db from '../../dbconfig';

jest.mock('bcrypt');
jest.mock('../databaseTable');
jest.mock('../../dbconfig');

test('Registers a user correctly.', async () => {
  const credentials = {
    email: 'test',
    password1: 'test',
    password2: 'test2',
  };

  const users = new Users();
  await users.register(credentials);
  expect(DatabaseTable.prototype.add).toHaveBeenCalledTimes(1);
  expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  expect(bcrypt.hash).toHaveBeenCalledWith(credentials.password1, 15);
});

test('Correctly calls bcrypt.hash inside the private hashPassword-method.', async () => {
  const users = new Users();
  await (users as any).hashPassword('test');
  expect(bcrypt.hash).toHaveBeenCalledWith('test', 15);
});

test('Rejects updating of password if the old password is incorrect.', async () => {
  const users = new Users();
  (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([{ password: '1234' }]);
  (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
  await expect(users.updatePassword('test', 'test', 'test')).resolves.toBe('invalid_password');
});

test('Updates a password if the old password is correct', async () => {
  const users = new Users();
  (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([{ password: '1234' }]);
  (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
  (bcrypt.hash as jest.Mock).mockResolvedValueOnce('test');

  await expect(users.updatePassword('test', 'test', 'test')).resolves.not.toThrow();
  expect(bcrypt.hash).toHaveBeenCalledWith('test', 15);
  expect(DatabaseTable.prototype.update).toHaveBeenCalledWith({ password: 'test' }, { id: 'test' });
});

test('Correctly increments the creator reputation of a user', async () => {
  const users = new Users();
  console.log(typeof db);
  await users.updateCreatorReputation('test', 1);
  expect(db.increment).toHaveBeenCalledWith({
    creatorReputation: 1,
  });
});
