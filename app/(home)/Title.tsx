'use client';

import { Blinker } from '@/components/Feature/Blinker';
import { TypeText } from '@/components/Feature/TypeText';
import { Chip } from '@mui/material';

/**An animated title component. */
export default function Title() {
  return (
    <div className='flex flex-col gap-1'>
      <small className='text-sm font-semibold'>Beta</small>

      <h1 className='xs:text-4xl md:text-5xl font-semibold'>
        <TypeText
          text='Wager Wave'
          speed={50}
          cursor={<Blinker speed={700}>_</Blinker>}
        />
      </h1>
    </div>
  );
}
