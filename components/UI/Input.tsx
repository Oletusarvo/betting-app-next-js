'use client';

import { forwardRef } from 'react';

const inputBaseClasses = [
  'w-full p-4 shadow-md bg-white rounded-sm text-lg border border-slate-100',
];

export const Input = forwardRef((props: React.ComponentProps<'input'>, ref: TODO) => {
  return (
    <input
      ref={ref}
      className={inputBaseClasses.join(' ')}
      {...props}
    />
  );
});

export const Select = forwardRef(
  ({ children, ...props }: React.ComponentProps<'select'>, ref: TODO) => {
    return (
      <select
        ref={ref}
        className={inputBaseClasses.join(' ')}
        {...props}>
        {children}
      </select>
    );
  }
);

export const Textarea = forwardRef((props: React.ComponentProps<'textarea'>, ref: TODO) => {
  return (
    <textarea
      ref={ref}
      className={[...inputBaseClasses, 'resize-none'].join(' ')}
      {...props}
    />
  );
});
