import { Blinker } from '@/components/Feature/Blinker';
import { TypeText } from '@/components/Feature/TypeText';
import { Main } from '@/components/UI/Main';
import Link from 'next/link';
import IndexHeader from './indexHeader';
import Title from './Title';
import { Button } from '@/components/UI/Button';

export default async function HomePage() {
  return (
    <Main>
      <div className='flex flex-col justify-center flex-1 xs:items-center lg:items-start'>
        <div className='flex flex-col gap-2 xs:items-center lg:items-start'>
          <Title />
          <h3 className='sm:text-lg md:text-2xl mb-4'>A betting app.</h3>
          <p className='text-lg xs:text-center lg:text-left'>
            Create bets and bid on them using your own currencies with your friends, and the world!
          </p>

          <div className='flex flex-row gap-4 mt-8'>
            <Button
              href='/register'
              variant='contained'>
              Register
            </Button>

            <Button
              href='/login'
              variant='outlined'>
              Login
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
}
