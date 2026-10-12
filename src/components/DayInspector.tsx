import React from 'react';
import { StaffInfo, StaffRecordsMap, KPITargets } from '../types/sales';
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Share2, 
  X, 
  ShieldCheck, 
  CreditCard, 
  Layers 
} from 'lucide-react';

interface DayInspectorProps {
  day: number;
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  targets: KPITargets;
  onSelectDay: (day: number) => void;
  onEditDayStaff: (staffId: string, day: number) => void;
  onOpenLineModalForDay: (day: number) => void;
}

export const DayInspector: React.FC<DayInspectorProps> = ({
  day,
  staffList,
  records,
  targets,
  onSelectDay,
  onEditDayStaff,
  onOpenLineModalForDay,
}) => {
  if (day < 1 || day > 31) return null;

  let dayTotalSmp = 0;
  let dayTotalNb = 0;
  let dayUtcSmp = 0;
  let dayUfund = 0;
  let daySim = 0;
  let dayFilm = 0;
  let daySocialCare = 0;
  let dayUtcGadget = 0;
  let daySandisk = 0;
  let dayCustomers = 0;

  const staffDetails = staffList.map((staff) => {
    const dayRec = records[staff.id]?.[day] || {
      smp: { smpUnits: 0, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 },
      nb: { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 },
    };

    dayTotalSmp += dayRec.smp.smpUnits || 0;
    dayTotalNb += dayRec.nb.nbUnits || 0;
    dayCustomers += dayRec.smp.customersCount || 0;

    dayUtcSmp += dayRec.smp.utcCount || 0;
    dayUfund += dayRec.smp.ufundCount || 0;
    daySim += dayRec.smp.simCount || 0;
    dayFilm += dayRec.smp.filmCount || 0;

    daySocialCare += dayRec.nb.socialCareCount || 0;
    dayUtcGadget += dayRec.nb.utcGadgetCount || 0;
    daySandisk += dayRec.nb.sandiskCount || 0;

    const smpBase = dayRec.smp.smpUnits || 0;
    const utcPct = smpBase > 0 ? ((dayRec.smp.utcCount || 0) / smpBase) * 100 : 0;
    const ufundPct = smpBase > 0 ? ((dayRec.smp.ufundCount || 0) / smpBase) * 100 : 0;
    const simPct = smpBase > 0 ? ((dayRec.smp.simCount || 0) / smpBase) * 100 : 0;
    const filmPct = smpBase > 0 ? ((dayRec.smp.filmCount || 0) / smpBase) * 100 : 0;

    return {
      staff,
      rec: dayRec,
      totalDevices: smpBase + (dayRec.nb.nbUnits || 0),
      utcPct,
      ufundPct,
      simPct,
      filmPct,
    };
  });

  const dayTotalDevices = dayTotalSmp + dayTotalNb;
  const dayUtcPct = dayTotalSmp > 0 ? (dayUtcSmp / dayTotalSmp) * 100 : 0;
  const dayUfundPct = dayTotalSmp > 0 ? (dayUfund / dayTotalSmp) * 100 : 0;
  const daySimPct = dayTotalSmp > 0 ? (daySim / dayTotalSmp) * 100 : 0;
  const dayFilmPct = dayTotalSmp > 0 ? (dayFilm / dayTotalSmp) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-stone-200/90 space-y-5 animate-fade-in relative overflow-hidden">
      {/* Dynamic top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

      {/* Top Bar with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => onSelectDay(Math.max(1, day - 1))}
              disabled={day <= 1}
              className="p-1.5 hover:bg-white disabled:opacity-30 rounded-lg transition-colors cursor-pointer text-slate-700"
              title="วันก่อนหน้า"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 font-extrabold text-sm tracking-wide text-slate-900">
              วันที่ {day}
            </span>
            <button
              onClick={() => onSelectDay(Math.min(31, day + 1))}
              disabled={day >= 31}
              className="p-1.5 hover:bg-white disabled:opacity-30 rounded-lg transition-colors cursor-pointer text-slate-700"
              title="วันถัดไป"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>เจาะลึกยอดขายประจำวัน {day}</span>
              {dayTotalDevices > 0 ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  มียอดขาย {dayTotalDevices} เครื่อง
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium border border-slate-200">
                  ยังไม่มียอดขาย
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenLineModalForDay(day)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            คัดลอกสรุปวันที่ {day}
          </button>
          <button
            onClick={() => onSelectDay(0)}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="ปิดมุมมองเจาะลึกรายวัน"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Key Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-600 block font-semibold">📱 สมาร์ทโฟน (SMP)</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block font-mono">{dayTotalSmp} <span className="text-xs font-normal text-slate-500">เครื่อง</span></span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-600 block font-semibold">💻 โน้ตบุ๊ก (NB)</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block font-mono">{dayTotalNb} <span className="text-xs font-normal text-slate-500">เครื่อง</span></span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-600 block font-semibold">🛡️ UTC+ (เป้า 40%)</span>
          <div className="flex items-baseline gap-1.5 mt-1 font-mono">
            <span className="text-2xl font-black text-slate-900">{dayUtcSmp}</span>
            <span className={`text-xs font-bold ${dayUtcPct >= 40 ? 'text-emerald-700' : 'text-slate-600'}`}>
              ({dayUtcPct.toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-600 block font-semibold">💳 UFund (เป้า 50%)</span>
          <div className="flex items-baseline gap-1.5 mt-1 font-mono">
            <span className="text-2xl font-black text-slate-900">{dayUfund}</span>
            <span className={`text-xs font-bold ${dayUfundPct >= 50 ? 'text-emerald-700' : 'text-slate-600'}`}>
              ({dayUfundPct.toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="bg-stone-50/60 rounded-xl p-3.5 border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] text-stone-600 block font-semibold">📶 SIM (เป้า 30%)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-stone-900">{daySim}</span>
            <span className={`text-xs font-bold ${daySimPct >= 30 ? 'text-emerald-700' : 'text-stone-700'}`}>
              ({daySimPct.toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="bg-stone-50/60 rounded-xl p-3.5 border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] text-stone-600 block font-semibold">✨ ฟิล์ม (เป้า 70%)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-stone-900">{dayFilm}</span>
            <span className={`text-xs font-bold ${dayFilmPct >= 70 ? 'text-emerald-700' : 'text-stone-700'}`}>
              ({dayFilmPct.toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Staff Cards for this day in soft styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {staffDetails.map(({ staff, rec, totalDevices, utcPct, ufundPct, simPct, filmPct }) => {
          return (
            <div
              key={staff.id}
              className="bg-white rounded-xl p-4.5 border border-stone-200/90 hover:border-yellow-200 hover:shadow-xs transition-all flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-yellow-50 text-stone-850 font-black flex items-center justify-center text-xs shadow-2xs border border-yellow-200/80">
                      {staff.name.slice(0, 1)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-stone-900">{staff.name}</h4>
                      <span className="text-[10px] text-stone-400">รหัส {staff.id}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onEditDayStaff(staff.id, day)}
                    className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                    title={`แก้ไขยอดขายของ ${staff.name} วันที่ ${day}`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-500 block font-medium">📱 SMP</span>
                    <span className="text-xl font-black text-stone-900">{rec.smp.smpUnits}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-500 block font-medium">💻 NB</span>
                    <span className="text-xl font-black text-stone-900">{rec.nb.nbUnits}</span>
                  </div>
                </div>

                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-600" /> UTC+
                    </span>
                    <span className="font-bold text-stone-900">
                      {rec.smp.utcCount} ({utcPct.toFixed(0)}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> UFund
                    </span>
                    <span className="font-bold text-stone-900">
                      {rec.smp.ufundCount} ({ufundPct.toFixed(0)}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Layers className="w-3.5 h-3.5 text-purple-600" /> ฟิล์ม
                    </span>
                    <span className="font-bold text-stone-900">
                      {rec.smp.filmCount} ({filmPct.toFixed(0)}%)
                    </span>
                  </div>

                  {rec.nb.socialCareCount > 0 && (
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="text-stone-500">Social Care+</span>
                      <span className="font-bold text-stone-900">{rec.nb.socialCareCount} ชิ้น</span>
                    </div>
                  )}

                  {rec.nb.sandiskCount > 0 && (
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="text-stone-500">SanDisk</span>
                      <span className="font-bold text-rose-700">{rec.nb.sandiskCount} ชิ้น</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-100 flex justify-between items-center text-xs text-stone-600">
                <span>รวมทั้งหมด:</span>
                <span className="font-black text-stone-950 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                  {totalDevices} เครื่อง
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
