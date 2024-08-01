import { useContext } from 'react';

export function createUseContextHook<T extends React.Context<any>, K = React.ContextType<T>>(
  contextName: string,
  context: T
) {
  return (): Exclude<K, null> => {
    const ctx = useContext(context);
    if (!ctx)
      throw new Error(`use${contextName} can only be used within the scope of a ${contextName}!`);
    return ctx;
  };
}
