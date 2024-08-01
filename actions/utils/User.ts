import db from 'dbconfig';
import { AppObject } from '../../utils/classes/AppObject';
import bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { SubmitStatus } from '@/hooks/useSubmitData';
import { UserError } from './enums/UserError';
import { UserType } from './types/UserType';

export class User extends AppObject<UserType> {
  constructor(data: UserType) {
    super(data);
  }

  public updateEmail(newEmail: string) {
    this.data.email = newEmail;
    return 0;
  }

  public updatePassword(newPassword: string) {
    this.data.password = newPassword;
    return 0;
  }

  public static async createUser(data: { email: string; password1: string }) {
    const trx = await db.transaction();
    try {
      const encryptedPassword = await bcrypt.hash(data.password1, 15);
      const [{ id: userId }] = await trx('data_users').insert(
        {
          email: data.email,
          password: encryptedPassword,
        },
        'id'
      );

      const [defaultCurrencyId] = await trx('data_currencies').where({ symbol: 'MK' }).pluck('id');
      await trx('data_wallets').insert({
        balance: 1000 * 100,
        userId,
        currencyId: defaultCurrencyId,
      });

      await trx.commit();
      return 0;
    } catch (err: any) {
      await trx.rollback();

      const msg = err.message;
      if (msg.includes('UNIQUE') || msg.includes('DUPLICATE')) {
        return UserError.DUPLICATE;
      } else {
        console.log(msg);
        return -1;
      }
    }
  }

  public static async verifyCredentials(email: string, password: string) {
    const [encryptedPassword] = await db('data_users').where({ email }).pluck('password');
    const ok = await bcrypt.compare(password, encryptedPassword);
    return ok;
  }

  public static async loadUser(userId: number) {
    const [user] = (await db('users').where({ id: userId })) as [UserType];
    return new User(user);
  }

  public static async saveUser(user: User, trx?: Knex.Transaction) {
    return await super.save(async trx => {
      const encryptedPassword = await bcrypt.hash(user.data.password, 15);
      await trx('users')
        .where({ id: user.data.id })
        .update({
          ...user.data,
          password: encryptedPassword,
        });
    }, trx);
  }
}
