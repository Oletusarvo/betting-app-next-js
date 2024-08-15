'use client';

import { GameItemBoxProps } from '@/components/UI/GameItemBox';
import { useGameUpdates } from '@/hooks/useGameUpdates';
import { BidType } from '@/utils/classes/Bid';
import { GameType } from '@/utils/classes/Game';
import { createUseContextHook } from '@/utils/createUseContextHook';
import { getBidStatus } from '@/utils/getBidStatus';
import { socket } from 'app/socket.mjs';
import { createContext, useEffect, useState } from 'react';

export type GameProviderProps = {
  game: GameType & {
    pool?: number;
  };
  gameCurrency: string;
  gamePositions: { id: string; value: string; weight: number }[];
  userBid?: BidType;
};

const GameContext = createContext<
  (GameProviderProps & { bidStatus: GameItemBoxProps['status'] }) | null
>(null);

export const GameProvider = ({
  children,
  game,
  gamePositions,
  gameCurrency,
  userBid,
  ...props
}: GameProviderProps & React.PropsWithChildren) => {
  const { currentGameState, currentBidStatus } = useGameUpdates(game, userBid);

  return (
    <GameContext.Provider
      value={{
        game: currentGameState,
        gamePositions,
        gameCurrency,
        bidStatus: currentBidStatus,
        userBid,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = createUseContextHook('GameContext', GameContext);
