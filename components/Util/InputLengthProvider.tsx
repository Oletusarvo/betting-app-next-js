import React, { createContext, useContext, useState } from 'react';

const InputLengthProviderContext = createContext<any>(null);

/**Contains the length of text-based inputs and provides a display to show it and the current length of the text typed. */
export function InputLengthProvider({ children }: ChildrenRequired) {
  const [length, setLength] = useState(0);
  const [maxLength, setMaxLength] = useState(0);

  const updateLength = (length: number) => {
    setLength(length);
  };

  return <InputLengthProviderContext.Provider value={{ length, maxLength, updateLength, setMaxLength }}>{children}</InputLengthProviderContext.Provider>;
}

InputLengthProvider.Input = function ({ children }: ChildrenRequired) {
  const { updateLength, setMaxLength } = useInputLengthProviderContext();

  return React.Children.map(children as React.ReactElement, child => {
    if ((child.type !== 'input' || child.props.type !== 'text') && child.type !== 'textarea') {
      throw new Error('Only input elements with a text-type can be passed to an InputLengthProvider.Input!');
    }

    setMaxLength(child.props.maxLength);

    return React.cloneElement(child, {
      ...child.props,
      onChange: (e: any) => {
        updateLength(e.target.value.length);
      },
    });
  });
};

InputLengthProvider.Display = function ({ children }: ChildrenRequired) {
  const { length, maxLength } = useInputLengthProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      children: (
        <>
          {child.props.children}
          {length}/{maxLength}
        </>
      ),
    })
  );
};

function useInputLengthProviderContext() {
  const ctx = useContext(InputLengthProviderContext);
  if (!ctx) throw new Error('useInputLengthProviderContext must be used within the scope of a InputLengthProviderContext!');
  return ctx;
}
