import { BranchDataState } from '../types/mscTypes';

export const INITIAL_PIA_DATA: BranchDataState = {
  branchName: 'PIA (พระราม 9)',
  quarter: 'Q4/2569',
  asOfDate: '11 ต.ค. 2569 (Live Sync)',
  daysRemaining: 20,
  targetRevenue: 10230348,
  actualRevenue: 6500152,
  targets: {
    careIphone: 40, // UTC+ For SMP 40%
    careIpad: 30,   // TI Care 30%
    careMac: 30,    // Social Care+ 30%
    careWatch: 20,  // UTC+ For Gadget 20%
    sim: 30,        // SIM 30%
    ufund: 50,      // UFUND APPIN 50%
    film: 70,       // ฟิล์ม 70%
    sandisk: 50,    // SanDisk 50%
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
    { day: 12, iphone: 0, careIphone: 0, sim: 0, film: 0, nb: 0 },
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
  staffList: [
    {
      staffId: '24583',
      name: 'จิ๊บ',
      avatarLetter: 'จ',
      iphone: {
        actualRevenue: 1120000,
        targetRevenue: 2000000,
        actualUnits: 34,
        forecastRevenue: 1950000,
      },
      ipad: {
        actualRevenue: 85000,
        targetRevenue: 157587,
        actualUnits: 3,
        forecastRevenue: 130000,
      },
      mac: {
        actualRevenue: 320000,
        targetRevenue: 350000,
        actualUnits: 14,
        forecastRevenue: 340000,
      },
      appleWatch: {
        actualRevenue: 37400,
        targetRevenue: 50000,
        actualUnits: 2,
        forecastRevenue: 48000,
      },
      careIphone: { attached: 6, total: 34 },  // 17.6% (เป้า 40%)
      careIpad: { attached: 0, total: 3 },    // 0%
      careMac: { attached: 2, total: 17 },    // 11.8% (Social Care+)
      careWatch: { attached: 2, total: 17 },  // 11.8% (UTC+ Gadget)
      sim: { attached: 2, total: 34 },        // 5.9% (เป้า 30%)
      ufund: { attached: 1, total: 34 },      // 2.9% (เป้า 50%)
      film: { attached: 1, total: 34 },       // 2.9% (เป้า 70%)
      sandisk: { attached: 8, total: 17 },    // 47.1% (เป้า 50%)
    },
    {
      staffId: '21865',
      name: 'เมย์',
      avatarLetter: 'ม',
      iphone: {
        actualRevenue: 1476250,
        targetRevenue: 2157587,
        actualUnits: 42,
        forecastRevenue: 2200000,
      },
      ipad: {
        actualRevenue: 45000,
        targetRevenue: 120000,
        actualUnits: 2,
        forecastRevenue: 100000,
      },
      mac: {
        actualRevenue: 59000,
        targetRevenue: 200000,
        actualUnits: 2,
        forecastRevenue: 140000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 80000,
        actualUnits: 0,
        forecastRevenue: 0,
      },
      careIphone: { attached: 8, total: 42 },  // 19.0% (เป้า 40%)
      careIpad: { attached: 0, total: 2 },
      careMac: { attached: 5, total: 4 },     // 125% (Social Care+)
      careWatch: { attached: 1, total: 4 },   // 25% (UTC+ Gadget)
      sim: { attached: 5, total: 42 },        // 11.9% (เป้า 30%)
      ufund: { attached: 9, total: 42 },      // 21.4% (เป้า 50%)
      film: { attached: 9, total: 42 },       // 21.4% (เป้า 70%)
      sandisk: { attached: 4, total: 4 },     // 100% (เป้า 50%)
    },
    {
      staffId: '29253',
      name: 'วา',
      avatarLetter: 'ว',
      iphone: {
        actualRevenue: 1608500,
        targetRevenue: 2157587,
        actualUnits: 47,
        forecastRevenue: 2350000,
      },
      ipad: {
        actualRevenue: 35000,
        targetRevenue: 120000,
        actualUnits: 1,
        forecastRevenue: 90000,
      },
      mac: {
        actualRevenue: 69000,
        targetRevenue: 200000,
        actualUnits: 3,
        forecastRevenue: 150000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 80000,
        actualUnits: 0,
        forecastRevenue: 0,
      },
      careIphone: { attached: 13, total: 47 }, // 27.7% (เป้า 40%)
      careIpad: { attached: 1, total: 4 },    // 25% (TI Care)
      careMac: { attached: 7, total: 4 },     // 175% (Social Care+)
      careWatch: { attached: 4, total: 4 },   // 100% (UTC+ Gadget)
      sim: { attached: 3, total: 47 },        // 6.4% (เป้า 30%)
      ufund: { attached: 5, total: 47 },      // 10.6% (เป้า 50%)
      film: { attached: 11, total: 47 },      // 23.4% (เป้า 70%)
      sandisk: { attached: 10, total: 4 },    // 250% (เป้า 50%)
    },
    {
      staffId: '35350',
      name: 'สตาร์',
      avatarLetter: 'ส',
      iphone: {
        actualRevenue: 1541002,
        targetRevenue: 2157587,
        actualUnits: 45,
        forecastRevenue: 2280000,
      },
      ipad: {
        actualRevenue: 26000,
        targetRevenue: 120000,
        actualUnits: 1,
        forecastRevenue: 80000,
      },
      mac: {
        actualRevenue: 78000,
        targetRevenue: 200000,
        actualUnits: 3,
        forecastRevenue: 150000,
      },
      appleWatch: {
        actualRevenue: 0,
        targetRevenue: 80000,
        actualUnits: 0,
        forecastRevenue: 0,
      },
      careIphone: { attached: 12, total: 45 }, // 26.7% (เป้า 40%)
      careIpad: { attached: 0, total: 4 },    // 0% (TI Care)
      careMac: { attached: 1, total: 4 },     // 25% (Social Care+)
      careWatch: { attached: 1, total: 4 },   // 25% (UTC+ Gadget)
      sim: { attached: 3, total: 45 },        // 6.7% (เป้า 30%)
      ufund: { attached: 0, total: 45 },      // 0% (เป้า 50%)
      film: { attached: 9, total: 45 },       // 20.0% (เป้า 70%)
      sandisk: { attached: 5, total: 4 },     // 125% (เป้า 50%)
    },
  ],
};

// Backwards compatibility alias
export const INITIAL_MSC_DATA = INITIAL_PIA_DATA;
