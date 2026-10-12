export interface StaffInfo {
  id: string;
  name: string;
  avatarColor?: string;
}

export interface DaySMPRecord {
  smpUnits: number;
  utcCount: number;
  utcPercent?: number;
  ufundCount: number;
  ufundPercent?: number;
  simCount: number;
  simPercent?: number;
  filmCount: number;
  filmPercent?: number;
  customersCount: number;
}

export interface DayNBRecord {
  nbUnits: number;
  tiCareCount: number;
  tiCarePercent?: number;
  socialCareCount: number;
  socialCarePercent?: number;
  utcGadgetCount: number;
  utcGadgetPercent?: number;
  sandiskCount: number;
  sandiskPercent?: number;
}

export interface StaffDailyRecord {
  smp: DaySMPRecord;
  nb: DayNBRecord;
}

export type StaffRecordsMap = Record<string, Record<number, StaffDailyRecord>>;

export interface KPITargets {
  utcSmp: number; // 40%
  ufund: number;  // 50%
  sim: number;    // 30%
  film: number;   // 70%
  tiCare: number; // 30%
  socialCare: number; // 30%
  utcGadget: number;  // 20%
  sandisk: number;    // 50%
}

export interface StaffSummary {
  staffId: string;
  name: string;
  totalSmp: number;
  totalNb: number;
  totalDevices: number;
  totalCustomers: number;
  
  // SMP Attachments
  totalUtcSmp: number;
  utcSmpRate: number;
  totalUfund: number;
  ufundRate: number;
  totalSim: number;
  simRate: number;
  totalFilm: number;
  filmRate: number;

  // NB Attachments
  totalTiCare: number;
  tiCareRate: number;
  totalSocialCare: number;
  socialCareRate: number;
  totalUtcGadget: number;
  utcGadgetRate: number;
  totalSandisk: number;
  sandiskRate: number;

  // Conversion
  conversionRate: number; // SMP / customers if customers > 0
}

export interface DailySummary {
  day: number;
  smpUnits: number;
  nbUnits: number;
  totalDevices: number;
  customersCount: number;
  
  utcSmpCount: number;
  utcSmpRate: number;
  ufundCount: number;
  ufundRate: number;
  simCount: number;
  simRate: number;
  filmCount: number;
  filmRate: number;

  tiCareCount: number;
  tiCareRate: number;
  socialCareCount: number;
  socialCareRate: number;
  utcGadgetCount: number;
  utcGadgetRate: number;
  sandiskCount: number;
  sandiskRate: number;
  
  hasData: boolean;
}

export interface BranchRevenueKPI {
  quarter: string;
  branchName: string;
  actualRevenue: number;
  targetRevenue: number;
  deficitRevenue: number;
  achievementPercent: number;
  statusNote: string;
  daysRemainingInPeriod?: number;
}
