'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FileText } from 'phosphor-react';

import TopHeader from '@/components/TopHeader';

interface Project {
  id: number;
  name: string;
  location: {
    id: number;
    name: string;
    address: string;
    score: number;
    features: string[];
    description: string;
  };
  createdAt: string;
  continuityFile: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const { status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      // Load projects from localStorage
      const savedProjects = JSON.parse(
        localStorage.getItem('userProjects') || '[]'
      );
      setProjects(savedProjects);
    }
  }, [status, router]);

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
    localStorage.setItem('userProjects', JSON.stringify(updatedProjects));
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopHeader />
      <main className="fixed top-16 h-full w-full flex-1 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                내 프로젝트
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                완료된 콘티 분석 프로젝트를 확인해보세요.
              </p>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="flex flex-col items-center rounded-lg p-12 text-center">
              <FileText
                size={24}
                weight="fill"
                className="mb-8 animate-[wiggle_1s_ease-in-out_infinite] text-zinc-400 transition-all duration-300 hover:scale-125"
              />

              <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                아직 프로젝트가 없습니다
              </h3>
              <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                첫 번째 콘티 분석을 시작해보세요!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-2xl"
                >
                  <div className="mb-4">
                    <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
                      {project.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(project.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>

                  {project.location && (
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium text-zinc-800 dark:text-zinc-200">
                          {project.location.name}
                        </h4>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          매칭도 {project.location.score}%
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {project.location.address}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.location.features
                          .slice(0, 2)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600"
                            >
                              {feature}
                            </span>
                          ))}
                        {project.location.features.length > 2 && (
                          <span className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                            +{project.location.features.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {project.continuityFile && (
                    <div className="mb-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium">콘티 파일:</span>{' '}
                        {project.continuityFile}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      className="rounded-full px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900"
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className="cursor-pointer rounded-full bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
