'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import OhdindiWithLocationLogo from '@/assets/ohdindi-with-location.png';
import TopHeader from '@/components/TopHeader';
import Button from '@/components/ui/Button';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasExistingProjects, setHasExistingProjects] = useState<
    boolean | null
  >(null);

  // Check if user has existing projects
  const checkExistingProjects = async () => {
    try {
      // Check localStorage for any saved projects
      const savedProjects = localStorage.getItem('userProjects');
      const selectedLocation = localStorage.getItem('selectedLocation');
      const continuityFile = localStorage.getItem('continuityFile');

      // If user has any saved project data, consider them as having existing projects
      if (savedProjects || selectedLocation || continuityFile) {
        setHasExistingProjects(true);
      } else {
        setHasExistingProjects(false);
      }
    } catch (error) {
      console.error('Error checking existing projects:', error);
      setHasExistingProjects(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      checkExistingProjects();
    }
  }, [session, status, router]);

  // Auto-redirect for users without existing projects
  useEffect(() => {
    if (status === 'authenticated' && hasExistingProjects === false) {
      router.push('/upload/continuity');
    }
  }, [status, hasExistingProjects, router]);

  if (status === 'loading' || hasExistingProjects === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  // If user has no existing projects, they will be redirected automatically
  // This component only renders for users with existing projects
  const handleUploadContinuity = () => {
    router.push('/upload/continuity');
  };

  const handleClearData = () => {
    // Development helper - clear all localStorage data
    localStorage.removeItem('userProjects');
    localStorage.removeItem('selectedLocation');
    localStorage.removeItem('continuityFile');
    setHasExistingProjects(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopHeader />
      <main className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <Image
              src={OhdindiWithLocationLogo}
              alt="Ohdindi Logo"
              className="mx-auto h-auto w-32"
              priority
            />
            <h1 className="text-4xl text-zinc-900 dark:text-zinc-50">어딘디</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              콘티만 보여줘요. 어딘디 AI가 찰떡같은 촬영 장소, 콕 집어줄게요.
              <br />
              분위기, 콘셉트, 시간대까지 분석해서 영상에 딱 맞는 장소만
              골라드려요.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button onClick={handleUploadContinuity} className="w-full">
              콘티 분석 시작하기
            </Button>
            <Button onClick={() => router.push('/projects')}>
              내 프로젝트 보기
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Button onClick={handleClearData}>데이터 초기화 (개발용)</Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
