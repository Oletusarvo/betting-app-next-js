import db from 'dbconfig';
import { AppObject } from './AppObject';
import { Bid, BidType } from './Bid';
import { Knex } from 'knex';
import { GameError } from './enums/GameError';

export type GameType = {
  id: string;
  authorId: string;
  title: string;
  description?: string;
  tax: number;

  minBid: number;
  maxBid?: number;
  minRaise?: number;
  maxRaise?: number;
  createdAt: number;
  updatedAt: number;
  currencyId: string;
  expiresAt?: string;
};

export class Game extends AppObject<GameType> {
  private m_bids: Map<string, Bid>;
  private m_positions: { id: string; value: string }[];
  private m_pool: number;

  constructor(data: GameType, bids: Map<string, Bid>, positions: { id: string; value: string }[]) {
    super(data);
    this.m_pool = Array.from(bids.values()).reduce((acc, cur) => (acc += cur.data.amount), 0);
    this.m_bids = bids;
    this.m_positions = positions;
  }

  private isContested() {
    const bidValues = this.m_bids.values();
    for (const bid of bidValues) {
      if (bid.amount !== this.data.minBid) {
        return true;
      }
    }

    return false;
  }

  private checkValidRaise(amount: number) {
    const game = this.m_data;

    /*
        Allow bidding the current min bid.
        Otherwise, if bidding higher than the minimum bid, check that the raise is at least as much as the minimum raise, and lower
        than the maximum raise, if both are defined.
      */
    if (amount == game.minBid) return 0;

    const diff = amount - game.minBid;
    return game.minRaise && diff < game.minRaise
      ? GameError.INVALID_MIN_RAISE
      : game.maxRaise && diff > game.maxRaise
      ? GameError.INVALID_MAX_RAISE
      : 0;
  }

  private checkValidMinBid(amount: number) {
    const game = this.m_data;
    return amount < game.minBid ? GameError.INVALID_MIN_BID : 0;
  }

  private checkValidMaxBid(amount: number) {
    const game = this.m_data;
    return game.maxBid && amount > game.maxBid ? GameError.INVALID_MAX_BID : 0;
  }

  public get id() {
    return this.data.id;
  }

  public get bids() {
    return this.m_bids;
  }

  public placeBid(newBid: { amount: number; userId: string }) {
    const game = this.m_data;
    const bids = this.m_bids;

    const previousBid = bids.get(newBid.userId);
    const amount = previousBid ? previousBid.amount + newBid.amount : newBid.amount;

    const minBidRes = this.checkValidMinBid(amount);
    const raiseRes = this.checkValidRaise(amount);
    const maxBidRes = this.checkValidMaxBid(amount);

    if (minBidRes) return minBidRes;
    if (raiseRes) return raiseRes;
    if (maxBidRes) return maxBidRes;

    if (previousBid) {
      previousBid.raise(newBid.amount);
    } else {
      bids.set(newBid.userId, new Bid(newBid as BidType));
    }

    if (amount > game.minBid) {
      game.minBid = amount;
    }

    return 0;
  }

  public close(positionId: string):
    | {
        errcode: 0;
        winnerShare: number;
        creatorShare: number;
        winners: BidType[];
      }
    | {
        errcode: GameError.CONTESTED;
      } {
    const game = this.data;
    const bids = this.m_bids;

    //Make sure all bids equal the minimum bid
    const isContested = this.isContested();
    if (isContested)
      return {
        errcode: GameError.CONTESTED,
      };

    const bidValues = Array.from(bids.values());
    const winners = bidValues.filter(bid => bid.data.positionId == positionId);
    const taxedPool = Math.round(this.m_pool * 0.7);

    //The tax data of a game is always an integer between 0 or 100. Thus it shall be divided by 100 when calculating the tax.
    const tax = Math.round(taxedPool * ((game.tax || 0) / 100));

    const numBeneficiaries = winners.length || this.m_bids.size;

    const remainder = (this.m_pool - tax) % numBeneficiaries;
    const finalPool = this.m_pool - tax - remainder;
    const winnerShare = Math.floor(finalPool / numBeneficiaries);
    const creatorShare = tax + remainder;

    return {
      errcode: 0,
      winnerShare,
      creatorShare,
      winners:
        (winners.length && winners.map(bid => bid.data)) ||
        Array.from(this.m_bids.values()).map(bid => bid.data),
    };
  }

  public static async loadGame(id: string, trx?: Knex.Transaction) {
    const con = trx || db;

    const [[game], bids, positions] = (await Promise.all([
      con('data_games').where({ id }),
      con('data_bids').where({ gameId: id }),
      con('data_gamePositions').where({ gameId: id }),
    ])) as [[GameType], BidType[], { id: string; value: string }[]];

    const bidMap = new Map<string, Bid>();
    bids.forEach(bid => bidMap.set(bid.userId, new Bid(bid)));

    return new Game(game, bidMap, positions);
  }

  public static async saveGame(game: Game, trx?: Knex.Transaction) {
    const con = trx || db;

    const data = game.data;
    const bids = game.bids;

    await con('data_games').where({ id: game.id }).update(data);
    const bidsArray = Array.from(bids.values());
    await Promise.all(bidsArray.map(bid => Bid.saveBid(bid, trx)));
  }
}
