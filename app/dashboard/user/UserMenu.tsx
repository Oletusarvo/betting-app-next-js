'use client';

import { DialogControl } from '@/components/Feature/DialogControl';
import { ProfileCoin } from '@/components/UI/ProfileCoin';
import { Menu, MenuItem, MenuList } from '@mui/material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UserMenu({ session }: { session: TODO }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();

  return (
    <DialogControl
      trigger={({ onClick }) => {
        return (
          <ProfileCoin
            contentSliceLength={2}
            className='cursor-pointer'
            content={session.user.email}
            onClick={e => {
              setAnchorEl(e.currentTarget);
              onClick(e);
            }}
          />
        );
      }}
      control={({ open, handleClose }) => {
        return (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
            <Link href='user/settings'>
              <MenuItem>Settings</MenuItem>
              <MenuItem
                onClick={() => {
                  signOut({ redirect: false }).then(() => router.push('/'));
                }}>
                Log out
              </MenuItem>
            </Link>
          </Menu>
        );
      }}
    />
  );
}
