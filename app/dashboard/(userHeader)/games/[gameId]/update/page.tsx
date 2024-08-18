import { Main } from '@/components/UI/Main';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';
import { GameForm } from '../../../../createGame/GameForm';

export default async function UpdateGamePage({ params }: TODO) {
  const session = await loadSession();
  const [game] = await db('data_games').where({ id: params.gameId });
  const options = await db('data_gamePositions').where({ gameId: params.gameId });
  const authorized = game.authorId == session.user.id;

  return authorized ? (
    <Main>
      <h1>Update Bet</h1>
      <GameForm
        game={game}
        options={options}
      />
    </Main>
  ) : (
    <span>You can not update this bet.</span>
  );
}
