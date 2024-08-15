'use client';

import { IconLink } from '@/components/UI/IconLink';
import { HighlightingNavbarProvider } from '@/components/Util/HighlightingNavbarProvider';
import { Casino, Person } from '@mui/icons-material';

export const BottomNav = (
  <nav className='w-full flex items-center justify-center gap-8 fixed bottom-0 z-10 border-t-[2px] border-slate-200 bg-white px-1 py-2'>
    <HighlightingNavbarProvider>
      <IconLink
        icon={<Person />}
        href={'/dashboard/user'}
      />
      <IconLink
        icon={<Casino />}
        href='/dashboard/games'
      />
    </HighlightingNavbarProvider>
  </nav>
);
