'use server';
import { User } from './utils/User';
import { options } from 'app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import { UserError } from './utils/enums/UserError';
import db from 'dbconfig';

export async function ARegisterUser(credentials: { email: string; password1: string }) {
  const trx = await db.transaction();
  try {
    const [{ id: userId }] = await trx('data_users').insert(
      {
        email: credentials.email,
        password: await bcrypt.hash(credentials.password1, 15),
      },
      'id'
    );

    const [defaultCurrencyId] = await trx('data_currencies').where({ symbol: 'MK' }).pluck('id');
    const [{ id: walletId }] = await trx('data_wallets').insert(
      {
        currencyId: defaultCurrencyId,
        userId,
      },
      'id'
    );

    const defWallet = {
      userId,
      walletId,
    };

    console.log(defWallet);
    await trx('data_defaultWallets').insert(defWallet);

    await trx.commit();
    return 0;
  } catch (err: any) {
    await trx.rollback();
    const msg = err.message;

    console.log(msg);

    if (msg.includes('DUPLICATE') || msg.includes('UNIQUE')) {
      return UserError.DUPLICATE;
    }

    return -1;
  }
}

export async function AUpdateEmail(newEmail: string) {
  const session = (await getServerSession(options as any)) as any;
  const user = await User.loadUser(session.user.id);

  const result = user.updateEmail(newEmail);
  if (result === 0) {
    await User.saveUser(user);
  }

  return result;
}

export async function AUpdatePassword(oldPassword: string, newPassword: string) {
  const session = (await getServerSession(options as any)) as any;
  const user = await User.loadUser(session.user.id);
  const ok = await bcrypt.compare(oldPassword, user.data.password);
  if (!ok) return UserError.PASSWORD_MISMATCH;

  const result = user.updatePassword(newPassword);
  if (result === 0) {
    await User.saveUser(user);
  }

  return result;
}
