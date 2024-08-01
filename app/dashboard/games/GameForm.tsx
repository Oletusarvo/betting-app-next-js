'use client';

import { CreateDataForm } from '@/components/Feature/CreateDataForm';
import { TokenInput } from '@/components/Feature/TokenInput';
import { Fieldset, FormControl, Input, InputSubLabel, Select } from '@/components/UI/FormUtils';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { useSubmitData } from '@/hooks/useSubmitData';
import { GameType } from '@/utils/classes/Game';
import { Button } from '@mui/material';
import { ACreateGame } from 'actions/gameActions';
import { useRouter } from 'next/navigation';
import { createContext, useRef } from 'react';
import toast from 'react-hot-toast';
import { GamePositionsInput } from './create/GamePositionsInput';

type GameFormProps = {
  game?: GameType;
  options?: { id: string; value: string }[];
};

export function GameForm({ game, options }: GameFormProps) {
  const tokenInputRef = useRef<TODO>(null);
  return (
    <CreateDataForm
      initialData={{ symbol: 'MK' }}
      createMethod={async data => {
        return await ACreateGame(
          data as TODO,
          data.symbol,
          tokenInputRef.current?.tokens || []
        ).then(res => {
          if (res != 0) {
            toast.error('Error creating bet!');
          } else {
            toast.success('Bet created successfully!');
          }

          return res;
        });
      }}>
      <Fieldset legend='Main'>
        <FormControl
          label='Title'
          control={
            <Input
              name='title'
              required
              placeholder='Type a title...'
              defaultValue={game && game.title}
            />
          }
        />

        <FormControl
          label='Currency'
          required
          control={
            <Select
              disabled
              name='currency'>
              <option value='MK'>MK</option>
            </Select>
          }
        />
      </Fieldset>

      <Fieldset legend='Bids'>
        <FormControl
          label='Starting Bid'
          required
          control={
            <Input
              name='minBid'
              placeholder='Type starting bid...'
              type='number'
              defaultValue={game && game.minBid / 100}
              step={0.01}
            />
          }
          helper={<InputSubLabel>The minimum bid amount the game starts with.</InputSubLabel>}
        />

        <FormControl
          label='Minimum Raise'
          control={
            <Input
              name='minRaise'
              type='number'
              placeholder='Type minimum raise...'
              defaultValue={game && game.minRaise && game.minRaise / 100}
              step={0.01}
            />
          }
          helper={
            <InputSubLabel>
              The minimum amount a previous bid has to be raised with. Leave blank to use default.
            </InputSubLabel>
          }
        />

        <FormControl
          label='Maximum Bid'
          control={
            <Input
              name='maxBid'
              type='number'
              step={0.01}
              placeholder='Type maximum bid...'
              defaultValue={game && game.maxBid && game.maxBid / 100}
            />
          }
          helper={
            <InputSubLabel>
              The maximum bid that can be placed per user. Leave blank for no limit.
            </InputSubLabel>
          }
        />

        <FormControl
          label='Maximum Raise'
          control={
            <Input
              name='maxRaise'
              type='number'
              step={0.01}
              placeholder='Type maximum raise...'
              defaultValue={game && game.maxRaise && game.maxRaise / 100}
            />
          }
          helper={
            <InputSubLabel>
              The maximum amount by which a bid can be raised above the minimum bid. Leave blank for
              no limit.
            </InputSubLabel>
          }
        />

        <FormControl
          label='Options'
          control={
            <TokenInput
              ref={tokenInputRef}
              initialTokens={options?.map(opt => opt.value)}
            />
          }
        />
      </Fieldset>
    </CreateDataForm>
  );
}
