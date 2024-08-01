'use client';

import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { Spinner } from './Spinner';
import { blue } from '@mui/material/colors';

type ButtonProps = MuiButtonProps & {
  loading?: boolean;
};
export function Button({ children, loading, ...props }: ButtonProps) {
  const startIcon = loading ? <Spinner /> : props.startIcon;

  return (
    <MuiButton
      {...props}
      startIcon={startIcon}
      sx={{
        ':disabled': {
          backgroundColor: blue[300],
        },
      }}>
      {children}
    </MuiButton>
  );
}
