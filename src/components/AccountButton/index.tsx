'use client';

import { useState } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { SignOut } from 'phosphor-react';

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
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 rounded-full p-2 transition-all duration-200"
      >
        <Avatar
          src={session.user?.image}
          alt={session.user?.name || '사용자'}
        />

        {/* Dropdown arrow */}
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
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
          <div className="absolute top-full right-0 z-20 mt-2 w-64 rounded-lg bg-white pt-2 shadow-xl dark:bg-black dark:shadow-gray-800">
            {/* User info in dropdown */}
            <div className="px-4 py-3 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={session.user?.image}
                  alt={session.user?.name || '사용자'}
                />

                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {session.user?.name || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="pt-2">
              <div className="border-t border-gray-100 dark:border-gray-700" />
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center rounded-b-lg px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <SignOut
                  size={26}
                  color="red"
                  weight="fill"
                  className="cursor-pointer p-1 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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
