import { Main } from '@/components/UI/Main';
import { CreateCurrencyForm } from './CreateCurrencyForm';

export default async function CreateCurrencyPage() {
  return (
    <Main>
      <h1>Create a currency</h1>
      <CreateCurrencyForm />
    </Main>
  );
}
