export interface TeamMember {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  department: string;
  leader: string;
  description: string;
  members: TeamMember[];
}

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-sales-system',
    name: 'ทีมพัฒนาระบบขาย',
    department: 'IT',
    leader: 'ต้น',
    description: 'พัฒนาและดูแลระบบขาย รวมถึงเครื่องมือที่ช่วยให้ฝ่ายขายทำงานได้สะดวกขึ้น',
    members: [
      { id: 'sales-member-ton', name: 'ต้น' },
      { id: 'sales-member-ploy', name: 'พลอย' },
    ],
  },
  {
    id: 'team-infrastructure',
    name: 'ทีมโครงสร้างพื้นฐาน',
    department: 'IT',
    leader: 'เก่ง',
    description: 'ดูแลเซิร์ฟเวอร์ เครือข่าย และความพร้อมใช้งานของระบบภายใน',
    members: [
      { id: 'infra-member-keng', name: 'เก่ง' },
      { id: 'infra-member-ton', name: 'ต้น' },
    ],
  },
  {
    id: 'team-support',
    name: 'ทีมสนับสนุนผู้ใช้',
    department: 'IT',
    leader: 'เก่ง',
    description: 'ช่วยเหลือสมาชิกและประสานงานแก้ไขปัญหาด้านระบบ',
    members: [
      { id: 'support-member-keng', name: 'เก่ง' },
      { id: 'support-member-nid', name: 'นิด' },
    ],
  },
];