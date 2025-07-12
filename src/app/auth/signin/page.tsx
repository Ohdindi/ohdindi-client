'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import OhdindiLogo from '@/assets/ohdindi-logo.png';
import LoginButton from '@/components/LoginButton';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'authenticated' && session) {
    return null; // 대시보드로 리다이렉트되는 동안 빈 화면
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <Image
          src={OhdindiLogo}
          alt="Ohdindi Logo"
          className="mx-auto mb-4 h-32 w-32"
          priority
        />
        <h1 className="mb-2 text-5xl text-stone-800 dark:text-stone-100">
          어딘디
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          촬영 로케이션 AI 코디네이터
        </p>
      </div>
      <LoginButton />
    </div>
  );
}
