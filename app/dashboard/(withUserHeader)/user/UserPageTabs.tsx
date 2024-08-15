'use client';

import { TabsProvider } from '@/components/Feature/TabsProvider';
import { GameType } from '@/utils/classes/Game';
import { ReactNode } from 'react';
import { UserCreatedBets } from './UserCreatedBets';

type UserPageTabsProps = {
  betsCreatedContent: ReactNode;
  betsParticipatedInContent: ReactNode;
  walletsContent?: ReactNode;
  currenciesCreatedContent?: ReactNode;
};

export function UserPageTabs({ betsCreatedContent, betsParticipatedInContent }: UserPageTabsProps) {
  return (
    <TabsProvider>
      <div
        className='flex w-full overflow-x-scroll text-nowrap'
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
        <TabsProvider.Tab
          label='Bets created'
          index={0}
        />
        <TabsProvider.Tab
          label='Bets participated in'
          index={1}
        />
      </div>

      <TabsProvider.Panel index={0}>
        <div className='w-full flex flex-col h-full items-center justify-center gap-1'>
          {betsCreatedContent}
        </div>
      </TabsProvider.Panel>

      <TabsProvider.Panel index={1}>
        <div className='w-full flex flex-col h-full items-center justify-center gap-1'>
          {betsParticipatedInContent}
        </div>
      </TabsProvider.Panel>
    </TabsProvider>
  );
}
