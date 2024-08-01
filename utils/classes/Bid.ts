import db from 'dbconfig';
import { AppObject } from './AppObject';
import { Knex } from 'knex';

export type BidType = {
  id?: string;
  userId: string;
  gameId: string;
  amount: number;
  folded: boolean;
  positionId: string;
};

export class Bid extends AppObject<BidType> {
  constructor(data: BidType) {
    super(data);
  }

  public get gameId() {
    return this.m_data.gameId;
  }

  public get userId() {
    return this.m_data.userId;
  }

  public get amount() {
    return this.m_data.amount;
  }

  public raise(amount: number) {
    this.m_data.amount += amount;
  }

  public fold() {
    this.m_data.folded = true;
  }

  public static async loadBid(id: number, trx?: Knex.Transaction) {
    const con = trx || db;

    const bidData = (await con('data_bids').where({ id })) as [BidType] | undefined;
    if (!bidData) return undefined;
    return new Bid(bidData[0]);
  }

  public static async saveBid(bid: Bid, trx?: Knex.Transaction) {
    const con = trx || db;
    if (bid.data.id) {
      await con('data_bids').where({ id: bid.data.id }).update(bid.data);
    } else {
      await con('data_bids').insert(bid.data);
    }
  }
}
