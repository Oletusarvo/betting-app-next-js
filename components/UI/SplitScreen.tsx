import React, { useEffect, useRef } from 'react';

type SplitScreenProps = {
  leftWeight: number;
  rightWeight: number;
  children: React.ReactNode;
};

/**A component for containing two elements side by side. */
export function SplitScreen({ leftWeight, rightWeight, children }: SplitScreenProps) {
  if (React.Children.count(children) !== 2) {
    throw new Error('A SplitScreen-component must have exactly two(2) children!');
  }

  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);

  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const left = React.cloneElement(childArray[0], {
    ...childArray[0].props,
    ref: leftRef,
  });

  const right = React.cloneElement(childArray[1], {
    ...childArray[1].props,
    ref: rightRef,
  });

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (left) {
      if (!left.classList.contains('flex')) {
        left.classList.add('flex');
      }

      const weight = `flex-${leftWeight}`;
      if (!left.classList.contains(weight)) {
        left.classList.add(weight);
      }
    }

    if (right) {
      if (!right.classList.contains('flex')) {
        right.classList.add('flex');
      }

      const weight = `flex-${rightWeight}`;
      if (!right.classList.contains(weight)) {
        right.classList.add(weight);
      }
    }
  }, []);

  return (
    <div className='flex flex-row w-full'>
      {left}
      {right}
    </div>
  );
}
