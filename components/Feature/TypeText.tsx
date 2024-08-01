'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type TypeTextProps = {
  text: string;

  /**The interval in milliseconds between each typed character. */
  speed?: number;

  /**The element to be used as the typing cursor. */
  cursor?: ReactNode;
};

/**
 * Renders text by typing it out one letter at a time.
 * @param props
 * @returns
 */
export function TypeText({ text, speed = 0, cursor }: TypeTextProps) {
  const [currentText, setCurrentText] = useState('');
  const textPosition = useRef<number>(0);

  useEffect(() => {
    textPosition.current = 0;
    setCurrentText('');
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (textPosition.current < text.length) {
        textPosition.current++;
        setCurrentText(text.substring(0, textPosition.current));
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {currentText}
      {cursor}
    </>
  );
}
