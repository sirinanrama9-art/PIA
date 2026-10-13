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
  // Product Breakdown (Smartphone, Notebook, DIY, Desktop)
  iphone: ProductBreakdown;      // 📱 Smartphone
  ipad: ProductBreakdown;        // 💻 DIY
  mac: ProductBreakdown;         // 💻 Notebook (NB)
  appleWatch: ProductBreakdown;  // 🖥️ Desktop
  // Optional aliases for clean semantic naming
  smartphone?: ProductBreakdown;
  diy?: ProductBreakdown;
  notebook?: ProductBreakdown;
  desktop?: ProductBreakdown;
  // Attachments
  careIphone: { attached: number; total: number }; // 🛡️ Ultra Care+ SMP (≥40%)
  careIpad: { attached: number; total: number };   // 💻 TI Care+ (≥30%)
  careMac: { attached: number; total: number };    // 🛡️ Social Care+ (≥30%)
  careWatch: { attached: number; total: number };  // ⌚ UTC+ For Gadget (≥20%)
  sim: { attached: number; total: number };        // 📶 เปิดเบอร์ SIM True (≥30%)
  ufund: { attached: number; total: number };      // 💳 UFUND APPIN (≥50%)
  film: { attached: number; total: number };       // ✨ ฟิล์มกันรอย SMP (≥70%)
  sandisk: { attached: number; total: number };    // 💾 SanDisk (≥50%)
}

export interface DayMetricTrend {
  day: number;
  iphone: number;      // SMP
  careIphone: number;  // UTC+
  sim: number;         // SIM
  film: number;        // Film
  nb?: number;         // Notebook
}

export interface CategorySummaryItem {
  id: string;
  name: string;
  icon: string;
  actualRevenue: number;
  targetRevenue: number;
  achievePercent: number;
  statusNote: string;
  badge: string;
  color: string;
  themeBorder?: string;
  themeBg?: string;
  iconBg?: string;
}

export interface BranchScorecard {
  averageDailySales: number;       // 541,679 ฿
  monthEndForecast: number;        // 16,792,060 ฿
  trendVsTargetPercent: number;    // 164.1%
  totalSmpUnits: number;           // 170 เครื่อง (SMP)
  totalServices: number;           // 152 รายการ
  asOfDate: string;                // 12/10/2026
}

export interface BranchDataState {
  branchName: string;
  quarter: string;
  asOfDate: string;
  daysRemaining: number;
  targetRevenue: number;
  actualRevenue: number;
  deficitRevenue?: number;
  achievementPercent?: number;
  statusNote?: string;
  categoryPerformance?: CategorySummaryItem[];
  scorecard?: BranchScorecard;
  strategicPlan?: string[];
  staffList: StaffPerformanceData[];
  dailyTrends: DayMetricTrend[];
  targets: {
    careIphone: number; // 40% (Ultra Care+ SMP)
    careIpad: number;   // 30% (TI Care+)
    careMac: number;    // 30% (Social Care+)
    careWatch: number;  // 20% (UTC+ For Gadget)
    sim: number;        // 30% (SIM True)
    ufund: number;      // 50% (UFUND APPIN)
    film: number;       // 70% (ฟิล์มกันรอย SMP)
    sandisk: number;    // 50% (SanDisk)
  };
}
