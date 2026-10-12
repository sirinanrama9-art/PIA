import { BranchDataState } from '../types/mscTypes';

export const INITIAL_PIA_DATA: BranchDataState = {
  branchName: 'PIA (Branch Total)',
  quarter: 'Q4/2569',
  asOfDate: '12/10/2026',
  daysRemaining: 19,
  targetRevenue: 10230348,
  actualRevenue: 6500152,
  deficitRevenue: 3730196,
  achievementPercent: 63.5,
  statusNote: 'ต่ำกว่าเป้าหมายรวม',

  // 4 Key Product Categories
  categoryPerformance: [
    {
      id: 'smartphone',
      name: 'Smartphone',
      icon: '📱',
      actualRevenue: 5559793,
      targetRevenue: 8111260,
      achievePercent: 68.5,
      statusNote: 'กำลังไปได้ดี',
      badge: '🤘 กำลังไปได้ดี',
      color: 'bg-sky-500',
    },
    {
      id: 'notebook',
      name: 'Notebook',
      icon: '💻',
      actualRevenue: 731079,
      targetRevenue: 1864036,
      achievePercent: 39.2,
      statusNote: 'ต้องเร่งยอด',
      badge: '⚠️ ต้องเร่งยอด',
      color: 'bg-indigo-500',
    },
    {
      id: 'diy',
      name: 'DIY',
      icon: '💻',
      actualRevenue: 159300,
      targetRevenue: 59492,
      achievePercent: 267.8,
      statusNote: 'บรรลุเป้า',
      badge: '✅ บรรลุเป้า',
      color: 'bg-emerald-500',
    },
    {
      id: 'desktop',
      name: 'Desktop',
      icon: '🖥️',
      actualRevenue: 49980,
      targetRevenue: 195560,
      achievePercent: 25.6,
      statusNote: 'ต้องเร่งยอด',
      badge: '⚠️ ต้องเร่งยอด',
      color: 'bg-amber-500',
    },
  ],

  // Summary Scorecard
  scorecard: {
    averageDailySales: 541679,
    monthEndForecast: 16792060,
    trendVsTargetPercent: 164.1,
    totalSmpUnits: 170,
    totalServices: 152,
    asOfDate: '12/10/2026',
  },

  // Strategic Action Plan
  strategicPlan: [
    'สมาร์ตโฟน: เร่งปิดยอดอีก 2.55 ลบ. ผลักดันยอดรวมสาขาให้แตะเป้าหมาย 10.23 ลบ.',
    'โน้ตบุ๊ก: จัดโปรคู่บริการเสริม TI Care+ ดันอัตราพ่วง Attach Rate สู่เกณฑ์ ≥30%',
    'บริการเสริม: กระตุ้นการเสนอขาย UFUND (ปัจจุบัน 8.8%) และเปิดเบอร์ SIM (7.6%)',
    'พัฒนาบุคคล: สนับสนุน สตาร์ และ เมย์ พร้อมถอดบทเรียนการขายจาก จิ๊บ และ วา',
  ],

  // KPI Target Minimums
  targets: {
    careIphone: 40, // 🛡️ Ultra Care+ SMP ≥ 40%
    careIpad: 30,   // 💻 TI Care+ ≥ 30%
    careMac: 30,    // 🛡️ Social Care+ ≥ 30%
    careWatch: 20,  // ⌚ UTC+ For Gadget ≥ 20%
    sim: 30,        // 📶 เปิดเบอร์ SIM True ≥ 30%
    ufund: 50,      // 💳 UFUND APPIN ≥ 50%
    film: 70,       // ✨ ฟิล์มกันรอย SMP ≥ 70%
    sandisk: 50,    // 💾 SanDisk ≥ 50%
  },

  dailyTrends: [
    { day: 1, iphone: 12, careIphone: 3, sim: 0, film: 0, nb: 4 },
    { day: 2, iphone: 15, careIphone: 5, sim: 0, film: 4, nb: 3 },
    { day: 3, iphone: 15, careIphone: 4, sim: 0, film: 2, nb: 2 },
    { day: 4, iphone: 25, careIphone: 4, sim: 1, film: 4, nb: 2 },
    { day: 5, iphone: 16, careIphone: 2, sim: 2, film: 4, nb: 4 },
    { day: 6, iphone: 17, careIphone: 5, sim: 1, film: 4, nb: 1 },
    { day: 7, iphone: 8, careIphone: 3, sim: 1, film: 2, nb: 1 },
    { day: 8, iphone: 11, careIphone: 2, sim: 1, film: 3, nb: 7 },
    { day: 9, iphone: 11, careIphone: 3, sim: 2, film: 1, nb: 2 },
    { day: 10, iphone: 14, careIphone: 3, sim: 3, film: 2, nb: 3 },
    { day: 11, iphone: 24, careIphone: 6, sim: 2, film: 4, nb: 0 },
    { day: 12, iphone: 2, careIphone: 0, sim: 0, film: 0, nb: 1 },
    { day: 13, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 14, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 15, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 16, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 17, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 18, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 19, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 20, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 21, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 22, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 23, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 24, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 25, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 26, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 27, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 28, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 29, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 30, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
    { day: 31, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
  ],

  // 4 Staff Members with Exact Performance Figures
  staffList: [
    {
      staffId: '24583',
      name: 'จิ๊บ',
      avatarLetter: 'จ',
      // Product Breakdown (Smartphone, Notebook, DIY, Desktop)
      // Total Actual: 1,015,039 ฿ | Target: 2,557,587 ฿ | 39.7% (ขาด 1,542,548)
      iphone: {
        actualRevenue: 700000,
        targetRevenue: 2027815,
        actualUnits: 36, // Smartphone 36 เครื่อง
        forecastRevenue: 1550000,
      },
      mac: {
        actualRevenue: 269539,
        targetRevenue: 466009,
        actualUnits: 18, // NB (Notebook) 18 เครื่อง
        forecastRevenue: 450000,
      },
      ipad: {
        actualRevenue: 45500,
        targetRevenue: 14873,
        actualUnits: 2, // DIY 2 เครื่อง
        forecastRevenue: 50000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 48890,
        actualUnits: 0, // Desktop 0 เครื่อง
        forecastRevenue: 0,
      },
      // Attach Rates on Smartphone base (36 units) & NB (18 units)
      careIphone: { attached: 7, total: 36 },  // 19.4% (Ultra Care+ SMP ≥ 40%) ❌
      careMac: { attached: 3, total: 36 },     // 8.3% (Social Care+ ≥ 30%) ❌
      careIpad: { attached: 0, total: 18 },    // 0.0% (TI Care+ ≥ 30%) ❌
      careWatch: { attached: 2, total: 36 },   // 5.6% (UTC+ Gadget ≥ 20%) ❌
      sim: { attached: 2, total: 36 },         // 5.6% (เปิดเบอร์ SIM ≥ 30%) ❌
      ufund: { attached: 1, total: 36 },       // 2.8% (UFUND APPIN ≥ 50%) ❌
      sandisk: { attached: 10, total: 36 },    // 27.8% (SanDisk ≥ 50%) ❌
      film: { attached: 1, total: 36 },        // 2.8% (ฟิล์ม SMP ≥ 70%) ❌
    },
    {
      staffId: '29253',
      name: 'วา',
      avatarLetter: 'ว',
      // Total Actual: 769,458 ฿ | Target: 2,557,587 ฿ | 30.1% (ขาด 1,788,129)
      iphone: {
        actualRevenue: 660000,
        targetRevenue: 2027815,
        actualUnits: 47, // Smartphone 47 เครื่อง
        forecastRevenue: 1400000,
      },
      mac: {
        actualRevenue: 65458,
        targetRevenue: 466009,
        actualUnits: 4, // NB (Notebook) 4 เครื่อง
        forecastRevenue: 180000,
      },
      ipad: {
        actualRevenue: 44000,
        targetRevenue: 14873,
        actualUnits: 2, // DIY 2 เครื่อง
        forecastRevenue: 50000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 48890,
        actualUnits: 0, // Desktop 0 เครื่อง
        forecastRevenue: 0,
      },
      // Attach Rates on Smartphone base (47 units) & NB (4 units)
      careIphone: { attached: 13, total: 47 }, // 27.7% (Ultra Care+ SMP ≥ 40%) ❌
      careMac: { attached: 7, total: 47 },     // 14.9% (Social Care+ ≥ 30%) ❌
      careIpad: { attached: 1, total: 4 },     // 25.0% (TI Care+ ≥ 30%) 🤘 ไปอีก
      careWatch: { attached: 4, total: 47 },   // 8.5% (UTC+ Gadget ≥ 20%) ❌
      sim: { attached: 3, total: 47 },         // 6.4% (เปิดเบอร์ SIM ≥ 30%) ❌
      ufund: { attached: 5, total: 47 },       // 10.6% (UFUND APPIN ≥ 50%) ❌
      sandisk: { attached: 10, total: 47 },    // 21.3% (SanDisk ≥ 50%) ❌
      film: { attached: 11, total: 47 },       // 23.4% (ฟิล์ม SMP ≥ 70%) ❌
    },
    {
      staffId: '21865',
      name: 'เมย์',
      avatarLetter: 'ม',
      // Total Actual: 706,284 ฿ | Target: 2,557,587 ฿ | 27.6% (ขาด 1,851,303)
      iphone: {
        actualRevenue: 600000,
        targetRevenue: 2027815,
        actualUnits: 42, // Smartphone 42 เครื่อง
        forecastRevenue: 1350000,
      },
      mac: {
        actualRevenue: 62284,
        targetRevenue: 466009,
        actualUnits: 4, // NB (Notebook) 4 เครื่อง
        forecastRevenue: 180000,
      },
      ipad: {
        actualRevenue: 44000,
        targetRevenue: 14873,
        actualUnits: 2, // DIY 2 เครื่อง
        forecastRevenue: 50000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 48890,
        actualUnits: 0, // Desktop 0 เครื่อง
        forecastRevenue: 0,
      },
      // Attach Rates on Smartphone base (42 units) & NB (4 units)
      careIphone: { attached: 8, total: 42 },  // 19.0% (Ultra Care+ SMP ≥ 40%) ❌
      careMac: { attached: 5, total: 42 },     // 11.9% (Social Care+ ≥ 30%) ❌
      careIpad: { attached: 0, total: 4 },     // 0.0% (TI Care+ ≥ 30%) ❌
      careWatch: { attached: 1, total: 42 },   // 2.4% (UTC+ Gadget ≥ 20%) ❌
      sim: { attached: 5, total: 42 },         // 11.9% (เปิดเบอร์ SIM ≥ 30%) ❌
      ufund: { attached: 9, total: 42 },       // 21.4% (UFUND APPIN ≥ 50%) ❌
      sandisk: { attached: 4, total: 42 },     // 9.5% (SanDisk ≥ 50%) ❌
      film: { attached: 9, total: 42 },        // 21.4% (ฟิล์ม SMP ≥ 70%) ❌
    },
    {
      staffId: '35350',
      name: 'สตาร์',
      avatarLetter: 'ส',
      // Total Actual: 635,550 ฿ | Target: 2,557,587 ฿ | 24.8% (ขาด 1,922,037)
      iphone: {
        actualRevenue: 520000,
        targetRevenue: 2027815,
        actualUnits: 45, // Smartphone 45 เครื่อง
        forecastRevenue: 1250000,
      },
      mac: {
        actualRevenue: 50000,
        targetRevenue: 466009,
        actualUnits: 4, // NB (Notebook) 4 เครื่อง
        forecastRevenue: 150000,
      },
      ipad: {
        actualRevenue: 25800,
        targetRevenue: 14873,
        actualUnits: 1, // DIY 1 เครื่อง
        forecastRevenue: 30000,
      },
      appleWatch: {
        actualRevenue: 39750,
        targetRevenue: 48890,
        actualUnits: 1, // Desktop 1 เครื่อง
        forecastRevenue: 48000,
      },
      // Attach Rates on Smartphone base (45 units) & NB (4 units)
      careIphone: { attached: 12, total: 45 }, // 26.7% (Ultra Care+ SMP ≥ 40%) ❌
      careMac: { attached: 1, total: 45 },     // 2.2% (Social Care+ ≥ 30%) ❌
      careIpad: { attached: 0, total: 4 },     // 0.0% (TI Care+ ≥ 30%) ❌
      careWatch: { attached: 1, total: 45 },   // 2.2% (UTC+ Gadget ≥ 20%) ❌
      sim: { attached: 3, total: 45 },         // 6.7% (เปิดเบอร์ SIM ≥ 30%) ❌
      ufund: { attached: 0, total: 45 },       // 0.0% (UFUND APPIN ≥ 50%) ❌
      sandisk: { attached: 5, total: 45 },     // 11.1% (SanDisk ≥ 50%) ❌
      film: { attached: 9, total: 45 },        // 20.0% (ฟิล์ม SMP ≥ 70%) ❌
    },
  ],
};

// Backwards compatibility alias
export const INITIAL_MSC_DATA = INITIAL_PIA_DATA;
