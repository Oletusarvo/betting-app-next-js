'use client';

import { MutableRefObject, ReactNode, createContext, useContext, useRef, useState } from 'react';
import { RoundedBox } from './RoundedBox';

type SingleItemDataBoxContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<ReactNode>>;
  setValue: React.Dispatch<React.SetStateAction<ReactNode>>;
};

const SingleItemDataBoxContext = createContext<SingleItemDataBoxContextProps | null>(null);

type SingleItemDataBoxProps<T> = React.ComponentProps<'div'>;

export function SingleItemDataBox<T extends ReactNode>({
  children,
  ...props
}: SingleItemDataBoxProps<T>) {
  const [title, setTitle] = useState<ReactNode>(null);
  const [value, setValue] = useState<ReactNode>(null);

  return (
    <SingleItemDataBoxContext.Provider value={{ setTitle, setValue }}>
      <RoundedBox>
        <div className={props.className || 'flex items-center justify-between p-2'}>
          {children}
          {title}
          {value}
        </div>
      </RoundedBox>
    </SingleItemDataBoxContext.Provider>
  );
}

SingleItemDataBox.Title = function ({ children }: ChildrenRequired) {
  const { setTitle } = useSingleItemDataBoxContext();
  setTitle(children);
  return null;
};

SingleItemDataBox.Value = function ({ children }: ChildrenRequired) {
  const { setValue } = useSingleItemDataBoxContext();
  setValue(children);
  return null;
};

function useSingleItemDataBoxContext() {
  const ctx = useContext(SingleItemDataBoxContext);
  if (!ctx) throw new Error('blaablaablaa');
  return ctx;
}
