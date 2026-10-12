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
  Calendar 
} from 'lucide-react';

interface MscSimulatorTabProps {
  data: BranchDataState;
}

export const MscSimulatorTab: React.FC<MscSimulatorTabProps> = ({ data }) => {
  // Selected staff for simulation
  const [selectedStaffId, setSelectedStaffId] = useState<string>(data.staffList[0]?.staffId || '');
  const staff = data.staffList.find((s) => s.staffId === selectedStaffId) || data.staffList[0];

  // Simulator adjustments for selected staff
  const [deltas, setDeltas] = useState<Record<string, number>>({
    iphone: 0,
    careIphone: 0,
    ipad: 0,
    careIpad: 0,
    mac: 0,
    careMac: 0,
    watch: 0,
    careWatch: 0,
    sim: 0,
    ufund: 0,
    film: 0,
  });

  const handleAdjust = (field: string, amount: number) => {
    setDeltas((prev) => ({
      ...prev,
      [field]: Math.max(0, (prev[field] || 0) + amount),
    }));
  };

  const handleReset = () => {
    setDeltas({
      iphone: 0,
      careIphone: 0,
      ipad: 0,
      careIpad: 0,
      mac: 0,
      careMac: 0,
      watch: 0,
      careWatch: 0,
      sim: 0,
      ufund: 0,
      film: 0,
    });
  };

  const handlePresetPassAll = () => {
    // Quick preset to pass all minimums
    setDeltas({
      iphone: 5,
      careIphone: 4,
      ipad: 2,
      careIpad: 1,
      mac: 1,
      careMac: 1,
      watch: 1,
      careWatch: 1,
      sim: 4,
      ufund: 8,
      film: 8,
    });
  };

  const handlePresetIphone5 = () => {
    setDeltas((prev) => ({
      ...prev,
      iphone: (prev.iphone || 0) + 5,
      careIphone: (prev.careIphone || 0) + 3,
      ufund: (prev.ufund || 0) + 4,
    }));
  };

  // Forecast Target settings (Screenshot 7)
  const [targetLevelPct, setTargetLevelPct] = useState<number>(100);
  const [daysRemaining, setDaysRemaining] = useState<number>(data.daysRemaining || 20);
  const [includeToday, setIncludeToday] = useState<boolean>(false);

  // New simulated values for the staff
  const newIphoneUnits = staff.iphone.actualUnits + (deltas.iphone || 0);
  const newCareIphone = staff.careIphone.attached + (deltas.careIphone || 0);
  const newCareIphoneRate = newIphoneUnits > 0 ? (newCareIphone / newIphoneUnits) * 100 : 0;

  const newIpadUnits = staff.ipad.actualUnits + (deltas.ipad || 0);
  const newCareIpad = staff.careIpad.attached + (deltas.careIpad || 0);
  const newCareIpadRate = newIpadUnits > 0 ? (newCareIpad / newIpadUnits) * 100 : 0;

  const newMacUnits = staff.mac.actualUnits + (deltas.mac || 0);
  const newCareMac = staff.careMac.attached + (deltas.careMac || 0);
  const newCareMacRate = newMacUnits > 0 ? (newCareMac / newMacUnits) * 100 : 0;

  const newWatchUnits = staff.appleWatch.actualUnits + (deltas.watch || 0);
  const newCareWatch = staff.careWatch.attached + (deltas.careWatch || 0);
  const newCareWatchRate = newWatchUnits > 0 ? (newCareWatch / newWatchUnits) * 100 : 0;

  const newSim = staff.sim.attached + (deltas.sim || 0);
  const newSimRate = newIphoneUnits > 0 ? (newSim / newIphoneUnits) * 100 : 0;

  const newUfund = staff.ufund.attached + (deltas.ufund || 0);
  const newUfundRate = newIphoneUnits > 0 ? (newUfund / newIphoneUnits) * 100 : 0;

  const newFilm = staff.film.attached + (deltas.film || 0);
  const newFilmRate = newIphoneUnits > 0 ? (newFilm / newIphoneUnits) * 100 : 0;

  // Team simulation impact (Screenshot 6 Right)
  const baseTeamIphone = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0);
  const totalTeamUnits = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits + s.ipad.actualUnits + s.mac.actualUnits + s.appleWatch.actualUnits, 0);
  const totalAddedUnits = (deltas.iphone || 0) + (deltas.ipad || 0) + (deltas.mac || 0) + (deltas.watch || 0);

  const teamCareIphoneOld = data.staffList.reduce((acc, s) => acc + s.careIphone.attached, 0);
  const teamCareIphoneNew = teamCareIphoneOld + (deltas.careIphone || 0);
  const teamCareIphoneNewPct = (teamCareIphoneNew / (baseTeamIphone + (deltas.iphone || 0))) * 100;

  const teamSimOld = data.staffList.reduce((acc, s) => acc + s.sim.attached, 0);
  const teamSimNew = teamSimOld + (deltas.sim || 0);
  const teamSimNewPct = (teamSimNew / (baseTeamIphone + (deltas.iphone || 0))) * 100;

  const teamUfundOld = data.staffList.reduce((acc, s) => acc + s.ufund.attached, 0);
  const teamUfundNew = teamUfundOld + (deltas.ufund || 0);
  const teamUfundNewPct = (teamUfundNew / (baseTeamIphone + (deltas.iphone || 0))) * 100;

  const teamFilmOld = data.staffList.reduce((acc, s) => acc + s.film.attached, 0);
  const teamFilmNew = teamFilmOld + (deltas.film || 0);
  const teamFilmNewPct = (teamFilmNew / (baseTeamIphone + (deltas.iphone || 0))) * 100;

  // Forecast numbers for selected staff (Screenshot 7)
  const staffTargetTotal = (staff.iphone.targetRevenue + staff.ipad.targetRevenue + staff.mac.targetRevenue + staff.appleWatch.targetRevenue) * (targetLevelPct / 100);
  const staffActualTotal = staff.iphone.actualRevenue + staff.ipad.actualRevenue + staff.mac.actualRevenue + staff.appleWatch.actualRevenue;
  const staffNeededTotal = Math.max(0, staffTargetTotal - staffActualTotal);
  const effectiveDays = includeToday ? daysRemaining + 1 : daysRemaining;
  const runRatePerDay = effectiveDays > 0 ? staffNeededTotal / effectiveDays : 0;

  return (
    <div className="space-y-6">
      {/* 1. Simulator Header Card (Screenshot 6) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                ⚡ Sheet สรุปภาพรวม_Mobile
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <span>ระบบจำลองยอดขาย (Simulator)</span>
            </h2>
            <p className="text-xs text-slate-500">
              ทดลองปรับยอดขายเครื่องและบริการแนบ เพื่อดูผลลัพธ์ % บรรลุผลที่รายบุคคลและระดับทีม
            </p>
          </div>

          {/* Staff selector & Reset */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-semibold">พนักงาน:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {data.staffList.map((s) => (
                <button
                  key={s.staffId}
                  onClick={() => {
                    setSelectedStaffId(s.staffId);
                    handleReset();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStaffId === s.staffId
                      ? 'bg-indigo-600 text-white shadow-xs'
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
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-slate-500 font-medium">ชุดตัวช่วยด่วน:</span>
          <button
            onClick={handlePresetPassAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>ปรับให้ผ่านเกณฑ์ทุกรายการ</span>
          </button>

          <button
            onClick={handlePresetIphone5}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-800 font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่ม iPhone +5 พร้อมแนบ</span>
          </button>
        </div>
      </div>

      {/* 2. Simulator Grid: Left Adjustments vs Right Team Impact (Screenshot 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Individual Adjustments (col-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-black text-sm text-slate-900">
                ผลงานจำลองของ: {staff.name} (MSC: {staff.staffId})
              </h3>
              <span className="text-[11px] text-slate-400">
                เกณฑ์เป้าหมาย: 7Care ≥ 40% | SIM ≥ 30% | UFUND ≥ 50% | ฟิล์ม ≥ 70%
              </span>
            </div>
          </div>

          {/* Stepper Table Rows */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/60">
                  <th className="py-2.5 px-3">สินค้า / บริการ</th>
                  <th className="py-2.5 px-3 text-center">ปัจจุบัน</th>
                  <th className="py-2.5 px-3 text-center">จำลองเพิ่ม (+)</th>
                  <th className="py-2.5 px-3 text-right">ยอดใหม่ & % สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* iPhone */}
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">📱 iPhone (เครื่อง)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">{staff.iphone.actualUnits}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('iphone', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.iphone || 0}</span>
                      <button onClick={() => handleAdjust('iphone', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-slate-900 text-sm">
                    {newIphoneUnits} เครื่อง
                  </td>
                </tr>

                {/* 7Care iPhone */}
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>7Care iPhone (≥40%)</span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.careIphone.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('careIphone', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.careIphone || 0}</span>
                      <button onClick={() => handleAdjust('careIphone', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newCareIphoneRate >= 40 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {newCareIphoneRate.toFixed(1)}% {newCareIphoneRate >= 40 ? '✓ ผ่าน' : '⚡ ไปอีก'}
                    </span>
                  </td>
                </tr>

                {/* iPad */}
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">📱 iPad (เครื่อง)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">{staff.ipad.actualUnits}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('ipad', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.ipad || 0}</span>
                      <button onClick={() => handleAdjust('ipad', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-slate-900 text-sm">
                    {newIpadUnits} เครื่อง
                  </td>
                </tr>

                {/* 7Care iPad */}
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>7Care iPad (≥30%)</span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.careIpad.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('careIpad', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.careIpad || 0}</span>
                      <button onClick={() => handleAdjust('careIpad', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newCareIpadRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {newCareIpadRate.toFixed(1)}% {newCareIpadRate >= 30 ? '✓ ผ่าน' : '⚡ ไปอีก'}
                    </span>
                  </td>
                </tr>

                {/* Mac */}
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">💻 Mac (เครื่อง)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">{staff.mac.actualUnits}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('mac', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.mac || 0}</span>
                      <button onClick={() => handleAdjust('mac', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-slate-900 text-sm">
                    {newMacUnits} เครื่อง
                  </td>
                </tr>

                {/* 7Care Mac */}
                <tr>
                  <td className="py-2.5 px-3 text-slate-700 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>7Care Mac (≥30%)</span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.careMac.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('careMac', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.careMac || 0}</span>
                      <button onClick={() => handleAdjust('careMac', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newCareMacRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newCareMacRate.toFixed(1)}% {newCareMacRate >= 30 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* SIM */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">📶 เปิดเบอร์ SIM (≥30%)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.sim.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('sim', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.sim || 0}</span>
                      <button onClick={() => handleAdjust('sim', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newSimRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newSimRate.toFixed(1)}% {newSimRate >= 30 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* UFUND */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">💳 UFUND APPIN (≥50%)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.ufund.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('ufund', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.ufund || 0}</span>
                      <button onClick={() => handleAdjust('ufund', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newUfundRate >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newUfundRate.toFixed(1)}% {newUfundRate >= 50 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>

                {/* Film */}
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">✨ ฟิล์ม iPhone (≥70%)</td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{staff.film.attached}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => handleAdjust('film', -1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">-</button>
                      <span className="w-8 font-black text-indigo-700 text-center">+{deltas.film || 0}</span>
                      <button onClick={() => handleAdjust('film', 1)} className="w-6 h-6 rounded-lg bg-white shadow-2xs font-bold text-slate-700 hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                      newFilmRate >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {newFilmRate.toFixed(1)}% {newFilmRate >= 70 ? '✓ ผ่าน' : '✕ ไม่ผ่าน'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Team Simulation Impact (col-4) (Screenshot 6 Right) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black text-sm text-slate-900">
                จำลองผลระดับทีม (Team Simulation)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              การปรับของยอด {staff.name} ส่งผลต่อภาพรวมสาขาดังนี้
            </p>

            <div className="space-y-3 mt-4 text-xs">
              {/* Total devices */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">📱 รวมขายเครื่อง (ทั้งทีม)</span>
                  <span className="text-[11px] text-slate-400">ยอดเดิม: {totalTeamUnits}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 block">+{totalAddedUnits} เครื่อง</span>
                  <span className="text-base font-black text-slate-900">{totalTeamUnits + totalAddedUnits} เครื่อง</span>
                </div>
              </div>

              {/* 7Care iPhone team */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">🛡️ 7Care iPhone รวมทีม</span>
                  <span className="text-[11px] text-slate-400">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600 block">{teamCareIphoneOld} ➔ {teamCareIphoneNew}</span>
                  <span className="text-sm font-black text-indigo-700">{((teamCareIphoneOld / baseTeamIphone) * 100).toFixed(1)}% ➔ {teamCareIphoneNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* SIM True team */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">📶 SIM รวมทั้งทีม</span>
                  <span className="text-[11px] text-slate-400">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600 block">{teamSimOld} ➔ {teamSimNew}</span>
                  <span className="text-sm font-black text-indigo-700">{((teamSimOld / baseTeamIphone) * 100).toFixed(1)}% ➔ {teamSimNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* UFUND team */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">💳 UFUND รวมทั้งทีม</span>
                  <span className="text-[11px] text-slate-400">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600 block">{teamUfundOld} ➔ {teamUfundNew}</span>
                  <span className="text-sm font-black text-indigo-700">{((teamUfundOld / baseTeamIphone) * 100).toFixed(1)}% ➔ {teamUfundNewPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Film team */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">✨ ฟิล์ม iPhone รวมทั้งทีม</span>
                  <span className="text-[11px] text-slate-400">% เดิม ➔ ใหม่</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600 block">{teamFilmOld} ➔ {teamFilmNew}</span>
                  <span className="text-sm font-black text-indigo-700">{((teamFilmOld / baseTeamIphone) * 100).toFixed(1)}% ➔ {teamFilmNewPct.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Forecast Target Rate & Run Rate Calculator (Screenshot 7) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <h3 className="font-black text-base text-slate-900">
                🎯 คาดการณ์ยอดขายตามระดับเป้าหมาย (% Forecast)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>พนักงาน:</span>
              <div className="inline-flex gap-1">
                {data.staffList.map((s) => (
                  <button
                    key={s.staffId}
                    onClick={() => setSelectedStaffId(s.staffId)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                      selectedStaffId === s.staffId
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
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
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-semibold">ระดับเป้า:</span>
            {[70, 80, 90, 100, 120].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setTargetLevelPct(lvl)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  targetLevelPct === lvl
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl}%
              </button>
            ))}
          </div>
        </div>

        {/* Days remaining banner */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                เหลือที่วันจะหมดเดือน: <span className="text-amber-900 font-black">{daysRemaining} วัน</span> (สิ้นสุด 31 ต.ค. 2569)
              </div>
              <div className="text-[11px] text-slate-500">
                วันนี้วันที่ 12 ต.ค. • คำนวณยอดขายที่ต้องทำจริงต่อวันการแข่งขัน 100%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIncludeToday(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                !includeToday
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ไม่รวมวันนี้ ({daysRemaining} วัน)
            </button>
            <button
              onClick={() => setIncludeToday(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                includeToday
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              รวมวันนี้ ({daysRemaining + 1} วัน)
            </button>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2 py-1">
              <button
                onClick={() => setDaysRemaining((prev) => Math.max(1, prev - 1))}
                className="text-xs font-bold px-1 text-slate-600 hover:text-slate-900"
              >
                -
              </button>
              <span className="text-xs font-black px-1 text-slate-900">{daysRemaining}</span>
              <button
                onClick={() => setDaysRemaining((prev) => prev + 1)}
                className="text-xs font-bold px-1 text-slate-600 hover:text-slate-900"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 3 Large KPI Summary Cards (Screenshot 7) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500 font-semibold">เป้าหมายที่ระดับ {targetLevelPct}%</span>
            <div className="text-2xl font-black text-slate-900">
              {staffTargetTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
            </div>
            <div className="text-[11px] text-slate-500">
              ยอดขายจริงปัจจุบัน: {staffActualTotal.toLocaleString()} ฿
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-rose-50/70 rounded-2xl p-4.5 border border-rose-200/80 space-y-1">
            <span className="text-xs text-rose-700 font-semibold">ยอดที่ต้องทำเพิ่ม (รวมทุกสินค้า)</span>
            <div className="text-2xl font-black text-rose-600">
              ขาดอีก {staffNeededTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
            </div>
            <div className="text-[11px] text-rose-500">
              เป้าหมาย - ยอดขายจริง (MAX 0)
            </div>
          </div>

          {/* Card 3 - Royal Blue Run Rate */}
          <div className="bg-indigo-600 text-white rounded-2xl p-4.5 shadow-md shadow-indigo-600/20 space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-200 font-semibold flex items-center gap-1">
                <span>🔥</span>
                <span>ต้องขายเฉลี่ยวันละ (Run Rate)</span>
              </span>
              <span className="text-[10px] bg-indigo-700/80 text-indigo-200 px-2 py-0.5 rounded-full">
                {effectiveDays} วัน
              </span>
            </div>
            <div className="text-2xl font-black text-white">
              {runRatePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน
            </div>
            <div className="text-[11px] text-indigo-200">
              เพื่อพิชิตเป้า {targetLevelPct}% ภายในสิ้นเดือน
            </div>
          </div>
        </div>

        {/* Breakdown table per product (Screenshot 7 bottom) */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/60">
                <th className="py-2.5 px-3">สินค้า / บริการ</th>
                <th className="py-2.5 px-3 text-right">เป้าหมายตามเกณฑ์ ({targetLevelPct}%)</th>
                <th className="py-2.5 px-3 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2.5 px-3 text-right">ยอดที่ต้องทำเพิ่ม (บ.)</th>
                <th className="py-2.5 px-3 text-right">⚡ ต้องขายเฉลี่ยต่อวัน ({effectiveDays} วัน)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: '📱 iPhone', target: staff.iphone.targetRevenue * (targetLevelPct / 100), actual: staff.iphone.actualRevenue },
                { label: '📱 iPad', target: staff.ipad.targetRevenue * (targetLevelPct / 100), actual: staff.ipad.actualRevenue },
                { label: '💻 Mac', target: staff.mac.targetRevenue * (targetLevelPct / 100), actual: staff.mac.actualRevenue },
                { label: '⌚ Apple Watch', target: staff.appleWatch.targetRevenue * (targetLevelPct / 100), actual: staff.appleWatch.actualRevenue },
              ].map((row) => {
                const needed = Math.max(0, row.target - row.actual);
                const daily = effectiveDays > 0 ? needed / effectiveDays : 0;
                return (
                  <tr key={row.label} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{row.label}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600 font-medium">{row.target.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">{row.actual.toLocaleString()} ฿</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-600">
                      {needed > 0 ? `${needed.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-indigo-700">
                      {daily > 0 ? `${daily.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน` : '-'}
                    </td>
                  </tr>
                );
              })}

              {/* Total row */}
              <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                <td className="py-3 px-3 text-indigo-900">🏆 รวมทุกสินค้า</td>
                <td className="py-3 px-3 text-right text-indigo-900 font-black">
                  {staffTargetTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                </td>
                <td className="py-3 px-3 text-right text-slate-900 font-black">
                  {staffActualTotal.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right text-rose-600 font-black">
                  {staffNeededTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                </td>
                <td className="py-3 px-3 text-right text-indigo-700 font-black">
                  {runRatePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-slate-400 text-right pt-1">
          📌 คำนวณยอดที่ต้องทำเพิ่ม = MAX(0, เป้าหมาย - ยอดขายจริง) • ยอดขายต่อวัน = ยอดที่ต้องทำเพิ่ม ÷ จำนวนวันที่เหลือ ({effectiveDays} วัน)
        </div>
      </div>
    </div>
  );
};
