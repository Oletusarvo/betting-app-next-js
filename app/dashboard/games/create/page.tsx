import { Heading } from '@/components/UI/Heading';
import { Main } from '@/components/UI/Main';
import { GameForm } from '../GameForm';

export default async function AddGamePage() {
  return (
    <Main>
      <h1>Create Bet</h1>
      <GameForm />
    </Main>
  );
}
