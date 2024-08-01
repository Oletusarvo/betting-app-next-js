'use client';

import React, { ReactElement, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';

type InputElementType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type TokenInputProviderContextProps<T> = {
  tokens: T[];
  inputRef: React.RefObject<InputElementType>;
  TokenElement: React.FC<{ value: T }>;
  addToken: (token: T) => void;
  deleteToken: (token: T) => void;
};

const TokenInputContext = createContext<TokenInputProviderContextProps<any> | null>(null);

type TokenInputProviderProps<T> = ChildrenRequired & {
  TokenElement: React.FC<{ value: T }>;
};

/**A component for composing inputs collecting tokens, like hashtags. */
export function TokenInputProvider<T>({ children, TokenElement }: TokenInputProviderProps<T>) {
  const [tokens, setTokens] = useState<T[]>([]);
  const inputRef = useRef<InputElementType>(null);

  const addToken = (token: T) => {
    setTokens(prev => [...prev, token]);
  };

  const deleteToken = (token: T) => {
    const newTokens = [...tokens];
    const index = newTokens.indexOf(token);
    if (index != -1) {
      newTokens.splice(index, 1);
      setTokens(newTokens);
    }
  };

  return <TokenInputContext.Provider value={{ tokens, addToken, deleteToken, inputRef, TokenElement }}>{children}</TokenInputContext.Provider>;
}

type TokenProps = React.ComponentProps<'div'> & {
  value: any;
};

TokenInputProvider.Token = function ({ children, value, ...props }: TokenProps) {
  return (
    <div {...props}>
      {value}
      {children}
    </div>
  );
};

/**The button that adds the value of the input into the current tokens. Takes the actual button as a child and adds an onClick event to it. */
TokenInputProvider.AddButton = function ({ children }: ChildrenRequired) {
  const { addToken, inputRef } = useTokenInputContext();

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        if (inputRef.current) {
          const val = inputRef.current.value;

          if (val == '') return;
          addToken(val);
          inputRef.current.value = '';
        }
      },
    })
  );
};

TokenInputProvider.DeleteButton = function ({ children }: ChildrenRequired) {
  const { deleteToken } = useTokenInputContext();
  return React.Children.map(children as ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }
      },
    })
  );
};

/**The input used to collect the tokens. */
TokenInputProvider.Input = function ({ children }: ChildrenRequired) {
  const { inputRef } = useTokenInputContext();

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ref: inputRef,
    })
  );
};

/**The element displaying the tokens. Takes the actual element displayed on screen as a child, and adds the current tokens as children to it. */
TokenInputProvider.TokenDisplay = function ({ children }: ChildrenRequired) {
  const { tokens, TokenElement } = useTokenInputContext();
  return React.Children.map(children as ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      children: tokens.map(token => <TokenElement value={token} />),
    })
  );
};

function useTokenInputContext() {
  const ctx = useContext(TokenInputContext);
  if (!ctx) throw new Error('useTokenInputContext must be used within the scope of a TokenInputContext!');
  return ctx;
}
