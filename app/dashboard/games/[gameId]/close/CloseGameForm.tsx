'use client';

import { FormControl, Select } from '@/components/UI/FormUtils';
import { Spinner } from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ACloseGame } from 'actions/gameActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function CloseGameForm({ gameId, options }: TODO) {
  const router = useRouter();
  const [status, setStatus] = useState(0);

  const handleSubmit = async (e: TODO) => {
    e.preventDefault();
    setStatus(1);
    await ACloseGame(gameId, e.target.option.value)
      .then(res => {
        if (res == 0) {
          toast.success('Bet closed successfully!');
          router.push('/dashboard/games');
        } else {
          throw res;
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
    setStatus(0);
  };

  const loading = status == 1;
  return (
    <form
      className='flex flex-col gap-2 w-full justify-end'
      onSubmit={handleSubmit}>
      <FormControl
        helper={'The correct answer to the bet.'}
        label='On option'
        control={
          <Select name='option'>
            {options.map((opt: TODO) => (
              <option value={opt.id}>{opt.value}</option>
            ))}
          </Select>
        }
      />
      <Button
        disabled={loading}
        variant='contained'
        startIcon={(loading && <Spinner />) || <Check />}
        type='submit'>
        Close Game
      </Button>
    </form>
  );
}
