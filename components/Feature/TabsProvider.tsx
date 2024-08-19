'use client';

import { createUseContextHook } from '@/utils/createUseContextHook';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

const TabsContext = createContext<{
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
} | null>(null);

export function TabsProvider({ children }: TODO) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <TabsContext.Provider value={{ currentTab, setCurrentTab }}>{children}</TabsContext.Provider>
  );
}

TabsProvider.Tab = ({ label, index }: TODO) => {
  const { currentTab, setCurrentTab } = useTabsContext();
  const selected = currentTab == index;
  const classes = [
    'py-2 px-4 flex items-center justify-center cursor-pointer',
    (selected && 'font-semibold border-b-[2px] border-primary') || 'font-normal',
  ];

  return (
    <div
      className={classes.join(' ')}
      onClick={() => {
        setCurrentTab(index);
      }}>
      <span>{label}</span>
    </div>
  );
};

TabsProvider.Panel = ({ children, index }: TODO) => {
  const { currentTab } = useTabsContext();
  return currentTab == index && children;
};

TabsProvider.TabContainer = ({ children }: TODO) => {
  return (
    <div
      className='flex w-full overflow-x-scroll text-nowrap'
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
      {children}
    </div>
  );
};

const useTabsContext = createUseContextHook('TabsContext', TabsContext);
