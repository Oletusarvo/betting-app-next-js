'use client';

import { TokenInput } from '@/components/Feature/TokenInput';
import { Fieldset, FormControl, Input, InputSubLabel, Select } from '@/components/UI/FormUtils';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { SubmitStatus, useSubmitData } from '@/hooks/useSubmitData';

import { ACreateGame } from 'actions/gameActions';
import { useRouter } from 'next/navigation';
import { createContext, useRef } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../UI/Button';

type CreateDataFormProps<T> = React.PropsWithChildren & {
  createMethod: (data: T) => Promise<number>;
  initialData: T;
};

export function CreateDataForm<T>({ children, createMethod, initialData }: CreateDataFormProps<T>) {
  const router = useRouter();

  const { submit, updateData, status, updateStatus } = useSubmitData(
    initialData as TODO,
    async data => {
      updateStatus(SubmitStatus.LOADING);
      await createMethod(data)
        .then(res => {
          if (res == 0) {
            router.back();
          }
        })
        .catch(err => toast.error(err.message));
      updateStatus(SubmitStatus.IDLE);
    }
  );

  const loading = status == SubmitStatus.LOADING;
  return (
    <form
      className='flex gap-2 flex-col w-full'
      onSubmit={submit}
      onChange={updateData}>
      {children}

      <div className='flex w-full justify-end gap-2'>
        <Button
          variant='text'
          disabled={loading}
          onClick={() => router.back()}>
          Cancel
        </Button>

        <Button
          loading={loading}
          disabled={loading}
          type='submit'
          variant='contained'>
          Submit
        </Button>
      </div>
    </form>
  );
}
