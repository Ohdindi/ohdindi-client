'use client';

import { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import { SignOut, Spinner } from 'phosphor-react';

import Avatar from './AccountButton/Avatar';
import GoogleIcon from './icons/GoogleIcon';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-6 w-6 animate-spin text-black dark:text-white" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-end space-y-4">
        <div className="flex items-start space-x-4 p-4">
          <Avatar
            src={session.user?.image}
            alt={session.user?.name || '사용자'}
          />
          <div className="flex-1">
            <p className="font-medium text-stone-900 dark:text-white">
              {session.user?.name || '사용자'}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {session.user?.email}
            </p>
          </div>
          <button type="button" onClick={handleSignOut} disabled={isLoading}>
            <span className="group relative">
              {isLoading ? (
                <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              ) : (
                <SignOut
                  size={26}
                  color="red"
                  weight="fill"
                  className="cursor-pointer rounded-full p-1 transition-colors duration-200 hover:bg-stone-50 dark:hover:bg-stone-800"
                />
              )}
              <span className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-black">
                로그아웃
              </span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex max-w-max flex-row items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 shadow-md transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:bg-stone-800 dark:hover:shadow-stone-700"
    >
      {isLoading ? (
        <Spinner className="mr-3 h-5 w-5 animate-spin text-stone-400 dark:text-stone-600" />
      ) : (
        <GoogleIcon className="mr-3 h-5 w-5" />
      )}
      Google 계정으로 로그인
    </button>
  );
}
