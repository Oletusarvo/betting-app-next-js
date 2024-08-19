import { Heading } from '@/components/UI/Heading';
import { GameForm } from './GameForm';
import { BackButton } from '@/components/UI/BackButton';
import { CreateTabs } from './createTabs';

export default function AddGamePage() {
  return (
    <main className='flex bg-gradient-to-b from-white to-slate-200 flex-col gap-2 p-1'>
      <CreateTabs />
    </main>
  );
}
