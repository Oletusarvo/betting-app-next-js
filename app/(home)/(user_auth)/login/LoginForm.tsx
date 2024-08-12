'use client';

import { FormControl, Group, Input, InputError, Label } from '@/components/UI/FormUtils';
import { UserAuthForm } from '../UserAuthForm';
import Link from 'next/link';
import { useLoginForm } from './page.hooks';

import { Spinner } from '@/components/UI/Spinner';

import { SubmitStatus } from '@/hooks/useSubmitData';
import { UserError } from 'actions/utils/enums/UserError';
import { Button } from '@/components/UI/Button';

export function LoginForm() {
  const { submit, updateData, status } = useLoginForm();

  const loading = status == SubmitStatus.LOADING;

  return (
    <UserAuthForm
      onSubmit={submit}
      onChange={updateData}>
      <FormControl
        label='Email'
        control={
          <Input
            type='email'
            placeholder='Type your email...'
            name='email'
            required
          />
        }
        helper={
          status === UserError.EMAIL_MISMATCH ? (
            <InputError>A user with the given email does not exist!</InputError>
          ) : null
        }
      />

      <FormControl
        label='Password'
        control={
          <Input
            type='password'
            name='password'
            required
            placeholder='Type your password...'
          />
        }
        helper={
          status === UserError.PASSWORD_MISMATCH ? (
            <InputError>The given password is incorrect!</InputError>
          ) : null
        }
      />

      <div className='flex gap-4 xs:w-full lg:w-auto'>
        <Button
          href='/'
          type='button'
          disabled={loading}
          variant='outlined'
          fullWidth>
          Cancel
        </Button>

        <Button
          fullWidth
          disabled={loading}
          loading={loading}
          variant='contained'
          type='submit'>
          Login
        </Button>
      </div>
    </UserAuthForm>
  );
}
