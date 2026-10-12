export interface StaffInfo {
  id: string;
  name: string;
  avatarLetter: string;
}

export interface ProductBreakdown {
  actualRevenue: number;
  targetRevenue: number;
  actualUnits: number;
  forecastRevenue: number;
}

export interface StaffPerformanceData {
  staffId: string;
  name: string;
  avatarLetter: string;
  // Product Breakdown
  iphone: ProductBreakdown;      // SMP / Smartphone
  ipad: ProductBreakdown;        // Tablet / iPad
  mac: ProductBreakdown;         // Notebook / Mac
  appleWatch: ProductBreakdown;  // Gadget & Accessories
  // Attachments
  careIphone: { attached: number; total: number }; // UTC+ for SMP
  careIpad: { attached: number; total: number };   // TI Care
  careMac: { attached: number; total: number };    // Social Care+
  careWatch: { attached: number; total: number };  // UTC+ Gadget
  sim: { attached: number; total: number };        // SIM Card
  ufund: { attached: number; total: number };      // UFUND APPIN
  film: { attached: number; total: number };       // Protection Film
  sandisk: { attached: number; total: number };    // SanDisk
}

export interface DayMetricTrend {
  day: number;
  iphone: number;      // SMP
  careIphone: number;  // UTC+
  sim: number;         // SIM
  film: number;        // Film
  nb?: number;         // Notebook
}

export interface BranchDataState {
  branchName: string;
  quarter: string;
  asOfDate: string;
  daysRemaining: number;
  targetRevenue?: number;
  actualRevenue?: number;
  staffList: StaffPerformanceData[];
  dailyTrends: DayMetricTrend[];
  targets: {
    careIphone: number; // 40% (UTC+ for SMP)
    careIpad: number;   // 30% (TI Care)
    careMac: number;    // 30% (Social Care+)
    careWatch: number;  // 20% (UTC+ Gadget)
    sim: number;        // 30% (SIM)
    ufund: number;      // 50% (UFUND)
    film: number;       // 70% (Film)
    sandisk: number;    // 50% (SanDisk)
  };
}
