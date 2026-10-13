import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Cpu, 
  Monitor, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Lightbulb, 
  Calendar, 
  Flame, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
  Wifi,
  CreditCard,
  HardDrive,
  Watch
} from 'lucide-react';
import { BranchDataState } from '../types/mscTypes';

interface MscOverviewTabProps {
  data: BranchDataState;
  onOpenSimulator: () => void;
}

export const MscOverviewTab: React.FC<MscOverviewTabProps> = ({ data, onOpenSimulator }) => {
  const [attachFilter, setAttachFilter] = useState<'all' | 'pass' | 'near' | 'fail'>('all');

  const totalActual = data.actualRevenue || 6500152;
  const totalTarget = data.targetRevenue || 10230348;
  const deficit = data.deficitRevenue ?? Math.max(0, totalTarget - totalActual);
  const achievePct = data.achievementPercent ?? ((totalActual / totalTarget) * 100);

  // Category sales data
  const categories = data.categoryPerformance || [
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
      themeBorder: 'border-sky-200 hover:border-sky-400',
      themeBg: 'bg-gradient-to-b from-sky-50/60 via-white to-slate-50/40',
      iconBg: 'bg-sky-100 text-sky-700 border-sky-200',
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
      themeBorder: 'border-indigo-200 hover:border-indigo-400',
      themeBg: 'bg-gradient-to-b from-indigo-50/60 via-white to-slate-50/40',
      iconBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
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
      themeBorder: 'border-emerald-300 hover:border-emerald-500 ring-1 ring-emerald-200/70',
      themeBg: 'bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/40',
      iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-300',
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
      themeBorder: 'border-amber-200 hover:border-amber-400',
      themeBg: 'bg-gradient-to-b from-amber-50/60 via-white to-slate-50/40',
      iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
    },
  ];

  const getCategoryTheme = (id: string) => {
    switch (id) {
      case 'smartphone':
        return {
          themeBorder: 'border-sky-200 hover:border-sky-400',
          themeBg: 'bg-gradient-to-b from-sky-50/60 via-white to-slate-50/40',
          iconBg: 'bg-sky-100 text-sky-700 border-sky-200',
        };
      case 'notebook':
        return {
          themeBorder: 'border-indigo-200 hover:border-indigo-400',
          themeBg: 'bg-gradient-to-b from-indigo-50/60 via-white to-slate-50/40',
          iconBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        };
      case 'diy':
        return {
          themeBorder: 'border-emerald-300 hover:border-emerald-500 ring-1 ring-emerald-200/70',
          themeBg: 'bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/40',
          iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        };
      default:
        return {
          themeBorder: 'border-amber-200 hover:border-amber-400',
          themeBg: 'bg-gradient-to-b from-amber-50/60 via-white to-slate-50/40',
          iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
        };
    }
  };

  // Attachments KPI Cards
  const totalSmpUnits = 170; // 170 SMP Units branch total
  const totalNbUnits = 30;   // 30 NB Units branch total

  // Key Attach items (8 items) with beautiful icon styles & colors
  const attachItems = [
    {
      id: 'careIphone',
      name: 'Ultra Care+ SMP',
      icon: '🛡️',
      target: 40,
      attached: 40,
      base: totalSmpUnits,
      rate: 23.5,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน (ขาด 16.5%)',
      unitLabel: 'เครื่อง',
      isCore: true,
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-xs shadow-indigo-500/20',
      accentColor: 'indigo',
    },
    {
      id: 'sim',
      name: 'เปิดเบอร์ SIM True',
      icon: '📶',
      target: 30,
      attached: 13,
      base: totalSmpUnits,
      rate: 7.6,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน (ขาด 22.4%)',
      unitLabel: 'เบอร์',
      isCore: true,
      iconBg: 'bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-xs shadow-sky-500/20',
      accentColor: 'sky',
    },
    {
      id: 'ufund',
      name: 'UFUND APPIN',
      icon: '💳',
      target: 50,
      attached: 15,
      base: totalSmpUnits,
      rate: 8.8,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน (ขาด 41.2%)',
      unitLabel: 'สัญญา',
      isCore: true,
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-xs shadow-purple-500/20',
      accentColor: 'violet',
    },
    {
      id: 'film',
      name: 'ฟิล์มกันรอย SMP',
      icon: '✨',
      target: 70,
      attached: 30,
      base: totalSmpUnits,
      rate: 17.6,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน (ขาด 52.4%)',
      unitLabel: 'ชิ้น',
      isCore: true,
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xs shadow-amber-500/20',
      accentColor: 'amber',
    },
    {
      id: 'careMac',
      name: 'Social Care+',
      icon: '🛡️',
      target: 30,
      attached: 16,
      base: totalSmpUnits,
      rate: 9.4,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน',
      unitLabel: 'รายการ',
      isCore: false,
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs shadow-rose-500/20',
      accentColor: 'rose',
    },
    {
      id: 'careIpad',
      name: 'TI Care+ (NB)',
      icon: '💻',
      target: 30,
      attached: 1,
      base: totalNbUnits,
      rate: 3.3,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน',
      unitLabel: 'รายการ',
      isCore: false,
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xs shadow-blue-500/20',
      accentColor: 'blue',
    },
    {
      id: 'careWatch',
      name: 'UTC+ For Gadget',
      icon: '⌚',
      target: 20,
      attached: 8,
      base: totalSmpUnits,
      rate: 4.7,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน',
      unitLabel: 'รายการ',
      isCore: false,
      iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs shadow-teal-500/20',
      accentColor: 'teal',
    },
    {
      id: 'sandisk',
      name: 'SanDisk',
      icon: '💾',
      target: 50,
      attached: 29,
      base: totalSmpUnits,
      rate: 17.1,
      status: 'fail' as const,
      statusLabel: '❌ ไม่ผ่าน',
      unitLabel: 'ชิ้น',
      isCore: false,
      iconBg: 'bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-xs shadow-slate-600/20',
      accentColor: 'slate',
    },
  ];

  const filteredAttachItems = attachItems.filter((item) => {
    if (attachFilter === 'all') return true;
    if (attachFilter === 'pass') return item.rate >= item.target;
    if (attachFilter === 'near') return item.rate < item.target && item.rate >= item.target * 0.7;
    return item.rate < item.target * 0.7;
  });

  // Sales Leaderboard Q4 figures
  const leaderboardStaff = [
    {
      rank: 1,
      medal: '🥇',
      medalBg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white ring-2 ring-amber-300 shadow-md shadow-amber-500/25',
      name: 'จิ๊บ',
      code: '24583',
      actual: 1015039,
      target: 2557587,
      achievePct: 39.7,
      deficit: 1542548,
      highlight: 'ยอดขายสูงสุดประจำสาขา 🌟',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      cardClass: 'bg-gradient-to-b from-amber-50/90 via-yellow-50/30 to-white border-2 border-amber-300 hover:border-amber-400 shadow-xs shadow-amber-500/10',
    },
    {
      rank: 2,
      medal: '🥈',
      medalBg: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 text-white ring-2 ring-slate-200 shadow-md shadow-slate-400/20',
      name: 'วา',
      code: '29253',
      actual: 769458,
      target: 2557587,
      achievePct: 30.1,
      deficit: 1788129,
      highlight: 'ผ่านเกณฑ์ TI Care+ (25.0%)',
      badgeColor: 'text-blue-800 bg-blue-50 border-blue-200',
      cardClass: 'bg-gradient-to-b from-slate-50/90 via-blue-50/30 to-white border border-slate-300 hover:border-blue-400 shadow-xs shadow-blue-500/10',
    },
    {
      rank: 3,
      medal: '🥉',
      medalBg: 'bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700 text-white ring-2 ring-orange-300 shadow-md shadow-orange-600/20',
      name: 'เมย์',
      code: '21865',
      actual: 706284,
      target: 2557587,
      achievePct: 27.6,
      deficit: 1851303,
      highlight: 'UFUND สูงสุดในทีม (21.4%)',
      badgeColor: 'text-purple-800 bg-purple-50 border-purple-200',
      cardClass: 'bg-gradient-to-b from-purple-50/80 via-indigo-50/30 to-white border border-purple-300 hover:border-purple-400 shadow-xs shadow-purple-500/10',
    },
    {
      rank: 4,
      medal: '🏅',
      medalBg: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 text-white ring-2 ring-indigo-200 shadow-md shadow-indigo-600/20',
      name: 'สตาร์',
      code: '35350',
      actual: 635550,
      target: 2557587,
      achievePct: 24.8,
      deficit: 1922037,
      highlight: 'ต้องเร่งผลักดันและเสริมกลยุทธ์ ⚡',
      badgeColor: 'text-rose-800 bg-rose-50 border-rose-200',
      cardClass: 'bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-white border border-rose-300 hover:border-rose-400 shadow-xs shadow-rose-500/10',
    },
  ];

  const getAttachCardClass = (accentColor?: string, isCore?: boolean) => {
    const base = isCore ? 'ring-2 ring-indigo-400/30' : '';
    switch (accentColor) {
      case 'indigo':
        return `bg-gradient-to-b from-indigo-50/80 via-white to-indigo-50/25 border border-indigo-200 hover:border-indigo-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'sky':
        return `bg-gradient-to-b from-sky-50/80 via-white to-sky-50/25 border border-sky-200 hover:border-sky-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'violet':
        return `bg-gradient-to-b from-purple-50/80 via-white to-purple-50/25 border border-purple-200 hover:border-purple-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'amber':
        return `bg-gradient-to-b from-amber-50/80 via-white to-amber-50/25 border border-amber-200 hover:border-amber-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'rose':
        return `bg-gradient-to-b from-rose-50/80 via-white to-rose-50/25 border border-rose-200 hover:border-rose-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'blue':
        return `bg-gradient-to-b from-blue-50/80 via-white to-blue-50/25 border border-blue-200 hover:border-blue-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'teal':
        return `bg-gradient-to-b from-teal-50/80 via-white to-teal-50/25 border border-teal-200 hover:border-teal-400 shadow-2xs hover:shadow-xs ${base}`;
      case 'slate':
        return `bg-gradient-to-b from-slate-100/80 via-white to-slate-50/25 border border-slate-300 hover:border-slate-400 shadow-2xs hover:shadow-xs ${base}`;
      default:
        return `bg-gradient-to-b from-slate-50/80 via-white to-slate-50/25 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs ${base}`;
    }
  };

  const totalTeamActual = 3126331;
  const totalTeamTarget = 10230348;
  const avgTeamActual = 781583;

  return (
    <div className="space-y-4">
      {/* 1. Branch Total Revenue Card (Dashboard & KPI Scorecards) - Compact Size & Rich Styling */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-indigo-900/50 relative overflow-hidden space-y-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shadow-xs shadow-indigo-400/50" />
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-1.5">
                <span>📊</span>
                <span>Dashboard & KPI Scorecards (ภาพรวมสาขา PIA - Q4/2569)</span>
              </h2>
            </div>
            <p className="text-[11px] text-indigo-200/80 mt-0.5">
              🏢 PIA (Branch Total) • ความคืบหน้าสะสม 63.5% จากเป้าหมาย 10.23 ล้านบาท
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] font-bold text-indigo-200">🎯 เป้าหมายรวม:</span>
            <span className="text-xs font-black text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-xs shadow-2xs">
              {totalTarget.toLocaleString()} ฿
            </span>
          </div>
        </div>

        {/* Big numbers row - Compact & Beautiful */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Col 1: Actual Revenue */}
          <div className="bg-gradient-to-br from-indigo-900/60 via-slate-900/80 to-blue-950/50 backdrop-blur-xs rounded-xl p-3 border border-indigo-400/40 shadow-md shadow-indigo-950/40 space-y-1 hover:border-indigo-300 transition-colors">
            <div className="text-[11px] text-indigo-200 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs border border-emerald-400/30">💰</span>
                <span>ยอดขายจริง</span>
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded font-bold">Q4</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {totalActual.toLocaleString()} ฿
            </div>
            <div className="text-[10px] text-indigo-200/80 pt-0.5">
              สะสม 63.5% ของเป้าหมายรวม
            </div>
          </div>

          {/* Col 2: Deficit */}
          <div className="bg-gradient-to-br from-rose-950/60 via-red-950/40 to-slate-900/80 backdrop-blur-xs rounded-xl p-3 border border-rose-500/40 shadow-md shadow-rose-950/40 space-y-1 hover:border-rose-400 transition-colors">
            <div className="text-[11px] text-rose-200 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-500/30 text-rose-300 flex items-center justify-center text-xs border border-rose-400/40">📉</span>
                <span>ขาดจากเป้า</span>
              </span>
              <span className="text-[9px] text-rose-200 bg-rose-950/80 border border-rose-500/40 px-1.5 py-0.2 rounded font-bold">⚠️ ต่ำกว่าเป้าหมาย</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-400 tracking-tight">
              {deficit.toLocaleString()} ฿
            </div>
            <div className="text-[10px] text-rose-300 pt-0.5 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              <span>ขาดอีก {(deficit / 1000000).toFixed(2)} ล้านบาท (เป้า 10.23M)</span>
            </div>
          </div>

          {/* Col 3: Achieve % */}
          <div className="bg-gradient-to-br from-purple-950/60 via-indigo-950/50 to-slate-900/80 backdrop-blur-xs rounded-xl p-3 border border-purple-400/40 shadow-md shadow-purple-950/40 space-y-1.5 hover:border-purple-300 transition-colors">
            <div className="flex items-baseline justify-between text-[11px]">
              <span className="text-indigo-200 font-semibold flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs border border-indigo-400/30">📈</span>
                <span>% ความสำเร็จ</span>
              </span>
              <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30">
                ⚠️ ต่ำกว่าเป้า
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-indigo-300">
              {achievePct.toFixed(1)}%
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(achievePct, 100)}%` }}
              />
            </div>
            <div className="text-[9px] text-indigo-200/70">
              ความคืบหน้าสะสม 63.5%
            </div>
          </div>

          {/* Col 4: Forecast */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-teal-950/60 to-slate-900/90 backdrop-blur-xs rounded-xl p-3 border-2 border-emerald-400/70 shadow-lg shadow-emerald-950/60 space-y-1 relative overflow-hidden hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-emerald-200 flex items-center justify-center text-xs border border-emerald-400/40">🚀</span>
                <span>คาดการณ์สิ้นเดือน</span>
              </span>
              <span className="text-[9px] font-black bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full shadow-2xs">
                164.1% ทะลุเป้า
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight pt-0.5">
              16,792,060 ฿
            </div>
            <div className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 pt-0.5">
              <span>🚀 แนวโน้มเทียบเป้า:</span>
              <span className="text-emerald-200 font-extrabold">164.1% ทะลุเป้าหมาย</span>
            </div>
          </div>
        </div>

        {/* Small metric cards row (กาดเล็กๆ) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
          {/* Small Card 1: ยอดขายเครื่องรวม */}
          <div className="bg-gradient-to-br from-sky-950/40 to-slate-900/70 hover:from-sky-950/60 hover:to-slate-900/80 transition-colors rounded-xl p-2.5 border border-sky-500/30 hover:border-sky-400/50 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sky-200 font-medium flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-sky-500/30 text-sky-200 flex items-center justify-center text-[10px]">📱</span>
                <span>ยอดขายเครื่องรวม</span>
              </span>
              <span className="text-[8px] bg-sky-500/30 text-sky-200 px-1 py-0.2 rounded font-semibold border border-sky-400/30">SMP</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white">170 เครื่อง</div>
            <div className="text-[9px] text-sky-300/80">เฉพาะ SMP (สมาร์ตโฟน)</div>
          </div>

          {/* Small Card 2: บริการเสริมรวม */}
          <div className="bg-gradient-to-br from-amber-950/40 to-slate-900/70 hover:from-amber-950/60 hover:to-slate-900/80 transition-colors rounded-xl p-2.5 border border-amber-500/30 hover:border-amber-400/50 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-200 font-medium flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-amber-500/30 text-amber-200 flex items-center justify-center text-[10px]">🛡️</span>
                <span>บริการเสริมรวม</span>
              </span>
              <span className="text-[8px] bg-amber-500/30 text-amber-200 px-1 py-0.2 rounded font-semibold border border-amber-400/30">Attach</span>
            </div>
            <div className="text-base sm:text-lg font-black text-amber-300">152 รายการ</div>
            <div className="text-[9px] text-amber-200/80">ทุกหมวด Attach</div>
          </div>

          {/* Small Card 3: ทีมงานประจำสาขา */}
          <div className="bg-gradient-to-br from-purple-950/40 to-slate-900/70 hover:from-purple-950/60 hover:to-slate-900/80 transition-colors rounded-xl p-2.5 border border-purple-500/30 hover:border-purple-400/50 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-200 font-medium flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-purple-500/30 text-purple-200 flex items-center justify-center text-[10px]">👥</span>
                <span>ทีมงานประจำสาขา</span>
              </span>
              <span className="text-[8px] bg-purple-500/30 text-purple-200 px-1 py-0.2 rounded font-semibold border border-purple-400/30">4 ท่าน</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white">4 ท่าน</div>
            <div className="text-[9px] text-purple-300/80 truncate" title="จิ๊บ, วา, เมย์, สตาร์">จิ๊บ, วา, เมย์, สตาร์</div>
          </div>

          {/* Small Card 4: ยอดขายเฉลี่ยต่อวัน */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900/70 hover:from-emerald-950/60 hover:to-slate-900/80 transition-colors rounded-xl p-2.5 border border-emerald-500/30 hover:border-emerald-400/50 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-200 font-medium flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-emerald-500/30 text-emerald-200 flex items-center justify-center text-[10px]">⚡</span>
                <span>ยอดขายเฉลี่ยต่อวัน</span>
              </span>
              <span className="text-[8px] bg-emerald-500/30 text-emerald-300 px-1 py-0.2 rounded font-semibold border border-emerald-400/30">Run Rate</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white">541,679 ฿</div>
            <div className="text-[9px] text-emerald-300/80">ต่อวัน (เฉลี่ย Q4)</div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-indigo-200/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            <span>
              📊 ข้อมูลตัดรอบอัตโนมัติ ณ <strong className="text-white font-black">12/10/2026</strong> • ภาพรวมไตรมาส Q4/2569
            </span>
          </div>
          <button
            onClick={onOpenSimulator}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-200 hover:text-white cursor-pointer transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-white/15 shadow-2xs"
          >
            <span>เปิดระบบจำลองยอดขาย (Simulator)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Category Sales Performance Table & Cards - Compact & Styled */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-sm shadow-2xs">📦</span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                สรุปยอดขายรายหมวดหมู่หลัก (Category Sales Performance)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              📌 บรรลุเป้าแล้ว 1 หมวดหมู่ | ต้องเร่งผลักดันอีก 3 หมวดหมู่
            </p>
          </div>

          <div className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg shadow-2xs flex items-center gap-1">
            <span>✨</span>
            <span>DIY เติบโตทะลุเป้า +267.8% 🚀</span>
          </div>
        </div>

        {/* Cards Grid for Categories - Compact with Styled Icon Backdrops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {categories.map((cat) => {
            const isPass = cat.achievePercent >= 100;
            const theme = getCategoryTheme(cat.id);
            return (
              <div
                key={cat.id}
                className={`${theme.themeBg} rounded-xl p-3 border ${theme.themeBorder} space-y-2 flex flex-col justify-between hover:shadow-xs transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs border ${theme.iconBg}`}>
                        {cat.icon}
                      </span>
                      <span>{cat.name}</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <div className="mt-2 space-y-0.2">
                    <div className="text-[10px] text-slate-500 font-medium">ยอดขายจริง</div>
                    <div className="text-lg font-black text-slate-900">
                      {cat.actualRevenue.toLocaleString()} ฿
                    </div>
                    <div className="text-[10px] text-slate-400">
                      เป้า: {cat.targetRevenue.toLocaleString()} ฿
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="text-slate-500 font-semibold">% บรรลุ</span>
                    <span className={`font-black ${isPass ? 'text-emerald-700' : 'text-indigo-700'}`}>
                      {cat.achievePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isPass ? 'bg-emerald-500' : cat.color}`}
                      style={{ width: `${Math.min(cat.achievePercent, 100)}%` }}
                    />
                  </div>
                  <div className="text-[9px] text-slate-500 flex justify-between pt-0.5">
                    <span>
                      {cat.targetRevenue > cat.actualRevenue ? (
                        <span className="text-rose-500 font-semibold bg-rose-50/80 px-1.5 py-0.2 rounded border border-rose-200/60 inline-flex items-center gap-0.5">
                          <span>ขาด</span>
                          <span className="font-bold text-rose-600">{(cat.targetRevenue - cat.actualRevenue).toLocaleString()} ฿</span>
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold bg-emerald-50/80 px-1.5 py-0.2 rounded border border-emerald-200/60 inline-flex items-center gap-0.5">
                          <span>เกินเป้า</span>
                          <span className="font-bold text-emerald-600">+{cat.actualRevenue - cat.targetRevenue > 0 ? (cat.actualRevenue - cat.targetRevenue).toLocaleString() : 0} ฿</span>
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-600 self-center">{cat.statusNote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Table for Categories - Compact & Clean */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-2 px-2.5">หมวดหมู่สินค้า</th>
                <th className="py-2 px-2.5 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2 px-2.5 text-right">เป้าหมาย (บ.)</th>
                <th className="py-2 px-2.5 text-right">% บรรลุ & ความคืบหน้า</th>
                <th className="py-2 px-2.5 text-right">ยอดส่วนต่าง (บ.)</th>
                <th className="py-2 px-2.5 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {categories.map((cat) => {
                const diff = cat.targetRevenue - cat.actualRevenue;
                const theme = getCategoryTheme(cat.id);
                return (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs border ${theme.iconBg}`}>
                        {cat.icon}
                      </span>
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-black text-slate-900">
                      {cat.actualRevenue.toLocaleString()} ฿
                    </td>
                    <td className="py-2 px-2.5 text-right text-slate-600">
                      {cat.targetRevenue.toLocaleString()} ฿
                    </td>
                    <td className="py-2 px-2.5 text-right font-black text-indigo-700">
                      {cat.achievePercent.toFixed(1)}% {cat.badge}
                    </td>
                    <td className="py-2 px-2.5 text-right">
                      {diff > 0 ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-500 bg-rose-50/80 px-1.5 py-0.2 rounded border border-rose-200/50">
                          <span>ขาด</span>
                          <span className="font-bold text-rose-600">{diff.toLocaleString()} ฿</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50/80 px-1.5 py-0.2 rounded border border-emerald-200/50">
                          <span>เกินเป้า</span>
                          <span className="font-bold text-emerald-600">+{Math.abs(diff).toLocaleString()} ฿</span>
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        cat.achievePercent >= 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cat.achievePercent >= 100 ? '✅ บรรลุเป้า' : '⚠️ ต้องเร่งยอด'}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                <td className="py-2 px-2.5 text-indigo-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">🏆</span>
                  <span>รวม 4 หมวดหมู่</span>
                </td>
                <td className="py-2 px-2.5 text-right text-indigo-950 font-black">
                  6,500,152 ฿
                </td>
                <td className="py-2 px-2.5 text-right text-slate-800">
                  10,230,348 ฿
                </td>
                <td className="py-2 px-2.5 text-right text-indigo-700 font-black">
                  63.5% ⚠️ ต่ำกว่าเป้า
                </td>
                <td className="py-2 px-2.5 text-right">
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-500 bg-rose-50/80 px-1.5 py-0.2 rounded border border-rose-200/50">
                    <span>ขาด</span>
                    <span className="font-black text-rose-600">3,730,196 ฿</span>
                  </span>
                </td>
                <td className="py-2 px-2.5 text-center">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800">
                    ❌ ต่ำกว่าเป้า
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Key Attach Rate KPI (บริการเสริมหลัก & เกณฑ์มาตรฐานสาขา PIA) - Compact Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-sm shadow-2xs">🛡️</span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                บริการเสริมหลัก (Key Attach Rate KPI)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              เกณฑ์มาตรฐานคุณภาพงานขาย & สถิติรวมสาขา PIA (Ultra Care+, SIM, UFUND, ฟิล์ม, Social Care, TI Care, Gadget, SanDisk)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg self-end sm:self-auto">
            <button
              onClick={() => setAttachFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                attachFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({attachItems.length})
            </button>
            <button
              onClick={() => setAttachFilter('pass')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                attachFilter === 'pass'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              ผ่านเกณฑ์ ({attachItems.filter((c) => c.rate >= c.target).length})
            </button>
            <button
              onClick={() => setAttachFilter('fail')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                attachFilter === 'fail'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              ไม่ผ่าน ({attachItems.filter((c) => c.rate < c.target).length})
            </button>
          </div>
        </div>

        {/* 8 Attachment Cards Grid - Compact & Beautiful */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredAttachItems.map((card) => {
            const isPass = card.rate >= card.target;
            const vsTargetPct = Math.round((card.rate / card.target) * 100);

            return (
              <div
                key={card.id}
                className={`${getAttachCardClass(card.accentColor, card.isCore)} rounded-xl p-3 border space-y-2 flex flex-col justify-between transition-all`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${card.iconBg}`}>
                        {card.icon}
                      </span>
                      <span>{card.name}</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                      เป้า ≥ {card.target}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-0.5">
                    <div className="text-xl font-black text-slate-900">
                      {card.rate.toFixed(1)}%
                    </div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {card.statusLabel}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPass ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(vsTargetPct, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>ทำได้ {card.attached} {card.unitLabel}</span>
                  <span className="font-bold text-slate-700">
                    ฐาน {card.base} เครื่อง
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Sales Leaderboard Q4 (ตารางอันดับผลงานยอดขายรายบุคคล) - Compact & Styled */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-sm shadow-2xs">🏆</span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                ตารางอันดับผลงานยอดขายรายบุคคล (Sales Leaderboard Q4)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              🌟 ยอดขายสูงสุด: จิ๊บ (1,015,039 ฿) | ต้องหนุนเสริม: สตาร์ (635,550 ฿)
            </p>
          </div>

          <div className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            เฉลี่ย 781,583 บ./คน • รวม 4 ท่าน: {totalTeamActual.toLocaleString()} ฿
          </div>
        </div>

        {/* Leaderboard Cards - Compact & Vibrant with Staff Card Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {leaderboardStaff.map((staff) => (
            <div
              key={staff.code}
              className={`${staff.cardClass} rounded-xl p-3 space-y-2 flex flex-col justify-between hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${staff.medalBg}`}>
                      {staff.medal}
                    </span>
                    <div>
                      <h4 className="font-black text-xs sm:text-sm text-slate-900">{staff.name}</h4>
                      <span className="text-[9px] text-slate-400 font-medium">PIA: {staff.code}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                    {staff.achievePct}%
                  </span>
                </div>

                <div className="mt-2 space-y-0.2">
                  <div className="text-[10px] text-slate-500">ยอดขายจริง</div>
                  <div className="text-base font-black text-slate-900">
                    {staff.actual.toLocaleString()} ฿
                  </div>
                  <div className="text-[10px] text-slate-400">
                    เป้า: {staff.target.toLocaleString()} ฿
                  </div>
                  <div className="text-[10px] text-rose-500 font-semibold pt-0.5">
                    ขาดอีก {staff.deficit.toLocaleString()} ฿
                  </div>
                </div>
              </div>

              <div className={`pt-1.5 border-t border-slate-200/60 text-[9px] font-bold p-1.5 rounded-lg border ${staff.badgeColor}`}>
                {staff.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table - Compact */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-2 px-2.5">อันดับ & ชื่อพนักงาน</th>
                <th className="py-2 px-2.5 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2 px-2.5 text-right">เป้าหมาย (บ.)</th>
                <th className="py-2 px-2.5 text-right">% บรรลุ & ความคืบหน้า</th>
                <th className="py-2 px-2.5 text-right">ยอดที่ยังขาด (บ.)</th>
                <th className="py-2 px-2.5 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leaderboardStaff.map((st) => (
                <tr key={st.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2 px-2.5 font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${st.medalBg}`}>
                      {st.medal}
                    </span>
                    <span>อันดับ {st.rank}: {st.name} (PIA: {st.code})</span>
                  </td>
                  <td className="py-2 px-2.5 text-right font-black text-slate-900">
                    {st.actual.toLocaleString()} ฿
                  </td>
                  <td className="py-2 px-2.5 text-right text-slate-600">
                    {st.target.toLocaleString()} ฿
                  </td>
                  <td className="py-2 px-2.5 text-right font-black text-indigo-700">
                    {st.achievePct}%
                  </td>
                  <td className="py-2 px-2.5 text-right font-bold text-rose-600">
                    {st.deficit.toLocaleString()} ฿
                  </td>
                  <td className="py-2 px-2.5 text-center">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                      ⚠️ ขาด {(100 - st.achievePct).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}

              {/* Team Sum */}
              <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                <td className="py-2 px-2.5 text-indigo-950 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">👥</span>
                  <span>รวมผลงานทีม 4 ท่าน</span>
                </td>
                <td className="py-2 px-2.5 text-right text-indigo-950 font-black">
                  {totalTeamActual.toLocaleString()} ฿
                </td>
                <td className="py-2 px-2.5 text-right text-slate-800">
                  {totalTeamTarget.toLocaleString()} ฿
                </td>
                <td className="py-2 px-2.5 text-right text-indigo-700 font-black">
                  30.6%
                </td>
                <td className="py-2 px-2.5 text-right text-rose-600 font-black">
                  {(totalTeamTarget - totalTeamActual).toLocaleString()} ฿
                </td>
                <td className="py-2 px-2.5 text-center text-[10px] text-slate-600">
                  (เฉลี่ย {avgTeamActual.toLocaleString()} บ./คน)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Strategic Action Plan (💡 ข้อเสนอแนะเชิงกลยุทธ์) - Compact & Vibrant */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center text-sm shadow-2xs">💡</span>
          <h3 className="text-sm sm:text-base font-black text-amber-950 tracking-tight">
            ข้อเสนอแนะเชิงกลยุทธ์ (Strategic Action Plan)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
          {/* Card 1: Smartphone */}
          <div className="bg-gradient-to-br from-sky-50/95 via-blue-50/30 to-white backdrop-blur-xs p-3 rounded-xl border border-sky-200/90 space-y-0.5 shadow-2xs hover:border-sky-400 transition-colors">
            <div className="flex items-center gap-2 text-xs font-black text-sky-950">
              <span className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-black shadow-2xs">1</span>
              <span>📱 สมาร์ตโฟน (Smartphone)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed pl-7">
              เร่งปิดยอดอีก <strong>2.55 ลบ.</strong> ผลักดันยอดรวมสาขาให้แตะเป้าหมาย <strong>10.23 ลบ.</strong>
            </p>
          </div>

          {/* Card 2: Notebook */}
          <div className="bg-gradient-to-br from-indigo-50/95 via-purple-50/30 to-white backdrop-blur-xs p-3 rounded-xl border border-indigo-200/90 space-y-0.5 shadow-2xs hover:border-indigo-400 transition-colors">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black shadow-2xs">2</span>
              <span>💻 โน้ตบุ๊ก (Notebook)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed pl-7">
              จัดโปรคู่บริการเสริม <strong>TI Care+</strong> ดันอัตราพ่วง Attach Rate สู่เกณฑ์ <strong>≥30%</strong>
            </p>
          </div>

          {/* Card 3: Attach Rate */}
          <div className="bg-gradient-to-br from-purple-50/95 via-violet-50/30 to-white backdrop-blur-xs p-3 rounded-xl border border-purple-200/90 space-y-0.5 shadow-2xs hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-2 text-xs font-black text-purple-950">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[11px] font-black shadow-2xs">3</span>
              <span>🛡️ บริการเสริม (Attach Rate)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed pl-7">
              กระตุ้นการเสนอขาย <strong>UFUND</strong> (ปัจจุบัน 8.8%) และ <strong>เปิดเบอร์ SIM</strong> (7.6%)
            </p>
          </div>

          {/* Card 4: People Development */}
          <div className="bg-gradient-to-br from-emerald-50/95 via-teal-50/30 to-white backdrop-blur-xs p-3 rounded-xl border border-emerald-200/90 space-y-0.5 shadow-2xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[11px] font-black shadow-2xs">4</span>
              <span>👥 พัฒนาบุคคล (People Development)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed pl-7">
              สนับสนุน <strong>สตาร์</strong> และ <strong>เมย์</strong> พร้อมถอดบทเรียนการขายจาก <strong>จิ๊บ</strong> และ <strong>วา</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
