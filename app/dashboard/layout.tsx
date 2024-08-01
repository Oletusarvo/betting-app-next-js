import { IconButtonLink } from '@/components/Feature/IconButtonLink';
import { Add, Casino, Money, Person, Toll, Wallet } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import Link from 'next/link';
import { CSSProperties } from 'react';

export default function DashboardLayout({ children }: TODO) {
  const containerStyle: CSSProperties = {
    backgroundColor: blue[800],
  };

  return (
    <>
      {children}
      <div
        style={containerStyle}
        className='fixed bottom-0 left-0 w-full z-10 bg-blue-950 border-top p-2 flex justify-evenly shadow-md'>
        <IconButtonLink href='/dashboard/user'>
          <Person sx={{ color: 'white' }} />
        </IconButtonLink>
        <IconButtonLink href='/dashboard/games'>
          <Casino sx={{ color: 'white' }} />
        </IconButtonLink>
      </div>
    </>
  );
}
