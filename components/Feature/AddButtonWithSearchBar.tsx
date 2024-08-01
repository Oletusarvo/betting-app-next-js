import { Button } from '@mui/material';
import { SearchBar } from './SearchBar';
import { Add } from '@mui/icons-material';
import Link from 'next/link';

type AddButtonWithSearchBarProps = {
  queryName: string;
  searchPlaceholder: string;
  addUrl: string;
};

export function AddButtonWithSearchBar({
  queryName,
  searchPlaceholder,
  addUrl,
}: AddButtonWithSearchBarProps) {
  return (
    <div className='flex justify-between mt-4 w-full gap-2'>
      <SearchBar
        queryName={queryName}
        placeholder={searchPlaceholder}
      />
      <Link href={addUrl}>
        <Button
          type='button'
          variant='contained'
          startIcon={<Add />}>
          Add
        </Button>
      </Link>
    </div>
  );
}
