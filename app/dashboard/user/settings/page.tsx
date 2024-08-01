import { Fieldset, FormControl, Input, Select } from '@/components/UI/FormUtils';
import { Main } from '@/components/UI/Main';
import { loadSession } from '@/utils/loadSession';
import { Check } from '@mui/icons-material';
import Button from '@mui/material/Button';
import bcrypt from 'bcrypt';
import db from 'dbconfig';

export default async function UserSettingsPage() {
  const session = await loadSession();
  const wallets = await db('data_wallets')
    .join('data_currencies', { 'data_currencies.id': 'data_wallets.currencyId' })
    .where({ 'data_wallets.userId': session.user.id })
    .select(
      'data_wallets.id as walletId',
      'data_currencies.id as currencyId',
      'data_currencies.name as currencyName',
      'data_currencies.symbol as currencySymbol'
    );

  return (
    <Main>
      <h1>Settings</h1>
      <form
        className='w-full flex flex-col gap-2'
        action={async fd => {
          'use server';
          const email = fd.get('email')?.toString();
          const password = fd.get('password')?.toString();
          const defaultWalletId = fd.get('defaultWalletSymbol')?.toString();

          const data = {
            email: email,
            password: password && (await bcrypt.hash(password, 15)),
          };
          const trx = await db.transaction();
          try {
            await trx('data_users').where({ id: session.user.id }).update(data);
            if (defaultWalletId) {
              await trx('data_defaultWallets')
                .insert({
                  walletId: defaultWalletId,
                  userId: session.user.id,
                })
                .onConflict('userId')
                .merge();
            }
            await trx.commit();
          } catch (err: TODO) {
            console.log(err.message);
            await trx.rollback();
          }
        }}>
        <Fieldset legend='General'>
          <FormControl
            required
            label='Email'
            control={
              <Input
                name='email'
                type='email'
                defaultValue={session.user.email}
                placeholder='Type an email...'
              />
            }
            helper='The email address used to log into your account.'
          />
          <FormControl
            label='Password'
            required
            control={
              <Input
                maxLength={8}
                name='password'
                type='password'
                autoComplete='new-password'
                placeholder='Type a new password...'
              />
            }
            helper={'The password must be at least 8 characters long.'}
          />
        </Fieldset>

        <Fieldset legend='Wallets'>
          <FormControl
            label='Default Wallet'
            control={
              <Select
                name='defaultWalletId'
                disabled>
                {wallets.map(w => (
                  <option value={w.walletId}>{w.currencySymbol}</option>
                ))}
              </Select>
            }
            helper='Currently only the default currency is available.'
          />
        </Fieldset>

        <div className='flex items-center w-full gap-2 justify-end'>
          <Button
            type='button'
            variant='text'>
            Cancel
          </Button>
          <Button
            type='submit'
            startIcon={<Check />}
            variant='contained'>
            Save
          </Button>
        </div>
      </form>
    </Main>
  );
}
