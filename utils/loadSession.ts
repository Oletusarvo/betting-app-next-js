import { options } from 'app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export async function loadSession() {
  const session = (await getServerSession(options as TODO)) as TODO;
  if (!session) throw new Error('Failed to load user session!');
  return session;
}
