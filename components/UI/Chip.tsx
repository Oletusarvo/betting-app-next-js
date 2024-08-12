import { Cancel, Close, ColorLens } from '@mui/icons-material';
import { ButtonProps } from './Button';

type ChipProps = React.PropsWithChildren & {
  color?: ButtonProps['color'] | 'call' | 'folded';
  onClick?: () => void;
  onDelete?: () => void;
};

export function Chip({ children, onDelete, onClick, color = 'primary' }: ChipProps) {
  const classes = [
    'flex items-center justify-center px-4 py-2 text-white font-semibold rounded-3xl gap-2',
    'bg-' + color,
  ];

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}>
      {children}
      {onDelete && (
        <Cancel
          onClick={onDelete}
          sx={{
            color: 'white',
            ':hover': {
              cursor: 'pointer',
            },
          }}
        />
      )}
    </div>
  );
}
