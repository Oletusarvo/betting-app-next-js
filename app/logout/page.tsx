'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({
      redirect: false,
    }).then(() => {
      router.push('/');
    });
  }, []);

  return (
    <main className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl text-slate-500'>Logging out...</h1>
    </main>
  );
}
