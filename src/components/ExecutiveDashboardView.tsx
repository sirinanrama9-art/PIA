import React, { useState } from 'react';
import { 
  StaffInfo, 
  StaffRecordsMap, 
  KPITargets, 
  StaffSummary, 
  DailySummary, 
  BranchRevenueKPI 
} from '../types/sales';
import { calculateStaffSummary } from '../utils/salesCalculations';
import { DayInspector } from './DayInspector';
import { Edit3 } from 'lucide-react';

interface ExecutiveDashboardViewProps {
  revenueData: BranchRevenueKPI;
  onUpdateRevenue: (updated: BranchRevenueKPI) => void;
  summary: StaffSummary;
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  dailySummaries: DailySummary[];
  targets: KPITargets;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onEditDayStaff: (staffId: string, day: number) => void;
  onOpenLineModalForDay: (day: number) => void;
  onOpenQuickEntry: () => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  revenueData,
  onUpdateRevenue,
  summary,
  staffList,
  records,
  dailySummaries,
  targets,
  selectedDay,
  onSelectDay,
  onEditDayStaff,
  onOpenLineModalForDay,
}) => {
  const [isEditingRevenue, setIsEditingRevenue] = useState<boolean>(false);
  const [tempActual, setTempActual] = useState<number>(revenueData.actualRevenue);
  const [tempTarget, setTempTarget] = useState<number>(revenueData.targetRevenue);
  const [tempQuarter, setTempQuarter] = useState<string>(revenueData.quarter);
  const [tempDaysRemaining, setTempDaysRemaining] = useState<number>(revenueData.daysRemainingInPeriod || 20);

  // Revenue calculations
  const deficit = Math.max(0, revenueData.targetRevenue - revenueData.actualRevenue);
  const achievementRate = revenueData.targetRevenue > 0 
    ? (revenueData.actualRevenue / revenueData.targetRevenue) * 100 
    : 0;
  const daysRemaining = revenueData.daysRemainingInPeriod || 20;
  const dailyRunRate = daysRemaining > 0 ? deficit / daysRemaining : 0;

  const handleSaveRevenue = () => {
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
    setIsEditingRevenue(false);
  };

  const handleCancelRevenue = () => {
    setTempActual(revenueData.actualRevenue);
    setTempTarget(revenueData.targetRevenue);
    setTempQuarter(revenueData.quarter);
    setTempDaysRemaining(revenueData.daysRemainingInPeriod || 20);
    setIsEditingRevenue(false);
  };

  const formatBaht = (num: number) => new Intl.NumberFormat('th-TH').format(Math.round(num));
  const formatMillions = (num: number) => (num / 1000000).toFixed(2);

  // Staff ranking calculation
  const staffSummaries = staffList.map(s => calculateStaffSummary(s, records));
  const sortedStaff = [...staffSummaries].sort((a, b) => b.totalDevices - a.totalDevices);

  // Splits
  const totalUnits = summary.totalDevices;
  const smpSplit = totalUnits > 0 ? ((summary.totalSmp / totalUnits) * 100).toFixed(1) : '0';
  const nbSplit = totalUnits > 0 ? ((summary.totalNb / totalUnits) * 100).toFixed(1) : '0';

  // Find max bar height for volume trend chart
  const maxVolume = Math.max(...dailySummaries.map(d => d.totalDevices), 15);

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout matching Variation 8: main { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; } */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-start">
        {/* LEFT SIDE PANEL */}
        <aside className="side-panel flex flex-col gap-6">
          {/* Card 1: Summary Progress */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="label">Summary Progress</div>
              <button
                onClick={() => setIsEditingRevenue(!isEditingRevenue)}
                className="text-stone-400 hover:text-stone-800 transition-colors cursor-pointer p-1"
                title="Edit Target & Actual Revenue"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isEditingRevenue ? (
              <div className="space-y-2.5 pt-1 text-xs">
                <div>
                  <label className="label block mb-0.5">ยอดขายจริง (บาท):</label>
                  <input
                    type="number"
                    value={tempActual}
                    onChange={(e) => setTempActual(Number(e.target.value))}
                    className="w-full bg-[#F9F6EE] border border-[rgba(28,25,23,0.15)] rounded-[3px] p-1.5 font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="label block mb-0.5">เป้าหมายรวม (บาท):</label>
                  <input
                    type="number"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(Number(e.target.value))}
                    className="w-full bg-[#F9F6EE] border border-[rgba(28,25,23,0.15)] rounded-[3px] p-1.5 font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="label block mb-0.5">วันที่เหลือ (วัน):</label>
                  <input
                    type="number"
                    value={tempDaysRemaining}
                    onChange={(e) => setTempDaysRemaining(Number(e.target.value))}
                    className="w-full bg-[#F9F6EE] border border-[rgba(28,25,23,0.15)] rounded-[3px] p-1.5 font-mono text-xs font-bold"
                  />
                </div>
                <div className="flex gap-1.5 pt-1">
                  <button
                    onClick={handleSaveRevenue}
                    className="flex-1 bg-[#EAB308] text-[#1C1917] font-bold py-1.5 rounded-[3px] text-[10px] uppercase cursor-pointer"
                  >
                    บันทึก
                  </button>
                  <button
                    onClick={handleCancelRevenue}
                    className="px-2.5 bg-stone-200 text-stone-700 font-bold py-1.5 rounded-[3px] text-[10px] uppercase cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="stat-value text-[#1C1917]">
                  {achievementRate.toFixed(1)}%
                </div>
                <div className="label font-bold text-[#1C1917]" style={{ opacity: 1 }}>
                  {formatMillions(revenueData.actualRevenue)}M / {formatMillions(revenueData.targetRevenue)}M ฿
                </div>

                {/* Progress Rail (4px) matching Variation 8 */}
                <div className="progress-rail">
                  <div
                    className="progress-bar"
                    style={{ width: `${Math.min(100, Math.max(0, achievementRate))}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-[rgba(28,25,23,0.08)]">
                  <div className="label text-[9px]">
                    Run Rate: {formatBaht(dailyRunRate)} ฿/วัน
                  </div>
                  <span className="label text-[9px] font-bold">
                    ขาดอีก {formatMillions(deficit)}M ฿
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Card 2: Daily Volume Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="label">Daily Volume Trend</div>
              <span className="label text-[9px]">1 - 31 DAYS</span>
            </div>

            {/* Bar Chart matching Variation 8: .chart-mock { display: flex; align-items: flex-end; gap: 4px; height: 120px; } */}
            <div className="chart-mock overflow-x-auto custom-scrollbar">
              {dailySummaries.slice(0, 31).map((d) => {
                const heightPct = (d.totalDevices / maxVolume) * 90;
                const isSelected = selectedDay === d.day;
                const hasData = d.hasData;

                return (
                  <div
                    key={d.day}
                    onClick={() => onSelectDay(selectedDay === d.day ? 0 : d.day)}
                    className="flex-1 min-w-[7px] max-w-[12px] h-full flex flex-col justify-end items-center cursor-pointer group"
                    title={`Day ${d.day}: ${d.totalDevices} units (SMP ${d.smpUnits}, NB ${d.nbUnits})`}
                  >
                    <div
                      style={{ height: `${Math.max(hasData ? 6 : 2, heightPct)}%` }}
                      className={`w-full rounded-[1px] transition-all ${
                        isSelected
                          ? 'bg-[#EAB308] ring-1 ring-stone-900'
                          : hasData
                          ? 'bg-[#1C1917] group-hover:bg-[#EAB308]'
                          : 'bg-[#F9F6EE]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="label text-center mt-3">
              {selectedDay > 0 ? `Selected: Day ${selectedDay}` : 'M-T-D Activity'}
            </div>
          </div>

          {/* Card 3: Top Performers */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="label">Top Performers</div>
              <span className="label text-[9px]">RANKING</span>
            </div>

            <div className="space-y-0">
              {sortedStaff.map((staff, idx) => (
                <div
                  key={staff.staffId}
                  onClick={() => onEditDayStaff(staff.staffId, selectedDay > 0 ? selectedDay : 11)}
                  className="staff-pill cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="label font-bold">#{idx + 1}</span>
                    <span className="font-extrabold text-sm text-[#1C1917]">
                      {staff.name} <span className="label font-normal">[{staff.staffId}]</span>
                    </span>
                  </div>
                  <span className="badge">
                    {staff.totalDevices} Units
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <section className="main-content flex flex-col gap-6 sm:gap-8">
          {/* Stat Group (4-Column Connected Grid matching Variation 8) */}
          <div className="stat-group">
            {/* Total Units */}
            <div className="stat-box">
              <div className="label mb-2">Total Units</div>
              <div className="stat-value text-[#1C1917]">
                {summary.totalDevices}
              </div>
              <span className="badge">
                SMP + NB
              </span>
            </div>

            {/* Smartphone */}
            <div className="stat-box">
              <div className="label mb-2">Smartphone</div>
              <div className="stat-value text-[#1C1917]">
                {summary.totalSmp}
              </div>
              <span className="badge">
                {smpSplit}% Split
              </span>
            </div>

            {/* Notebook */}
            <div className="stat-box">
              <div className="label mb-2">Notebook</div>
              <div className="stat-value text-[#1C1917]">
                {summary.totalNb}
              </div>
              <span className="badge">
                {nbSplit}% Split
              </span>
            </div>

            {/* SanDisk Attach */}
            <div className="stat-box">
              <div className="label mb-2">SanDisk Attach</div>
              <div className="stat-value text-[#1C1917]">
                {summary.totalSandisk}
              </div>
              <span className="badge">
                Top Service
              </span>
            </div>
          </div>

          {/* Smartphone Attachment KPIs */}
          <div>
            <div className="label mb-2 text-[#1C1917]">Smartphone Attachment KPIs</div>
            <div className="kpi-grid">
              {/* UTC+ SMP */}
              <div className="kpi-card">
                <div className="label">UTC+ SMP</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.utcSmpRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.utcSmpRate >= targets.utcSmp ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.utcSmpRate >= targets.utcSmp ? 'Goal Passed' : `Low: Goal ${targets.utcSmp}%`}
                </div>
              </div>

              {/* UFUND APPIN */}
              <div className="kpi-card">
                <div className="label">UFUND APPIN</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.ufundRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.ufundRate >= targets.ufund ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.ufundRate >= targets.ufund ? 'Goal Passed' : `Low: Goal ${targets.ufund}%`}
                </div>
              </div>

              {/* SIM Activation */}
              <div className="kpi-card">
                <div className="label">SIM Activation</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.simRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.simRate >= targets.sim ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.simRate >= targets.sim ? 'Goal Passed' : `Low: Goal ${targets.sim}%`}
                </div>
              </div>

              {/* Film Protection */}
              <div className="kpi-card">
                <div className="label">Film Protection</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.filmRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.filmRate >= targets.film ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.filmRate >= targets.film ? 'Goal Passed' : `Low: Goal ${targets.film}%`}
                </div>
              </div>
            </div>
          </div>

          {/* Notebook & Gadget KPIs */}
          <div>
            <div className="label mb-2 text-[#1C1917]">Notebook & Gadget KPIs</div>
            <div className="kpi-grid">
              {/* Social Care+ */}
              <div className="kpi-card">
                <div className="label">Social Care+</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.socialCareRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.socialCareRate >= targets.socialCare ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.socialCareRate >= targets.socialCare ? `Goal ${targets.socialCare}% Passed` : `Low: Goal ${targets.socialCare}%`}
                </div>
              </div>

              {/* UTC+ Gadget */}
              <div className="kpi-card">
                <div className="label">UTC+ Gadget</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.utcGadgetRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.utcGadgetRate >= targets.utcGadget ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.utcGadgetRate >= targets.utcGadget ? `Goal ${targets.utcGadget}% Passed` : `Low: Goal ${targets.utcGadget}%`}
                </div>
              </div>

              {/* SanDisk NB */}
              <div className="kpi-card">
                <div className="label">SanDisk NB</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.sandiskRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.sandiskRate >= targets.sandisk ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.sandiskRate >= targets.sandisk ? `Goal ${targets.sandisk}% Passed` : `Low: Goal ${targets.sandisk}%`}
                </div>
              </div>

              {/* TI Care (NB) */}
              <div className="kpi-card">
                <div className="label">TI Care (NB)</div>
                <div className="text-2xl font-black text-[#1C1917] my-1 tracking-tight">
                  {summary.tiCareRate.toFixed(1)}%
                </div>
                <div className={`label text-[10px] font-bold ${
                  summary.tiCareRate >= targets.tiCare ? 'text-emerald-700' : 'text-rose-700'
                }`} style={{ opacity: 1 }}>
                  {summary.tiCareRate >= targets.tiCare ? `Goal ${targets.tiCare}% Passed` : `Low: Goal ${targets.tiCare}%`}
                </div>
              </div>
            </div>
          </div>

          {/* If a day is selected, show Day Inspector right here */}
          {selectedDay > 0 && (
            <DayInspector
              day={selectedDay}
              staffList={staffList}
              records={records}
              targets={targets}
              onSelectDay={onSelectDay}
              onEditDayStaff={onEditDayStaff}
              onOpenLineModalForDay={onOpenLineModalForDay}
            />
          )}
        </section>
      </div>
    </div>
  );
};
