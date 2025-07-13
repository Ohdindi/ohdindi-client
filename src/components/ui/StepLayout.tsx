'use client';

import React, { ReactNode } from 'react';

import { ArrowCircleLeft } from 'phosphor-react';

import TopHeader from '../TopHeader';

interface StepLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  iconComponent?: ReactNode; // Optional icon component
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function StepLayout({
  children,
  currentStep,
  totalSteps,
  iconComponent,
  title,
  subtitle,
  onBack,
}: StepLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <TopHeader />

      {/* Progress Bar */}
      <div className="fixed top-16 z-20 w-full pb-3">
        <div className="h-0.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-900">
          <div
            className="h-0.5 rounded-full bg-zinc-800 transition-all duration-300 dark:bg-zinc-200"
            style={
              {
                width: `${(currentStep / totalSteps) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {onBack && (
        <div className="fixed mt-22 px-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            <ArrowCircleLeft size={18} weight="fill" />
            Back
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto mt-20 max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          {iconComponent && (
            <div className="mb-4 flex justify-center text-zinc-900 dark:text-zinc-50">
              {iconComponent}
            </div>
          )}
          <h2 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
