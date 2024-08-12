import { Main } from '@/components/UI/Main';
import { ContentContainer } from '../ContentContainer';
import { Heading } from '../Heading';
import { LoginForm } from './LoginForm';
import { TypeText } from '@/components/Feature/TypeText';
import { Blinker } from '@/components/Feature/Blinker';

export default function LoginPage() {
  return (
    <Main>
      <ContentContainer>
        <Heading>
          <TypeText
            text='Login'
            speed={100}
            cursor={<Blinker speed={700}>_</Blinker>}
          />
        </Heading>

        <LoginForm />
      </ContentContainer>
    </Main>
  );
}
