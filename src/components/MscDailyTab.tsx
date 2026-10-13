import React, { useState } from 'react';
import { BranchDataState } from '../types/mscTypes';
import { TrendingUp, Smartphone, ShieldCheck, Wifi, Sparkles, Laptop, Layers } from 'lucide-react';

interface MscDailyTabProps {
  data: BranchDataState;
}

export const MscDailyTab: React.FC<MscDailyTabProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'iphone' | 'care' | 'sim' | 'film' | 'nb'>('iphone');

  const maxVal = Math.max(...data.dailyTrends.map((d) => {
    if (activeMetric === 'iphone') return d.iphone;
    if (activeMetric === 'care') return d.careIphone;
    if (activeMetric === 'sim') return d.sim;
    if (activeMetric === 'film') return d.film;
    return d.nb || 0;
  }), 1);

  const getMetricVal = (d: typeof data.dailyTrends[0]) => {
    if (activeMetric === 'iphone') return d.iphone;
    if (activeMetric === 'care') return d.careIphone;
    if (activeMetric === 'sim') return d.sim;
    if (activeMetric === 'film') return d.film;
    return d.nb || 0;
  };

  const getMetricTitle = () => {
    if (activeMetric === 'iphone') return 'ยอดขายสมาร์ทโฟน (SMP) รายวัน (เครื่อง)';
    if (activeMetric === 'care') return 'ยอดแนบ UTC+ สำหรับ SMP รายวัน (เครื่อง)';
    if (activeMetric === 'sim') return 'ยอดเปิดเบอร์ SIM รายวัน (ชิ้น)';
    if (activeMetric === 'film') return 'ยอดขายฟิล์มกันรอย รายวัน (ชิ้น)';
    return 'ยอดขายโน้ตบุ๊ก (NB) รายวัน (เครื่อง)';
  };

  const totalSmp = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0);
  const careIphoneAtt = data.staffList.reduce((acc, s) => acc + s.careIphone.attached, 0);
  const careRate = totalSmp > 0 ? (careIphoneAtt / totalSmp) * 100 : 0;

  const simAtt = data.staffList.reduce((acc, s) => acc + s.sim.attached, 0);
  const simRate = totalSmp > 0 ? (simAtt / totalSmp) * 100 : 0;

  const ufundAtt = data.staffList.reduce((acc, s) => acc + s.ufund.attached, 0);
  const ufundRate = totalSmp > 0 ? (ufundAtt / totalSmp) * 100 : 0;

  const filmAtt = data.staffList.reduce((acc, s) => acc + s.film.attached, 0);
  const filmRate = totalSmp > 0 ? (filmAtt / totalSmp) * 100 : 0;

  const totalNb = data.staffList.reduce((acc, s) => acc + s.mac.actualUnits, 0) || 29;
  const sandiskAtt = data.staffList.reduce((acc, s) => acc + s.sandisk.attached, 0);
  const sandiskRate = totalNb > 0 ? (sandiskAtt / totalNb) * 100 : 0;

  const socialCareAtt = data.staffList.reduce((acc, s) => acc + s.careMac.attached, 0);
  const socialCareRate = totalNb > 0 ? (socialCareAtt / totalNb) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* 1. Daily Trend Bar Chart Card - Compact */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xs shadow-2xs">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                {getMetricTitle()}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              กราฟแท่งแสดงยอดขาย ตุลาคม 2569 ของสาขา {data.branchName} (วันที่ 1 - 31)
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg self-end sm:self-auto flex-wrap">
            <button
              onClick={() => setActiveMetric('iphone')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'iphone'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>SMP</span>
            </button>

            <button
              onClick={() => setActiveMetric('care')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'care'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>UTC+</span>
            </button>

            <button
              onClick={() => setActiveMetric('sim')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'sim'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wifi className="w-3 h-3" />
              <span>SIM</span>
            </button>

            <button
              onClick={() => setActiveMetric('film')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'film'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>ฟิล์ม</span>
            </button>

            <button
              onClick={() => setActiveMetric('nb')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'nb'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3 h-3" />
              <span>NB</span>
            </button>
          </div>
        </div>

        {/* Bar chart container - Compact */}
        <div className="pt-1">
          <div className="h-56 sm:h-64 flex items-end gap-1 sm:gap-1.5 px-1 overflow-x-auto pb-3 custom-scrollbar">
            {data.dailyTrends.map((d) => {
              const val = getMetricVal(d);
              const heightPct = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const hasData = val > 0;

              return (
                <div
                  key={d.day}
                  className="flex-1 min-w-[24px] max-w-[36px] flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded mb-1 whitespace-nowrap shadow-xs pointer-events-none">
                    {val} หน่วย
                  </div>

                  {/* Value label */}
                  {hasData && (
                    <span className="text-[10px] font-black text-slate-800 mb-0.5 group-hover:text-blue-600">
                      {val}
                    </span>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      hasData
                        ? 'bg-gradient-to-t from-blue-600 to-indigo-500 group-hover:from-blue-500 group-hover:to-indigo-400 shadow-2xs'
                        : 'bg-slate-100 h-1.5'
                    }`}
                    style={{ height: hasData ? `${Math.max(heightPct, 8)}%` : '5px' }}
                  />

                  {/* Day label */}
                  <span
                    className={`text-[9px] mt-1.5 font-bold ${
                      d.day === 11 ? 'text-indigo-600 font-black' : 'text-slate-400'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Bottom Summary Strip (6 Metrics) - Decorated with Colorful Gradients & Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* UTC+ SMP */}
        <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/25 to-white rounded-xl p-3 border border-indigo-200/90 hover:border-indigo-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-950 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs shadow-2xs border border-indigo-200">🛡️</span>
              <span className="truncate">UTC+ SMP</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              careRate >= data.targets.careIphone
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {careRate >= data.targets.careIphone ? '✓ ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{careRate.toFixed(1)}%</div>
          <div className="text-[9px] text-indigo-900/70 font-medium">เป้า ≥ {data.targets.careIphone}% ({careIphoneAtt}/{totalSmp})</div>
        </div>

        {/* UFUND */}
        <div className="bg-gradient-to-br from-purple-50/90 via-violet-50/25 to-white rounded-xl p-3 border border-purple-200/90 hover:border-purple-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-purple-950 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-xs shadow-2xs border border-purple-200">💳</span>
              <span className="truncate">UFUND</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              ufundRate >= data.targets.ufund
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-rose-100 text-rose-800 border-rose-200'
            }`}>
              {ufundRate >= data.targets.ufund ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{ufundRate.toFixed(1)}%</div>
          <div className="text-[9px] text-purple-900/70 font-medium">เป้า ≥ {data.targets.ufund}% ({ufundAtt}/{totalSmp})</div>
        </div>

        {/* SIM */}
        <div className="bg-gradient-to-br from-sky-50/90 via-cyan-50/25 to-white rounded-xl p-3 border border-sky-200/90 hover:border-sky-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-sky-950 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center text-xs shadow-2xs border border-sky-200">📶</span>
              <span className="truncate">SIM True</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              simRate >= data.targets.sim
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {simRate >= data.targets.sim ? '✓ ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{simRate.toFixed(1)}%</div>
          <div className="text-[9px] text-sky-900/70 font-medium">เป้า ≥ {data.targets.sim}% ({simAtt}/{totalSmp})</div>
        </div>

        {/* ฟิล์ม */}
        <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/25 to-white rounded-xl p-3 border border-amber-200/90 hover:border-amber-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-950 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center text-xs shadow-2xs border border-amber-200">✨</span>
              <span className="truncate">ฟิล์มกันรอย</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              filmRate >= data.targets.film
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-rose-100 text-rose-800 border-rose-200'
            }`}>
              {filmRate >= data.targets.film ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{filmRate.toFixed(1)}%</div>
          <div className="text-[9px] text-amber-900/70 font-medium">เป้า ≥ {data.targets.film}% ({filmAtt}/{totalSmp})</div>
        </div>

        {/* Social Care+ */}
        <div className="bg-gradient-to-br from-rose-50/90 via-pink-50/25 to-white rounded-xl p-3 border border-rose-200/90 hover:border-rose-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-rose-950 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center text-xs shadow-2xs border border-rose-200">🛡️</span>
              <span className="truncate">Social Care+</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              socialCareRate >= data.targets.careMac
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {socialCareRate >= data.targets.careMac ? '✓ ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{socialCareRate.toFixed(1)}%</div>
          <div className="text-[9px] text-rose-900/70 font-medium">เป้า ≥ {data.targets.careMac}% ({socialCareAtt}/{totalNb})</div>
        </div>

        {/* SanDisk */}
        <div className="bg-gradient-to-br from-slate-100/90 via-teal-50/25 to-white rounded-xl p-3 border border-slate-300/90 hover:border-teal-400 shadow-2xs hover:shadow-xs transition-all space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900 flex items-center gap-1">
              <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-2xs border border-slate-300">💾</span>
              <span className="truncate">SanDisk</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${
              sandiskRate >= data.targets.sandisk
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {sandiskRate >= data.targets.sandisk ? '✓ ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">{sandiskRate.toFixed(1)}%</div>
          <div className="text-[9px] text-slate-600 font-medium">เป้า ≥ {data.targets.sandisk}% ({sandiskAtt}/{totalNb})</div>
        </div>
      </div>
    </div>
  );
};
