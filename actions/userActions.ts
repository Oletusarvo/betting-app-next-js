'use server';
import { User } from './utils/User';
import { options } from 'app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import { UserError } from './utils/enums/UserError';

export async function ARegisterUser(credentials: { email: string; password1: string }) {
  console.log(credentials);
  return await User.createUser(credentials);
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
