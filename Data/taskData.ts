export interface TaskItem {
    id: string;
    title: string;
    reqCode: string;
    subCategory: string;
    mainTask: string;
    dueDate: string;
    status: 'in_progress' | 'overdue' | 'completed';
    progress: number;
}

export const INITIAL_TASKS: TaskItem[] = [
    {
        id: 'task-1',
        title: 'ตรวจสอบระบบแจ้งเตือนทางอีเมล',
        reqCode: 'REQ-0135',
        subCategory: 'พัฒนาใหม่',
        mainTask: 'พัฒนาระบบแจ้งเตือนอัตโนมัติ',
        dueDate: '10 พ.ย. 2569',
        status: 'overdue',
        progress: 40,
    },
    {
        id: 'task-2',
        title: 'ออกแบบหน้าจอจัดการผู้ใช้งาน',
        reqCode: 'REQ-0139',
        subCategory: 'ปรับปรุงระบบ',
        mainTask: 'ปรับปรุง UI หน้า Admin',
        dueDate: '15 พ.ย. 2569',
        status: 'in_progress',
        progress: 70,
    },
    {
        id: 'task-3',
        title: 'แก้ไข Bug การดึงรายงานสรุป',
        reqCode: 'REQ-0142',
        subCategory: 'แก้ Bug',
        mainTask: 'ตรวจสอบและแก้ไข Error 500',
        dueDate: '18 พ.ย. 2569',
        status: 'completed',
        progress: 100,
    },
];