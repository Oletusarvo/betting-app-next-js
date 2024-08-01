'use client';

import { createUseContextHook } from '@/utils/createUseContextHook';
import { useToggle } from '@/hooks/useToggle';
import React, { useContext } from 'react';
import { createContext } from 'react';

const VisibilityProviderContext = createContext<{
  visible: boolean;
  toggleState: (state?: boolean) => void;
} | null>(null);

type VisibilityProviderProps = ChildrenRequired & {
  visible?: boolean;
  toggleOverride?: (state?: boolean) => void;
};

export function VisibilityProvider({
  children,
  toggleOverride,
  ...props
}: VisibilityProviderProps) {
  const { state: visible, toggleState: toggle } = useToggle(false);

  const toggleState = (state?: boolean) => {
    if (toggleOverride) {
      toggleOverride(state);
    } else {
      toggle(state);
    }
  };

  return (
    <VisibilityProviderContext.Provider
      value={{ visible: props.visible !== undefined ? props.visible : visible, toggleState }}>
      {children}
    </VisibilityProviderContext.Provider>
  );
}

VisibilityProvider.Trigger = function ({ children }: React.PropsWithChildren) {
  const { toggleState } = useVisibilityProviderContext();

  return React.Children.map(children as React.ReactElement, (child: React.ReactElement) => {
    return React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        toggleState();
      },
    });
  });
};

VisibilityProvider.Target = function ({ children }: React.PropsWithChildren) {
  const { visible } = useVisibilityProviderContext();
  return React.Children.map(children as React.ReactElement, child => {
    return React.cloneElement(child, {
      ...child.props,
      hidden: !visible,
    });
  });
};

const useVisibilityProviderContext = createUseContextHook(
  'VisibilityProviderContext',
  VisibilityProviderContext
);
