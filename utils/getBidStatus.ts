import { BidType } from './classes/Bid';
import { GameType } from './classes/Game';

export const getBidStatus = (bid: BidType | undefined, game: GameType) =>
  (bid &&
    (bid.folded
      ? 'folded'
      : bid.amount < game.minBid
      ? 'must_call'
      : bid.amount == game.maxBid
      ? 'at_max_bid'
      : 'meets_bid')) ||
  'no_bid';
