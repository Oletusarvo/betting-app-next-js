import { IconButton } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useEffect, useRef } from 'react';

type IconLinkProps = React.ComponentProps<typeof Link> & {
  selected?: boolean;
  icon: React.ReactElement;
};

export function IconLink({ selected = false, icon, ...props }: IconLinkProps) {
  return (
    <IconButton href={props.href.toString()}>
      {React.cloneElement(icon, {
        ...icon.props,
        sx: {
          ...icon.props.sx,
          fontSize: '2rem',
        },
        className: [selected ? 'text-primary' : 'text-darkGrey'].join(' '),
      })}
    </IconButton>
  );
}
