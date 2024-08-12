import { Main } from '@/components/UI/Main';
import { RegisterForm } from './RegisterForm';
import { Heading } from '../Heading';
import { ContentContainer } from '../ContentContainer';
import { Blinker } from '@/components/Feature/Blinker';
import { TypeText } from '@/components/Feature/TypeText';

export default async function RegisterPage() {
  return (
    <Main>
      <ContentContainer>
        <Heading>
          <TypeText
            text='Register'
            speed={100}
            cursor={<Blinker speed={700}>_</Blinker>}
          />
        </Heading>
        <RegisterForm />
      </ContentContainer>
    </Main>
  );
}
