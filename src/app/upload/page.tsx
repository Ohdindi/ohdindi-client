'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import LoginButton from '@/components/LoginButton';

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-6xl">
        <LoginButton />

        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          최근 활동
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-black pl-4 dark:border-white">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              계정 생성됨
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              어딘디에 오신 것을 환영합니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
