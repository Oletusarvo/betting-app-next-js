'use server';

import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export async function ACreateCurrency(data: TODO) {
  const session = await loadSession();
  await db('data_currencies').insert({
    ...data,
    authorId: session.user.id,
  });
  return 0;
}
