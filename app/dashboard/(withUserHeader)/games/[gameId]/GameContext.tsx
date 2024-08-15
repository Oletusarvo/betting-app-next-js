'use client';

import { GameItemBoxProps } from '@/components/UI/GameItemBox';
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
  bidStatus: GameItemBoxProps['status'];
};

const GameContext = createContext<GameProviderProps | null>(null);

export const GameProvider = ({
  children,
  game,
  gamePositions,
  gameCurrency,
  userBid,
  ...props
}: GameProviderProps & React.PropsWithChildren) => {
  const [currentGameState, setCurrentGameState] = useState(game);
  const [currentBidStatus, setCurrentBidStatus] = useState<GameItemBoxProps['status']>(() => {
    return (userBid && getBidStatus(userBid, game)) || 'no_bid';
  });

  useEffect(() => {
    socket.on('game_update', updatedGame => {
      if (updatedGame.id != currentGameState.id) return;

      setCurrentGameState(() => updatedGame);
      setCurrentBidStatus(() => getBidStatus(userBid, currentGameState));
    });
  }, []);

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
