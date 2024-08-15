'use server';

import { Game, GameType } from '@/utils/classes/Game';
import db from 'dbconfig';
import { revalidatePath } from 'next/cache';

import { loadSession } from '@/utils/loadSession';
import { GameError } from '@/utils/classes/enums/GameError';
import { Bank } from './utils/Bank';

export async function AGetGames(query: TODO) {
  return db('data_games').where(query);
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
        minBid: data.minBid && data.minBid,
        maxBid: data.maxBid && data.maxBid,
        minRaise: data.minRaise && data.minRaise,
        maxRaise: data.maxRaise && data.maxRaise,
        currencyId,
        tax: data.tax,
        authorId: session.user.id,
        description: data.description,
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

export async function AUpdateGame(id: string, data: TODO) {
  const trx = await db.transaction();

  try {
    await trx('data_games').where({ id }).update({
      expiresAt: data.expiresAt,
    });

    await trx.commit();
    return 0;
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    throw err;
  }
}

/**Places a new bid on a game. */
export async function APlaceBid(newBid: { gameId: string; positionId: string; amount: number }) {
  const trx = await db.transaction();

  try {
    //Load the current session, to gain access to the user's id.
    const session = await loadSession();
    const game = await Game.loadGame(newBid.gameId, trx);

    const result = game.placeBid({
      ...newBid,
      userId: session.user.id,
    });
    if (result != 0) throw result;

    const [walletId] = await trx('data_wallets')
      .where({ currencyId: game.data.currencyId, userId: session.user.id })
      .pluck('id');

    await Bank.withdraw(walletId, newBid.amount, trx);
    await Game.saveGame(game, trx);

    await trx.commit();

    (global as any).io.emit('game_update', {
      ...game.data,
      pool: game.pool,
      minBid: game.data.minBid,
    });

    revalidatePath('/dashboard');

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
      const [walletId] = await trx('data_wallets').where({ userId: winner.userId }).pluck('id');
      const amount =
        result.winnerShare + (winner.userId == game.data.authorId ? result.creatorShare : 0);
      return Bank.deposit(walletId, amount, trx);
    });

    await Promise.all(imbursePromises);

    //Delete the game.
    await trx('data_games').where({ id: game.id }).del();
    await trx.commit();
    revalidatePath('/dashboard');
    return 0;
  } catch (err: any) {
    await trx.rollback();
    if (typeof err == 'object' && 'message' in err) {
      console.log(err.message);
    } else if (typeof err == 'number') {
      return err;
    } else {
      throw err;
    }
  }
}

export async function AFoldBid(gameId: string, userId: string) {
  await db('data_bids').where({ userId, gameId }).update({ folded: true });
  return 0;
}
