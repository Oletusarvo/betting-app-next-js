'use server';

import { options } from 'app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

/**Gets the session of the current user. Throws an error if no session exists. */
export async function getSession() {
  const session = (await getServerSession(options as TODO)) as TODO;
  if (!session) throw new Error('Could not get the server session!');
  return session;
}
