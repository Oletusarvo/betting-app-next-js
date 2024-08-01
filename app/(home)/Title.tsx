'use client';

import { Blinker } from '@/components/Feature/Blinker';
import { TypeText } from '@/components/Feature/TypeText';

/**An animated title component. */
export default function Title() {
  return (
    <h1 className='xs:text-4xl md:text-5xl font-semibold'>
      <TypeText
        text='Wager Wave'
        speed={50}
        cursor={<Blinker speed={700}>_</Blinker>}
      />
    </h1>
  );
}
