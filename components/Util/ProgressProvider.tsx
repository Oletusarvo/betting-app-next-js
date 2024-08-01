import React, { ReactElement, createContext, useContext } from 'react';

type ProgressProviderContextProps = {
  progress: number;
};

const ProgressProviderContext = createContext<ProgressProviderContextProps | null>(null);

type ProgressProviderProps = ChildrenRequired & {
  progress: number;
};

export function ProgressProvider({ children, progress }: ProgressProviderProps) {
  return <ProgressProviderContext.Provider value={{ progress }}>{children}</ProgressProviderContext.Provider>;
}

ProgressProvider.Bar = function ({ children }: ChildrenRequired) {
  const { progress } = useProgressProviderContext();

  return React.Children.map(children as React.ReactElement, child => {
    const style = {
      width: `${progress < 100 ? progress : 100}%`,
    };

    return React.cloneElement(child, {
      ...child.props,
      style,
    });
  });
};

ProgressProvider.Value = function () {
  const { progress } = useProgressProviderContext();
  return <>{progress}/100</>;
};

function useProgressProviderContext() {
  const ctx = useContext(ProgressProviderContext);
  if (!ctx) throw new Error('useProgressProviderContext must be used within the scope of a ProgressProviderContext!');
  return ctx;
}
