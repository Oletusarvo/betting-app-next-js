import { createUseContextHook } from '@/utils/createUseContextHook';
import React, { useContext, useEffect, useRef } from 'react';
import { createContext, useState } from 'react';

type ValidationProviderContextProps = {
  valid: boolean;
  validate: (e: TODO) => void;
  updateValue: (e: TODO) => void;
};

const ValidationProviderContext = createContext<ValidationProviderContextProps | null>(null);

type ValidationProviderProps = ChildrenRequired & {
  validator: (value: TODO) => Promise<boolean> | boolean;
  delay?: number;
};

/**Provides validation of an inputs value.*/
export function ValidationProvider({ children, validator, delay = 0 }: ValidationProviderProps) {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState(null);

  const validate = async () => {
    setValid(await validator(value));
  };

  const updateValue = (e: TODO) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    //Validate the value
    const timeout = setTimeout(() => {
      validate();
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <ValidationProviderContext.Provider value={{ valid, updateValue, validate }}>
      {children}
    </ValidationProviderContext.Provider>
  );
}

ValidationProvider.Input = function ({ children }: ChildrenRequired) {
  const { updateValue } = useValidationProviderContext();

  return React.Children.map(children as React.ReactElement, child => {
    if (child.type !== 'input' && child.type !== 'select' && child.type !== 'textarea') {
      throw new Error(
        'Only input, select and textarea elements can be passed into a ValidationProvider.Input!'
      );
    }
    return React.cloneElement(child, {
      ...child.props,
      onInput: updateValue,
    });
  });
};

ValidationProvider.Message = function ({ children }: ChildrenRequired) {
  const { valid } = useValidationProviderContext();
  return !valid ? children : null;
};

const useValidationProviderContext = createUseContextHook(
  'ValidationProviderContext',
  ValidationProviderContext
);
