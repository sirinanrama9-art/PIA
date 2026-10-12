import React, { useState } from 'react';
import { DailySummary } from '../types/sales';
import { TrendingUp, Info } from 'lucide-react';

interface DailyTrendChartProps {
  dailySummaries: DailySummary[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const DailyTrendChart: React.FC<DailyTrendChartProps> = ({
  dailySummaries,
  selectedDay,
  onSelectDay,
}) => {
  const [metricMode, setMetricMode] = useState<'units' | 'smpAttach' | 'nbAttach'>('units');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const maxUnits = Math.max(...dailySummaries.map((d) => d.totalDevices), 20);
  const activeDaysCount = dailySummaries.filter((d) => d.hasData).length;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 relative overflow-hidden">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              แนวโน้มยอดขายรายวัน (1 - 31 วัน)
            </h3>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
              มีข้อมูล {activeDaysCount} วัน
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            คลิกที่แท่งกราฟเพื่อดูรายละเอียดยอดขายของแต่ละวัน · แสดงการแยกยอดขาย SMP และ NB
          </p>
        </div>

        {/* Metric Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setMetricMode('units')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              metricMode === 'units'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            จำนวนเครื่อง (Units)
          </button>
          <button
            onClick={() => setMetricMode('smpAttach')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              metricMode === 'smpAttach'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัตราแนบ SMP (%)
          </button>
          <button
            onClick={() => setMetricMode('nbAttach')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              metricMode === 'nbAttach'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัตราแนบ NB (%)
          </button>
        </div>
      </div>

      {/* Interactive Chart */}
      <div className="relative pt-4 pb-2">
        <div className="h-56 w-full flex items-end gap-1 sm:gap-1.5 overflow-x-auto custom-scrollbar px-1">
          {dailySummaries.map((summary) => {
            const isSelected = selectedDay === summary.day;
            const isHovered = hoveredDay === summary.day;
            const hasData = summary.hasData;

            let smpHeightPct = 0;
            let nbHeightPct = 0;
            let attachHeightPct = 0;

            if (metricMode === 'units') {
              smpHeightPct = (summary.smpUnits / maxUnits) * 85;
              nbHeightPct = (summary.nbUnits / maxUnits) * 85;
            } else if (metricMode === 'smpAttach') {
              attachHeightPct = Math.min(100, summary.utcSmpRate);
            } else {
              attachHeightPct = Math.min(100, summary.socialCareRate);
            }

            return (
              <div
                key={summary.day}
                onMouseEnter={() => setHoveredDay(summary.day)}
                onMouseLeave={() => setHoveredDay(null)}
                onClick={() => onSelectDay(summary.day === selectedDay ? 0 : summary.day)}
                className={`flex-1 min-w-[24px] sm:min-w-[28px] h-full flex flex-col justify-end items-center cursor-pointer group transition-all relative ${
                  isSelected ? 'scale-105' : ''
                }`}
              >
                {/* Value label on top for active days */}
                {hasData && (
                  <span className={`text-[10px] font-black mb-1.5 transition-colors font-mono ${
                    isSelected ? 'text-indigo-600 font-black scale-110' : 'text-slate-600 group-hover:text-slate-900'
                  }`}>
                    {metricMode === 'units'
                      ? summary.totalDevices
                      : metricMode === 'smpAttach'
                      ? `${summary.utcSmpRate.toFixed(0)}%`
                      : `${summary.socialCareRate.toFixed(0)}%`}
                  </span>
                )}

                {/* Bars - Distinct High-Contrast Eye-Catching Sales Palette */}
                <div className={`w-full max-w-[22px] rounded-t-md flex flex-col justify-end transition-all ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white shadow-sm'
                    : isHovered
                    ? 'opacity-90'
                    : ''
                }`}>
                  {metricMode === 'units' ? (
                    <div className="w-full flex flex-col justify-end gap-0.5">
                      {/* Notebook bar - Rich Indigo */}
                      {summary.nbUnits > 0 && (
                        <div
                          style={{ height: `${Math.max(4, nbHeightPct)}%` }}
                          className={`w-full rounded-t-xs transition-all ${
                            isSelected ? 'bg-indigo-600' : 'bg-indigo-500 group-hover:bg-indigo-600'
                          }`}
                          title={`NB: ${summary.nbUnits} เครื่อง`}
                        />
                      )}
                      {/* SMP bar - Sky/Cyan */}
                      <div
                        style={{ height: `${Math.max(hasData ? 6 : 2, smpHeightPct)}%` }}
                        className={`w-full ${summary.nbUnits === 0 ? 'rounded-t-xs' : ''} transition-all ${
                          !hasData
                            ? 'bg-slate-100'
                            : isSelected
                            ? 'bg-sky-500'
                            : 'bg-sky-400 group-hover:bg-sky-500'
                        }`}
                        title={`SMP: ${summary.smpUnits} เครื่อง`}
                      />
                    </div>
                  ) : metricMode === 'smpAttach' ? (
                    <div
                      style={{ height: `${Math.max(hasData ? 4 : 2, (attachHeightPct / 100) * 85)}%` }}
                      className={`w-full rounded-t-xs transition-all ${
                        !hasData
                          ? 'bg-slate-100'
                          : summary.utcSmpRate >= 40
                          ? 'bg-emerald-500'
                          : summary.utcSmpRate >= 30
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                    />
                  ) : (
                    <div
                      style={{ height: `${Math.max(hasData ? 4 : 2, (attachHeightPct / 100) * 85)}%` }}
                      className={`w-full rounded-t-xs transition-all ${
                        !hasData
                          ? 'bg-slate-100'
                          : summary.socialCareRate >= 30
                          ? 'bg-emerald-500'
                          : summary.socialCareRate >= 20
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                    />
                  )}
                </div>

                {/* Day number bottom */}
                <span
                  className={`mt-2 text-[11px] font-bold py-0.5 px-1.5 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : hasData
                      ? 'text-slate-800 bg-slate-100 border border-slate-200'
                      : 'text-slate-300'
                  }`}
                >
                  {summary.day}
                </span>

                {/* Tooltip on hover */}
                {isHovered && hasData && (
                  <div className="absolute bottom-full mb-3 z-30 bg-slate-900 text-white rounded-xl p-3 text-xs shadow-xl whitespace-nowrap pointer-events-none transform -translate-x-1/2 left-1/2 border border-slate-700">
                    <div className="font-black text-slate-100 flex items-center justify-between gap-3 pb-1.5 border-b border-slate-700">
                      <span>📅 วันที่ {summary.day}</span>
                      <span className="text-emerald-400 font-bold">{summary.totalDevices} เครื่อง</span>
                    </div>
                    <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                      <div className="flex justify-between gap-4">
                        <span>📱 SMP:</span>
                        <strong className="text-white">{summary.smpUnits} เครื่อง</strong>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>💻 NB:</span>
                        <strong className="text-white">{summary.nbUnits} เครื่อง</strong>
                      </div>
                      <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
                        <span>🛡️ UTC+ (SMP):</span>
                        <strong className={summary.utcSmpRate >= 40 ? 'text-emerald-400' : 'text-amber-400'}>
                          {summary.utcSmpRate.toFixed(1)}%
                        </strong>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>✨ Social Care (NB):</span>
                        <strong className={summary.socialCareRate >= 30 ? 'text-emerald-400' : 'text-amber-400'}>
                          {summary.socialCareRate.toFixed(1)}%
                        </strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
        <div className="flex items-center gap-4">
          {metricMode === 'units' ? (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-sky-400" />
                <span>สมาร์ทโฟน (SMP)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-indigo-500" />
                <span>โน้ตบุ๊ก (NB)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-emerald-500" />
                <span>ผ่านเกณฑ์เป้าหมาย</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-amber-400" />
                <span>ใกล้เคียงเป้าหมาย</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-rose-500" />
                <span>ต่ำกว่าเกณฑ์</span>
              </div>
            </>
          )}
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          <span>คลิกที่แท่งเพื่อเปิดดูรายละเอียดพนักงาน 4 ท่านในวันนั้น</span>
        </div>
      </div>
    </div>
  );
};
