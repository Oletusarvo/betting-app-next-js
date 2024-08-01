'use client';

import { GameItemBoxProps } from '@/components/UI/GameItemBox';
import { BidType } from '@/utils/classes/Bid';
import { GameType } from '@/utils/classes/Game';
import { createUseContextHook } from '@/utils/createUseContextHook';
import { createContext } from 'react';

export type GameProviderProps = {
  game: GameType & {
    pool?: number;
    currencySymbol: string;
    positions: { id: string; value: string; weight: number }[];
  };

  userBid?: BidType;
  bidStatus: GameItemBoxProps['status'];
};

const GameContext = createContext<GameProviderProps | null>(null);

export const GameProvider = ({
  children,

  ...props
}: GameProviderProps & React.PropsWithChildren) => {
  return <GameContext.Provider value={props}>{children}</GameContext.Provider>;
};

export const useGameContext = createUseContextHook('GameContext', GameContext);
