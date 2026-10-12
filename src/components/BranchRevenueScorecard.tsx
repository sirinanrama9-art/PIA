import React, { useState } from 'react';
import { BranchRevenueKPI, StaffSummary } from '../types/sales';
import { 
  CircleDollarSign, 
  Target, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Edit3, 
  Check, 
  X, 
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface BranchRevenueScorecardProps {
  revenueData: BranchRevenueKPI;
  onUpdateRevenue: (updated: BranchRevenueKPI) => void;
  staffSummaries?: StaffSummary[];
}

export const BranchRevenueScorecard: React.FC<BranchRevenueScorecardProps> = ({
  revenueData,
  onUpdateRevenue,
  staffSummaries = [],
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempActual, setTempActual] = useState<number>(revenueData.actualRevenue);
  const [tempTarget, setTempTarget] = useState<number>(revenueData.targetRevenue);
  const [tempQuarter, setTempQuarter] = useState<string>(revenueData.quarter);
  const [tempDaysRemaining, setTempDaysRemaining] = useState<number>(revenueData.daysRemainingInPeriod || 20);

  const deficit = Math.max(0, revenueData.targetRevenue - revenueData.actualRevenue);
  const achievementRate = revenueData.targetRevenue > 0 
    ? (revenueData.actualRevenue / revenueData.targetRevenue) * 100 
    : 0;
  
  const isBelowTarget = achievementRate < 100;
  const daysRemaining = revenueData.daysRemainingInPeriod || 20;
  const dailyRequiredRunRate = daysRemaining > 0 ? deficit / daysRemaining : 0;

  const handleSave = () => {
    const updatedDeficit = Math.max(0, tempTarget - tempActual);
    const updatedRate = tempTarget > 0 ? (tempActual / tempTarget) * 100 : 0;
    const note = updatedRate >= 100 ? 'บรรลุเป้าหมายรวมแล้ว' : 'ต่ำกว่าเป้าหมายรวม';

    onUpdateRevenue({
      ...revenueData,
      quarter: tempQuarter,
      actualRevenue: tempActual,
      targetRevenue: tempTarget,
      deficitRevenue: updatedDeficit,
      achievementPercent: Number(updatedRate.toFixed(1)),
      statusNote: note,
      daysRemainingInPeriod: tempDaysRemaining,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempActual(revenueData.actualRevenue);
    setTempTarget(revenueData.targetRevenue);
    setTempQuarter(revenueData.quarter);
    setTempDaysRemaining(revenueData.daysRemainingInPeriod || 20);
    setIsEditing(false);
  };

  const formatBaht = (num: number) => {
    return new Intl.NumberFormat('th-TH').format(Math.round(num));
  };

  const formatMillions = (num: number) => {
    return (num / 1000000).toFixed(2);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5 relative overflow-hidden">
      {/* Decorative top accent line with vibrant emerald-to-indigo executive gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold shadow-xs border border-emerald-500/20">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Dashboard & KPI Scorecards (ภาพรวมสาขา PIA - {revenueData.quarter})
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-900 text-white rounded-md shadow-xs">
                  🏢 {revenueData.branchName} (Branch Total)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                ติดตามยอดขายจริงเชิงมูลค่าเงิน (บาท) เทียบเป้าหมายสาขาประจำไตรมาส · อัปเดตแบบเรียลไทม์
              </p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              แก้ไขเป้าหมาย & ยอดขาย
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-600 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                บันทึก
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                ยกเลิก
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fade-in text-xs">
          <div className="font-bold text-slate-800">กรอกข้อมูลยอดขายและเป้าหมายสาขาใหม่:</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">ไตรมาส / ช่วงเวลา:</label>
              <input
                type="text"
                value={tempQuarter}
                onChange={(e) => setTempQuarter(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">ยอดขายจริง (บาท):</label>
              <input
                type="number"
                value={tempActual}
                onChange={(e) => setTempActual(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">เป้าหมายรวม (บาท):</label>
              <input
                type="number"
                value={tempTarget}
                onChange={(e) => setTempTarget(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">จำนวนวันที่เหลือปิดยอด (วัน):</label>
              <input
                type="number"
                value={tempDaysRemaining}
                onChange={(e) => setTempDaysRemaining(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4 Scorecard Metrics - Striking Executive Palettes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. ACTUAL REVENUE (ยอดขายจริง) - High-Impact Emerald Luxury Card */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-5 text-white shadow-md shadow-emerald-950/15 border border-emerald-500/40 relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-extrabold text-emerald-100 flex items-center gap-1.5 tracking-wide">
              <span className="p-1 rounded-lg bg-white/15">
                <CircleDollarSign className="w-4 h-4 text-white" />
              </span>
              💰 ยอดขายจริง
            </span>
            <span className="text-[11px] font-black bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-xs">
              {formatMillions(revenueData.actualRevenue)} ล้าน ฿
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5 relative z-10">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-sm font-mono">
              {formatBaht(revenueData.actualRevenue)}
            </span>
            <span className="text-lg font-bold text-emerald-200">฿</span>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-100 relative z-10">
            <span className="font-medium">ผลงานสะสมปัจจุบัน</span>
            <span className="font-black text-white bg-emerald-500/30 px-2 py-0.5 rounded-md border border-white/20">
              {achievementRate.toFixed(1)}% ของเป้า
            </span>
          </div>
        </div>

        {/* 2. TARGET REVENUE (เป้าหมายรวม) - Elegant Indigo / Slate Executive Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 tracking-wide">
              <span className="p-1 rounded-lg bg-indigo-50 border border-indigo-100">
                <Target className="w-4 h-4 text-indigo-600" />
              </span>
              🎯 เป้าหมายรวม
            </span>
            <span className="text-[11px] font-black bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {formatMillions(revenueData.targetRevenue)} ล้าน ฿
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              {formatBaht(revenueData.targetRevenue)}
            </span>
            <span className="text-base font-bold text-slate-400">฿</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>กำหนดเป้าหมาย</span>
            <span className="font-extrabold text-indigo-700 bg-indigo-50/60 px-2 py-0.5 rounded-md">
              ไตรมาส {revenueData.quarter}
            </span>
          </div>
        </div>

        {/* 3. DEFICIT (ขาดจากเป้า) - Warning Rose Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-rose-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 tracking-wide">
              <span className="p-1 rounded-lg bg-rose-50 border border-rose-100">
                <TrendingDown className="w-4 h-4 text-rose-600" />
              </span>
              📉 ขาดจากเป้า
            </span>
            <span className="text-[11px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              {formatMillions(deficit)} ล้าน ฿
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight font-mono">
              {formatBaht(deficit)}
            </span>
            <span className="text-base font-bold text-rose-400">฿</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>ยอดที่ต้องปิดเพิ่ม</span>
            <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
              {(100 - achievementRate).toFixed(1)}% ที่เหลือ
            </span>
          </div>
        </div>

        {/* 4. ACHIEVEMENT RATE (% ความสำเร็จ) - Vibrant Status Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-amber-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 tracking-wide">
              <span className={`p-1 rounded-lg ${isBelowTarget ? 'bg-amber-50 border border-amber-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                <TrendingUp className={`w-4 h-4 ${isBelowTarget ? 'text-amber-600' : 'text-emerald-600'}`} />
              </span>
              📈 % ความสำเร็จ
            </span>
            <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
              isBelowTarget 
                ? 'bg-amber-50 text-amber-900 border-amber-300' 
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}>
              {isBelowTarget ? <AlertTriangle className="w-3 h-3 text-amber-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              {isBelowTarget ? '⚠️ ต่ำกว่าเป้าหมายรวม' : '✓ บรรลุเป้าหมาย'}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-3xl sm:text-4xl font-black tracking-tight font-mono ${
              isBelowTarget ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {achievementRate.toFixed(1)}%
            </span>
            <span className="text-xs font-bold text-slate-500">ของเป้าหมาย 100%</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>สถานะภาพรวม</span>
            <span className={`font-black px-2 py-0.5 rounded-md ${
              isBelowTarget ? 'text-amber-800 bg-amber-50' : 'text-emerald-800 bg-emerald-50'
            }`}>
              {revenueData.statusNote || (isBelowTarget ? 'ต้องเร่งดันยอดขาย' : 'ยอดขายตามเป้า')}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Pace Run-Rate Section - Eye-Catching Multi-Gradient Bar */}
      <div className="bg-slate-50/80 rounded-xl p-4.5 border border-slate-200 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-2">
          <div className="font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ความคืบหน้าสะสม <span className="text-emerald-700 font-black text-sm">{achievementRate.toFixed(1)}%</span> จากเป้าหมาย {formatMillions(revenueData.targetRevenue)} ล้านบาท
          </div>
          <div className="text-slate-600 font-semibold">
            ยอดคงเหลือที่ต้องทำให้ได้: <strong className="text-rose-600 font-black font-mono">{formatBaht(deficit)} ฿</strong>
          </div>
        </div>

        {/* Master Progress Bar with vibrant dual gradient */}
        <div className="relative w-full h-4 bg-slate-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500 transition-all duration-700 shadow-sm relative"
            style={{ width: `${Math.min(100, Math.max(0, achievementRate))}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Executive Run-Rate Highlights */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 pt-1 gap-2 font-medium">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>
              ยอดขายเฉลี่ยที่สาขาต้องทำต่อวัน (Run Rate): <strong className="text-slate-900 font-black font-mono text-sm">{formatBaht(dailyRequiredRunRate)} ฿ / วัน</strong>
              <span className="text-slate-500 text-[11px] ml-1.5">(คำนวณจาก {daysRemaining} วันที่เหลือ)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-[11px] text-slate-700 bg-white px-3 py-1 rounded-md font-bold border border-slate-200 shadow-2xs">
              เป้าหมาย {revenueData.quarter} · สาขา PIA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
