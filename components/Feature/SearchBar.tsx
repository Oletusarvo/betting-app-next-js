'use client';

import { useQueryParam } from 'hooks/useQuery';
import { Spinner } from '../UI/Spinner';
import { TextField } from '@mui/material';
import { Input } from '../UI/FormUtils';
import { Search } from '@mui/icons-material';

function SearchIcon({ loading }: { loading: boolean }) {
  return (
    <div className='absolute right-0 justify-self-end mx-2 text-slate-400'>
      {loading ? <Spinner /> : <Search />}
    </div>
  );
}
export function SearchBar({ queryName, placeholder }: { queryName: string; placeholder: string }) {
  const { updateQuery, status } = useQueryParam('', queryName, 300);

  return (
    <div className='relative items-center flex w-full'>
      <input
        className='h-full p-2 w-full text-blue-800 border-[2px] border-slate-200 text-lg'
        name='search'
        type='search'
        placeholder={placeholder}
        onChange={e => updateQuery(e.target.value)}
      />

      <SearchIcon loading={status === 'loading'} />
    </div>
  );
}
