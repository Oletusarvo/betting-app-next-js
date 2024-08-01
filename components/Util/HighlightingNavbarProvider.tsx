import { createUseContextHook } from '@/utils/createUseContextHook';
import { usePathname } from 'next/navigation';
import React, { createContext } from 'react';

const HighlightingNavbarProviderContext = createContext<{
  currentPath: string;
} | null>(null);

export function HighlightingNavbarProvider({ children }: ChildrenRequired) {
  const currentPath = usePathname();

  return (
    <HighlightingNavbarProviderContext.Provider value={{ currentPath }}>
      {React.Children.map(children as React.ReactElement, child => {
        if (child.props && child.props.href) {
          return (
            <HighlightingNavbarProvider.HighlightOnNav href={child.props.href}>
              {child}
            </HighlightingNavbarProvider.HighlightOnNav>
          );
        }
      })}
    </HighlightingNavbarProviderContext.Provider>
  );
}

type HighlightOnNavProps = ChildrenRequired & {
  href: string;
};

HighlightingNavbarProvider.HighlightOnNav = function ({ children, href }: HighlightOnNavProps) {
  const { currentPath } = useHighlightingNavbarProviderContext();
  const selected = currentPath === href;
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      selected,
    })
  );
};

const useHighlightingNavbarProviderContext = createUseContextHook(
  'HighlightingNavbarProviderContext',
  HighlightingNavbarProviderContext
);
