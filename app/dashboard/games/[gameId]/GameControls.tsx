'use client';

import { Input, Select } from '@/components/UI/FormUtils';
import { RoundedBox } from '@/components/UI/RoundedBox';
import { Button } from '@mui/material';
import { useGameContext } from './GameContext';
import { red } from '@mui/material/colors';
import { APlaceBid } from 'actions/gameActions';
import { useState } from 'react';

import toast from 'react-hot-toast';
import { GameError } from '@/utils/classes/enums/GameError';

export function GameControls() {
  const [status, setStatus] = useState(0);

  const {
    game: { currencySymbol, pool, minBid, maxBid, maxRaise, positions, minRaise, id: gameId },
    userBid,
    bidStatus,
  } = useGameContext();

  const handleSubmit = async (e: TODO) => {
    e.preventDefault();
    setStatus(1);
    await APlaceBid({
      amount: e.target.amount.valueAsNumber,
      positionId: e.target.positionId.value,
      gameId,
    })
      .then(res => {
        if (res & GameError.INVALID_MIN_RAISE) {
          toast.error(`The bid must be raised by at least ${minRaise}!`);
        }

        if (res & GameError.INVALID_MIN_BID) {
          toast.error(`The bid must be at least ${minBid}${currencySymbol}!`);
        }

        if (res & GameError.INVALID_MAX_BID) {
          toast.error(`Your total bid only be at most ${maxBid!}${currencySymbol}!`);
        }

        if (res & GameError.INVALID_MAX_RAISE) {
          toast.error(`The bid can only be raised by at most ${maxRaise!}${currencySymbol}!`);
        }

        if (res == -1) {
          toast.error('An unexpected error occured!');
        }
      })
      .finally(() => setStatus(0));
  };

  const loading = status == 1;
  const isInputDisabled = () =>
    bidStatus == 'folded' || bidStatus == 'at_max_bid' || bidStatus == 'meets_bid' || loading;

  const minBidAmount = userBid ? minBid - userBid.amount : minBid;
  return (
    <div className='mt-auto'>
      <RoundedBox>
        <form
          className='flex flex-col w-full gap-2'
          onSubmit={handleSubmit}>
          <Input
            disabled={isInputDisabled()}
            name='amount'
            type='number'
            placeholder='Type bid amount...'
            step={0.01}
            min={minBidAmount}
            defaultValue={minBidAmount}
          />
          <div className='flex gap-2 w-full'>
            <Select
              name='positionId'
              disabled={bidStatus != 'no_bid'}
              className='flex-1'>
              {positions.map(position => (
                <option
                  value={position.id}
                  selected={userBid?.positionId == position.id}>
                  {position.value}
                </option>
              ))}
            </Select>

            <Button
              disabled={isInputDisabled()}
              className='flex-1'
              type='submit'
              variant='contained'
              sx={{
                ':disabled': {
                  backgroundColor: red[700],
                },
              }}>
              {bidStatus == 'must_call' ? 'Call' : 'Place Bid'}
            </Button>
          </div>
        </form>
      </RoundedBox>
    </div>
  );
}
