import React, { useState } from 'react';
import { BranchDataState } from '../types/mscTypes';
import { 
  Calculator, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  Plus, 
  Minus, 
  Check, 
  Users, 
  Calendar,
  ChevronRight,
  Target
} from 'lucide-react';

interface MscSimulatorTabProps {
  data: BranchDataState;
}

export const MscSimulatorTab: React.FC<MscSimulatorTabProps> = ({ data }) => {
  // Selected staff for simulation
  const [selectedStaffId, setSelectedStaffId] = useState<string>(data.staffList[3]?.staffId || data.staffList[0]?.staffId || '35350');
  const staff = data.staffList.find((s) => s.staffId === selectedStaffId) || data.staffList[0];

  // Simulator adjustments for selected staff
  const [deltas, setDeltas] = useState<Record<string, number>>({
    smartphone: 0,
    careSmartphone: 0,
    diy: 0,
    careSocial: 0,
    notebook: 0,
    careTi: 0,
    desktop: 0,
    careGadget: 0,
    sim: 0,
    ufund: 0,
    film: 0,
    sandisk: 0,
  });

  const handleAdjust = (field: string, amount: number) => {
    setDeltas((prev) => ({
      ...prev,
      [field]: Math.max(0, (prev[field] || 0) + amount),
    }));
  };

  const handleReset = () => {
    setDeltas({
      smartphone: 0,
      careSmartphone: 0,
      diy: 0,
      careSocial: 0,
      notebook: 0,
      careTi: 0,
      desktop: 0,
      careGadget: 0,
      sim: 0,
      ufund: 0,
      film: 0,
      sandisk: 0,
    });
  };

  const handlePresetPassAll = () => {
    // Quick preset to pass all minimums for selected staff
    setDeltas({
      smartphone: 5,
      careSmartphone: 8,
      diy: 2,
      careSocial: 4,
      notebook: 2,
      careTi: 2,
      desktop: 1,
      careGadget: 2,
      sim: 6,
      ufund: 10,
      film: 15,
      sandisk: 8,
    });
  };

  const handlePresetSmartphone5 = () => {
    setDeltas((prev) => ({
      ...prev,
      smartphone: (prev.smartphone || 0) + 5,
      careSmartphone: (prev.careSmartphone || 0) + 3,
      ufund: (prev.ufund || 0) + 4,
    }));
  };

  // Forecast Target settings
  const [targetLevelPct, setTargetLevelPct] = useState<number>(100);
  const [daysRemaining, setDaysRemaining] = useState<number>(data.daysRemaining || 19);
  const [includeToday, setIncludeToday] = useState<boolean>(false);

  // New simulated values for the staff
  const baseSmpUnits = staff.iphone.actualUnits;
  const newSmpUnits = baseSmpUnits + (deltas.smartphone || 0);
  const newCareSmp = staff.careIphone.attached + (deltas.careSmartphone || 0);
  const newCareSmpRate = newSmpUnits > 0 ? (newCareSmp / newSmpUnits) * 100 : 0;

  const baseDiyUnits = staff.ipad.actualUnits;
  const newDiyUnits = baseDiyUnits + (deltas.diy || 0);

  const baseNbUnits = staff.mac.actualUnits;
  const newNbUnits = baseNbUnits + (deltas.notebook || 0);
  const newCareTi = staff.careIpad.attached + (deltas.careTi || 0);
  const newCareTiRate = newNbUnits > 0 ? (newCareTi / newNbUnits) * 100 : 0;

  const baseDesktopUnits = staff.appleWatch.actualUnits;
  const newDesktopUnits = baseDesktopUnits + (deltas.desktop || 0);

  const newSocialCare = staff.careMac.attached + (deltas.careSocial || 0);
  const newSocialCareRate = newSmpUnits > 0 ? (newSocialCare / newSmpUnits) * 100 : 0;

  const newCareGadget = staff.careWatch.attached + (deltas.careGadget || 0);
  const newCareGadgetRate = newSmpUnits > 0 ? (newCareGadget / newSmpUnits) * 100 : 0;

  const newSim = staff.sim.attached + (deltas.sim || 0);
  const newSimRate = newSmpUnits > 0 ? (newSim / newSmpUnits) * 100 : 0;

  const newUfund = staff.ufund.attached + (deltas.ufund || 0);
  const newUfundRate = newSmpUnits > 0 ? (newUfund / newSmpUnits) * 100 : 0;

  const newFilm = staff.film.attached + (deltas.film || 0);
  const newFilmRate = newSmpUnits > 0 ? (newFilm / newSmpUnits) * 100 : 0;

  const newSandisk = staff.sandisk.attached + (deltas.sandisk || 0);
  const newSandiskRate = newSmpUnits > 0 ? (newSandisk / newSmpUnits) * 100 : 0;

  // Team simulation impact
  const baseTeamSmp = 170;
  const totalTeamUnits = 208;
  const totalAddedUnits = (deltas.smartphone || 0) + (deltas.diy || 0) + (deltas.notebook || 0) + (deltas.desktop || 0);

  const teamCareSmpOld = 40;
  const teamCareSmpNew = teamCareSmpOld + (deltas.careSmartphone || 0);
  const teamCareSmpNewPct = (teamCareSmpNew / (baseTeamSmp + (deltas.smartphone || 0))) * 100;

  const teamSimOld = 13;
  const teamSimNew = teamSimOld + (deltas.sim || 0);
  const teamSimNewPct = (teamSimNew / (baseTeamSmp + (deltas.smartphone || 0))) * 100;

  const teamUfundOld = 15;
  const teamUfundNew = teamUfundOld + (deltas.ufund || 0);
  const teamUfundNewPct = (teamUfundNew / (baseTeamSmp + (deltas.smartphone || 0))) * 100;

  const teamFilmOld = 30;
  const teamFilmNew = teamFilmOld + (deltas.film || 0);
  const teamFilmNewPct = (teamFilmNew / (baseTeamSmp + (deltas.smartphone || 0))) * 100;

  // Forecast numbers for selected staff
  const staffTargetTotal = 2557587 * (targetLevelPct / 100);
  const staffActualTotal = staff.iphone.actualRevenue + staff.ipad.actualRevenue + staff.mac.actualRevenue + staff.appleWatch.actualRevenue;
  const staffNeededTotal = Math.max(0, staffTargetTotal - staffActualTotal);
  const effectiveDays = includeToday ? daysRemaining + 1 : daysRemaining;
  const runRatePerDay = effectiveDays > 0 ? staffNeededTotal / effectiveDays : 0;

  return (
    <div className="space-y-4">
      {/* 1. Simulator Header Card - Decorated & Compact */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/30 to-white rounded-2xl p-4 sm:p-5 border border-indigo-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-100/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm shadow-xs shadow-indigo-600/30">
                <Calculator className="w-4 h-4" />
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                ระบบจำลองยอดขาย (Sales Simulator)
              </h2>
            </div>
            <p className="text-[11px] text-indigo-900/70 mt-0.5">
              ⚡ ทดลองปรับยอดขายเครื่องและบริการแนบ เพื่อดูผลลัพธ์ % บรรลุผลที่ระดับบุคคลและระดับสาขา PIA
            </p>
          </div>

          {/* Staff selector & Reset */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <span className="text-[11px] text-slate-500 font-semibold">พนักงาน:</span>
            <div className="flex items-center bg-white p-0.5 rounded-lg border border-indigo-200/90 shadow-2xs">
              {data.staffList.map((s) => (
                <button
                  key={s.staffId}
                  onClick={() => {
                    setSelectedStaffId(s.staffId);
                    handleReset();
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedStaffId === s.staffId
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              title="รีเซ็ตค่าจำลอง"
              className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer border border-indigo-200/90 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-[11px] text-slate-500 font-medium">ชุดตัวช่วยด่วน:</span>
          <button
            onClick={handlePresetPassAll}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <Check className="w-3 h-3 text-emerald-600" />
            <span>ปรับให้ผ่านเกณฑ์ทุกรายการ</span>
          </button>

          <button
            onClick={handlePresetSmartphone5}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100/70 hover:bg-indigo-100 border border-indigo-300 text-indigo-900 text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3 text-indigo-600" />
            <span>เพิ่ม Smartphone +5 พร้อมแนบ</span>
          </button>
        </div>
      </div>

      {/* 2. Simulator Grid: Left Adjustments vs Right Team Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left: Individual Adjustments (col-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">👤</span>
                <span>ผลงานจำลองของ: {staff.name} (PIA: {staff.staffId})</span>
              </h3>
              <span className="text-[10px] text-slate-500">
                เกณฑ์เป้าหมาย: Ultra Care+ ≥ 40% | SIM ≥ 30% | UFUND ≥ 50% | ฟิล์ม ≥ 70% | TI Care+ ≥ 30%
              </span>
            </div>
          </div>

          {/* Stepper Table Rows - Compact */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                  <th className="py-2 px-2.5">สินค้า / บริการ</th>
                  <th className="py-2 px-2.5 text-center">ปัจจุบัน</th>
                  <th className="py-2 px-2.5 text-center">จำลองเพิ่ม (+)</th>
                  <th className="py-2 px-2.5 text-right">ยอดใหม่ & % สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Smartphone */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-sky-100 text-sky-700 flex items-center justify-center text-xs">📱</span>
                    <span>Smartphone (เครื่อง)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600 font-semibold">{baseSmpUnits}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('smartphone', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.smartphone || 0}</span>
                      <button onClick={() => handleAdjust('smartphone', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right font-extrabold text-slate-900">
                    {newSmpUnits} เครื่อง
                  </td>
                </tr>

                {/* Ultra Care+ SMP */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 text-slate-700 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>🛡️ Ultra Care+ SMP (≥40%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.careIphone.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('careSmartphone', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.careSmartphone || 0}</span>
                      <button onClick={() => handleAdjust('careSmartphone', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newCareSmpRate >= 40 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newCareSmpRate.toFixed(1)}% {newCareSmpRate >= 40 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* NB Notebook */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">💻</span>
                    <span>NB (Notebook) (เครื่อง)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600 font-semibold">{baseNbUnits}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('notebook', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.notebook || 0}</span>
                      <button onClick={() => handleAdjust('notebook', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right font-extrabold text-slate-900">
                    {newNbUnits} เครื่อง
                  </td>
                </tr>

                {/* TI Care+ */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 text-slate-700 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>💻 TI Care+ (NB) (≥30%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.careIpad.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('careTi', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.careTi || 0}</span>
                      <button onClick={() => handleAdjust('careTi', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newCareTiRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {newCareTiRate.toFixed(1)}% {newCareTiRate >= 30 ? '✓ ผ่าน' : '⚡ ไปอีก'}
                    </span>
                  </td>
                </tr>

                {/* DIY */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">💻</span>
                    <span>DIY (เครื่อง)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600 font-semibold">{baseDiyUnits}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('diy', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.diy || 0}</span>
                      <button onClick={() => handleAdjust('diy', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right font-extrabold text-slate-900">
                    {newDiyUnits} เครื่อง
                  </td>
                </tr>

                {/* Desktop */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-xs">🖥️</span>
                    <span>Desktop (เครื่อง)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600 font-semibold">{baseDesktopUnits}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('desktop', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.desktop || 0}</span>
                      <button onClick={() => handleAdjust('desktop', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right font-extrabold text-slate-900">
                    {newDesktopUnits} เครื่อง
                  </td>
                </tr>

                {/* SIM True */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-sky-100 text-sky-700 flex items-center justify-center text-xs">📶</span>
                    <span>เปิดเบอร์ SIM True (≥30%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.sim.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('sim', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.sim || 0}</span>
                      <button onClick={() => handleAdjust('sim', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newSimRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newSimRate.toFixed(1)}% {newSimRate >= 30 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* UFUND */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-purple-100 text-purple-700 flex items-center justify-center text-xs">💳</span>
                    <span>UFUND APPIN (≥50%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.ufund.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('ufund', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.ufund || 0}</span>
                      <button onClick={() => handleAdjust('ufund', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newUfundRate >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newUfundRate.toFixed(1)}% {newUfundRate >= 50 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* Film */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-xs">✨</span>
                    <span>ฟิล์ม SMP (≥70%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.film.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('film', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.film || 0}</span>
                      <button onClick={() => handleAdjust('film', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newFilmRate >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newFilmRate.toFixed(1)}% {newFilmRate >= 70 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* SanDisk */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-800 flex items-center justify-center text-xs">💾</span>
                    <span>SanDisk (≥50%)</span>
                  </td>
                  <td className="py-2 px-2.5 text-center text-slate-600">{staff.sandisk.attached}</td>
                  <td className="py-2 px-2.5 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button onClick={() => handleAdjust('sandisk', -1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">-</button>
                      <span className="w-7 font-black text-indigo-700 text-center text-xs">+{deltas.sandisk || 0}</span>
                      <button onClick={() => handleAdjust('sandisk', 1)} className="w-5 h-5 rounded bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs">+</button>
                    </div>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.2 rounded ${
                      newSandiskRate >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newSandiskRate.toFixed(1)}% {newSandiskRate >= 50 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Team Simulation Impact - Compact */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-xs shadow-2xs">
                <Users className="w-3.5 h-3.5" />
              </span>
              <h3 className="font-black text-xs sm:text-sm text-slate-900">
                จำลองผลระดับทีม (Team Simulation)
              </h3>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              การปรับยอดของ {staff.name} ส่งผลต่อผลรวมสาขา PIA ดังนี้
            </p>

            <div className="space-y-2 mt-3 text-xs">
              {/* Total devices */}
              <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-white p-2.5 rounded-xl border border-emerald-200/90 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-bold text-emerald-950 block text-xs">📦 รวมเครื่อง (ทั้งสาขา)</span>
                  <span className="text-[10px] text-emerald-600/80">ยอดเดิม: {totalTeamUnits} เครื่อง</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-600 block">+{totalAddedUnits} เครื่อง</span>
                  <span className="text-sm font-black text-slate-900">{totalTeamUnits + totalAddedUnits} เครื่อง</span>
                </div>
              </div>

              {/* Ultra Care+ SMP team */}
              <div className="bg-gradient-to-r from-indigo-50/90 via-blue-50/40 to-white p-2.5 rounded-xl border border-indigo-200/90 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-bold text-indigo-950 block text-xs">🛡️ Ultra Care+ รวมสาขา</span>
                  <span className="text-[10px] text-indigo-600/80">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-600 block">{teamCareSmpOld} ➔ {teamCareSmpNew}</span>
                  <span className="text-xs font-black text-indigo-700">{((teamCareSmpOld / baseTeamSmp) * 100).toFixed(1)}% ➔ {teamCareSmpNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* SIM True team */}
              <div className="bg-gradient-to-r from-sky-50/90 via-cyan-50/40 to-white p-2.5 rounded-xl border border-sky-200/90 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-bold text-sky-950 block text-xs">📶 SIM True รวมสาขา</span>
                  <span className="text-[10px] text-sky-600/80">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-600 block">{teamSimOld} ➔ {teamSimNew}</span>
                  <span className="text-xs font-black text-sky-700">{((teamSimOld / baseTeamSmp) * 100).toFixed(1)}% ➔ {teamSimNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* UFUND team */}
              <div className="bg-gradient-to-r from-purple-50/90 via-violet-50/40 to-white p-2.5 rounded-xl border border-purple-200/90 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-bold text-purple-950 block text-xs">💳 UFUND รวมสาขา</span>
                  <span className="text-[10px] text-purple-600/80">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-600 block">{teamUfundOld} ➔ {teamUfundNew}</span>
                  <span className="text-xs font-black text-purple-700">{((teamUfundOld / baseTeamSmp) * 100).toFixed(1)}% ➔ {teamUfundNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Film team */}
              <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-white p-2.5 rounded-xl border border-amber-200/90 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-bold text-amber-950 block text-xs">✨ ฟิล์ม รวมสาขา</span>
                  <span className="text-[10px] text-amber-600/80">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-600 block">{teamFilmOld} ➔ {teamFilmNew}</span>
                  <span className="text-xs font-black text-amber-700">{((teamFilmOld / baseTeamSmp) * 100).toFixed(1)}% ➔ {teamFilmNewPct.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Forecast Target Rate & Run Rate Calculator - Compact */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-xs shadow-2xs">🎯</span>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                คาดการณ์ยอดขายตามระดับเป้าหมาย (% Forecast Target)
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5 flex-wrap">
              <span>พนักงาน:</span>
              <div className="inline-flex gap-1 bg-slate-100 p-0.5 rounded-md">
                {data.staffList.map((s) => (
                  <button
                    key={s.staffId}
                    onClick={() => setSelectedStaffId(s.staffId)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      selectedStaffId === s.staffId
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <span>| คำนวณยอดที่ต้องทำเพิ่ม & เฉลี่ยต่อวัน</span>
            </div>
          </div>

          {/* Target percentage selector */}
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <span className="text-[11px] text-slate-500 font-semibold">ระดับเป้า:</span>
            {[70, 80, 90, 100, 120].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setTargetLevelPct(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  targetLevelPct === lvl
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl}%
              </button>
            ))}
          </div>
        </div>

        {/* Days remaining banner - Decorated with Warm Amber Gradient */}
        <div className="bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-amber-50/90 rounded-xl p-3 border border-amber-300/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200/90 border border-amber-300 text-amber-900 flex items-center justify-center text-amber-800 shrink-0 shadow-2xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                เหลือเวลาทำงานอีก: <span className="text-amber-900 font-black">{daysRemaining} วัน</span> (สิ้นงวด 31 ต.ค. 2569)
              </div>
              <div className="text-[10px] text-amber-900/70">
                ข้อมูลตัดรอบอัตโนมัติ: 12/10/2026 • จำลองระดับเป้าหมาย {targetLevelPct}% สำหรับ {staff.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setIncludeToday(false)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                !includeToday
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100/60'
              }`}
            >
              ไม่รวมวันนี้ ({daysRemaining} วัน)
            </button>
            <button
              onClick={() => setIncludeToday(true)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                includeToday
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100/60'
              }`}
            >
              รวมวันนี้ ({daysRemaining + 1} วัน)
            </button>
          </div>
        </div>

        {/* 3 Large KPI Summary Cards - Decorated with Thematic Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Card 1: Target Level */}
          <div className="bg-gradient-to-br from-sky-50/90 via-indigo-50/30 to-white rounded-xl p-3 border border-sky-200/90 hover:border-sky-300 transition-colors shadow-2xs space-y-0.5">
            <span className="text-[10px] text-sky-900 font-bold flex items-center gap-1">
              <span>🎯</span>
              <span>เป้าหมายที่ระดับ {targetLevelPct}%</span>
            </span>
            <div className="text-xl font-black text-slate-900 tracking-tight">
              {staffTargetTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
            </div>
            <div className="text-[10px] text-slate-500">
              ยอดขายจริงปัจจุบัน ({staff.name}): <strong className="text-slate-800">{staffActualTotal.toLocaleString()} ฿</strong>
            </div>
          </div>

          {/* Card 2: Deficit to target */}
          <div className="bg-gradient-to-br from-rose-50/90 via-red-50/30 to-white rounded-xl p-3 border border-rose-200/90 hover:border-rose-300 transition-colors shadow-2xs space-y-0.5">
            <span className="text-[10px] text-rose-700 font-bold flex items-center gap-1">
              <span>⚠️</span>
              <span>ยอดที่ต้องทำเพิ่ม (รวมทุกสินค้า)</span>
            </span>
            <div className="text-xl font-black text-rose-600 tracking-tight">
              ขาดอีก {staffNeededTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
            </div>
            <div className="text-[10px] text-rose-600/80">
              เป้าหมาย - ยอดขายจริง (MAX 0)
            </div>
          </div>

          {/* Card 3 - Royal Blue Run Rate */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 text-white rounded-xl p-3 shadow-md shadow-indigo-600/25 space-y-0.5 relative overflow-hidden border border-indigo-500/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-indigo-200 font-semibold flex items-center gap-1">
                <span>🔥</span>
                <span>ต้องขายเฉลี่ยวันละ (Run Rate)</span>
              </span>
              <span className="text-[9px] bg-indigo-700/80 text-indigo-200 px-1.5 py-0.2 rounded-full">
                {effectiveDays} วัน
              </span>
            </div>
            <div className="text-xl font-black text-white">
              {runRatePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน
            </div>
            <div className="text-[10px] text-indigo-200">
              เพื่อพิชิตเป้า {targetLevelPct}% ภายในสิ้นเดือน
            </div>
          </div>
        </div>

        {/* Breakdown table per product - Compact */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                <th className="py-2 px-2.5">สินค้า / บริการ</th>
                <th className="py-2 px-2.5 text-right">เป้าหมายตามเกณฑ์ ({targetLevelPct}%)</th>
                <th className="py-2 px-2.5 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2 px-2.5 text-right">ยอดที่ต้องทำเพิ่ม (บ.)</th>
                <th className="py-2 px-2.5 text-right">⚡ ต้องขายเฉลี่ยต่อวัน ({effectiveDays} วัน)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: '📱 Smartphone', target: 2027815 * (targetLevelPct / 100), actual: staff.iphone.actualRevenue },
                { label: '💻 Notebook (NB)', target: 466009 * (targetLevelPct / 100), actual: staff.mac.actualRevenue },
                { label: '💻 DIY', target: 14873 * (targetLevelPct / 100), actual: staff.ipad.actualRevenue },
                { label: '🖥️ Desktop', target: 48890 * (targetLevelPct / 100), actual: staff.appleWatch.actualRevenue },
              ].map((row) => {
                const needed = Math.max(0, row.target - row.actual);
                const daily = effectiveDays > 0 ? needed / effectiveDays : 0;
                return (
                  <tr key={row.label} className="hover:bg-slate-50/60">
                    <td className="py-2 px-2.5 font-semibold text-slate-800">{row.label}</td>
                    <td className="py-2 px-2.5 text-right text-slate-600 font-medium">{row.target.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿</td>
                    <td className="py-2 px-2.5 text-right font-bold text-slate-900">{row.actual.toLocaleString()} ฿</td>
                    <td className="py-2 px-2.5 text-right font-bold text-rose-600">
                      {needed > 0 ? `${needed.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿` : '-'}
                    </td>
                    <td className="py-2 px-2.5 text-right font-black text-indigo-700">
                      {daily > 0 ? `${daily.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน` : '-'}
                    </td>
                  </tr>
                );
              })}

              {/* Total row */}
              <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                <td className="py-2 px-2.5 text-indigo-900">🏆 รวมทุกสินค้า ({staff.name})</td>
                <td className="py-2 px-2.5 text-right text-indigo-900 font-black">
                  {staffTargetTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                </td>
                <td className="py-2 px-2.5 text-right text-slate-900 font-black">
                  {staffActualTotal.toLocaleString()} ฿
                </td>
                <td className="py-2 px-2.5 text-right text-rose-600 font-black">
                  {staffNeededTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                </td>
                <td className="py-2 px-2.5 text-right text-indigo-700 font-black">
                  {runRatePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-[10px] text-slate-400 text-right pt-0.5">
          📌 คำนวณยอดที่ต้องทำเพิ่ม = MAX(0, เป้าหมาย - ยอดขายจริง) • ยอดขายต่อวัน = ยอดที่ต้องทำเพิ่ม ÷ จำนวนวันที่เหลือ ({effectiveDays} วัน)
        </div>
      </div>
    </div>
  );
};
