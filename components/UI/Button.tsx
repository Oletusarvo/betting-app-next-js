'use client';

import { ReactElement } from 'react';
import { Spinner } from './Spinner';
import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export type ButtonProps = React.ComponentProps<'button'> & {
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactElement;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'warning' | 'success';
  href?: string;
};

export function Button({
  children,
  href,
  fullWidth,
  loading,
  variant = 'contained',
  color = 'primary',
  startIcon,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const icon = (loading && <Spinner />) || (startIcon as ReactElement);
  const bgColor =
    color == 'primary'
      ? 'bg-primary'
      : color == 'secondary'
      ? 'bg-secondary'
      : color == 'success'
      ? 'bg-success'
      : 'bg-warning';

  const classes = [
    'py-2 px-4 flex items-center gap-2 rounded-[3px] tracking-wider justify-center uppercase font-semibold text-sm',
    variant == 'contained'
      ? `${bgColor} text-white shadow-md`
      : variant == 'outlined'
      ? `border border-${color} text-${color}`
      : `bg-none text-${color}`,
    fullWidth && 'w-full',
  ];

  return (
    <button
      {...props}
      onClick={e => {
        console.log(href);
        href && router.push(href);
        props.onClick && props.onClick(e);
      }}
      className={classes.join(' ')}>
      {icon &&
        React.cloneElement(icon, {
          ...icon.props,
          style: {
            fontSize: '1.25rem',
          },
        })}
      {children}
    </button>
  );
}
