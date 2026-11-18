export const periods = ['ปีนี้', 'ไตรมาสนี้', 'เดือนนี้', 'กำหนดเอง'];

export interface SummaryItem {
    label: string;
    value: string;
    detail: string;
    color: string;
}

export const summary: SummaryItem[] = [
    { label: 'คำขอทั้งหมด', value: '148', detail: 'ในช่วงที่เลือก', color: 'bg-slate-400' },
    { label: 'อนุมัติแล้ว', value: '112', detail: 'ผ่านขั้นถัดไป', color: 'bg-green-600' },
    { label: 'ปฏิเสธ/ส่งกลับ', value: '14', detail: 'พร้อมเหตุผล', color: 'bg-red-600' },
    { label: 'กำลังดำเนินการ', value: '23', detail: 'มีงานย่อยค้าง', color: 'bg-indigo-600' },
    { label: 'เสร็จสิ้น', value: '89', detail: 'ตรวจรับแล้ว', color: 'bg-sky-600' },
    { label: 'เกินกำหนด', value: '6', detail: 'ต้องติดตาม', color: 'bg-amber-600' },
];

export const monthlyRequests = [
    { month: 'ม.ค.', count: 9 },
    { month: 'ก.พ.', count: 12 },
    { month: 'มี.ค.', count: 15 },
    { month: 'เม.ย.', count: 11 },
    { month: 'พ.ค.', count: 14 },
    { month: 'มิ.ย.', count: 16 },
    { month: 'ก.ค.', count: 13 },
    { month: 'ส.ค.', count: 17 },
    { month: 'ก.ย.', count: 15 },
    { month: 'ต.ค.', count: 14 },
    { month: 'พ.ย.', count: 12 },
];

export const categories = [
    { name: 'พัฒนาใหม่', count: 41, color: 'bg-sky-600' },
    { name: 'ปรับปรุง', count: 49, color: 'bg-violet-600' },
    { name: 'แก้ bug', count: 36, color: 'bg-red-600' },
    { name: 'แก้ปัญหา', count: 22, color: 'bg-amber-600' },
];

export const departments = [
    { name: 'ฝ่ายขาย', count: 52 },
    { name: 'ฝ่ายทะเบียน', count: 38 },
    { name: 'ฝ่ายบัญชี', count: 31 },
    { name: 'ฝ่าย IT', count: 27 },
];

export const overdueTasks = [
    { title: 'นำเข้าข้อมูลลูกค้าจาก Excel ไม่ได้', code: 'REQ-0135', date: '5 พ.ย.' },
    { title: 'ปรับรูปแบบใบเสร็จฝ่ายบัญชี', code: 'REQ-0129', date: '8 พ.ย.' },
];