'use client';

import { TokenInput } from '@/components/Feature/TokenInput';
import { Fieldset, FormControl, Input, InputSubLabel, Select } from '@/components/UI/FormUtils';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { useSubmitData } from '@/hooks/useSubmitData';
import { Button } from '@mui/material';
import { ACreateGame } from 'actions/gameActions';
import { useRouter } from 'next/navigation';
import { createContext, useRef } from 'react';
import toast from 'react-hot-toast';

type CreateDataFormProps<T> = React.PropsWithChildren & {
  createMethod: (data: T) => Promise<number>;
  initialData: T;
};

export function CreateDataForm<T>({ children, createMethod, initialData }: CreateDataFormProps<T>) {
  const router = useRouter();

  const { submit, updateData } = useSubmitData(initialData as TODO, async data => {
    await createMethod(data)
      .then(res => {
        if (res == 0) {
          router.back();
        }
      })
      .catch(err => toast.error(err.message));
  });

  return (
    <form
      className='flex gap-2 flex-col w-full'
      onSubmit={submit}
      onChange={updateData}>
      {children}

      <div className='flex w-full justify-end gap-2'>
        <Button
          type='submit'
          variant='contained'>
          Submit
        </Button>
      </div>
    </form>
  );
}
