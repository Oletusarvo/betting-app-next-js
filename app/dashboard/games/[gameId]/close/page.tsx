import { Main } from '@/components/UI/Main';
import db from 'dbconfig';
import { CloseGameForm } from './CloseGameForm';

export default async function CloseGamePage({ params }: TODO) {
  const gameId = params.gameId;
  const options = await db('data_gamePositions').where({ gameId });

  return (
    <Main>
      <h1>Close Bet</h1>
      <CloseGameForm
        gameId={gameId}
        options={options}
      />
    </Main>
  );
}
