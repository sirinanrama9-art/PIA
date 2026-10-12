import React, { useState } from 'react';
import { StaffInfo, StaffRecordsMap, KPITargets } from '../types/sales';
import { calculateStaffSummary, calculateStoreSummary } from '../utils/salesCalculations';
import { 
  Table, 
  Smartphone, 
  Laptop, 
  Search, 
  Edit2 
} from 'lucide-react';

interface MasterDataTableProps {
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  targets: KPITargets;
  onSelectDay: (day: number) => void;
  onEditDayStaff: (staffId: string, day: number) => void;
}

export const MasterDataTable: React.FC<MasterDataTableProps> = ({
  staffList,
  records,
  targets,
  onSelectDay,
  onEditDayStaff,
}) => {
  const [sectionFilter, setSectionFilter] = useState<'smp' | 'nb' | 'both'>('smp');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleDaysCount, setVisibleDaysCount] = useState<number>(31);

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery)
  );

  const storeSummary = calculateStoreSummary(staffList, records);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden space-y-4 p-5 sm:p-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-yellow-100 text-stone-900 flex items-center justify-center font-bold shadow-2xs border border-yellow-200">
              <Table className="w-4 h-4 text-stone-700" />
            </div>
            <h2 className="text-base font-black text-stone-900 tracking-tight">
              ตารางข้อมูลภาพรวมทั้งเดือน (31 วันเต็ม)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            ตารางแสดงยอดขายแยกรายวันและรายบุคคล พร้อมอัตราแนบและยอดสรุป MTD ประจำสาขา
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Section Mode */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <button
              onClick={() => setSectionFilter('smp')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                sectionFilter === 'smp'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              สมาร์ทโฟน (SMP)
            </button>
            <button
              onClick={() => setSectionFilter('nb')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                sectionFilter === 'nb'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-purple-600" />
              โน้ตบุ๊ก (NB)
            </button>
            <button
              onClick={() => setSectionFilter('both')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sectionFilter === 'both'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ดูย่อรวมสองหมวด
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ / รหัส..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 text-slate-900 font-medium placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Table with sticky left columns */}
      <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl relative max-h-[70vh]">
        <table className="w-full text-xs text-left border-collapse">
          {/* Header */}
          <thead className="bg-slate-100 text-slate-900 sticky top-0 z-20 shadow-2xs font-extrabold">
            <tr className="border-b border-slate-200">
              <th className="p-3 sticky left-0 z-30 bg-slate-200/90 border-r border-slate-200 min-w-[130px] font-black">
                พนักงาน (PIA)
              </th>
              <th className="p-3 sticky left-[130px] z-30 bg-slate-200/90 border-r-2 border-slate-300 min-w-[120px] text-center font-black text-slate-900">
                รวมทั้งเดือน (MTD)
              </th>

              {Array.from({ length: visibleDaysCount }, (_, i) => i + 1).map((d) => (
                <th
                  key={d}
                  onClick={() => onSelectDay(d)}
                  className={`p-2.5 text-center border-r border-stone-200 cursor-pointer hover:bg-yellow-50 transition-colors whitespace-nowrap ${
                    d <= 11 ? 'bg-yellow-50/50 font-black text-stone-950' : 'bg-stone-50/60 text-stone-500 font-bold'
                  }`}
                  title={`คลิกเพื่อดูเจาะลึก วันที่ ${d}`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>วันที่ {d}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {filteredStaff.map((staff) => {
              const summary = calculateStaffSummary(staff, records);
              const staffRecords = records[staff.id] || {};

              return (
                <tr key={staff.id} className="hover:bg-yellow-50/20 transition-colors">
                  {/* Sticky Staff Info */}
                  <td className="p-3 sticky left-0 z-10 bg-white border-r border-slate-200 font-bold whitespace-nowrap shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs shadow-2xs">
                        {staff.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-slate-900 font-black text-sm">{staff.name}</div>
                        <div className="text-xs text-slate-500 font-medium">รหัส {staff.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Sticky MTD Column */}
                  <td className="p-3 sticky left-[130px] z-10 bg-slate-50 border-r-2 border-slate-300 text-center font-bold whitespace-nowrap shadow-xs">
                    {sectionFilter === 'smp' ? (
                      <div>
                        <div className="text-slate-950 font-black text-base">
                          {summary.totalSmp} <span className="text-xs font-semibold text-slate-600">เครื่อง</span>
                        </div>
                        <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-medium">
                          <div>UTC+: <strong className={summary.utcSmpRate >= targets.utcSmp ? 'text-emerald-700 font-black' : 'text-slate-900'}>{summary.utcSmpRate.toFixed(0)}%</strong></div>
                          <div>UFund: <strong className={summary.ufundRate >= targets.ufund ? 'text-emerald-700 font-black' : 'text-slate-900'}>{summary.ufundRate.toFixed(0)}%</strong></div>
                          <div>ฟิล์ม: <strong className="text-purple-700 font-black">{summary.filmRate.toFixed(0)}%</strong></div>
                        </div>
                      </div>
                    ) : sectionFilter === 'nb' ? (
                      <div>
                        <div className="text-slate-950 font-black text-base">
                          {summary.totalNb} <span className="text-xs font-semibold text-slate-600">เครื่อง</span>
                        </div>
                        <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-medium">
                          <div>Social+: <strong className="text-slate-900">{summary.socialCareRate.toFixed(0)}%</strong></div>
                          <div>SanDisk: <strong className="text-rose-700 font-black">{summary.totalSandisk}</strong></div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-slate-950 font-black text-base">
                          {summary.totalDevices} <span className="text-xs font-semibold text-slate-600">เครื่อง</span>
                        </div>
                        <div className="text-[11px] text-slate-700 font-semibold">
                          SMP {summary.totalSmp} | NB {summary.totalNb}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Daily Columns */}
                  {Array.from({ length: visibleDaysCount }, (_, i) => i + 1).map((d) => {
                    const dayRec = staffRecords[d];
                    if (!dayRec) return <td key={d} className="p-2 border-r border-slate-100 text-center text-slate-300">-</td>;

                    const smpUnits = dayRec.smp.smpUnits || 0;
                    const nbUnits = dayRec.nb.nbUnits || 0;
                    const hasDayData = smpUnits > 0 || nbUnits > 0 || dayRec.smp.filmCount > 0 || dayRec.nb.sandiskCount > 0;

                    return (
                      <td
                        key={d}
                        onClick={() => onEditDayStaff(staff.id, d)}
                        className={`p-2 border-r border-slate-100 text-center cursor-pointer transition-colors hover:bg-indigo-50/50 ${
                          !hasDayData ? 'text-slate-300 bg-slate-50/30' : ''
                        }`}
                        title={`คลิกเพื่อแก้ไขข้อมูล ${staff.name} วันที่ ${d}`}
                      >
                        {sectionFilter === 'smp' ? (
                          smpUnits > 0 || dayRec.smp.filmCount > 0 ? (
                            <div className="min-w-[70px]">
                              <div className="font-black text-slate-900 text-sm">
                                {smpUnits} <span className="text-[10px] font-semibold text-slate-500">SMP</span>
                              </div>
                              <div className="text-[11px] text-slate-700 flex flex-col items-center">
                                {dayRec.smp.utcCount > 0 && (
                                  <span className="text-slate-900 font-bold">
                                    UTC+{dayRec.smp.utcCount}
                                  </span>
                                )}
                                {dayRec.smp.ufundCount > 0 && (
                                  <span className="text-emerald-700 font-bold">
                                    UF+{dayRec.smp.ufundCount}
                                  </span>
                                )}
                                {dayRec.smp.filmCount > 0 && (
                                  <span className="text-purple-700 font-bold">
                                    ฟิล์ม+{dayRec.smp.filmCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )
                        ) : sectionFilter === 'nb' ? (
                          nbUnits > 0 || dayRec.nb.sandiskCount > 0 || dayRec.nb.socialCareCount > 0 ? (
                            <div className="min-w-[70px]">
                              <div className="font-black text-slate-900 text-sm">
                                {nbUnits} <span className="text-[10px] font-semibold text-slate-500">NB</span>
                              </div>
                              <div className="text-[11px] text-slate-700 flex flex-col items-center">
                                {dayRec.nb.socialCareCount > 0 && (
                                  <span className="text-slate-900 font-bold">
                                    SC+{dayRec.nb.socialCareCount}
                                  </span>
                                )}
                                {dayRec.nb.sandiskCount > 0 && (
                                  <span className="text-rose-700 font-bold">
                                    SD+{dayRec.nb.sandiskCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )
                        ) : (
                          hasDayData ? (
                            <div className="min-w-[65px]">
                              <div className="font-black text-slate-900 text-sm">
                                {smpUnits + nbUnits}
                              </div>
                              <div className="text-[10px] text-slate-600 font-semibold">
                                S:{smpUnits} N:{nbUnits}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Store Total Row */}
            <tr className="bg-stone-100 font-black border-t-2 border-stone-200 sticky bottom-0 z-20">
              <td className="p-3 sticky left-0 z-30 bg-stone-200/90 border-r border-stone-300 text-stone-950 whitespace-nowrap shadow-xs font-black">
                รวมทั้งสาขา
              </td>
              <td className="p-3 sticky left-[130px] z-30 bg-stone-200/90 border-r-2 border-stone-300 text-center whitespace-nowrap shadow-xs">
                {sectionFilter === 'smp' ? (
                  <div>
                    <span className="text-stone-950 text-sm font-black">
                      {storeSummary.totalSmp} เครื่อง
                    </span>
                    <div className="text-[10px] text-stone-700 font-bold">
                      UTC+ {storeSummary.utcSmpRate.toFixed(0)}% | ฟิล์ม {storeSummary.filmRate.toFixed(0)}%
                    </div>
                  </div>
                ) : sectionFilter === 'nb' ? (
                  <div>
                    <span className="text-stone-950 text-sm font-black">
                      {storeSummary.totalNb} เครื่อง
                    </span>
                    <div className="text-[10px] text-stone-700 font-bold">
                      SanDisk {storeSummary.totalSandisk} ชิ้น
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-stone-950 text-sm font-black">
                      {storeSummary.totalDevices} เครื่อง
                    </span>
                  </div>
                )}
              </td>

              {Array.from({ length: visibleDaysCount }, (_, i) => i + 1).map((d) => {
                let daySmp = 0;
                let dayNb = 0;
                for (const staff of staffList) {
                  const r = records[staff.id]?.[d];
                  if (r) {
                    daySmp += r.smp.smpUnits || 0;
                    dayNb += r.nb.nbUnits || 0;
                  }
                }

                const total = daySmp + dayNb;

                return (
                  <td key={d} className="p-2 border-r border-stone-200 text-center font-black text-stone-950">
                    {sectionFilter === 'smp' ? (
                      daySmp > 0 ? (
                        <span className="text-stone-950 font-black">{daySmp}</span>
                      ) : (
                        '-'
                      )
                    ) : sectionFilter === 'nb' ? (
                      dayNb > 0 ? (
                        <span className="text-stone-950 font-black">{dayNb}</span>
                      ) : (
                        '-'
                      )
                    ) : total > 0 ? (
                      <span className="text-stone-950 font-black">{total}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2 pt-1 font-medium">
        <span className="flex items-center gap-1.5">
          <Edit2 className="w-3.5 h-3.5 text-stone-500" />
          <span>คลิกที่เซลล์ในตาราง เพื่อเปิดหน้าต่างบันทึกหรือแก้ไขยอดขายของพนักงานในวันนั้นทันที</span>
        </span>
        <span className="text-stone-700 font-semibold bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
          แสดงข้อมูล 31 วันตามแบบฟอร์ม PIA สาขา
        </span>
      </div>
    </div>
  );
};
