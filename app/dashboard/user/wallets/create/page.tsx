import { CreateDataForm } from '@/components/Feature/CreateDataForm';
import { Main } from '@/components/UI/Main';
import { loadSession } from '@/utils/loadSession';
import db from 'dbconfig';

export default async function AddWalletPage() {
  const session = await loadSession();
  const availableCurrencies = await db('data_currencies');
  return (
    <Main>
      <h1>Create Wallet</h1>
    </Main>
  );
}
