'use client';

import React from 'react';
import { useState } from 'react';

type DialogControlProps = {
  trigger: ({ onClick }: { onClick: (e: any) => void }) => React.ReactElement;
  control: ({
    open,
    handleClose,
  }: {
    open: boolean;
    handleClose: () => void;
  }) => React.ReactElement;
};

export const DialogControl = ({ trigger, control }: DialogControlProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {trigger({ onClick: () => setOpen(true) })}
      {control({
        open,
        handleClose,
      })}
    </>
  );
};

export const MenuControl = ({ trigger, control }: DialogControlProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <DialogControl
      trigger={({ onClick }) => {
        return trigger({
          onClick: e => {
            handleTriggerClick(e);
            onClick(e);
          },
        });
      }}
      control={({ open, handleClose }) => {
        const elem = control({ open, handleClose });
        return React.cloneElement(elem, {
          ...elem.props,
          anchorEl,
        });
      }}
    />
  );
};
