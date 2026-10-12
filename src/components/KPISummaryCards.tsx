import React from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Layers, 
  Laptop, 
  HardDrive, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Award,
  Zap
} from 'lucide-react';
import { StaffSummary, KPITargets } from '../types/sales';
import { getKPIStatus } from '../utils/salesCalculations';

interface KPISummaryCardsProps {
  summary: StaffSummary;
  targets: KPITargets;
  mode?: 'all' | 'smp' | 'nb';
  titlePrefix?: string;
}

export const KPISummaryCards: React.FC<KPISummaryCardsProps> = ({
  summary,
  targets,
  mode = 'all',
  titlePrefix = 'ภาพรวมสะสม (MTD)',
}) => {
  const showSMP = mode === 'all' || mode === 'smp';
  const showNB = mode === 'all' || mode === 'nb';

  const smpKPIs = [
    {
      id: 'utcSmp',
      title: 'UTC+ For SMP',
      subtitle: 'ประกันจอแตก & เครื่องตกน้ำ',
      icon: ShieldCheck,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border border-blue-200/80',
      barColor: 'bg-blue-500',
      accentColor: 'text-blue-700',
      actualRate: summary.utcSmpRate,
      targetRate: targets.utcSmp,
      count: summary.totalUtcSmp,
      base: summary.totalSmp,
      unit: 'เครื่อง',
    },
    {
      id: 'ufund',
      title: 'UFUND APPIN',
      subtitle: 'สินเชื่อผ่อนเครื่องนักศึกษา/ทั่วไป',
      icon: CreditCard,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border border-emerald-200/80',
      barColor: 'bg-emerald-500',
      accentColor: 'text-emerald-700',
      actualRate: summary.ufundRate,
      targetRate: targets.ufund,
      count: summary.totalUfund,
      base: summary.totalSmp,
      unit: 'สัญญา',
    },
    {
      id: 'sim',
      title: 'เปิดเบอร์ SIM',
      subtitle: 'ซิมรายเดือนพร้อมแพ็กเกจพิเศษ',
      icon: Smartphone,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border border-purple-200/80',
      barColor: 'bg-purple-500',
      accentColor: 'text-purple-700',
      actualRate: summary.simRate,
      targetRate: targets.sim,
      count: summary.totalSim,
      base: summary.totalSmp,
      unit: 'ซิม',
    },
    {
      id: 'film',
      title: 'ฟิล์มกันรอย (Film)',
      subtitle: 'บริการติดฟิล์มกระจกและกันรอยรอบตัว',
      icon: Layers,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border border-amber-200/80',
      barColor: 'bg-amber-500',
      accentColor: 'text-amber-700',
      actualRate: summary.filmRate,
      targetRate: targets.film,
      count: summary.totalFilm,
      base: summary.totalSmp,
      unit: 'ชิ้น',
    },
  ];

  const nbKPIs = [
    {
      id: 'tiCare',
      title: 'TI Care (NB)',
      subtitle: 'ประกันและบำรุงรักษาตัวเครื่อง',
      icon: Laptop,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border border-sky-200/80',
      barColor: 'bg-sky-500',
      accentColor: 'text-sky-700',
      actualRate: summary.tiCareRate,
      targetRate: targets.tiCare,
      count: summary.totalTiCare,
      base: summary.totalNb,
      unit: 'เครื่อง',
    },
    {
      id: 'socialCare',
      title: 'Social Care+ (NB)',
      subtitle: 'แพ็กเกจดูแลและทำความสะอาดเครื่อง',
      icon: Sparkles,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50 border border-pink-200/80',
      barColor: 'bg-pink-500',
      accentColor: 'text-pink-700',
      actualRate: summary.socialCareRate,
      targetRate: targets.socialCare,
      count: summary.totalSocialCare,
      base: summary.totalNb,
      unit: 'บริการ',
    },
    {
      id: 'utcGadget',
      title: 'UTC+ For Gadget',
      subtitle: 'ประกันอุปกรณ์เสริมและแก็ดเจ็ต',
      icon: ShieldCheck,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50 border border-teal-200/80',
      barColor: 'bg-teal-500',
      accentColor: 'text-teal-700',
      actualRate: summary.utcGadgetRate,
      targetRate: targets.utcGadget,
      count: summary.totalUtcGadget,
      base: summary.totalNb,
      unit: 'ชิ้น',
    },
    {
      id: 'sandisk',
      title: 'SanDisk Storage',
      subtitle: 'การ์ดความจำ Flash Drive & SSD',
      icon: HardDrive,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border border-rose-200/80',
      barColor: 'bg-rose-500',
      accentColor: 'text-rose-700',
      actualRate: summary.sandiskRate,
      targetRate: targets.sandisk,
      count: summary.totalSandisk,
      base: summary.totalNb,
      unit: 'ชิ้น',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Main Summary Cards - Eye-Catching Executive Sales Figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Devices Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 tracking-wide">
              รวมทุกเครื่อง (SMP + NB)
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold shadow-2xs">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              {summary.totalDevices.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              เครื่องทั้งหมด
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              📱 SMP: <strong className="text-slate-900 font-bold">{summary.totalSmp}</strong>
            </span>
            <span className="flex items-center gap-1">
              💻 NB: <strong className="text-slate-900 font-bold">{summary.totalNb}</strong>
            </span>
          </div>
        </div>

        {/* SMP Units Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 tracking-wide">
              ยอดขายสมาร์ทโฟน (SMP)
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-bold shadow-2xs">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              {summary.totalSmp.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">เครื่อง</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>สัดส่วนยอดขาย</span>
            <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
              {summary.totalDevices > 0 ? ((summary.totalSmp / summary.totalDevices) * 100).toFixed(1) : 0}% ของสาขา
            </span>
          </div>
        </div>

        {/* NB Units Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 tracking-wide">
              ยอดขายโน้ตบุ๊ก (NB)
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-bold shadow-2xs">
              <Laptop className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              {summary.totalNb.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">เครื่อง</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>สัดส่วนยอดขาย</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              {summary.totalDevices > 0 ? ((summary.totalNb / summary.totalDevices) * 100).toFixed(1) : 0}% ของสาขา
            </span>
          </div>
        </div>

        {/* Top Attached Service Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-rose-300 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-rose-500" />
              บริการแนบยอดนิยม
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold shadow-2xs">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              {summary.totalSandisk}
            </span>
            <span className="text-xs font-bold text-slate-700">ชิ้น (SanDisk)</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>อัตราแนบ NB จริง:</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {summary.sandiskRate.toFixed(1)}% (เป้า 50%)
            </span>
          </div>
        </div>
      </div>

      {/* SMP KPI Grid - Distinct Palettes */}
      {showSMP && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                อัตราแนบหมวดสมาร์ทโฟน (Smartphone Attachment KPIs)
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              ฐานยอดขาย SMP: {summary.totalSmp} เครื่อง
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {smpKPIs.map((kpi) => {
              const Icon = kpi.icon;
              const status = getKPIStatus(kpi.actualRate, kpi.targetRate);
              const progressPct = Math.min(100, Math.max(0, (kpi.actualRate / kpi.targetRate) * 100));

              return (
                <div
                  key={kpi.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${kpi.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                          <Icon className={`w-4.5 h-4.5 ${kpi.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900 leading-snug">
                            {kpi.title}
                          </h3>
                          <p className="text-[11px] text-slate-500">{kpi.subtitle}</p>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0 border ${
                        status.status === 'passed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : status.status === 'warning'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {status.status === 'passed' && '✓ ผ่านเป้า'}
                        {status.status === 'warning' && 'ใกล้เคียง'}
                        {status.status === 'danger' && 'ต่ำกว่าเป้า'}
                      </span>
                    </div>

                    {/* Rates */}
                    <div className="mt-4 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-3xl font-black tracking-tight font-mono ${
                          status.status === 'passed' ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                          {kpi.actualRate.toFixed(1)}%
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          / เป้า {kpi.targetRate}%
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                        {kpi.count} {kpi.unit}
                      </span>
                    </div>

                    {/* Progress Bar with vibrant color */}
                    <div className="mt-3">
                      <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status.status === 'passed'
                              ? 'bg-emerald-500'
                              : status.status === 'warning'
                              ? 'bg-amber-400'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, (kpi.actualRate / (kpi.targetRate * 1.5)) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
                        <span>สำเร็จ {progressPct.toFixed(0)}% ของเป้า</span>
                        <span className={`font-bold ${status.diff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {status.diff >= 0 ? `+${status.diff.toFixed(1)}%` : `${status.diff.toFixed(1)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* NB KPI Grid - Distinct Palettes */}
      {showNB && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                อัตราแนบหมวดโน้ตบุ๊ก (Notebook Attachment KPIs)
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              ฐานยอดขาย NB: {summary.totalNb} เครื่อง
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nbKPIs.map((kpi) => {
              const Icon = kpi.icon;
              const status = getKPIStatus(kpi.actualRate, kpi.targetRate);
              const progressPct = Math.min(100, Math.max(0, (kpi.actualRate / kpi.targetRate) * 100));

              return (
                <div
                  key={kpi.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${kpi.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                          <Icon className={`w-4.5 h-4.5 ${kpi.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900 leading-snug">
                            {kpi.title}
                          </h3>
                          <p className="text-[11px] text-slate-500">{kpi.subtitle}</p>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0 border ${
                        status.status === 'passed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : status.status === 'warning'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {status.status === 'passed' && '✓ ผ่านเป้า'}
                        {status.status === 'warning' && 'ใกล้เคียง'}
                        {status.status === 'danger' && 'ต่ำกว่าเป้า'}
                      </span>
                    </div>

                    {/* Rates */}
                    <div className="mt-4 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-3xl font-black tracking-tight font-mono ${
                          status.status === 'passed' ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                          {kpi.actualRate.toFixed(1)}%
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          / เป้า {kpi.targetRate}%
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                        {kpi.count} {kpi.unit}
                      </span>
                    </div>

                    {/* Progress Bar with vibrant colors */}
                    <div className="mt-3">
                      <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status.status === 'passed'
                              ? 'bg-emerald-500'
                              : status.status === 'warning'
                              ? 'bg-amber-400'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, (kpi.actualRate / (kpi.targetRate * 1.5)) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
                        <span>สำเร็จ {progressPct.toFixed(0)}% ของเป้า</span>
                        <span className={`font-bold ${status.diff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {status.diff >= 0 ? `+${status.diff.toFixed(1)}%` : `${status.diff.toFixed(1)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
