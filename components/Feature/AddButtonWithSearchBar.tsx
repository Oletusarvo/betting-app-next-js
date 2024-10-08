import { SearchBar } from './SearchBar';
import { Add } from '@mui/icons-material';

import { Button } from '../UI/Button';
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
    <div className='flex justify-between mt-4 w-full gap-1'>
      <SearchBar
        queryName={queryName}
        placeholder={searchPlaceholder}
      />
    </div>
  );
}
