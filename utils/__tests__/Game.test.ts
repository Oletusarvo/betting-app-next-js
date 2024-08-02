import { Bid, BidType } from '../classes/Bid';
import { GameError } from '../classes/enums/GameError';
import { Game, GameType } from '../classes/Game';

describe('Testing minimum bid verification', () => {
  const game = new Game({ minBid: 10 } as TODO, new Map(), []);

  it('Returns 0 on bids that reach the minimum.', () => {
    const result = (game as any).checkValidMinBid(10);
    expect(result).toBe(0);
  });

  it('Returns 0 on bids that exceed the minimum.', () => {
    const result = (game as any).checkValidMinBid(10);
    expect(result).toBe(0);
  });

  it("Returns GameError.INVALID_MIN_BID on bids that don't reach the minimum.", () => {
    const result = (game as any).checkValidMinBid(9);
    expect(result).toBe(GameError.INVALID_MIN_BID);
  });
});

describe('Testing minimum bid verification, when the minimum raise is explicitly set to null.', () => {
  const game = new Game({ minBid: 100, minRaise: null } as TODO, new Map(), []);
  const result = (game as any).checkValidRaise(250);
  expect(result).toBe(0);
});

describe('Testing bid raise verification, when both minRaise and maxRaise have been defined.', () => {
  const bidMap = new Map();
  bidMap.set('0', new Bid({ id: '1', amount: 10 } as TODO));
  const game = new Game({ minBid: 10, minRaise: 2, maxRaise: 4 } as TODO, bidMap, []);

  it('Returns GameError.INVALID_MIN_RAISE when a bid higher than the minBid, is not higher by at least the minRaise-amount', () => {
    const result = (game as any).checkValidRaise(11);
    expect(result).toBe(GameError.INVALID_MIN_RAISE);
  });

  it('Returns GameError.INVALID_MAX_RAISE if the raised bid exceedes the maxRaise-amount.', () => {
    const result = (game as any).checkValidRaise(15);
    expect(result).toBe(GameError.INVALID_MAX_RAISE);
  });

  it('Returns 0 when a raised bid falls between the minimum and maximum.', () => {
    const result = (game as any).checkValidRaise(13);
    expect(result).toBe(0);
  });

  it('Returns 0 when a raised bid is raised by at least the minimum raise.', () => {
    const result = (game as any).checkValidRaise(
      (game as any).minBid + (game as any).m_data.minRaise
    );
    expect(result).toBe(0);
  });

  it('Returns 0 when the raised bid is raised at most equal to the maxRaise amount.', () => {
    const result = (game as any).checkValidRaise(
      (game as any).minBid + (game as any).m_data.maxRaise
    );
    expect(result).toBe(0);
  });
});

describe('Testing bid raise verification, when only the minRaise has been defined.', () => {
  const bidMap = new Map();
  bidMap.set('0', new Bid({ id: '1', amount: 10 } as TODO));
  const game = new Game({ minBid: 10, minRaise: 2 } as TODO, bidMap, []);

  it('Returns GameError.INVALID_MIN_RAISE when a raised bid is not raised by at least the minRaise-amount', () => {
    const result = (game as any).checkValidRaise(11);
    expect(result).toBe(GameError.INVALID_MIN_RAISE);
  });

  it('Returns 0 when the bid is raised by at least the minRaise', () => {
    const result = (game as any).checkValidRaise(12);
    expect(result).toBe(0);
  });
});

describe('Tesing bid raise verification, when only the maxRaise has been defined.', () => {
  const bidMap = new Map();
  bidMap.set('1', new Bid({ id: '1', amount: 10 } as TODO));
  const game = new Game({ minBid: 10, maxRaise: 5 } as TODO, bidMap, []);

  it('Returns GameError.INVALID_MAX_RAISE when trying to raise above the maxRaise', () => {
    const result = (game as any).checkValidRaise(16);
    expect(result).toBe(GameError.INVALID_MAX_RAISE);
  });

  it('Returns 0 when staying below the max raise.', () => {
    const result = (game as any).checkValidRaise(14);
    expect(result).toBe(0);
  });

  it('Returns 0 when raising at most the defined maxRaise amount', () => {
    const result = (game as any).checkValidRaise(15);
    expect(result).toBe(0);
  });
});

describe('Testing maximum bid verification, when there is no previous bid placed.', () => {
  const game = new Game({ maxBid: 10 } as GameType, new Map(), []);
  it('Returns 0 when placing a bid, without reaching the maxBid', () => {
    const result = (game as any).checkValidMaxBid(9);
    expect(result).toBe(0);
  });

  it('Returns 0 when placing a bid reaching exactly the maxBid', () => {
    const result = (game as any).checkValidMaxBid(10);
    expect(result).toBe(0);
  });

  it('Returns GameError.INVALID_MAX_BID when placing a bid above the maxBid', () => {
    const result = (game as any).checkValidMaxBid(11);
    expect(result).toBe(GameError.INVALID_MAX_BID);
  });
});

describe('Testing maximum bid verification, when there is a previous bid placed.', () => {
  const bidMap = new Map();
  bidMap.set('0', new Bid({ id: '0', amount: 5 } as BidType));
  const game = new Game({ maxBid: 10 } as GameType, bidMap, []);

  it('Returns 0 when placing a bid, without reaching the maxBid', () => {
    const result = (game as any).checkValidMaxBid(9);
    expect(result).toBe(0);
  });

  it('Returns 0 when placing a bid reaching exactly the maxBid', () => {
    const result = (game as any).checkValidMaxBid(10);
    expect(result).toBe(0);
  });

  it('Returns GameError.INVALID_MAX_BID when placing a bid above the maxBid', () => {
    const result = (game as any).checkValidMaxBid(11);
    expect(result).toBe(GameError.INVALID_MAX_BID);
  });
});
