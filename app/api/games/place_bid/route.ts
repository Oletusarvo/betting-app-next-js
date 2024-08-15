import { loadSession } from '@/utils/loadSession';
import { APlaceBid } from 'actions/gameActions';
import db from 'dbconfig';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest & { io: TODO }) {
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
    //socketServer.getIo().emit('game_updated', JSON.stringify(game.data));
    await trx.commit();
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
