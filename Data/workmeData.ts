export interface RequestCategory {
    id: string;
    name: string;
    description: string;
    usageCount: number;
    color: string;
    active: boolean;
}

export const CATEGORY_COLORS = ['#0284c7', '#7c3aed', '#dc2626', '#d97706', '#16a34a', '#4f46e5'];

export const INITIAL_CATEGORIES: RequestCategory[] = [
    {
        id: 'new-feature',
        name: 'พัฒนาใหม่',
        description: 'ระบบหรือฟีเจอร์ใหม่ที่ยังไม่มี',
        usageCount: 41,
        color: '#0284c7',
        active: true,
    },
    {
        id: 'improvement',
        name: 'ปรับปรุง',
        description: 'แก้ไขหรือเพิ่มความสามารถของระบบเดิม',
        usageCount: 49,
        color: '#7c3aed',
        active: true,
    },
    {
        id: 'bug',
        name: 'แก้ bug',
        description: 'ระบบทำงานผิดจากที่ควรเป็น',
        usageCount: 36,
        color: '#dc2626',
        active: true,
    },
    {
        id: 'support',
        name: 'แก้ปัญหา',
        description: 'ปัญหาการใช้งานทั่วไป สิทธิ์ ข้อมูล',
        usageCount: 22,
        color: '#d97706',
        active: true,
    },
];