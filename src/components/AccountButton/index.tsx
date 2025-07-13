'use client';

import { useState } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { CaretDown, SignOut } from 'phosphor-react';

import Avatar from './Avatar';

export default function AccountButton() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!session) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex cursor-pointer items-center space-x-2 p-2 transition-all duration-200"
      >
        <Avatar
          src={session.user?.image}
          alt={session.user?.name || '사용자'}
        />

        {/* Dropdown arrow */}
        <CaretDown size={15} weight="fill" className="text-zinc-400" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown content */}
          <div className="absolute top-full right-0 z-20 mt-2 w-64 rounded-lg bg-white pt-2 shadow-xl dark:bg-black dark:shadow-zinc-700">
            {/* User info in dropdown */}
            <div className="px-4 py-3 dark:border-zinc-700">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={session.user?.image}
                  alt={session.user?.name || '사용자'}
                />

                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {session.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="pt-2">
              <div className="border-t border-zinc-100 dark:border-zinc-700" />
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center rounded-b-lg px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <SignOut
                  size={26}
                  color="red"
                  weight="fill"
                  className="cursor-pointer p-1 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                />
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
