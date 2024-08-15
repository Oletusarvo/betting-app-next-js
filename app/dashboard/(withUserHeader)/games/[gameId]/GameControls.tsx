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
import { BidType } from '@/utils/classes/Bid';

export function GameControls() {
  const [status, setStatus] = useState(0);

  const {
    game: { pool, minBid, maxBid, maxRaise, minRaise, id: gameId },
    gameCurrency: currencySymbol,
    gamePositions: positions,
    userBid,
    bidStatus,
  } = useGameContext();

  const validateBid = (bid: BidType) => {
    const bidAmount = (userBid && userBid.amount + bid.amount) || bid.amount;

    if (bidAmount < minBid) {
      toast.error(`The bid must be at least ${minBid}${currencySymbol}!`);
      return false;
    }

    if (minRaise && bidAmount > minBid) {
      const diff = bidAmount - minBid;
      if (diff < minRaise) {
        toast.error(`The bid must be raised by at least ${minRaise}!`);
        return false;
      }
    }

    if (maxRaise && bidAmount > minBid) {
      const raiseAmount = bidAmount - minBid;
      if (raiseAmount > maxRaise) {
        toast.error(`The minimum bid can only be raised by at most ${maxRaise!}${currencySymbol}!`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: TODO) => {
    e.preventDefault();
    setStatus(1);
    const bid = {
      amount: e.target.amount.valueAsNumber,
      positionId: e.target.positionId.value,
      gameId,
    };

    const isValid = validateBid(bid as BidType);

    if (isValid) {
      await APlaceBid(bid).then(res => {
        if (res == GameError.INVALID_MIN_RAISE) {
          toast.error(`The bid must be raised by at least ${minRaise}!`);
        }

        if (res == GameError.INVALID_MIN_BID) {
          toast.error(`The bid must be at least ${minBid}${currencySymbol}!`);
        }

        if (res == GameError.INVALID_MAX_BID) {
          toast.error(`Your total bid can only be at most ${maxBid!}${currencySymbol}!`);
        }

        if (res == GameError.INVALID_MAX_RAISE) {
          toast.error(
            `The minimum bid can only be raised by at most ${maxRaise!}${currencySymbol}!`
          );
        }

        if (res == -1) {
          toast.error('An unexpected error occured!');
        }
      });
    }

    setStatus(0);
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
            step={minRaise || 1}
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
              {(userBid && 'Call') || 'Place Bid'}
            </Button>
          </div>
        </form>
      </RoundedBox>
    </div>
  );
}
