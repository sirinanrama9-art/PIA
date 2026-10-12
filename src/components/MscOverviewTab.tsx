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
  ArrowUpRight
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
  ];

  // Attachments KPI Cards
  const totalSmpUnits = 170; // 170 SMP Units branch total
  const totalNbUnits = 30;   // 30 NB Units branch total

  // Key Attach items (8 items)
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
      name: 'จิ๊บ',
      code: '24583',
      actual: 1015039,
      target: 2557587,
      achievePct: 39.7,
      deficit: 1542548,
      highlight: 'ยอดขายสูงสุดประจำสาขา 🌟',
    },
    {
      rank: 2,
      medal: '🥈',
      name: 'วา',
      code: '29253',
      actual: 769458,
      target: 2557587,
      achievePct: 30.1,
      deficit: 1788129,
      highlight: 'ผ่านเกณฑ์ TI Care+ (25.0%)',
    },
    {
      rank: 3,
      medal: '🥉',
      name: 'เมย์',
      code: '21865',
      actual: 706284,
      target: 2557587,
      achievePct: 27.6,
      deficit: 1851303,
      highlight: 'UFUND สูงสุดในทีม (21.4%)',
    },
    {
      rank: 4,
      medal: '🏅',
      name: 'สตาร์',
      code: '35350',
      actual: 635550,
      target: 2557587,
      achievePct: 24.8,
      deficit: 1922037,
      highlight: 'ต้องเร่งผลักดันและเสริมกลยุทธ์ ⚡',
    },
  ];

  const totalTeamActual = 3126331;
  const totalTeamTarget = 10230348;
  const avgTeamActual = 781583;

  return (
    <div className="space-y-6">
      {/* 1. Branch Total Revenue Card (Dashboard & KPI Scorecards) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-900/50 relative overflow-hidden space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse shadow-sm shadow-indigo-400/50" />
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                📊 Dashboard & KPI Scorecards (ภาพรวมสาขา PIA - Q4/2569)
              </h2>
            </div>
            <p className="text-xs text-indigo-200/80 mt-0.5">
              🏢 PIA (Branch Total) • ความคืบหน้าสะสม 63.5% จากเป้าหมาย 10.23 ล้านบาท
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-bold text-indigo-200">🎯 เป้าหมายรวม:</span>
            <span className="text-xs font-black text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-xs">
              {totalTarget.toLocaleString()} ฿
            </span>
          </div>
        </div>

        {/* Big numbers row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Col 1: Actual Revenue */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-1">
            <div className="text-xs text-indigo-200 font-semibold flex items-center justify-between">
              <span>💰 ยอดขายจริง</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.5 rounded font-bold">Q4</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {totalActual.toLocaleString()} ฿
            </div>
            <div className="text-[11px] text-indigo-200/80 flex items-center gap-1 pt-1">
              <span>สะสม 63.5% ของเป้าหมายรวม</span>
            </div>
          </div>

          {/* Col 2: Deficit */}
          <div className="bg-rose-500/15 backdrop-blur-xs rounded-2xl p-4 border border-rose-500/30 space-y-1">
            <div className="text-xs text-rose-200 font-semibold flex items-center justify-between">
              <span>📉 ขาดจากเป้า</span>
              <span className="text-[10px] text-rose-200 bg-rose-950/70 border border-rose-500/40 px-1.5 py-0.5 rounded font-bold">⚠️ ต่ำกว่าเป้าหมายรวม</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">
              {deficit.toLocaleString()} ฿
            </div>
            <div className="text-[11px] text-rose-300 pt-1 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>ขาดอีก {(deficit / 1000000).toFixed(2)} ล้านบาท (เป้า 10.23M)</span>
            </div>
          </div>

          {/* Col 3: Achieve % */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-indigo-200 font-semibold">📈 % ความสำเร็จ</span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                ⚠️ ต่ำกว่าเป้า
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-300">
              {achievePct.toFixed(1)}%
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(achievePct, 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-indigo-200/70">
              ความคืบหน้าสะสม 63.5%
            </div>
          </div>

          {/* Col 4: Forecast - Prominent Highlighted Box */}
          <div className="bg-emerald-950/50 backdrop-blur-xs rounded-2xl p-4 border-2 border-emerald-500/50 shadow-xs space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                <span>🚀</span>
                <span>คาดการณ์สิ้นเดือน</span>
              </span>
              <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                164.1% ทะลุเป้า
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight pt-0.5">
              16,792,060 ฿
            </div>
            <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1 pt-1">
              <span>🚀 แนวโน้มเทียบเป้า:</span>
              <span className="text-emerald-200 font-extrabold">164.1% ทะลุเป้าหมาย</span>
            </div>
          </div>
        </div>

        {/* Small metric cards row (กาดเล็กๆ: ยอดขายเครื่องรวม, บริการเสริมรวม, ทีมงานประจำสาขา, ยอดขายเฉลี่ยต่อวัน) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Small Card 1: ยอดขายเครื่องรวม */}
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-3.5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-indigo-200 font-medium flex items-center gap-1">
                <span>📱</span> ยอดขายเครื่องรวม
              </span>
              <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded font-semibold border border-indigo-400/20">SMP</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white">170 เครื่อง</div>
            <div className="text-[10px] text-indigo-300/80">เฉพาะ SMP (สมาร์ตโฟน)</div>
          </div>

          {/* Small Card 2: บริการเสริมรวม */}
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-3.5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-amber-200 font-medium flex items-center gap-1">
                <span>🛡️</span> บริการเสริมรวม
              </span>
              <span className="text-[9px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded font-semibold border border-amber-400/20">Attach</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-300">152 รายการ</div>
            <div className="text-[10px] text-amber-200/80">ทุกหมวด Attach</div>
          </div>

          {/* Small Card 3: ทีมงานประจำสาขา */}
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-3.5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-indigo-200 font-medium flex items-center gap-1">
                <span>👥</span> ทีมงานประจำสาขา
              </span>
              <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded font-semibold border border-indigo-400/20">4 ท่าน</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white">4 ท่าน</div>
            <div className="text-[10px] text-indigo-300/80 truncate" title="จิ๊บ, วา, เมย์, สตาร์">จิ๊บ, วา, เมย์, สตาร์</div>
          </div>

          {/* Small Card 4: ยอดขายเฉลี่ยต่อวัน */}
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-3.5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-indigo-200 font-medium flex items-center gap-1">
                <span>⚡</span> ยอดขายเฉลี่ยต่อวัน
              </span>
              <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded font-semibold border border-emerald-400/20">Run Rate</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white">541,679 ฿</div>
            <div className="text-[10px] text-indigo-300/80">ต่อวัน (เฉลี่ย Q4)</div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-indigo-200/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-300" />
            <span>
              📊 ข้อมูลตัดรอบอัตโนมัติ ณ <strong className="text-white font-black">12/10/2026</strong> • ภาพรวมไตรมาส Q4/2569
            </span>
          </div>
          <button
            onClick={onOpenSimulator}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-200 hover:text-white cursor-pointer transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/15"
          >
            <span>เปิดระบบจำลองยอดขาย (Simulator)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Category Sales Performance Table & Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                สรุปยอดขายรายหมวดหมู่หลัก (Category Sales Performance)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              📌 บรรลุเป้าแล้ว 1 หมวดหมู่ | ต้องเร่งผลักดันอีก 3 หมวดหมู่
            </p>
          </div>

          <div className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl">
            DIY เติบโตทะลุเป้า +267.8% 🚀
          </div>
        </div>

        {/* Cards Grid for Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isPass = cat.achievePercent >= 100;
            return (
              <div
                key={cat.id}
                className="bg-slate-50/70 rounded-2xl p-4.5 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <div className="mt-3 space-y-0.5">
                    <div className="text-[11px] text-slate-500 font-medium">ยอดขายจริง</div>
                    <div className="text-xl font-black text-slate-900">
                      {cat.actualRevenue.toLocaleString()} ฿
                    </div>
                    <div className="text-[11px] text-slate-400">
                      เป้า: {cat.targetRevenue.toLocaleString()} ฿
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500 font-semibold">% บรรลุ</span>
                    <span className={`font-black ${isPass ? 'text-emerald-700' : 'text-indigo-700'}`}>
                      {cat.achievePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isPass ? 'bg-emerald-500' : cat.color}`}
                      style={{ width: `${Math.min(cat.achievePercent, 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between pt-0.5">
                    <span>
                      {cat.targetRevenue > cat.actualRevenue ? (
                        <span className="text-rose-500 font-semibold bg-rose-50/80 px-1.5 py-0.5 rounded border border-rose-200/60 inline-flex items-center gap-1">
                          <span>ขาด</span>
                          <span className="font-bold text-rose-600">{(cat.targetRevenue - cat.actualRevenue).toLocaleString()} ฿</span>
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold bg-emerald-50/80 px-1.5 py-0.5 rounded border border-emerald-200/60 inline-flex items-center gap-1">
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

        {/* Detailed Table for Categories */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-2.5 px-3">หมวดหมู่สินค้า</th>
                <th className="py-2.5 px-3 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2.5 px-3 text-right">เป้าหมาย (บ.)</th>
                <th className="py-2.5 px-3 text-right">% บรรลุ & ความคืบหน้า</th>
                <th className="py-2.5 px-3 text-right">ยอดส่วนต่าง (บ.)</th>
                <th className="py-2.5 px-3 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {categories.map((cat) => {
                const diff = cat.targetRevenue - cat.actualRevenue;
                return (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-900">
                      {cat.actualRevenue.toLocaleString()} ฿
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {cat.targetRevenue.toLocaleString()} ฿
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-indigo-700">
                      {cat.achievePercent.toFixed(1)}% {cat.badge}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {diff > 0 ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-500 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-200/50">
                          <span>ขาด</span>
                          <span className="font-bold text-rose-600">{diff.toLocaleString()} ฿</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200/50">
                          <span>เกินเป้า</span>
                          <span className="font-bold text-emerald-600">+{Math.abs(diff).toLocaleString()} ฿</span>
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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
                <td className="py-3 px-3 text-indigo-900 flex items-center gap-1.5">
                  <span>🏆</span>
                  <span>รวม 4 หมวดหมู่</span>
                </td>
                <td className="py-3 px-3 text-right text-indigo-950 font-black">
                  6,500,152 ฿
                </td>
                <td className="py-3 px-3 text-right text-slate-800">
                  10,230,348 ฿
                </td>
                <td className="py-3 px-3 text-right text-indigo-700 font-black">
                  63.5% ⚠️ ต่ำกว่าเป้า
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-500 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-200/50">
                    <span>ขาด</span>
                    <span className="font-black text-rose-600">3,730,196 ฿</span>
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    ❌ ต่ำกว่าเป้า
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* 4. Key Attach Rate KPI (บริการเสริมหลัก & เกณฑ์มาตรฐานสาขา PIA) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                บริการเสริมหลัก (Key Attach Rate KPI)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              เกณฑ์มาตรฐานคุณภาพงานขาย & สถิติรวมสาขา PIA (Ultra Care+, SIM, UFUND, ฟิล์ม, Social Care, TI Care, Gadget, SanDisk)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
            <button
              onClick={() => setAttachFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({attachItems.length})
            </button>
            <button
              onClick={() => setAttachFilter('pass')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'pass'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              ผ่านเกณฑ์ ({attachItems.filter((c) => c.rate >= c.target).length})
            </button>
            <button
              onClick={() => setAttachFilter('fail')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'fail'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              ไม่ผ่าน ({attachItems.filter((c) => c.rate < c.target).length})
            </button>
          </div>
        </div>

        {/* 4 Core Attachment Cards Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAttachItems.map((card) => {
            const isPass = card.rate >= card.target;
            const vsTargetPct = Math.round((card.rate / card.target) * 100);

            return (
              <div
                key={card.id}
                className={`bg-white rounded-3xl p-5 border shadow-2xs space-y-3 flex flex-col justify-between ${
                  card.isCore ? 'border-slate-300 ring-1 ring-slate-200' : 'border-slate-200/90'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{card.icon}</span>
                      <span>{card.name}</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      เป้า ≥ {card.target}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-2xl font-black text-slate-900">
                      {card.rate.toFixed(1)}%
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {card.statusLabel}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPass ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(vsTargetPct, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
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

      {/* 5. Sales Leaderboard Q4 (ตารางอันดับผลงานยอดขายรายบุคคล) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                ตารางอันดับผลงานยอดขายรายบุคคล (Sales Leaderboard Q4)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              🌟 ยอดขายสูงสุด: จิ๊บ (1,015,039 ฿) | ต้องหนุนเสริม: สตาร์ (635,550 ฿)
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            เฉลี่ย 781,583 บ./คน • รวม 4 ท่าน: {totalTeamActual.toLocaleString()} ฿
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaderboardStaff.map((staff) => (
            <div
              key={staff.code}
              className="bg-slate-50/70 rounded-2xl p-4.5 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{staff.medal}</span>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{staff.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">PIA: {staff.code}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                    {staff.achievePct}%
                  </span>
                </div>

                <div className="mt-3 space-y-0.5">
                  <div className="text-[11px] text-slate-500">ยอดขายจริง</div>
                  <div className="text-lg font-black text-slate-900">
                    {staff.actual.toLocaleString()} ฿
                  </div>
                  <div className="text-[11px] text-slate-400">
                    เป้า: {staff.target.toLocaleString()} ฿
                  </div>
                  <div className="text-[11px] text-rose-500 font-semibold pt-0.5">
                    ขาดอีก {staff.deficit.toLocaleString()} ฿
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-indigo-700 bg-indigo-50/50 p-2 rounded-xl">
                {staff.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-2.5 px-3">อันดับ & ชื่อพนักงาน</th>
                <th className="py-2.5 px-3 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2.5 px-3 text-right">เป้าหมาย (บ.)</th>
                <th className="py-2.5 px-3 text-right">% บรรลุ & ความคืบหน้า</th>
                <th className="py-2.5 px-3 text-right">ยอดที่ยังขาด (บ.)</th>
                <th className="py-2.5 px-3 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leaderboardStaff.map((st) => (
                <tr key={st.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-slate-900 flex items-center gap-2">
                    <span>{st.medal}</span>
                    <span>อันดับ {st.rank}: {st.name} (PIA: {st.code})</span>
                  </td>
                  <td className="py-3 px-3 text-right font-black text-slate-900">
                    {st.actual.toLocaleString()} ฿
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {st.target.toLocaleString()} ฿
                  </td>
                  <td className="py-3 px-3 text-right font-black text-indigo-700">
                    {st.achievePct}%
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-rose-600">
                    {st.deficit.toLocaleString()} ฿
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      ⚠️ ขาด {st.achievePct}%
                    </span>
                  </td>
                </tr>
              ))}

              {/* Team Sum */}
              <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                <td className="py-3 px-3 text-indigo-950 flex items-center gap-1.5">
                  <span>👥</span>
                  <span>รวมผลงานทีม 4 ท่าน</span>
                </td>
                <td className="py-3 px-3 text-right text-indigo-950 font-black">
                  {totalTeamActual.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right text-slate-800">
                  {totalTeamTarget.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right text-indigo-700 font-black">
                  30.6%
                </td>
                <td className="py-3 px-3 text-right text-rose-600 font-black">
                  {(totalTeamTarget - totalTeamActual).toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-center text-[11px] text-slate-600">
                  (เฉลี่ย {avgTeamActual.toLocaleString()} บ./คน)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Strategic Action Plan (💡 ข้อเสนอแนะเชิงกลยุทธ์) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <h3 className="text-base sm:text-lg font-black text-amber-950 tracking-tight">
            ข้อเสนอแนะเชิงกลยุทธ์ (Strategic Action Plan)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/70 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[11px]">1</span>
              <span>สมาร์ตโฟน (Smartphone)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-7">
              เร่งปิดยอดอีก <strong>2.55 ลบ.</strong> ผลักดันยอดรวมสาขาให้แตะเป้าหมาย <strong>10.23 ลบ.</strong>
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/70 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[11px]">2</span>
              <span>โน้ตบุ๊ก (Notebook)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-7">
              จัดโปรคู่บริการเสริม <strong>TI Care+</strong> ดันอัตราพ่วง Attach Rate สู่เกณฑ์ <strong>≥30%</strong>
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/70 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[11px]">3</span>
              <span>บริการเสริม (Attach Rate)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-7">
              กระตุ้นการเสนอขาย <strong>UFUND</strong> (ปัจจุบัน 8.8%) และ <strong>เปิดเบอร์ SIM</strong> (7.6%)
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/70 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[11px]">4</span>
              <span>พัฒนาบุคคล (People Development)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-7">
              สนับสนุน <strong>สตาร์</strong> และ <strong>เมย์</strong> พร้อมถอดบทเรียนการขายจาก <strong>จิ๊บ</strong> และ <strong>วา</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
