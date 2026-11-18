'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Bell1, ErrorCircle1, Search1 } from '@tailgrids/icons';
// แก้ไข Path ตรงนี้ให้ตรงกับโฟลเดอร์ Data และชื่อไฟล์ taskData.ts ของคุณ
import { INITIAL_TASKS, type TaskItem } from '@/Data/taskData';

export default function MyTasksPage() {
  // --- STATE MANAGEMENT ---
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS); // เก็บรายการงานทั้งหมด
  const [searchQuery, setSearchQuery] = useState(''); // เก็บคำค้นหาสำหรับกรองงาน

  /**
   * ฟังก์ชันกรองรายการงานตามคำค้นหา (Search Query)
   * รองรับการค้นหาจากชื่อชิ้นงาน, รหัสคำขอ (reqCode) หรือหมวดย่อย (subCategory)
   */
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('th');
    return tasks.filter((task) =>
      `${task.title} ${task.reqCode} ${task.subCategory}`.toLocaleLowerCase('th').includes(query),
    );
  }, [searchQuery, tasks]);

  // --- STATISTICAL CALCULATIONS ---
  const totalCount = tasks.length; // จำนวนงานทั้งหมด
  const inProgressCount = tasks.filter((task) => task.status === 'in_progress').length; // จำนวนงานที่กำลังดำเนินการ
  const overdueTasks = tasks.filter((task) => task.status === 'overdue'); // รายการงานที่เกินกำหนด
  const completedCount = tasks.filter((task) => task.status === 'completed').length; // จำนวนงานที่เสร็จสิ้น

  /**
   * ฟังก์ชันสำหรับอัปเดตเปอร์เซ็นต์ความคืบหน้าของงานเมื่อผู้ใช้คลิกที่แถบ Progress
   * จะเพิ่มทีละ 20% สูงสุดไม่เกิน 100% และเปลี่ยนสถานะเป็น 'completed' หากครบ 100%
   * @param id ID ของงานที่ต้องการอัปเดต
   */
  const handleUpdateProgress = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id || task.progress >= 100) return task;

        const progress = Math.min(task.progress + 20, 100);
        return {
          ...task,
          progress,
          status: progress === 100 ? 'completed' : task.status,
        };
      }),
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f7f9fc] text-slate-800">
      <main className="min-h-screen min-w-0">
        <div className="w-full px-2 py-6 sm:px-3 sm:py-8 lg:px-4">

          {/* --- HEADER SECTION --- */}
          {/* ส่วนหัวหน้าเว็บ: แสดงชื่อหน้า ช่องค้นหา และปุ่มแจ้งเตือน */}
          <header className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-[30px] font-bold leading-9 tracking-tight text-slate-900">งานของฉัน</h1>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              {/* ช่องค้นหารหัสหรือชื่อคำขอ */}
              <label className="relative block w-[260px] max-w-[calc(100vw-100px)]">
                <span className="sr-only">ค้นหารหัสหรือชื่อคำขอ</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="ค้นหารหัสหรือชื่อคำขอ"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <Search1 className="pointer-events-none absolute right-2.5 top-2 h-4 w-4 text-slate-400" />
              </label>
              {/* ปุ่มแจ้งเตือน */}
              <button
                type="button"
                aria-label="การแจ้งเตือน"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Bell1 className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* --- OVERDUE ALERT BANNER --- */}
          {/* แถบแจ้งเตือนกรณีมีงานเกินกำหนด (จะแสดงก็ต่อเมื่อมีงาน overdue มากกว่า 0) */}
          {overdueTasks.length > 0 && (
            <section
              aria-label="การแจ้งเตือนงานเกินกำหนด"
              className="mb-6 flex items-center gap-3 rounded-lg bg-red-100 px-4 py-4 text-sm font-medium text-red-700"
            >
              <ErrorCircle1 className="h-5 w-5 shrink-0" />
              <p>
                มี {overdueTasks.length} งานเกินกำหนด: {overdueTasks[0].title} ({overdueTasks[0].reqCode})
                เลยกำหนดวันที่ {overdueTasks[0].dueDate}
              </p>
            </section>
          )}

          {/* --- SUMMARY CARDS SECTION --- */}
          {/* การ์ดสรุปสถิติต่างๆ ของงาน */}
          <section aria-label="สรุปงาน" className="mb-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="งานทั้งหมด" value={totalCount} detail="ที่ได้รับมอบหมาย" dotClass="bg-slate-400" />
            <SummaryCard label="กำลังทำ" value={inProgressCount} detail="อัปเดต % ได้" dotClass="bg-indigo-600" />
            <SummaryCard label="เกินกำหนด" value={overdueTasks.length} detail="ควรแจ้งหัวหน้า" dotClass="bg-red-600" />
            <SummaryCard label="เสร็จสัปดาห์นี้" value={completedCount} detail="REQ-0139" dotClass="bg-green-600" />
          </section>

          {/* --- TASKS TABLE SECTION --- */}
          {/* ตารางแสดงรายการงานทั้งหมด สามารถเลื่อนดูในแนวนอนได้บนหน้าจอขนาดเล็ก */}
          <section
            aria-label="รายการงาน"
            className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-slate-100/90 text-xs font-semibold text-slate-500">
                  <tr>
                    <th className="w-[45%] px-4 py-3.5">งานย่อย</th>
                    <th className="px-4 py-3.5">งานหลัก</th>
                    <th className="px-4 py-3.5">กำหนดส่ง</th>
                    <th className="px-4 py-3.5">สถานะ</th>
                    <th className="w-[20%] px-4 py-3.5">ความคืบหน้า (กดเพื่ออัปเดต)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {filteredTasks.map((task) => (
                    <TaskRow key={task.id} task={task} onUpdateProgress={handleUpdateProgress} />
                  ))}
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                        ไม่พบงานที่ตรงกับ “{searchQuery}”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* คำแนะนำใต้ตาราง */}
          <p className="mt-6 text-xs leading-6 text-slate-400">
            ผู้รับงานสามารถอัปเดตความคืบหน้าของงานได้ · หากติดปัญหาให้แจ้งหัวหน้าแผนก
          </p>

          {/* ปุ่มลอยด้านขวาล่างสำหรับไปหน้าถัดไป */}
          <button
            type="button"
            className="fixed bottom-7 right-7 z-20 inline-flex items-center gap-2 rounded-full bg-indigo-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition-colors hover:bg-indigo-800"
          >
            ถัดไป: แอนิเมชันความคืบหน้า
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}

/**
 * คอมโพเนนต์ย่อย: การ์ดแสดงสถิติสรุปงานแต่ละรายการ
 */
function SummaryCard({
  label,
  value,
  detail,
  dotClass,
}: {
  label: string;
  value: number;
  detail: string;
  dotClass: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
        {label}
      </div>
      <p className="mt-2 text-[30px] font-bold leading-9 text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </article>
  );
}

/**
 * คอมโพเนนต์ย่อย: แถวข้อมูลงานแต่ละรายการในตาราง
 */
function TaskRow({
  task,
  onUpdateProgress,
}: {
  task: TaskItem;
  onUpdateProgress: (id: string) => void;
}) {
  const statusStyles = {
    in_progress: 'bg-indigo-50 text-indigo-600',
    overdue: 'bg-red-600 text-white',
    completed: 'bg-green-100 text-green-700',
  }[task.status];
  
  const statusLabels = {
    in_progress: 'กำลังดำเนินการ',
    overdue: 'เกินกำหนด',
    completed: 'เสร็จสิ้น',
  }[task.status];

  return (
    <tr className="transition-colors hover:bg-slate-50/80">
      <td className="px-4 py-4">
        <p className="font-semibold text-slate-800">{task.title}</p>
        <p className="mt-1 text-xs text-slate-400">
          {task.reqCode} · {task.subCategory}
        </p>
      </td>
      <td className="px-4 py-4 text-slate-700">{task.mainTask}</td>
      <td className="px-4 py-4 text-slate-700">{task.dueDate}</td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${statusStyles}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabels}
        </span>
      </td>
      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() => onUpdateProgress(task.id)}
          disabled={task.progress >= 100}
          aria-label={`อัปเดตความคืบหน้า ${task.title}`}
          className="group flex w-full items-center gap-2 text-left disabled:cursor-default"
        >
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <span
              className={`block h-full rounded-full ${
                task.status === 'completed' ? 'bg-green-600' : 'bg-indigo-600'
              }`}
              style={{ width: `${task.progress}%` }}
            />
          </span>
          <span className="w-9 text-right text-xs font-semibold text-slate-500">
            {task.progress}%
          </span>
        </button>
      </td>
    </tr>
  );
}