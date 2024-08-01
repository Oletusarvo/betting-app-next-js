import { ARegisterUser } from '../userActions';

jest.mock('../userActions.ts');

describe('Testing user registration', () => {
  beforeAll(async () => {
    await ARegisterUser({
      password1: 'test',
      email: 'test',
    });
  });

  it('Calls the User.createUser-method.', async () => {
    expect(ARegisterUser).toHaveBeenCalledTimes(1);
  });
});
