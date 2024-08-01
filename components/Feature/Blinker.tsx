'use client';

import { useToggle } from 'hooks/useToggle';
import { useEffect } from 'react';

type BlinkingProviderProps = React.PropsWithChildren & {
  /**The interval in milliseconds at which the children will blink in and out */
  speed: number;
};

/**
 * A component that makes it's children blink in and out of view, like a typing-cursor.
 * @param props
 * @returns
 */
export function Blinker({ children, speed }: BlinkingProviderProps) {
  const { state: visible, toggleState: toggleVisible } = useToggle(true);

  useEffect(() => {
    const interval = setInterval(() => {
      toggleVisible();
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return visible ? children : ' ';
}
