import { Chip } from '@mui/material';

type ChipLabelProps = {
  label: string;
  value: string | number;
};

export function ChipLabel({ label, value }: ChipLabelProps) {
  return (
    <div className='flex gap-2 rounded-3xl items-center w-full bg-blue-700 justify-between pr-4'>
      <Chip
        label={label}
        color='primary'
      />

      <span className='font-semibold'>{value}</span>
    </div>
  );
}
