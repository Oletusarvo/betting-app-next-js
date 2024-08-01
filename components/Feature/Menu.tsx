'use client';

import MuiMenu from '@mui/material/Menu';
import { useState } from 'react';
import { DialogControl } from './DialogControl';
import { MenuItem } from '@mui/material';
import React from 'react';

type MenuProps = React.PropsWithChildren & {
  trigger: React.ReactElement;
};

export function Menu({ trigger, children }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <DialogControl
      trigger={({ onClick }) => {
        return React.cloneElement(trigger, {
          ...trigger.props,
          onClick: (e: TODO) => {
            setAnchorEl(e.currentTarget);
            onClick(e);
          },
        });
      }}
      control={({ open, handleClose }) => {
        return (
          <MuiMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
            {React.Children.map(children, child => (
              <MenuItem>{child}</MenuItem>
            ))}
          </MuiMenu>
        );
      }}
    />
  );
}
