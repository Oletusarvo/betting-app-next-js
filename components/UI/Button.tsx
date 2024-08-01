import { Spinner } from './Spinner';
import {
  ButtonBaseProps,
  ButtonOwnProps,
  ButtonPropsVariantOverrides,
  Button as MuiButton,
} from '@mui/material';
import { WithSpinner } from './WithSpinner';

type ButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', children, loading = false, ...props }: ButtonProps) {
  const className = [
    'rounded-md p-2 flex gap-1 items-center',
    variant === 'primary' ? 'bg-blue-700 hover:bg-blue-400' : 'bg-transparent',
  ];

  return (
    <button
      {...props}
      className={className.join(' ')}>
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

export function PrimaryButton({ children, loading }: Omit<ButtonProps, 'variant'>) {
  return (
    <Button
      variant='primary'
      loading={loading}>
      <span className='mx-8'>{children}</span>
    </Button>
  );
}

type ButtonWithLoadingProps = React.ComponentProps<typeof MuiButton> & {
  loading: boolean;
};

export function ButtonWithLoading({
  children,
  loading,
  variant,
  ...props
}: ButtonWithLoadingProps) {
  return (
    <MuiButton
      variant={variant}
      {...props}>
      {loading ? <WithSpinner>{children}</WithSpinner> : children}
    </MuiButton>
  );
}
