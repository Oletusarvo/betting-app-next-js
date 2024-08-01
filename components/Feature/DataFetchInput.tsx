'use client';

import { useRef, useState } from 'react';
import { Input } from '../UI/FormUtils';

type DataFetchInputProps = React.ComponentProps<'input'> & {
  dataFetchUrl: string;
};

export function DataFetchInput({ dataFetchUrl, ...props }: DataFetchInputProps) {
  const [currentQuery, setCurrentQuery] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        name={props.name}
      />
      {fetchedData.length && (
        <div className='flex flex-col w-full gap-2'>
          {fetchedData.map(fd => (
            <span
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = fd;
                }
              }}>
              {fd}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
