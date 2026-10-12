import { StaffInfo, StaffRecordsMap, KPITargets, DaySMPRecord, DayNBRecord, BranchRevenueKPI } from '../types/sales';

export const DEFAULT_BRANCH_REVENUE: BranchRevenueKPI = {
  quarter: 'Q4/2569',
  branchName: 'PIA (Branch Total)',
  actualRevenue: 6500152,
  targetRevenue: 10230348,
  deficitRevenue: 3730196,
  achievementPercent: 63.5,
  statusNote: 'ต่ำกว่าเป้าหมายรวม',
  daysRemainingInPeriod: 20,
};

export const KPI_TARGETS: KPITargets = {
  utcSmp: 40,     // 40%
  ufund: 50,      // 50%
  sim: 30,        // 30%
  film: 70,       // 70%
  tiCare: 30,     // 30%
  socialCare: 30, // 30%
  utcGadget: 20,  // 20%
  sandisk: 50,    // 50%
};

export const INITIAL_STAFF: StaffInfo[] = [
  { id: '24583', name: 'จิ๊บ', avatarColor: 'indigo' },
  { id: '21865', name: 'เมย์', avatarColor: 'emerald' },
  { id: '29253', name: 'วา', avatarColor: 'amber' },
  { id: '35350', name: 'สตาร์', avatarColor: 'purple' },
];

export const RAW_CSV_SOURCE = `วันที่,,1,,,,,,,,,,,2,,,,,,,,,,,3,,,,,,,,,,,4,,,,,,,,,,,5,,,,,,,,,,,6,,,,,,,,,,,7,,,,,,,,,,,8,,,,,,,,,,,9,,,,,,,,,,,10,,,,,,,,,,,11,,,,,,,,,,,12,,,,,,,,,,,13,,,,,,,,,,,14,,,,,,,,,,,15,,,,,,,,,,,16,,,,,,,,,,,17,,,,,,,,,,,18,,,,,,,,,,,19,,,,,,,,,,,20,,,,,,,,,,,21,,,,,,,,,,,22,,,,,,,,,,,23,,,,,,,,,,,24,,,,,,,,,,,25,,,,,,,,,,,26,,,,,,,,,,,27,,,,,,,,,,,28,,,,,,,,,,,29,,,,,,,,,,,30,,,,,,,,,,,31,,,,,,,,,
PIA,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน
24583,จิ๊บ,3,1,33%,,0%,,0%,,0%,,,4,,0%,,0%,,0%,1,25%,,,3,1,33%,,0%,,0%,,0%,,,6,1,17%,,0%,,0%,,0%,,,2,1,50%,,0%,1,50%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,5,,0%,,0%,,0%,,0%,,,4,2,50%,,0%,1,25%,,0%,,,2,,0%,,0%,,0%,,0%,,,5,1,20%,1,20%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
21865,เมย์,,,0%,,0%,,0%,,0%,,,3,3,100%,1,33%,,0%,2,67%,,,4,,0%,,0%,,0%,1,25%,,,4,1,25%,1,25%,,0%,2,50%,,,8,,0%,1,13%,1,13%,1,13%,,,4,,0%,1,25%,1,25%,1,25%,,,5,,0%,,0%,1,20%,1,20%,,,,,0%,,0%,,0%,,0%,,,4,,0%,1,25%,1,25%,1,25%,,,5,3,60%,3,60%,1,20%,,0%,,,5,1,20%,1,20%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
29253,วา,6,,0%,,0%,,0%,,0%,,,5,1,20%,,0%,,0%,1,20%,,,4,1,25%,,0%,,0%,1,25%,,,7,1,14%,,0%,1,14%,1,14%,,,,,0%,,0%,,0%,,0%,,,7,3,43%,,0%,,0%,2,29%,,,3,3,100%,,0%,,0%,1,33%,,,3,2,67%,,0%,,0%,2,67%,,,1,1,100%,,0%,,0%,,0%,,,4,0,0%,2,50%,1,25%,1,25%,,,7,1,14%,3,43%,1,14%,2,29%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
35350,สตาร์,3,2,67%,,0%,,0%,,0%,,,3,1,33%,,0%,,0%,,0%,,,4,2,50%,,0%,,0%,,0%,,,8,1,13%,,0%,,0%,1,13%,,,6,1,17%,,0%,,0%,3,50%,,,6,2,33%,,0%,,0%,1,17%,,,,,0%,,0%,,0%,,0%,,,3,,0%,,0%,1,33%,1,33%,,,2,,0%,,0%,,0%,,0%,,,3,,0%,,0%,1,33%,1,33%,,,7,3,43%,0,0%,1,14%,2,29%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
รวม,,12,3,25%,0,0%,0,0%,0,0%,0,,15,5,33%,1,7%,0,0%,4,27%,0,,15,4,27%,0,0%,0,0%,2,13%,0,,25,4,16%,1,4%,1,4%,4,16%,0,,16,2,13%,1,6%,2,13%,4,25%,0,,17,5,29%,1,6%,1,6%,4,24%,0,,8,3,38%,0,0%,1,13%,2,25%,0,,11,2,18%,0,0%,1,9%,3,27%,0,,11,3,27%,1,9%,2,18%,1,9%,0,,14,3,21%,5,36%,3,21%,2,14%,0,,24,6,25%,5,21%,2,8%,4,17%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0,,0,0,0%,0,0%,0,0%,0,0%,0
PIA,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,,ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,
24583,จิ๊บ,0,,0%,,0%,,0%,1,33%,,,1,,0%,,0%,,0%,,0%,,,2,,0%,,0%,,0%,2,67%,,,1,,0%,1,17%,1,17%,1,17%,,,2,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,6,,0%,,0%,,0%,1,20%,,,2,,0%,,0%,,0%,1,25%,,,3,,0%,1,50%,1,50%,1,50%,,,,,0%,0,0%,,0%,1,20%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
21865,เมย์,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,2,,0%,,0%,,0%,1,13%,,,1,,0%,2,50%,,0%,1,25%,,,1,,0%,2,40%,,0%,1,20%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,1,20%,,0%,,,,,0%,1,20%,,0%,1,20%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
29253,วา,1,,0%,,0%,,0%,,0%,,,1,1,100%,1,20%,1,20%,1,20%,,,,,0%,,0%,1,25%,,0%,,,1,,0%,2,29%,,0%,1,14%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,1,33%,,0%,,0%,,,1,,0%,,0%,,0%,4,133%,,,,,0%,,0%,,0%,1,100%,,,,,0%,1,25%,2,50%,1,25%,,,,,0%,2,29%,,0%,2,29%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
35350,สตาร์,3,,0%,,0%,,0%,,0%,,,1,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,1,25%,,,,,0%,,0%,,0%,1,13%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,1,17%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,1,33%,,,,,0%,,0%,1,50%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,1,14%,,0%,1,14%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,,,,,0%,,0%,,0%,,0%,
รวม,,4,0,0%,0,0%,0,0%,1,8%,,,3,1,33%,1,7%,1,7%,1,7%,,,2,0,0%,0,0%,1,7%,3,20%,,,2,0,0%,3,12%,1,4%,3,12%,,,4,0,0%,0,0%,0,0%,1,6%,,,1,0,0%,2,12%,0,0%,2,12%,,,1,0,0%,3,38%,0,0%,1,13%,,,7,0,0%,0,0%,0,0%,6,55%,,,2,0,0%,0,0%,1,9%,2,18%,,,3,0,0%,2,14%,4,29%,2,14%,,,0,0,0%,4,17%,0,0%,5,21%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%,,,0,0,0%,0,0%,0,0%,0,0%`;

// Helper to create empty daily record
export function createEmptyDayRecord(): { smp: DaySMPRecord; nb: DayNBRecord } {
  return {
    smp: {
      smpUnits: 0,
      utcCount: 0,
      ufundCount: 0,
      simCount: 0,
      filmCount: 0,
      customersCount: 0,
    },
    nb: {
      nbUnits: 0,
      tiCareCount: 0,
      socialCareCount: 0,
      utcGadgetCount: 0,
      sandiskCount: 0,
    },
  };
}

// Build initial populated records map for 31 days
export function buildInitialData(): StaffRecordsMap {
  const result: StaffRecordsMap = {
    '24583': {},
    '21865': {},
    '29253': {},
    '35350': {},
  };

  for (const staff of INITIAL_STAFF) {
    for (let d = 1; d <= 31; d++) {
      result[staff.id][d] = createEmptyDayRecord();
    }
  }

  // --- Populating 24583 จิ๊บ ---
  // Day 1
  result['24583'][1].smp = { smpUnits: 3, utcCount: 1, utcPercent: 33, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][1].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 33 };
  // Day 2
  result['24583'][2].smp = { smpUnits: 4, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 25, customersCount: 0 };
  result['24583'][2].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 3
  result['24583'][3].smp = { smpUnits: 3, utcCount: 1, utcPercent: 33, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][3].nb = { nbUnits: 2, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 2, sandiskPercent: 67 };
  // Day 4
  result['24583'][4].smp = { smpUnits: 6, utcCount: 1, utcPercent: 17, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][4].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 17, utcGadgetCount: 1, utcGadgetPercent: 17, sandiskCount: 1, sandiskPercent: 17 };
  // Day 5
  result['24583'][5].smp = { smpUnits: 2, utcCount: 1, utcPercent: 50, ufundCount: 0, simCount: 1, simPercent: 50, filmCount: 0, customersCount: 0 };
  result['24583'][5].nb = { nbUnits: 2, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 6 & 7: 0
  // Day 8
  result['24583'][8].smp = { smpUnits: 5, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][8].nb = { nbUnits: 6, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 20 };
  // Day 9
  result['24583'][9].smp = { smpUnits: 4, utcCount: 2, utcPercent: 50, ufundCount: 0, simCount: 1, simPercent: 25, filmCount: 0, customersCount: 0 };
  result['24583'][9].nb = { nbUnits: 2, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 25 };
  // Day 10
  result['24583'][10].smp = { smpUnits: 2, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][10].nb = { nbUnits: 3, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 50, utcGadgetCount: 1, utcGadgetPercent: 50, sandiskCount: 1, sandiskPercent: 50 };
  // Day 11
  result['24583'][11].smp = { smpUnits: 5, utcCount: 1, utcPercent: 20, ufundCount: 1, ufundPercent: 20, simCount: 0, filmCount: 0, customersCount: 0 };
  result['24583'][11].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 20 };

  // --- Populating 21865 เมย์ ---
  // Day 1: 0
  // Day 2
  result['21865'][2].smp = { smpUnits: 3, utcCount: 3, utcPercent: 100, ufundCount: 1, ufundPercent: 33, simCount: 0, filmCount: 2, filmPercent: 67, customersCount: 0 };
  // Day 3
  result['21865'][3].smp = { smpUnits: 4, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 25, customersCount: 0 };
  // Day 4
  result['21865'][4].smp = { smpUnits: 4, utcCount: 1, utcPercent: 25, ufundCount: 1, ufundPercent: 25, simCount: 0, filmCount: 2, filmPercent: 50, customersCount: 0 };
  // Day 5
  result['21865'][5].smp = { smpUnits: 8, utcCount: 0, ufundCount: 1, ufundPercent: 13, simCount: 1, simPercent: 13, filmCount: 1, filmPercent: 13, customersCount: 0 };
  result['21865'][5].nb = { nbUnits: 2, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 13 };
  // Day 6
  result['21865'][6].smp = { smpUnits: 4, utcCount: 0, ufundCount: 1, ufundPercent: 25, simCount: 1, simPercent: 25, filmCount: 1, filmPercent: 25, customersCount: 0 };
  result['21865'][6].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 2, socialCarePercent: 50, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 25 };
  // Day 7
  result['21865'][7].smp = { smpUnits: 5, utcCount: 0, ufundCount: 0, simCount: 1, simPercent: 20, filmCount: 1, filmPercent: 20, customersCount: 0 };
  result['21865'][7].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 2, socialCarePercent: 40, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 20 };
  // Day 8: 0
  // Day 9
  result['21865'][9].smp = { smpUnits: 4, utcCount: 0, ufundCount: 1, ufundPercent: 25, simCount: 1, simPercent: 25, filmCount: 1, filmPercent: 25, customersCount: 0 };
  // Day 10
  result['21865'][10].smp = { smpUnits: 5, utcCount: 3, utcPercent: 60, ufundCount: 3, ufundPercent: 60, simCount: 1, simPercent: 20, filmCount: 0, customersCount: 0 };
  result['21865'][10].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 1, utcGadgetPercent: 20, sandiskCount: 0 };
  // Day 11
  result['21865'][11].smp = { smpUnits: 5, utcCount: 1, utcPercent: 20, ufundCount: 1, ufundPercent: 20, simCount: 0, filmCount: 0, customersCount: 0 };
  result['21865'][11].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 20, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 20 };

  // --- Populating 29253 วา ---
  // Day 1
  result['29253'][1].smp = { smpUnits: 6, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['29253'][1].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 2
  result['29253'][2].smp = { smpUnits: 5, utcCount: 1, utcPercent: 20, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 20, customersCount: 0 };
  result['29253'][2].nb = { nbUnits: 1, tiCareCount: 1, tiCarePercent: 100, socialCareCount: 1, socialCarePercent: 20, utcGadgetCount: 1, utcGadgetPercent: 20, sandiskCount: 1, sandiskPercent: 20 };
  // Day 3
  result['29253'][3].smp = { smpUnits: 4, utcCount: 1, utcPercent: 25, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 25, customersCount: 0 };
  result['29253'][3].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 1, utcGadgetPercent: 25, sandiskCount: 0 };
  // Day 4
  result['29253'][4].smp = { smpUnits: 7, utcCount: 1, utcPercent: 14, ufundCount: 0, simCount: 1, simPercent: 14, filmCount: 1, filmPercent: 14, customersCount: 0 };
  result['29253'][4].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 2, socialCarePercent: 29, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 14 };
  // Day 5: 0
  // Day 6
  result['29253'][6].smp = { smpUnits: 7, utcCount: 3, utcPercent: 43, ufundCount: 0, simCount: 0, filmCount: 2, filmPercent: 29, customersCount: 0 };
  // Day 7
  result['29253'][7].smp = { smpUnits: 3, utcCount: 3, utcPercent: 100, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 33, customersCount: 0 };
  result['29253'][7].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 33, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 8
  result['29253'][8].smp = { smpUnits: 3, utcCount: 2, utcPercent: 67, ufundCount: 0, simCount: 0, filmCount: 2, filmPercent: 67, customersCount: 0 };
  result['29253'][8].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 4, sandiskPercent: 133 };
  // Day 9
  result['29253'][9].smp = { smpUnits: 1, utcCount: 1, utcPercent: 100, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['29253'][9].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 100 };
  // Day 10
  result['29253'][10].smp = { smpUnits: 4, utcCount: 0, ufundCount: 2, ufundPercent: 50, simCount: 1, simPercent: 25, filmCount: 1, filmPercent: 25, customersCount: 0 };
  result['29253'][10].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 25, utcGadgetCount: 2, utcGadgetPercent: 50, sandiskCount: 1, sandiskPercent: 25 };
  // Day 11
  result['29253'][11].smp = { smpUnits: 7, utcCount: 1, utcPercent: 14, ufundCount: 3, ufundPercent: 43, simCount: 1, simPercent: 14, filmCount: 2, filmPercent: 29, customersCount: 0 };
  result['29253'][11].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 2, socialCarePercent: 29, utcGadgetCount: 0, sandiskCount: 2, sandiskPercent: 29 };

  // --- Populating 35350 สตาร์ ---
  // Day 1
  result['35350'][1].smp = { smpUnits: 3, utcCount: 2, utcPercent: 67, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['35350'][1].nb = { nbUnits: 3, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 2
  result['35350'][2].smp = { smpUnits: 3, utcCount: 1, utcPercent: 33, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['35350'][2].nb = { nbUnits: 1, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 };
  // Day 3
  result['35350'][3].smp = { smpUnits: 4, utcCount: 2, utcPercent: 50, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['35350'][3].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 25 };
  // Day 4
  result['35350'][4].smp = { smpUnits: 8, utcCount: 1, utcPercent: 13, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 13, customersCount: 0 };
  result['35350'][4].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 13 };
  // Day 5
  result['35350'][5].smp = { smpUnits: 6, utcCount: 1, utcPercent: 17, ufundCount: 0, simCount: 0, filmCount: 3, filmPercent: 50, customersCount: 0 };
  // Day 6
  result['35350'][6].smp = { smpUnits: 6, utcCount: 2, utcPercent: 33, ufundCount: 0, simCount: 0, filmCount: 1, filmPercent: 17, customersCount: 0 };
  result['35350'][6].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 17 };
  // Day 7: 0
  // Day 8
  result['35350'][8].smp = { smpUnits: 3, utcCount: 0, ufundCount: 0, simCount: 1, simPercent: 33, filmCount: 1, filmPercent: 33, customersCount: 0 };
  result['35350'][8].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 33 };
  // Day 9
  result['35350'][9].smp = { smpUnits: 2, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 };
  result['35350'][9].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 1, utcGadgetPercent: 50, sandiskCount: 0 };
  // Day 10
  result['35350'][10].smp = { smpUnits: 3, utcCount: 0, ufundCount: 0, simCount: 1, simPercent: 33, filmCount: 1, filmPercent: 33, customersCount: 0 };
  // Day 11
  result['35350'][11].smp = { smpUnits: 7, utcCount: 3, utcPercent: 43, ufundCount: 0, simCount: 1, simPercent: 14, filmCount: 2, filmPercent: 29, customersCount: 0 };
  result['35350'][11].nb = { nbUnits: 0, tiCareCount: 0, socialCareCount: 1, socialCarePercent: 14, utcGadgetCount: 0, sandiskCount: 1, sandiskPercent: 14 };

  return result;
}
