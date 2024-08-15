import { Heading } from '@/components/UI/Heading';
import { Main } from '@/components/UI/Main';
import { GameForm } from './GameForm';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { BackButton } from '@/components/UI/BackButton';

export default async function AddGamePage() {
  return (
    <main className='flex bg-gradient-to-b from-white to-slate-200 flex-col gap-2 p-1'>
      <div className='flex gap-4 w-full items-center'>
        <BackButton />

        <Heading>Create Bet</Heading>
      </div>

      <GameForm />
    </main>
  );
}
