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
    <div className="space-y-6">
      {/* 1. Daily Trend Bar Chart Card (Screenshot 8) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {getMetricTitle()}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              กราฟแท่งแสดงยอดขาย ตุลาคม 2569 ของสาขา {data.branchName} (วันที่ 1 - 31)
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-end sm:self-auto flex-wrap">
            <button
              onClick={() => setActiveMetric('iphone')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'iphone'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>SMP</span>
            </button>

            <button
              onClick={() => setActiveMetric('care')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'care'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>UTC+</span>
            </button>

            <button
              onClick={() => setActiveMetric('sim')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'sim'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>SIM</span>
            </button>

            <button
              onClick={() => setActiveMetric('film')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'film'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ฟิล์ม</span>
            </button>

            <button
              onClick={() => setActiveMetric('nb')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetric === 'nb'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>NB</span>
            </button>
          </div>
        </div>

        {/* Bar chart container */}
        <div className="pt-2">
          <div className="h-64 sm:h-72 flex items-end gap-1.5 sm:gap-2 px-2 overflow-x-auto pb-4 custom-scrollbar">
            {data.dailyTrends.map((d) => {
              const val = getMetricVal(d);
              const heightPct = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const hasData = val > 0;

              return (
                <div
                  key={d.day}
                  className="flex-1 min-w-[28px] max-w-[42px] flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded mb-1 whitespace-nowrap shadow-sm pointer-events-none">
                    {val} หน่วย
                  </div>

                  {/* Value label */}
                  {hasData && (
                    <span className="text-[11px] font-black text-slate-800 mb-1 group-hover:text-blue-600">
                      {val}
                    </span>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      hasData
                        ? 'bg-gradient-to-t from-blue-600 to-indigo-500 group-hover:from-blue-500 group-hover:to-indigo-400 shadow-xs'
                        : 'bg-slate-100 h-2'
                    }`}
                    style={{ height: hasData ? `${Math.max(heightPct, 8)}%` : '6px' }}
                  />

                  {/* Day label */}
                  <span
                    className={`text-[10px] mt-2 font-bold ${
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

      {/* 2. Bottom Summary Strip (6 Metrics matching Screenshot 8 Bottom) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* UTC+ SMP */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">UTC+ SMP</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              careRate >= data.targets.careIphone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {careRate >= data.targets.careIphone ? 'ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{careRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.careIphone}% ({careIphoneAtt}/{totalSmp})</div>
        </div>

        {/* UFUND */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">UFUND</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              ufundRate >= data.targets.ufund ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {ufundRate >= data.targets.ufund ? 'ผ่าน' : 'ไม่ผ่าน'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{ufundRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.ufund}% ({ufundAtt}/{totalSmp})</div>
        </div>

        {/* SIM */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">SIM</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              simRate >= data.targets.sim ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {simRate >= data.targets.sim ? 'ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{simRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.sim}% ({simAtt}/{totalSmp})</div>
        </div>

        {/* ฟิล์ม */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">ฟิล์มกันรอย</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              filmRate >= data.targets.film ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {filmRate >= data.targets.film ? 'ผ่าน' : 'ไม่ผ่าน'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{filmRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.film}% ({filmAtt}/{totalSmp})</div>
        </div>

        {/* Social Care+ */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Social Care+</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              socialCareRate >= data.targets.careMac ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {socialCareRate >= data.targets.careMac ? 'ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{socialCareRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.careMac}% ({socialCareAtt}/{totalNb})</div>
        </div>

        {/* SanDisk */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">SanDisk</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              sandiskRate >= data.targets.sandisk ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {sandiskRate >= data.targets.sandisk ? 'ผ่าน' : 'ไปอีก'}
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{sandiskRate.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-400">เป้า ≥ {data.targets.sandisk}% ({sandiskAtt}/{totalNb})</div>
        </div>
      </div>
    </div>
  );
};
