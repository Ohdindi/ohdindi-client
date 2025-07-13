'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative flex cursor-pointer flex-row items-center gap-2 rounded-full object-cover px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-lg ring-2 ring-white transition-all duration-300 hover:bg-zinc-50 hover:shadow-2xl focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 dark:text-zinc-50 dark:ring-white/20 dark:hover:bg-zinc-800 dark:hover:shadow-zinc-700 dark:focus:ring-zinc-700"
      style={{
        filter: 'brightness(1.05) contrast(1.2)',
      }}
    >
      {children}

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5" />
    </button>
  );
}
