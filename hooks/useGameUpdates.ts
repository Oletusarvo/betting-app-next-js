'use client';

import { GameItemBoxProps } from '@/components/UI/GameItemBox';
import { BidType } from '@/utils/classes/Bid';
import { GameType } from '@/utils/classes/Game';
import { getBidStatus } from '@/utils/getBidStatus';
import { socket } from 'app/socket.mjs';

import { useEffect, useState } from 'react';

export function useGameUpdates(
  initialGameState: GameType & { pool?: number },
  initialUserBid?: BidType
) {
  const [currentGameState, setCurrentGameState] = useState(() => initialGameState);
  const [currentBidStatus, setCurrentBidStatus] = useState<GameItemBoxProps['status']>(() => {
    return getBidStatus(initialUserBid, initialGameState);
  });

  useEffect(() => {
    socket.emit('join_game', initialGameState.id);
    socket.on('game_update', updatedGame => {
      if (updatedGame.id != currentGameState.id) return;

      setCurrentGameState(() => updatedGame);
      setCurrentBidStatus(() => getBidStatus(initialUserBid, updatedGame));
    });

    return () => {
      socket.off('game_update');
      socket.emit('leave_game', initialGameState.id);
    };
  }, []);

  useEffect(() => {
    setCurrentGameState(initialGameState);
  }, [initialGameState.pool, initialGameState.minBid]);

  useEffect(() => {
    setCurrentBidStatus(getBidStatus(initialUserBid, currentGameState));
  }, [initialUserBid?.amount]);

  return {
    currentGameState,
    currentBidStatus,
  };
}
