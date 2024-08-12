'use client';

import { Button } from '@/components/UI/Button';
import { FormControl, Select } from '@/components/UI/FormUtils';
import { Spinner } from '@/components/UI/Spinner';
import { GameError } from '@/utils/classes/enums/GameError';
import { Check } from '@mui/icons-material';
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
        if (res == GameError.CONTESTED) {
          toast.error('Not all bet participants have bid the minimum. Cannot close!');
        } else if (res == 0) {
          toast.success('Bet closed successfully!');
          router.back();
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
      className='flex flex-col gap-2 w-full justify-end mt-4'
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
      <div className='flex gap-2 w-full mt-4'>
        <Button
          onClick={() => router.back()}
          fullWidth
          disabled={loading}
          type='button'
          variant='outlined'>
          Cancel
        </Button>

        <Button
          fullWidth
          disabled={loading}
          variant='contained'
          startIcon={(loading && <Spinner />) || <Check />}
          type='submit'>
          Close Game
        </Button>
      </div>
    </form>
  );
}
