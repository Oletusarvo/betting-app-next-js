import { useInputData } from '@/hooks/useInputData';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Input } from '../UI/FormUtils';

import { Cancel, Close, Delete, HighlightOff } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { Chip } from '../UI/Chip';
import { Button } from '../UI/Button';

export const TokenInput = forwardRef(function ({ initialTokens }: TODO, ref: TODO) {
  const [tokens, setTokens] = useState<string[]>(initialTokens || []);
  const [selectedToken, setSelectedToken] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return { tokens };
  });

  const addToken = () => {
    const currentValue = inputRef.current?.value;

    if (!currentValue || currentValue == '') return;

    setTokens(prev => {
      const newTokens = prev.filter(tok => tok != currentValue);
      newTokens.push(currentValue);
      return newTokens;
    });

    inputRef.current.value = '';
  };

  const deleteToken = (token: string) => setTokens(prev => prev.filter(t => t != token));

  return (
    <form className='flex flex-col w-full gap-2'>
      <div className='flex flex-col justify-between gap-2 w-full'>
        <Input
          placeholder='Type a value...'
          ref={inputRef}
          defaultValue={selectedToken && selectedToken}
        />

        <Button
          type='button'
          variant='contained'
          onClick={addToken}>
          Add
        </Button>
      </div>
      <div className='flex gap-2 w-full flex-wrap'>
        {tokens.map(token => (
          <Chip
            onClick={() => setSelectedToken(token)}
            onDelete={() => deleteToken(token)}>
            {token}
          </Chip>
        ))}
      </div>
    </form>
  );
});
