import Link from 'next/link';

export default async function IndexHeader() {
  return (
    <header className='flex items-center pt-8 gap-4'>
      <Link href='/leaderboard'>Leaderboard</Link>
      <Link href='/toplist'>Top List</Link>
    </header>
  );
}
