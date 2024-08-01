import { IconButton, IconButtonProps } from '@mui/material';
import Link from 'next/link';

export function IconButtonLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      <IconButton>{children}</IconButton>
    </Link>
  );
}
