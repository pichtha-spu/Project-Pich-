'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Exit, 
  UserMultiple4, 
  DashboardCircle, 
  MapMarker5, 
  User2 
} from "@tailgrids/icons";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-[260px] flex-col justify-between border-r border-white/10 bg-[#1E1B4B] px-5 py-7 transition-all duration-300">
      <div>
        {/* Brand Logo */}
        <div className="mb-9 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white shadow-sm">
            RQ
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white">
              ระบบจัดการคำขอ
            </h1>
            <p className="text-xs font-normal text-slate-400">
              Software Request
            </p>
          </div>
        </div>

        {/* Menu Group Title */}
        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          เมนู
        </div>

        {/* Nav List */}
        <nav>
          <ul className="space-y-1.5">
            <TailGridsNavItem
              icon={User2}
              label="งานของฉัน"
              active={pathname === '/tasks'}
              onClick={() => router.push('/tasks')}
            />
            <TailGridsNavItem
              icon={DashboardCircle}
              label="Dashboard"
              active={pathname === '/dashboard'}
              onClick={() => router.push('/dashboard')}
            />
            <TailGridsNavItem
              icon={UserMultiple4}
              label="ทีม"
              active={pathname === '/teams'}
              onClick={() => router.push('/teams')}
            />
            <TailGridsNavItem
              icon={MapMarker5}
              label="หมวดคำขอ"
              active={pathname === '/admin/categories'}
              onClick={() => router.push('/admin/categories')}
            />
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {}}
          className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Exit className="h-[18px] w-[18px] text-slate-400 transition-colors group-hover:text-white" />
          <span>ออกจากระบบ</span>
        </button>

        {/* Profile Placeholder Box */}
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#27245D] p-3.5">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-24 rounded bg-white/20" />
            <div className="h-4 w-20 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </aside>
  );
}

// Nav Item Component (ย้ายมาไว้ไฟล์เดียวกันเพื่อความเป็นระเบียบ)
interface NavItemProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TailGridsNavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`group relative flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-[#312E81] text-white shadow-sm'
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Icon
          className={`h-[18px] w-[18px] shrink-0 transition-colors ${
            active ? 'text-white' : 'text-slate-400 group-hover:text-white'
          }`}
        />
        <span>{label}</span>
      </button>
    </li>
  );
}