'use client';

import { FormControl, Input, InputDescription, InputError } from '@/components/UI/FormUtils';
import Link from 'next/link';
import { UserAuthForm } from '../UserAuthForm';
import { useRegisterForm } from './page.hooks';

import { UserError } from 'actions/utils/enums/UserError';
import { Button } from '@/components/UI/Button';
import { SubmitStatus } from '@/hooks/useSubmitData';

export function RegisterForm() {
  const { submit, status, updateData } = useRegisterForm();
  const loading = status == SubmitStatus.LOADING;

  return (
    <UserAuthForm
      onSubmit={submit}
      onChange={updateData}>
      <FormControl
        label='Email'
        control={
          <Input
            required
            placeholder='Type your email address...'
            name='email'
            type='email'
          />
        }
        helper={
          status === UserError.DUPLICATE ? (
            <InputError>An account with the given email already exists!</InputError>
          ) : null
        }
      />

      <FormControl
        label='Password'
        control={
          <Input
            required
            placeholder='Type your email address...'
            name='password1'
            autoComplete='off'
            type='password'
          />
        }
        helper={
          status === UserError.PASSWORD_MISMATCH ? (
            <InputError>The passwords do not match!</InputError>
          ) : (
            <InputDescription>The password should be at least 8 characters long.</InputDescription>
          )
        }
      />

      <FormControl
        label='Confirm password'
        control={
          <Input
            required
            placeholder='Re-type your password...'
            name='password2'
            autoComplete='off'
            type='password'
          />
        }
      />

      <div className='flex gap-4 xs:w-full lg:w-auto'>
        <Button
          loading={loading}
          disabled={loading}
          type='submit'
          variant='contained'
          fullWidth>
          Register Account
        </Button>

        <Button
          component={Link}
          href='/'
          disabled={loading}
          variant='outlined'
          fullWidth>
          Cancel
        </Button>
      </div>
    </UserAuthForm>
  );
}
