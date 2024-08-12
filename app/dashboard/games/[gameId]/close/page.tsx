import { Main } from '@/components/UI/Main';
import db from 'dbconfig';
import { CloseGameForm } from './CloseGameForm';
import { Heading } from 'app/(home)/(user_auth)/Heading';
import { TypeText } from '@/components/Feature/TypeText';
import { Blinker } from '@/components/Feature/Blinker';

export default async function CloseGamePage({ params }: TODO) {
  const gameId = params.gameId;
  const options = await db('data_gamePositions').where({ gameId });

  return (
    <Main>
      <Heading>
        <TypeText
          speed={50}
          text='Close Bet'
          cursor={<Blinker speed={700}>_</Blinker>}
        />
      </Heading>
      <CloseGameForm
        gameId={gameId}
        options={options}
      />
    </Main>
  );
}
