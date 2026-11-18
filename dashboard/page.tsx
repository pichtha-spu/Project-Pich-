'use client';

import { useState } from 'react';
import { Bell1, Calendar, Search1 } from '@tailgrids/icons';

// Import ข้อมูลจำลองที่แยกออกมาจากไฟล์ dashboardData
import {
  periods,
  summary,
  monthlyRequests,
  categories,
  departments,
  overdueTasks,
} from '../../Data/dashboardData';

export default function DashboardPage() {
  // --- STATE MANAGEMENT ---
  // เก็บช่วงเวลาที่ผู้ใช้งานเลือกในปัจจุบัน (ค่าเริ่มต้นใช้ตัวแรก เช่น 'เดือนนี้' หรือ 'ปีนี้')
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  return (
    <main className="min-h-screen min-w-0 bg-[#f7f9fc] px-2 py-6 text-slate-800 sm:px-3 sm:py-8 lg:px-4">
      <div className="w-full">

        {/* --- HEADER SECTION --- */}
        {/* ส่วนหัวของหน้า ประกอบด้วยชื่อหน้า, ช่องค้นหา และปุ่มแจ้งเตือน */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-bold leading-9 tracking-tight text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* ช่องค้นหารหัสหรือชื่อคำขอ */}
            <label className="relative block w-[260px] max-w-[calc(100vw-100px)]">
              <span className="sr-only">ค้นหารหัสหรือชื่อคำขอ</span>
              <input
                type="search"
                placeholder="ค้นหารหัสหรือชื่อคำขอ"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <Search1 className="pointer-events-none absolute right-2.5 top-2 h-4 w-4 text-slate-400" />
            </label>
            {/* ปุ่มไอคอนแจ้งเตือน (Bell) */}
            <button
              type="button"
              aria-label="การแจ้งเตือน"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Bell1 className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* --- PERIOD FILTER SECTION --- */}
        {/* แถบสำหรับเลือกช่วงเวลาข้อมูล และแสดงช่วงวันที่ปัจจุบัน */}
        <section
          aria-label="ตัวกรองช่วงเวลา"
          className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* ปุ่มเลือกช่วงเวลา (Loop จากอาเรย์ periods) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-slate-500">ช่วงเวลา:</span>
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  aria-pressed={selectedPeriod === period}
                  onClick={() => setSelectedPeriod(period)} // เปลี่ยน State เมื่อคลิกเลือกช่วงเวลา
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${selectedPeriod === period
                      ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* ปุ่มแสดงช่วงวันที่แบบละเอียด พร้อมไอคอนปฏิทิน */}
            <button
              type="button"
              className="inline-flex h-11 min-w-[260px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-600"
            >
              <span>1 ม.ค. 2569 – 11 พ.ย. 2569</span>
              <Calendar className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* แถบแจ้งเตือนสถานะมุมมองปัจจุบัน */}
          <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-700">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>กำลังแสดง: {selectedPeriod} 2569 (ค่าเริ่มต้น) · 1 ม.ค. – 11 พ.ย. 2569 · ทุกแผนก</span>
          </div>
        </section>

        {/* --- SUMMARY CARDS SECTION --- */}
        {/* แสดงการ์ดสรุปข้อมูลสถิติภาพรวม (Loop จากข้อมูล summary) */}
        <section aria-label="สรุปคำขอ" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {summary.map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                {item.label}
              </div>
              <p className="mt-2 text-[28px] font-bold leading-8 text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
            </article>
          ))}
        </section>

        {/* --- CHARTS SECTION (Monthly Requests & Categories) --- */}
        {/* ส่วนแสดงกราฟคำขอรายเดือน และสถิติตามหมวดคำขอ */}
        <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-12">

          {/* กราฟแท่งแสดงคำขอรายเดือน */}
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-7">
            <h2 className="text-lg font-semibold text-slate-800">คำขอรายเดือน</h2>
            <p className="mt-1 text-xs text-slate-400">ม.ค. – พ.ย. 2569</p>
            <div className="mt-6 flex h-[175px] items-end justify-between gap-1">
              {monthlyRequests.map((item, index) => (
                <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <span className="mb-1 text-[11px] font-semibold text-slate-500">{item.count}</span>
                  {/* แท่งกราฟ (คำนวณความสูงตามสัดส่วนข้อมูล และเน้นสีเดือนล่าสุด) */}
                  <div
                    className={`w-full max-w-[30px] rounded-t-[4px] ${index === monthlyRequests.length - 1 ? 'bg-indigo-600' : 'bg-indigo-50'
                      }`}
                    style={{ height: `${(item.count / 18) * 128}px` }}
                  />
                  <span className="mt-2 text-[10px] text-slate-400">{item.month}</span>
                </div>
              ))}
            </div>
          </article>

          {/* สถิติตามหมวดคำขอ (Progress Bar) */}
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-5">
            <h2 className="text-lg font-semibold text-slate-800">ตามหมวดคำขอ</h2>
            <div className="mt-5 space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center gap-2.5">
                  <span className="w-[100px] shrink-0 text-sm text-slate-500">{category.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${category.color}`}
                      style={{ width: `${(category.count / 49) * 100}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-semibold text-slate-700">{category.count}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* --- TABLES & LISTS SECTION (Departments & Overdue Tasks) --- */}
        {/* ส่วนแสดงสถิติตามแผนก และรายการงานที่เกินกำหนด */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">

          {/* สถิติตามแผนกที่ส่งคำขอ */}
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-6">
            <h2 className="text-lg font-semibold text-slate-800">ตามแผนกที่ส่งคำขอ</h2>
            <div className="mt-5 space-y-4">
              {departments.map((department) => (
                <div key={department.name} className="flex items-center gap-2.5">
                  <span className="w-[110px] shrink-0 text-sm text-slate-500">{department.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${(department.count / 52) * 100}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-semibold text-slate-700">{department.count}</span>
                </div>
              ))}
            </div>
          </article>

          {/* ตารางรายการงานเกินกำหนด (Overdue Tasks) */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-6">
            <div className="flex items-center justify-between bg-slate-100/90 px-5 py-4 text-xs font-semibold text-slate-500">
              <h2>งานเกินกำหนด</h2>
              <span>เลยกำหนด</span>
            </div>
            <div className="divide-y divide-slate-100">
              {overdueTasks.map((task) => (
                <div key={task.code} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{task.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{task.code} · {task.date}</p>
                  </div>
                  {/* ป้ายสถานะเกินกำหนด สีแดง */}
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    เกินกำหนด
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

      </div>
    </main>
  );
}