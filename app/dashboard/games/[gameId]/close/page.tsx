import { Main } from '@/components/UI/Main';
import db from 'dbconfig';
import { CloseGameForm } from './CloseGameForm';
import { Heading } from 'app/(home)/(user_auth)/Heading';
import { TypeText } from '@/components/Feature/TypeText';
import { Blinker } from '@/components/Feature/Blinker';

export default async function CloseGamePage({ params }: TODO) {
  const gameId = params.gameId;
  const [{ title, description }] = await db('data_games')
    .where({ id: gameId })
    .select('title', 'description');
  const options = await db('data_gamePositions').where({ gameId });

  console.log(title, description);
  return (
    <Main>
      <Heading>
        <TypeText
          speed={50}
          text='Close Bet'
          cursor={<Blinker speed={700}>_</Blinker>}
        />
      </Heading>

      <div className='flex flex-col mt-4'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <p>{description || 'No description.'}</p>
      </div>

      <CloseGameForm
        gameId={gameId}
        options={options}
      />
    </Main>
  );
}
