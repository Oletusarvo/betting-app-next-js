'use client';

import { TabsProvider } from '@/components/Feature/TabsProvider';
import { GameForm } from './GameForm';

export function CreateTabs() {
  return (
    <TabsProvider>
      <TabsProvider.TabContainer>
        <TabsProvider.Tab
          label='Create Bet'
          index={0}
        />
      </TabsProvider.TabContainer>

      <TabsProvider.Panel index={0}>
        <GameForm />
      </TabsProvider.Panel>
    </TabsProvider>
  );
}
