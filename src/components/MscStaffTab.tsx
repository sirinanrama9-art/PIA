import React, { useState } from 'react';
import { BranchDataState, StaffPerformanceData } from '../types/mscTypes';
import { 
  User, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Monitor, 
  Check, 
  X, 
  AlertTriangle, 
  Target, 
  TrendingUp, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface MscStaffTabProps {
  data: BranchDataState;
}

export const MscStaffTab: React.FC<MscStaffTabProps> = ({ data }) => {
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
  const [trackingStaffId, setTrackingStaffId] = useState<string>('35350'); // Default to สตาร์
  const [targetMultiplier, setTargetMultiplier] = useState<number>(100); // 100% or 120%

  const filteredStaff = data.staffList.filter((s) => {
    if (selectedStaffFilter === 'all') return true;
    return s.staffId === selectedStaffFilter;
  });

  // Tracking staff for bottom section
  const trackingStaff = data.staffList.find((s) => s.staffId === trackingStaffId) || data.staffList[3] || data.staffList[0];

  // Staff specific data maps
  const staffStaticInfo: Record<string, {
    actualRev: number;
    targetRev: number;
    achievePct: number;
    deficitRev: number;
    rank: number;
    rankLabel: string;
    smpUnits: number;
    diyUnits: number;
    nbUnits: number;
    desktopUnits: number;
    totalUnits: number;
    attach: {
      utcCare: { rate: number; status: string; pass: boolean; near?: boolean };
      socialCare: { rate: number; status: string; pass: boolean };
      tiCare: { rate: number; status: string; pass: boolean; near?: boolean };
      utcGadget: { rate: number; status: string; pass: boolean };
      sim: { rate: number; status: string; pass: boolean };
      ufund: { rate: number; status: string; pass: boolean };
      sandisk: { rate: number; status: string; pass: boolean };
      film: { rate: number; status: string; pass: boolean };
    };
  }> = {
    '24583': {
      actualRev: 1015039,
      targetRev: 2557587,
      achievePct: 39.7,
      deficitRev: 1542548,
      rank: 1,
      rankLabel: '🥇 อันดับ 1',
      smpUnits: 36,
      diyUnits: 2,
      nbUnits: 18,
      desktopUnits: 0,
      totalUnits: 56,
      attach: {
        utcCare: { rate: 19.4, status: '❌ ไม่ผ่าน', pass: false },
        socialCare: { rate: 8.3, status: '❌ ไม่ผ่าน', pass: false },
        tiCare: { rate: 0.0, status: '❌ ไม่ผ่าน', pass: false },
        utcGadget: { rate: 5.6, status: '❌ ไม่ผ่าน', pass: false },
        sim: { rate: 5.6, status: '❌ ไม่ผ่าน', pass: false },
        ufund: { rate: 2.8, status: '❌ ไม่ผ่าน', pass: false },
        sandisk: { rate: 27.8, status: '❌ ไม่ผ่าน', pass: false },
        film: { rate: 2.8, status: '❌ ไม่ผ่าน', pass: false },
      },
    },
    '29253': {
      actualRev: 769458,
      targetRev: 2557587,
      achievePct: 30.1,
      deficitRev: 1788129,
      rank: 2,
      rankLabel: '🥈 อันดับ 2',
      smpUnits: 47,
      diyUnits: 2,
      nbUnits: 4,
      desktopUnits: 0,
      totalUnits: 53,
      attach: {
        utcCare: { rate: 27.7, status: '❌ ไม่ผ่าน', pass: false },
        socialCare: { rate: 14.9, status: '❌ ไม่ผ่าน', pass: false },
        tiCare: { rate: 25.0, status: '🤘 ไปอีก', pass: false, near: true },
        utcGadget: { rate: 8.5, status: '❌ ไม่ผ่าน', pass: false },
        sim: { rate: 6.4, status: '❌ ไม่ผ่าน', pass: false },
        ufund: { rate: 10.6, status: '❌ ไม่ผ่าน', pass: false },
        sandisk: { rate: 21.3, status: '❌ ไม่ผ่าน', pass: false },
        film: { rate: 23.4, status: '❌ ไม่ผ่าน', pass: false },
      },
    },
    '21865': {
      actualRev: 706284,
      targetRev: 2557587,
      achievePct: 27.6,
      deficitRev: 1851303,
      rank: 3,
      rankLabel: '🥉 อันดับ 3',
      smpUnits: 42,
      diyUnits: 2,
      nbUnits: 4,
      desktopUnits: 0,
      totalUnits: 48,
      attach: {
        utcCare: { rate: 19.0, status: '❌ ไม่ผ่าน', pass: false },
        socialCare: { rate: 11.9, status: '❌ ไม่ผ่าน', pass: false },
        tiCare: { rate: 0.0, status: '❌ ไม่ผ่าน', pass: false },
        utcGadget: { rate: 2.4, status: '❌ ไม่ผ่าน', pass: false },
        sim: { rate: 11.9, status: '❌ ไม่ผ่าน', pass: false },
        ufund: { rate: 21.4, status: '❌ ไม่ผ่าน', pass: false },
        sandisk: { rate: 9.5, status: '❌ ไม่ผ่าน', pass: false },
        film: { rate: 21.4, status: '❌ ไม่ผ่าน', pass: false },
      },
    },
    '35350': {
      actualRev: 635550,
      targetRev: 2557587,
      achievePct: 24.8,
      deficitRev: 1922037,
      rank: 4,
      rankLabel: '🏅 อันดับ 4',
      smpUnits: 45,
      diyUnits: 1,
      nbUnits: 4,
      desktopUnits: 1,
      totalUnits: 51,
      attach: {
        utcCare: { rate: 26.7, status: '❌ ไม่ผ่าน', pass: false },
        socialCare: { rate: 2.2, status: '❌ ไม่ผ่าน', pass: false },
        tiCare: { rate: 0.0, status: '❌ ไม่ผ่าน', pass: false },
        utcGadget: { rate: 2.2, status: '❌ ไม่ผ่าน', pass: false },
        sim: { rate: 6.7, status: '❌ ไม่ผ่าน', pass: false },
        ufund: { rate: 0.0, status: '❌ ไม่ผ่าน', pass: false },
        sandisk: { rate: 11.1, status: '❌ ไม่ผ่าน', pass: false },
        film: { rate: 20.0, status: '❌ ไม่ผ่าน', pass: false },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              👤 ผลงานรายบุคคล (ตุลาคม 2569)
            </h2>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            🎯 เกณฑ์เป้าหมาย: 🛡️ Ultra Care+ SMP (≥40%) | SIM ≥ 30% | UFUND ≥ 50% | ฟิล์ม ≥ 70% | SanDisk ≥ 50%
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
            ทุกคนในทีม (4 ท่าน)
          </button>

          {data.staffList.map((s) => {
            const info = staffStaticInfo[s.staffId];
            return (
              <button
                key={s.staffId}
                onClick={() => setSelectedStaffFilter(s.staffId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedStaffFilter === s.staffId
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{s.name}</span>
                <span className="text-[10px] opacity-75">({s.staffId})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredStaff.map((staff) => {
          const info = staffStaticInfo[staff.staffId] || staffStaticInfo['35350'];

          return (
            <div
              key={staff.staffId}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-5 hover:border-indigo-200 transition-colors"
            >
              {/* Staff Title Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-black text-lg shadow-2xs">
                    {staff.avatarLetter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-slate-900">{staff.name}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                        PIA: {staff.staffId}
                      </span>
                    </div>
                    <span className="text-xs text-indigo-700 font-extrabold">{info.rankLabel}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">ยอดขายจริง</div>
                  <div className="text-base font-black text-slate-900">
                    {info.actualRev.toLocaleString()} ฿
                  </div>
                  <div className="text-[10px] text-rose-500 font-bold">
                    ขาด {info.deficitRev.toLocaleString()} ฿
                  </div>
                </div>
              </div>

              {/* Progress Bar towards Target */}
              <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-slate-700">เป้าหมาย Q4 (2,557,587 ฿)</span>
                  <span className="font-black text-indigo-700">{info.achievePct}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(info.achievePct, 100)}%` }}
                  />
                </div>
              </div>

              {/* Product Device Units Count */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-slate-700">📦 ยอดขายเครื่องแยกรายหมวด</span>
                  <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    รวม {info.totalUnits} เครื่อง
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                      <span>📱</span>
                      <span>Smartphone</span>
                    </div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{info.smpUnits} เครื่อง</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                      <span>💻</span>
                      <span>DIY</span>
                    </div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{info.diyUnits} เครื่อง</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                      <span>💻</span>
                      <span>NB (Notebook)</span>
                    </div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{info.nbUnits} เครื่อง</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                      <span>🖥️</span>
                      <span>Desktop</span>
                    </div>
                    <div className="font-black text-slate-900 text-sm mt-0.5">{info.desktopUnits} เครื่อง</div>
                  </div>
                </div>
              </div>

              {/* 8 Attach Rates Badges Grid */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-600 block">
                  🛡️ อัตราแนบบริการ (Key Attach Rates)
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Ultra Care+ SMP */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">🛡️ Ultra Care+ SMP</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 40%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.utcCare.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.utcCare.status}
                      </span>
                    </div>
                  </div>

                  {/* Social Care+ */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">🛡️ Social Care+</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 30%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.socialCare.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.socialCare.status}
                      </span>
                    </div>
                  </div>

                  {/* TI Care+ */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">💻 TI Care+</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 30%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.tiCare.rate.toFixed(1)}%</div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        info.attach.tiCare.near ? 'text-amber-800 bg-amber-100' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {info.attach.tiCare.status}
                      </span>
                    </div>
                  </div>

                  {/* UTC+ For Gadget */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">⌚ UTC+ Gadget</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 20%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.utcGadget.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.utcGadget.status}
                      </span>
                    </div>
                  </div>

                  {/* SIM True */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">📶 SIM True</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 30%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.sim.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.sim.status}
                      </span>
                    </div>
                  </div>

                  {/* UFUND APPIN */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">💳 UFUND APPIN</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 50%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.ufund.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.ufund.status}
                      </span>
                    </div>
                  </div>

                  {/* SanDisk */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">💾 SanDisk</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 50%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.sandisk.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.sandisk.status}
                      </span>
                    </div>
                  </div>

                  {/* Film SMP */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-600">✨ ฟิล์ม SMP</div>
                      <div className="text-[10px] text-slate-400">เป้า ≥ 70%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{info.attach.film.rate.toFixed(1)}%</div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        {info.attach.film.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Sales Target Tracking Section (🎯 ติดตามเป้าหมายยอดขายรายบุคคล) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                ติดตามเป้าหมายยอดขายรายบุคคล (Sales Target Tracking)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              👤 พนักงาน: <strong>{trackingStaff.name} (PIA: {trackingStaff.staffId})</strong> | เกณฑ์เป้าหมายยอดขายรายบุคคล Q4
            </p>
          </div>

          {/* Controls: Select Staff & Target Multiplier (100% vs 120%) */}
          <div className="flex items-center gap-2 flex-wrap self-end sm:self-auto">
            {/* Select Staff */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {data.staffList.map((s) => (
                <button
                  key={s.staffId}
                  onClick={() => setTrackingStaffId(s.staffId)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    trackingStaffId === s.staffId
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Target Multiplier 100% vs 120% */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setTargetMultiplier(100)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  targetMultiplier === 100
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                เป้า 100%
              </button>
              <button
                onClick={() => setTargetMultiplier(120)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  targetMultiplier === 120
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                เป้า 120% 🚀
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Target Tracking Table for Selected Staff */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-2.5 px-3">สินค้า / บริการ</th>
                <th className="py-2.5 px-3 text-right">เป้าหมาย (บ.) ({targetMultiplier}%)</th>
                <th className="py-2.5 px-3 text-right">ยอดขายจริง (บ.)</th>
                <th className="py-2.5 px-3 text-right">% บรรลุ</th>
                <th className="py-2.5 px-3 text-right">ยอดที่ยังขาด (บ.)</th>
                <th className="py-2.5 px-3 text-right">⚡ ขายเฉลี่ยต่อวัน (19 วัน)</th>
                <th className="py-2.5 px-3 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {(() => {
                const baseInfo = staffStaticInfo[trackingStaff.staffId] || staffStaticInfo['35350'];
                const daysRemaining = 19;

                // Category items for selected staff
                const items = [
                  {
                    name: '📱 Smartphone',
                    baseTarget: 2027815,
                    actual: trackingStaff.iphone.actualRevenue,
                  },
                  {
                    name: '💻 Notebook (NB)',
                    baseTarget: 466009,
                    actual: trackingStaff.mac.actualRevenue,
                  },
                  {
                    name: '💻 DIY',
                    baseTarget: 14873,
                    actual: trackingStaff.ipad.actualRevenue,
                  },
                  {
                    name: '🖥️ Desktop',
                    baseTarget: 48890,
                    actual: trackingStaff.appleWatch.actualRevenue,
                  },
                ];

                const totalTarget = 2557587 * (targetMultiplier / 100);
                const totalActual = baseInfo.actualRev;
                const totalDeficit = Math.max(0, totalTarget - totalActual);
                const totalAchieve = (totalActual / totalTarget) * 100;
                const totalDaily = totalDeficit / daysRemaining;

                return (
                  <>
                    {items.map((it) => {
                      const targetVal = it.baseTarget * (targetMultiplier / 100);
                      const deficit = Math.max(0, targetVal - it.actual);
                      const pct = targetVal > 0 ? (it.actual / targetVal) * 100 : 0;
                      const daily = deficit / daysRemaining;

                      return (
                        <tr key={it.name} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{it.name}</td>
                          <td className="py-2.5 px-3 text-right text-slate-700 font-medium">
                            {targetVal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                          </td>
                          <td className="py-2.5 px-3 text-right font-black text-slate-900">
                            {it.actual.toLocaleString()} ฿
                          </td>
                          <td className="py-2.5 px-3 text-right font-black text-indigo-700">
                            {pct.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-rose-600">
                            {deficit > 0 ? `${deficit.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿` : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-indigo-700">
                            {daily > 0 ? `${daily.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน` : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              pct >= 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {pct >= 100 ? '✓ บรรลุ' : '✕ ยังไม่บรรลุ'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Summary row */}
                    <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                      <td className="py-3 px-3 text-indigo-950 font-black">
                        🏆 รวมทุกสินค้า ({trackingStaff.name})
                      </td>
                      <td className="py-3 px-3 text-right text-indigo-950 font-black">
                        {totalTarget.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                      </td>
                      <td className="py-3 px-3 text-right text-slate-900 font-black">
                        {totalActual.toLocaleString()} ฿
                      </td>
                      <td className="py-3 px-3 text-right text-indigo-700 font-black">
                        {totalAchieve.toFixed(1)}%
                      </td>
                      <td className="py-3 px-3 text-right text-rose-600 font-black">
                        {totalDeficit.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿
                      </td>
                      <td className="py-3 px-3 text-right text-indigo-700 font-black">
                        {totalDaily.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {totalAchieve >= 100 ? '✓ บรรลุเป้า' : '⚠️ เร่งทำยอด'}
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
          <span>
            💡 <strong>เกณฑ์เป้าหมาย {targetMultiplier}%</strong>: คำนวณยอดที่ยังขาด = MAX(0, เป้าหมาย - ยอดขายจริง) • ขายเฉลี่ย = ขาด ÷ 19 วันที่เหลือ
          </span>
          <span className="font-bold text-indigo-700">
            พนักงานที่เลือก: {trackingStaff.name} (PIA: {trackingStaff.staffId})
          </span>
        </div>
      </div>
    </div>
  );
};
