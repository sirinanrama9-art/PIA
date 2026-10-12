import React, { useState } from 'react';
import { BranchDataState, StaffPerformanceData } from '../types/mscTypes';
import { User, Smartphone, Tablet, Laptop, Watch, Check, X, AlertTriangle } from 'lucide-react';

interface MscStaffTabProps {
  data: BranchDataState;
}

export const MscStaffTab: React.FC<MscStaffTabProps> = ({ data }) => {
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');

  const filteredStaff = data.staffList.filter((s) => {
    if (selectedStaffFilter === 'all') return true;
    return s.staffId === selectedStaffFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Filter Bar (Screenshot 3) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              ผลงานและเป้าหมายรายบุคคล
            </h2>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            เกณฑ์: 7Care ≥40% | SIM ≥30% | UFUND ≥50% | ฟิล์ม ≥70% | SanDisk ≥50%
          </div>
        </div>

        {/* Staff Switchers */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedStaffFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStaffFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ทุกคนในทีม ({data.staffList.length})
          </button>

          {data.staffList.map((s) => (
            <button
              key={s.staffId}
              onClick={() => setSelectedStaffFilter(s.staffId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStaffFilter === s.staffId
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.name} ({s.staffId})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Staff Cards Grid (Screenshot 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStaff.map((staff) => {
          // Total calculations for staff
          const totalStaffActual =
            staff.iphone.actualRevenue +
            staff.ipad.actualRevenue +
            staff.mac.actualRevenue +
            staff.appleWatch.actualRevenue;

          const totalStaffTarget =
            staff.iphone.targetRevenue +
            staff.ipad.targetRevenue +
            staff.mac.targetRevenue +
            staff.appleWatch.targetRevenue;

          const totalStaffDeficit = totalStaffTarget - totalStaffActual;
          const totalStaffAchieve = (totalStaffActual / totalStaffTarget) * 100;

          const totalStaffUnits =
            staff.iphone.actualUnits +
            staff.ipad.actualUnits +
            staff.mac.actualUnits +
            staff.appleWatch.actualUnits;

          const productRows = [
            {
              id: 'iphone',
              label: 'iPhone',
              actual: staff.iphone.actualRevenue,
              target: staff.iphone.targetRevenue,
              deficit: staff.iphone.targetRevenue - staff.iphone.actualRevenue,
              pct: (staff.iphone.actualRevenue / staff.iphone.targetRevenue) * 100,
            },
            {
              id: 'ipad',
              label: 'iPad',
              actual: staff.ipad.actualRevenue,
              target: staff.ipad.targetRevenue,
              deficit: staff.ipad.targetRevenue - staff.ipad.actualRevenue,
              pct: (staff.ipad.actualRevenue / staff.ipad.targetRevenue) * 100,
            },
            {
              id: 'mac',
              label: 'Mac',
              actual: staff.mac.actualRevenue,
              target: staff.mac.targetRevenue,
              deficit: staff.mac.targetRevenue - staff.mac.actualRevenue,
              pct: (staff.mac.actualRevenue / staff.mac.targetRevenue) * 100,
            },
            {
              id: 'appleWatch',
              label: 'Apple Watch',
              actual: staff.appleWatch.actualRevenue,
              target: staff.appleWatch.targetRevenue,
              deficit: staff.appleWatch.targetRevenue - staff.appleWatch.actualRevenue,
              pct: staff.appleWatch.targetRevenue > 0 ? (staff.appleWatch.actualRevenue / staff.appleWatch.targetRevenue) * 100 : 0,
            },
          ];

          // Staff attachments rate
          const careIphoneRate = staff.careIphone.total > 0 ? (staff.careIphone.attached / staff.careIphone.total) * 100 : 0;
          const careIpadRate = staff.careIpad.total > 0 ? (staff.careIpad.attached / staff.careIpad.total) * 100 : 0;
          const careMacRate = staff.careMac.total > 0 ? (staff.careMac.attached / staff.careMac.total) * 100 : 0;
          const careWatchRate = staff.careWatch.total > 0 ? (staff.careWatch.attached / staff.careWatch.total) * 100 : 0;

          const simRate = staff.sim.total > 0 ? (staff.sim.attached / staff.sim.total) * 100 : 0;
          const ufundRate = staff.ufund.total > 0 ? (staff.ufund.attached / staff.ufund.total) * 100 : 0;
          const filmRate = staff.film.total > 0 ? (staff.film.attached / staff.film.total) * 100 : 0;
          const sandiskRate = staff.sandisk.total > 0 ? (staff.sandisk.attached / staff.sandisk.total) * 100 : 0;

          return (
            <div
              key={staff.staffId}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-5"
            >
              {/* Staff Title Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-black text-base shadow-2xs">
                  {staff.avatarLetter}
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">{staff.name}</h3>
                  <span className="text-xs text-slate-400 font-medium">{staff.staffId}</span>
                </div>
              </div>

              {/* Total Q4 Goal Box */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span>เป้าหมาย Q4 รวม</span>
                  </div>
                  <span className="text-lg font-black text-indigo-700">
                    {totalStaffAchieve.toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-[11px] text-slate-500">
                  <span>
                    จริง: <strong className="text-slate-800 font-bold">{totalStaffActual.toLocaleString()} ฿</strong> / {totalStaffTarget.toLocaleString()} ฿
                  </span>
                  <span className="text-rose-600 font-semibold">
                    ขาด: {totalStaffDeficit.toLocaleString()} ฿
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(totalStaffAchieve, 100)}%` }}
                  />
                </div>
              </div>

              {/* Product Breakdown List */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {productRows.map((pr) => (
                  <div key={pr.id} className="text-xs space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-800">{pr.label}</span>
                      <span className="font-extrabold text-slate-900">{pr.pct.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-slate-400">
                      <span>
                        จริง: {pr.actual.toLocaleString()} ฿ <span className="text-slate-300">|</span> เป้า: {pr.target.toLocaleString()} ฿
                      </span>
                      <span className="text-rose-500 font-medium">
                        {pr.deficit > 0 ? `ขาดอีก ${pr.deficit.toLocaleString()}` : 'ครบเป้าแล้ว'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Unit Summary Pills Grid */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-slate-700">ยอดขายเครื่องรายหมวด</span>
                  <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 text-[11px]">
                    รวม {totalStaffUnits} เครื่อง
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">iPhone</div>
                    <div className="font-black text-slate-900 text-sm">{staff.iphone.actualUnits}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">iPad</div>
                    <div className="font-black text-slate-900 text-sm">{staff.ipad.actualUnits}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">Mac</div>
                    <div className="font-black text-slate-900 text-sm">{staff.mac.actualUnits}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">Watch</div>
                    <div className="font-black text-slate-900 text-sm">{staff.appleWatch.actualUnits}</div>
                  </div>
                  <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-200 text-indigo-950">
                    <div className="text-[10px] text-indigo-600 font-bold">รวม</div>
                    <div className="font-black text-indigo-700 text-sm">{totalStaffUnits}</div>
                  </div>
                </div>
              </div>

              {/* Attach Rates Badges (ATTACH RATES) */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider block">
                  อัตราแนบบริการ (ATTACH RATES)
                </span>

                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {/* 7Care iPhone */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">7Care iP</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{careIphoneRate.toFixed(1)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        careIphoneRate >= 40 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {careIphoneRate >= 40 ? 'ผ่าน' : 'ไปอีก'}
                      </span>
                    </div>
                  </div>

                  {/* 7Care iPad */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">7Care iPad</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{careIpadRate.toFixed(0)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        careIpadRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {careIpadRate >= 30 ? 'ผ่าน' : 'ไปอีก'}
                      </span>
                    </div>
                  </div>

                  {/* 7Care Mac */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">7Care Mac</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{careMacRate.toFixed(0)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        careMacRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {careMacRate >= 30 ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </div>
                  </div>

                  {/* 7Care Watch */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">7Care AW</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{careWatchRate.toFixed(0)}%</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-100 text-slate-500">
                        -
                      </span>
                    </div>
                  </div>

                  {/* SIM */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">SIM</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{simRate.toFixed(1)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        simRate >= 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {simRate >= 30 ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </div>
                  </div>

                  {/* UFUND */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">UFUND</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{ufundRate.toFixed(1)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        ufundRate >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {ufundRate >= 50 ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </div>
                  </div>

                  {/* Film */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">ฟิล์ม iP</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{filmRate.toFixed(1)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        filmRate >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {filmRate >= 70 ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </div>
                  </div>

                  {/* SanDisk */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-medium text-slate-700">SanDisk</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{sandiskRate.toFixed(1)}%</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        sandiskRate >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {sandiskRate >= 50 ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Overview Comparison Table (Screenshot 5) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600" />
          <h3 className="font-black text-base text-slate-900">
            ตารางเปรียบเทียบเป้าหมายยอดขายทั้งทีม (Overview Comparison Table)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/60">
                <th className="py-3 px-3">พนักงาน</th>
                <th className="py-3 px-3">สินค้า / บริการ</th>
                <th className="py-3 px-3 text-right">เป้าหมาย (บ.)</th>
                <th className="py-3 px-3 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-3 px-3 text-right">% บรรลุ</th>
                <th className="py-3 px-3 text-right">ยอดที่ยังขาด (บ.)</th>
                <th className="py-3 px-3 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.staffList.map((staff) => {
                const totalActual =
                  staff.iphone.actualRevenue +
                  staff.ipad.actualRevenue +
                  staff.mac.actualRevenue +
                  staff.appleWatch.actualRevenue;

                const totalTarget =
                  staff.iphone.targetRevenue +
                  staff.ipad.targetRevenue +
                  staff.mac.targetRevenue +
                  staff.appleWatch.targetRevenue;

                const totalDeficit = totalTarget - totalActual;
                const totalPct = (totalActual / totalTarget) * 100;

                const rows = [
                  { label: '📱 iPhone', target: staff.iphone.targetRevenue, actual: staff.iphone.actualRevenue },
                  { label: '📱 iPad', target: staff.ipad.targetRevenue, actual: staff.ipad.actualRevenue },
                  { label: '💻 Mac', target: staff.mac.targetRevenue, actual: staff.mac.actualRevenue },
                  { label: '⌚ Apple Watch', target: staff.appleWatch.targetRevenue, actual: staff.appleWatch.actualRevenue },
                ];

                return (
                  <React.Fragment key={staff.staffId}>
                    {rows.map((r, rIdx) => {
                      const deficit = r.target - r.actual;
                      const pct = r.target > 0 ? (r.actual / r.target) * 100 : 0;
                      return (
                        <tr key={r.label} className="hover:bg-slate-50/60 transition-colors">
                          {rIdx === 0 && (
                            <td rowSpan={5} className="py-3 px-3 font-extrabold text-slate-900 border-r border-slate-100 align-top">
                              {staff.name} ({staff.staffId})
                            </td>
                          )}
                          <td className="py-2.5 px-3 font-medium text-slate-700">{r.label}</td>
                          <td className="py-2.5 px-3 text-right font-medium text-slate-600">{r.target.toLocaleString()} ฿</td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">{r.actual.toLocaleString()} ฿</td>
                          <td className="py-2.5 px-3 text-right font-black text-indigo-700">{pct.toFixed(1)}%</td>
                          <td className="py-2.5 px-3 text-right font-medium text-rose-600">
                            {deficit > 0 ? deficit.toLocaleString() + ' ฿' : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-center text-[11px] font-bold text-rose-600">
                            {deficit > 0 ? '✕ ยังไม่บรรลุ' : '✓ บรรลุ'}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Summary row for staff */}
                    <tr className="bg-slate-50 font-black border-b border-slate-200">
                      <td className="py-2.5 px-3 text-indigo-900">⏳ รวมทุกหมวด</td>
                      <td className="py-2.5 px-3 text-right text-slate-800">{totalTarget.toLocaleString()} ฿</td>
                      <td className="py-2.5 px-3 text-right text-indigo-900">{totalActual.toLocaleString()} ฿</td>
                      <td className="py-2.5 px-3 text-right text-indigo-700 font-black">{totalPct.toFixed(1)}%</td>
                      <td className="py-2.5 px-3 text-right text-rose-600">{totalDeficit.toLocaleString()} ฿</td>
                      <td className="py-2.5 px-3 text-center text-[11px] text-rose-600">
                        {totalDeficit > 0 ? '✕ ยังไม่บรรลุ' : '✓ บรรลุ'}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
