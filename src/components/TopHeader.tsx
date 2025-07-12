'use client';

import AccountButton from './AccountButton';

export default function TopHeader() {
  return (
    <header className="fixed top-0 right-0 z-30 flex w-full items-center justify-end p-4 pl-20">
      <div className="flex items-center space-x-4">
        <AccountButton />
      </div>
    </header>
  );
}
