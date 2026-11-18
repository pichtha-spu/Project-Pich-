import React from 'react';

export default function AppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] text-[#111928]">
      <div className="mx-auto w-full max-w-[1440px] p-6 md:p-8">{children}</div>
    </main>
  );
}
