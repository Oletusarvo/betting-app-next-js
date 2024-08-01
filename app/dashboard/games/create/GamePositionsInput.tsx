'use client';

import { Input } from '@/components/UI/FormUtils';
import Button from '@mui/material/Button';
import { useState } from 'react';

function GamePositionEntry() {
  return <div className='flex flex-col'></div>;
}
type GamePositionsInputProps = {
  onUpdate: (position: string) => void;
};

export function GamePositionsInput({ onUpdate }: GamePositionsInputProps) {
  const [addedPositions, setAddedPositions] = useState<string[]>([]);

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex flex-col w-full justify-end gap-2'>
        <div className='flex w-full gap-2'>
          <Input
            placeholder='Type a position name...'
            className='flex-1'
          />
          <Input
            type='number'
            step='1'
            max='100'
            placeholder='Type a weight for this option...'
          />
        </div>
        <Button
          type='button'
          variant='contained'>
          Add
        </Button>
      </div>
    </div>
  );
}
