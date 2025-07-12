'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import OhdindiLogo from '@/assets/ohdindi-logo.png';

import AccountButton from './AccountButton';

export default function TopHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 right-0 z-30 flex w-full items-center justify-between px-8 py-2">
      <div
        className="flex cursor-pointer items-start space-x-1 p-1"
        onClick={() => {
          router.push('/');
        }}
      >
        <Image
          src={OhdindiLogo}
          alt="Ohdindi Logo"
          className="h-8 w-8"
          priority
        />
        <h1 className="leading text-xl">어딘디</h1>
      </div>
      <div className="flex items-center space-x-4">
        <AccountButton />
      </div>
    </header>
  );
}
