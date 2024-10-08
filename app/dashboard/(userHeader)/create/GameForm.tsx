'use client';

import { CreateDataForm } from '@/components/Feature/CreateDataForm';
import { TokenInput } from '@/components/Feature/TokenInput';
import { Fieldset, FormControl, InputSubLabel } from '@/components/UI/FormUtils';
import { Input, Select, Textarea } from '@/components/UI/Input';
import { GameType } from '@/utils/classes/Game';
import { ACreateGame, AUpdateGame } from 'actions/gameActions';
import { useRef } from 'react';
import toast from 'react-hot-toast';

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
        if (game) {
          return await AUpdateGame(game.id, data)
            .then(res => {
              toast.success('Bet updated successfully!');
              return res;
            })
            .catch((err: any) => {
              toast.error(err.message);
              return -1;
            });
        } else {
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
        }
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
          label='Description'
          control={
            <Textarea
              name='description'
              placeholder='Write a description for the bet...'></Textarea>
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

        <FormControl
          label='Tax (%)'
          control={
            <Input
              type='number'
              name='tax'
              placeholder='Type a tax...'
              min={0}
              defaultValue={0}
              max={99}
            />
          }
          helper={
            <InputSubLabel>
              The tax is the precentage amount collected to the creator from the final pool upon bet
              closure.
            </InputSubLabel>
          }
        />

        <FormControl
          label='Expiry Date'
          control={
            <Input
              type='date'
              defaultValue={game && game.expiresAt && new Date(game.expiresAt).toString()}
            />
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
              defaultValue={game && game.minBid}
              step={1}
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
              defaultValue={game && game.minRaise}
              step={1}
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
              step={1}
              placeholder='Type maximum bid...'
              defaultValue={game && game.maxBid}
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
              defaultValue={game && game.maxRaise}
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
