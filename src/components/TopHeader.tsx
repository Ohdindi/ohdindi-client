'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PlusCircle } from 'phosphor-react';

import OhdindiLogo from '@/assets/ohdindi-logo.png';

import AccountButton from './AccountButton';
import Button from './ui/Button';

export default function TopHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 right-0 z-30 flex w-full items-center justify-between bg-zinc-50/10 px-8 py-2 backdrop-blur-sm dark:bg-zinc-950/20">
      <div
        className="flex cursor-pointer items-start space-x-1 p-1"
        onClick={() => {
          router.push('/');
        }}
      >
        <Image
          src={OhdindiLogo}
          alt="Ohdindi Logo"
          className="h-9 w-9"
          priority
        />
        <h1 className="leading text-xl">어딘디</h1>
      </div>
      <div></div>

      <div className="flex items-center space-x-4">
        <Button onClick={() => router.push('/upload/continuity')}>
          <PlusCircle size={18} weight="fill" />새 프로젝트
        </Button>
        <AccountButton />
      </div>
    </header>
  );
}
