'use server';

import { Game, GameType } from '@/utils/classes/Game';
import db from 'dbconfig';
import { revalidatePath } from 'next/cache';
import { transaction } from 'transaction';

import { loadSession } from '@/utils/loadSession';
import { BidType } from '@/utils/classes/Bid';
import { multiplyPropertiesBy } from './utils/functions/multiplyPropertiesBy';
import { GameError } from '@/utils/classes/enums/GameError';
import { Wallet } from '@/utils/classes/Wallet';
import { getIo } from 'createIo.mjs';

export async function AGetGame(id: number): Promise<GameType | null> {
  const [game] = await db('data_games').where({ id });
  const bids = await db('data_bids').where({ gameId: id });
  const pool = bids.reduce((acc, cur) => (acc += cur.amount), 0);
  return {
    ...game,
    bids,
    pool,
  };
}

export async function ACreateGame(
  data: Partial<GameType>,
  currencySymbol: string,
  options: string[]
) {
  const trx = await db.transaction();
  try {
    const session = await loadSession();
    const [currencyId] = await trx('data_currencies').where({ symbol: currencySymbol }).pluck('id');

    if (data.minBid && data.maxBid && data.minBid > data.maxBid) {
      throw GameError.MIN_MAX_DIFF;
    }

    const [{ id: gameId }] = await trx('data_games').insert(
      {
        title: data.title,
        minBid: data.minBid && data.minBid * 100,
        maxBid: data.maxBid && data.maxBid * 100,
        minRaise: data.minRaise && data.minRaise * 100,
        maxRaise: data.maxRaise && data.maxRaise * 100,
        currencyId,
        authorId: session.user.id,
      },
      'id'
    );

    const tokenPromises = options.map(option =>
      trx('data_gamePositions').insert({
        value: option,
        gameId,
      })
    );

    await Promise.all(tokenPromises);
    await trx.commit();
    revalidatePath('/dashboard');
    return 0;
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    return -1;
  }
}

/**Places a new bid on a game. */
export async function APlaceBid(newBid: { gameId: string; positionId: string; amount: number }) {
  const trx = await db.transaction();

  try {
    //Load the current session, to gain access to the user's id.
    const session = await loadSession();
    const game = await Game.loadGame(newBid.gameId, trx);
    const p = multiplyPropertiesBy(newBid, 100, ['amount']);
    const result = game.placeBid({
      ...p,
      userId: session.user.id,
    });
    if (result != 0) throw result;

    await trx('data_wallets')
      .where({ userId: session.user.id, currencyId: game.data.currencyId })
      .decrement('balance', p.amount);

    await Game.saveGame(game, trx);
    await trx.commit();
    revalidatePath('/dashboard');
    //getIo().emit('game_updated', JSON.stringify(game.data));

    return 0;
  } catch (err: any) {
    await trx.rollback();
    if (typeof err == 'number') {
      return err;
    } else if ('message' in err) {
      console.log(err.message);
    }

    return -1;
  }
}

/**Closes a game, if all bids match the minimum bid, determines the winners, and deposits their share into their wallets. */
export async function ACloseGame(gameId: string, positionId: string) {
  const trx = await db.transaction();

  try {
    const game = await Game.loadGame(gameId, trx);
    if (!game) throw GameError.INVALID_GAME_ID;

    const result = game.close(positionId);
    if (result.errcode !== 0) throw result.errcode;

    //Imburse the winners:
    const imbursePromises = result.winners.map(async winner => {
      const wallet = await Wallet.loadWallet(winner.userId, game.data.currencyId, trx);
      wallet.deposit(result.winnerShare);
      await Wallet.saveWallet(wallet, trx);
    });

    await Promise.all(imbursePromises);

    //Add the creator share to the creator of the bid.
    const creatorWallet = await Wallet.loadWallet(game.data.authorId, game.data.currencyId, trx);
    creatorWallet.deposit(result.creatorShare);
    await Wallet.saveWallet(creatorWallet, trx);

    //Delete the game.
    await trx('data_games').where({ id: game.id }).del();
    await trx.commit();
    return 0;
  } catch (err: any) {
    console.log(err.message);
    await trx.rollback();
    return err.message;
  }
}

export async function AFoldBid(gameId: string, userId: string) {
  await db('data_bids').where({ userId, gameId }).update({ folded: true });
  return 0;
}
