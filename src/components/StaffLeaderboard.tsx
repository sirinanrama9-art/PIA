import React, { useState } from 'react';
import { StaffInfo, StaffRecordsMap, KPITargets, StaffSummary, BranchRevenueKPI } from '../types/sales';
import { calculateStaffSummary } from '../utils/salesCalculations';
import { 
  Trophy, 
  Medal, 
  Award, 
  ShieldCheck, 
  CreditCard, 
  Layers, 
  HardDrive, 
  Calendar, 
  ChevronRight, 
  Crown, 
  Target 
} from 'lucide-react';

interface StaffLeaderboardProps {
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  targets: KPITargets;
  onSelectDay: (day: number) => void;
  onEditDayStaff: (staffId: string, day: number) => void;
  revenueData?: BranchRevenueKPI;
}

export const StaffLeaderboard: React.FC<StaffLeaderboardProps> = ({
  staffList,
  records,
  targets,
  onSelectDay,
  onEditDayStaff,
  revenueData,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staffList[0]?.id || '');
  const [rankMetric, setRankMetric] = useState<'devices' | 'revenue' | 'smp' | 'nb' | 'utc' | 'film'>('devices');

  const summaries: StaffSummary[] = staffList.map((s) => calculateStaffSummary(s, records));
  const totalStoreDevices = summaries.reduce((acc, s) => acc + s.totalDevices, 0) || 1;
  const totalRevenue = revenueData?.actualRevenue || 6500152;
  const targetPerRep = (revenueData?.targetRevenue || 10230348) / summaries.length;

  const enrichedSummaries = summaries.map((s) => {
    const estRevenue = totalStoreDevices > 0 ? (s.totalDevices / totalStoreDevices) * totalRevenue : 0;
    const quotaAchieved = targetPerRep > 0 ? (estRevenue / targetPerRep) * 100 : 0;

    let badge = 'ยอดเยี่ยม';
    let badgeColor = 'bg-amber-50 text-amber-900 border-amber-300';
    if (s.name === 'วา') {
      badge = '👑 แชมป์ยอดขายเครื่องรวม & ฟิล์ม';
      badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    } else if (s.name === 'สตาร์') {
      badge = '🛡️ ผู้นำประกัน UTC+ & ขายดีเด่น';
      badgeColor = 'bg-sky-50 text-sky-800 border-sky-200';
    } else if (s.name === 'จิ๊บ') {
      badge = '💻 อันดับ 1 ขายโน้ตบุ๊ก (NB Pro)';
      badgeColor = 'bg-purple-50 text-purple-800 border-purple-200';
    } else if (s.name === 'เมย์') {
      badge = '💳 เชี่ยวชาญสินเชื่อผ่อน UFund';
      badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }

    return {
      ...s,
      estRevenue,
      quotaAchieved,
      superpowerBadge: badge,
      badgeColor,
    };
  });

  const sortedSummaries = [...enrichedSummaries].sort((a, b) => {
    if (rankMetric === 'devices') return b.totalDevices - a.totalDevices;
    if (rankMetric === 'revenue') return b.estRevenue - a.estRevenue;
    if (rankMetric === 'smp') return b.totalSmp - a.totalSmp;
    if (rankMetric === 'nb') return b.totalNb - a.totalNb;
    if (rankMetric === 'utc') return b.utcSmpRate - a.utcSmpRate;
    if (rankMetric === 'film') return b.filmRate - a.filmRate;
    return b.totalDevices - a.totalDevices;
  });

  const activeStaff = sortedSummaries.find((s) => s.staffId === selectedStaffId) || sortedSummaries[0];
  const activeStaffRecords = records[activeStaff.staffId] || {};

  const formatBaht = (num: number) => new Intl.NumberFormat('th-TH').format(Math.round(num));

  return (
    <div className="space-y-6">
      {/* Leaderboard Header in high-end executive styling */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md border border-amber-300">
                <Crown className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-black tracking-tight text-white">
                    Team Leaderboard (กระดานผู้นำทีมขายประจำสาขา)
                  </h2>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400 text-slate-950 rounded-md shadow-xs">
                    4 Reps
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-300 mt-0.5">
                  ตารางจัดอันดับพนักงานขาย 4 ท่าน · วัดผลทั้งยอดขายเครื่อง รายได้จัดสรร และอัตราแนบ KPI
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics in Header */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
            <div>
              <span className="text-[10px] font-bold text-slate-300 block">ยอดขายจริงรวม</span>
              <span className="text-base font-black text-white font-mono">{formatBaht(totalRevenue)} ฿</span>
            </div>
            <div className="h-7 w-px bg-white/20" />
            <div>
              <span className="text-[10px] font-bold text-slate-300 block">เครื่องรวมสาขา</span>
              <span className="text-base font-black text-amber-300 font-mono">{totalStoreDevices} เครื่อง</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Sort bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>จัดอันดับกระดานตามเกณฑ์:</span>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs gap-1 flex-wrap shadow-2xs">
          <button
            onClick={() => setRankMetric('devices')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'devices' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ยอดเครื่องรวม
          </button>
          <button
            onClick={() => setRankMetric('revenue')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'revenue' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ยอดขายเงิน (฿)
          </button>
          <button
            onClick={() => setRankMetric('smp')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'smp' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เครื่อง SMP
          </button>
          <button
            onClick={() => setRankMetric('nb')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'nb' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เครื่อง NB
          </button>
          <button
            onClick={() => setRankMetric('utc')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'utc' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัตรา UTC+
          </button>
          <button
            onClick={() => setRankMetric('film')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              rankMetric === 'film' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัตราฟิล์ม
          </button>
        </div>
      </div>

      {/* Podium Presentation Cards - Eye-Catching Ranking Palettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedSummaries.map((staff, idx) => {
          const isSelected = selectedStaffId === staff.staffId;
          const isGold = idx === 0;
          const isSilver = idx === 1;
          const isBronze = idx === 2;

          return (
            <div
              key={staff.staffId}
              onClick={() => setSelectedStaffId(staff.staffId)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isGold 
                  ? 'bg-gradient-to-b from-amber-500/10 via-amber-50/20 to-white border-amber-300 ring-1 ring-amber-300 shadow-sm'
                  : isSilver
                  ? 'bg-gradient-to-b from-slate-100/50 via-white to-white border-slate-300 shadow-xs'
                  : isBronze
                  ? 'bg-gradient-to-b from-orange-100/40 via-white to-white border-orange-300 shadow-xs'
                  : 'bg-white border-slate-200/90 shadow-xs'
              } ${
                isSelected ? 'ring-2 ring-indigo-500 shadow-md' : 'hover:shadow-md hover:scale-[1.01]'
              }`}
            >
              <div className={`h-1.5 w-full absolute top-0 left-0 right-0 ${
                isGold ? 'bg-amber-400' : isSilver ? 'bg-slate-400' : isBronze ? 'bg-amber-600' : 'bg-slate-200'
              }`} />

              <div>
                {/* Header Rank */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${
                      isGold
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                        : isSilver
                        ? 'bg-slate-200 text-slate-800 border-slate-300'
                        : isBronze
                        ? 'bg-orange-100 text-orange-950 border-orange-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm leading-snug">{staff.name}</h3>
                      <p className="text-[10px] text-slate-400">ID: {staff.staffId}</p>
                    </div>
                  </div>

                  {isGold && <Crown className="w-5 h-5 text-amber-500" />}
                  {isSilver && <Medal className="w-5 h-5 text-slate-400" />}
                  {isBronze && <Award className="w-5 h-5 text-amber-700" />}
                  {idx > 2 && <Award className="w-5 h-5 text-slate-300" />}
                </div>

                {/* Rep Superpower Badge */}
                <div className="mt-2.5">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border block text-center truncate ${staff.badgeColor}`}>
                    {staff.superpowerBadge}
                  </span>
                </div>

                {/* Key Numbers Grid - Eye Catching Sales */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-semibold">ยอดเครื่องรวม</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{staff.totalDevices}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">S:{staff.totalSmp} N:{staff.totalNb}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-semibold">ยอดขายประเมิน</span>
                    <span className="text-sm font-black text-emerald-700 mt-1 block font-mono">{(staff.estRevenue / 1000000).toFixed(2)}M ฿</span>
                    <span className="text-[10px] font-bold text-slate-600 block mt-0.5">{staff.quotaAchieved.toFixed(0)}% เป้า</span>
                  </div>
                </div>

                {/* Attachment Rates */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> UTC+ (เป้า {targets.utcSmp}%)
                    </span>
                    <span className={`font-extrabold font-mono ${staff.utcSmpRate >= targets.utcSmp ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {staff.utcSmpRate.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-500" /> UFund (เป้า {targets.ufund}%)
                    </span>
                    <span className={`font-extrabold font-mono ${staff.ufundRate >= targets.ufund ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {staff.ufundRate.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Layers className="w-3.5 h-3.5 text-amber-500" /> ฟิล์ม (เป้า {targets.film}%)
                    </span>
                    <span className="font-extrabold text-slate-900 font-mono">
                      {staff.filmRate.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <HardDrive className="w-3.5 h-3.5 text-rose-500" /> SanDisk
                    </span>
                    <span className="font-extrabold text-rose-600 font-mono">
                      {staff.totalSandisk} ชิ้น
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">ดูประวัติรายวัน</span>
                <div className="flex items-center gap-1 font-bold text-indigo-600">
                  <span>คลิกเพื่อดู</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Head-to-Head Comparison Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              ตารางเปรียบเทียบผลงานทีมขายแบบ Head-to-Head
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            ข้อมูลพนักงานทั้ง 4 ท่าน ประจำสาขา PIA
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-b border-slate-200 font-bold">
                <th className="p-3 whitespace-nowrap text-center">อันดับ</th>
                <th className="p-3 whitespace-nowrap">พนักงาน</th>
                <th className="p-3 whitespace-nowrap text-center">ยอดเครื่องรวม</th>
                <th className="p-3 whitespace-nowrap text-center">SMP</th>
                <th className="p-3 whitespace-nowrap text-center">NB</th>
                <th className="p-3 whitespace-nowrap text-center">ยอดขายประเมิน (฿)</th>
                <th className="p-3 whitespace-nowrap text-center">% ปิดเป้า</th>
                <th className="p-3 whitespace-nowrap text-center">UTC+ SMP (40%)</th>
                <th className="p-3 whitespace-nowrap text-center">UFund (50%)</th>
                <th className="p-3 whitespace-nowrap text-center">SIM (30%)</th>
                <th className="p-3 whitespace-nowrap text-center">ฟิล์ม (70%)</th>
                <th className="p-3 whitespace-nowrap text-center">SanDisk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedSummaries.map((s, idx) => (
                <tr
                  key={s.staffId}
                  onClick={() => setSelectedStaffId(s.staffId)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    selectedStaffId === s.staffId ? 'bg-indigo-50/40 font-bold' : ''
                  }`}
                >
                  <td className="p-3 text-center font-black text-slate-900">
                    <span className={`inline-block w-6 h-6 rounded-md leading-6 text-center text-xs ${
                      idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        {s.name.slice(0, 1)}
                      </div>
                      <div>
                        <div>{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{s.staffId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center font-black text-slate-950 text-sm font-mono">
                    {s.totalDevices}
                  </td>
                  <td className="p-3 text-center font-bold text-slate-700 font-mono">
                    {s.totalSmp}
                  </td>
                  <td className="p-3 text-center font-bold text-slate-700 font-mono">
                    {s.totalNb}
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-700 font-mono">
                    {formatBaht(s.estRevenue)} ฿
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {s.quotaAchieved.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">
                    <span className={s.utcSmpRate >= targets.utcSmp ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                      {s.utcSmpRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">
                    <span className={s.ufundRate >= targets.ufund ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                      {s.ufundRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-700 font-mono">
                    {s.simRate.toFixed(1)}%
                  </td>
                  <td className="p-3 text-center text-slate-700 font-mono">
                    {s.filmRate.toFixed(1)}%
                  </td>
                  <td className="p-3 text-center text-rose-700 font-bold font-mono">
                    {s.totalSandisk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Staff Detailed Breakdown */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-xs">
              {activeStaff.name.slice(0, 1)}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                ประวัติการขายรายวันของ: {activeStaff.name} ({activeStaff.staffId})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                รวมยอดสะสม: SMP {activeStaff.totalSmp} เครื่อง | NB {activeStaff.totalNb} เครื่อง | ประกันและบริการ {activeStaff.totalUtcSmp + activeStaff.totalFilm + activeStaff.totalSandisk} ชิ้น
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">สลับดูพนักงาน:</span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {staffList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStaffId(s.id)}
                  className={`px-3 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                    activeStaff.staffId === s.id
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 31-Day Mini Grid */}
        <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-b border-slate-200 font-bold">
                <th className="p-3 border-r border-slate-200 whitespace-nowrap">วันที่</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">SMP (เครื่อง)</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">UTC+ SMP</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">UFund</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">SIM</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">ฟิล์ม</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">NB (เครื่อง)</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">Social Care+</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">UTC+ Gadget</th>
                <th className="p-3 border-r border-slate-200 whitespace-nowrap text-center">SanDisk</th>
                <th className="p-3 whitespace-nowrap text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const rec = activeStaffRecords[d];
                if (!rec) return null;
                const hasData =
                  rec.smp.smpUnits > 0 ||
                  rec.smp.utcCount > 0 ||
                  rec.smp.ufundCount > 0 ||
                  rec.smp.filmCount > 0 ||
                  rec.nb.nbUnits > 0 ||
                  rec.nb.sandiskCount > 0;

                return (
                  <tr
                    key={d}
                    className={`hover:bg-slate-50 transition-colors ${
                      hasData ? 'bg-white' : 'bg-slate-50/50 text-slate-400'
                    }`}
                  >
                    <td className="p-2.5 font-bold border-r border-slate-100 whitespace-nowrap">
                      <button
                        onClick={() => onSelectDay(d)}
                        className="hover:text-indigo-600 text-slate-700 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        วันที่ {d}
                      </button>
                    </td>
                    <td className="p-2.5 text-center font-black text-slate-900 border-r border-slate-100 font-mono">
                      {rec.smp.smpUnits || '-'}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.smp.utcCount > 0 ? (
                        <span className="font-bold text-slate-800">
                          {rec.smp.utcCount} (
                          {rec.smp.smpUnits > 0
                            ? ((rec.smp.utcCount / rec.smp.smpUnits) * 100).toFixed(0)
                            : 0}
                          %)
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.smp.ufundCount > 0 ? (
                        <span className="font-bold text-emerald-700">
                          {rec.smp.ufundCount} (
                          {rec.smp.smpUnits > 0
                            ? ((rec.smp.ufundCount / rec.smp.smpUnits) * 100).toFixed(0)
                            : 0}
                          %)
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.smp.simCount > 0 ? `${rec.smp.simCount}` : '-'}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.smp.filmCount > 0 ? (
                        <span className="font-bold text-amber-700">
                          {rec.smp.filmCount} (
                          {rec.smp.smpUnits > 0
                            ? ((rec.smp.filmCount / rec.smp.smpUnits) * 100).toFixed(0)
                            : 0}
                          %)
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-2.5 text-center font-black text-slate-900 border-r border-slate-100 font-mono">
                      {rec.nb.nbUnits || '-'}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.nb.socialCareCount > 0 ? `${rec.nb.socialCareCount}` : '-'}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.nb.utcGadgetCount > 0 ? `${rec.nb.utcGadgetCount}` : '-'}
                    </td>
                    <td className="p-2.5 text-center border-r border-slate-100 font-mono">
                      {rec.nb.sandiskCount > 0 ? `${rec.nb.sandiskCount}` : '-'}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => onEditDayStaff(activeStaff.staffId, d)}
                        className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer transition-colors border border-slate-200"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
