import React from 'react';
import { Smartphone, Tablet, Laptop, Watch, TrendingUp } from 'lucide-react';
import { BranchDataState } from '../types/mscTypes';

interface MscOverviewTabProps {
  data: BranchDataState;
  onOpenSimulator: () => void;
}

export const MscOverviewTab: React.FC<MscOverviewTabProps> = ({ data, onOpenSimulator }) => {
  // Aggregate store figures
  const computedActual = data.staffList.reduce((acc, s) => {
    return acc + s.iphone.actualRevenue + s.ipad.actualRevenue + s.mac.actualRevenue + s.appleWatch.actualRevenue;
  }, 0);

  const totalActual = data.actualRevenue || computedActual;
  const computedTarget = data.staffList.reduce((acc, s) => {
    return acc + s.iphone.targetRevenue + s.ipad.targetRevenue + s.mac.targetRevenue + s.appleWatch.targetRevenue;
  }, 0);
  const totalTarget = data.targetRevenue || (computedTarget > 0 ? computedTarget : 10230348);

  const totalUnits = data.staffList.reduce((acc, s) => {
    return acc + s.iphone.actualUnits + s.ipad.actualUnits + s.mac.actualUnits + s.appleWatch.actualUnits;
  }, 0);

  const deficit = Math.max(0, totalTarget - totalActual);
  const achievePct = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;
  
  // Forecast projection
  const forecastTotal = data.staffList.reduce((acc, s) => {
    return acc + (s.iphone.forecastRevenue || s.iphone.actualRevenue * 1.5) +
                 (s.ipad.forecastRevenue || s.ipad.actualRevenue * 1.5) +
                 (s.mac.forecastRevenue || s.mac.actualRevenue * 1.5) +
                 (s.appleWatch.forecastRevenue || s.appleWatch.actualRevenue * 1.5);
  }, 0) || Math.round(totalActual * 1.48);

  const forecastPct = totalTarget > 0 ? (forecastTotal / totalTarget) * 100 : 0;

  // Product categories aggregated
  const products = [
    {
      id: 'iphone',
      name: 'สมาร์ทโฟน / SMP',
      icon: Smartphone,
      units: data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0),
      actualRev: data.staffList.reduce((acc, s) => acc + s.iphone.actualRevenue, 0),
      targetRev: data.staffList.reduce((acc, s) => acc + s.iphone.targetRevenue, 0) || 8472748,
      forecastRev: data.staffList.reduce((acc, s) => acc + s.iphone.forecastRevenue, 0) || 8780000,
      color: 'bg-sky-500',
    },
    {
      id: 'mac',
      name: 'โน้ตบุ๊ก / NB',
      icon: Laptop,
      units: data.staffList.reduce((acc, s) => acc + s.mac.actualUnits, 0),
      actualRev: data.staffList.reduce((acc, s) => acc + s.mac.actualRevenue, 0),
      targetRev: data.staffList.reduce((acc, s) => acc + s.mac.targetRevenue, 0) || 950000,
      forecastRev: data.staffList.reduce((acc, s) => acc + s.mac.forecastRevenue, 0) || 780000,
      color: 'bg-amber-500',
    },
    {
      id: 'ipad',
      name: 'แท็บเล็ต / iPad',
      icon: Tablet,
      units: data.staffList.reduce((acc, s) => acc + s.ipad.actualUnits, 0),
      actualRev: data.staffList.reduce((acc, s) => acc + s.ipad.actualRevenue, 0),
      targetRev: data.staffList.reduce((acc, s) => acc + s.ipad.targetRevenue, 0) || 517587,
      forecastRev: data.staffList.reduce((acc, s) => acc + s.ipad.forecastRevenue, 0) || 400000,
      color: 'bg-sky-500',
    },
    {
      id: 'appleWatch',
      name: 'Gadget & อุปกรณ์เสริม',
      icon: Watch,
      units: data.staffList.reduce((acc, s) => acc + s.appleWatch.actualUnits, 0),
      actualRev: data.staffList.reduce((acc, s) => acc + s.appleWatch.actualRevenue, 0),
      targetRev: data.staffList.reduce((acc, s) => acc + s.appleWatch.targetRevenue, 0) || 290000,
      forecastRev: data.staffList.reduce((acc, s) => acc + s.appleWatch.forecastRevenue, 0) || 48000,
      color: 'bg-amber-400',
    },
  ];

  // Helper for dynamic attachments
  const totalSmpUnits = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0);
  const totalNbUnits = data.staffList.reduce((acc, s) => acc + s.mac.actualUnits, 0) || 29;

  const createAttachment = (
    id: string,
    title: string,
    targetPct: number,
    attached: number,
    base: number,
    unit: string = 'เครื่อง'
  ) => {
    const rate = base > 0 ? (attached / base) * 100 : 0;
    const vsTarget = targetPct > 0 ? Math.round((rate / targetPct) * 100) : 0;
    const needed = Math.max(0, Math.ceil((targetPct / 100) * base) - attached);
    const status: 'pass' | 'near' | 'fail' = rate >= targetPct ? 'pass' : rate >= targetPct * 0.7 ? 'near' : 'fail';
    const statusLabel = status === 'pass' ? 'ผ่าน' : status === 'near' ? 'ไปอีก' : 'ไม่ผ่าน';
    const colorBar = status === 'pass' ? 'bg-emerald-500' : status === 'near' ? 'bg-amber-500' : 'bg-rose-500';
    const note = status === 'pass'
      ? `ผ่านเป้าหมาย (${attached}/${base} ${unit}) เกิน +${(rate - targetPct).toFixed(1)}%`
      : needed > 0 
        ? `ขาดอีก ${needed} ${unit} ถึงเป้า ${targetPct}% (ทำได้ ${rate.toFixed(1)}%)`
        : `ทำได้ ${rate.toFixed(1)}% (เป้า ${targetPct}%)`;

    return {
      id,
      title,
      targetLabel: `เป้า ≥ ${targetPct}%`,
      rate,
      attached,
      base,
      vsTarget,
      status,
      statusLabel,
      note,
      colorBar,
    };
  };

  const careIphoneAtt = data.staffList.reduce((acc, s) => acc + s.careIphone.attached, 0);
  const careIpadAtt = data.staffList.reduce((acc, s) => acc + s.careIpad.attached, 0);
  const careMacAtt = data.staffList.reduce((acc, s) => acc + s.careMac.attached, 0);
  const careWatchAtt = data.staffList.reduce((acc, s) => acc + s.careWatch.attached, 0);
  const simAtt = data.staffList.reduce((acc, s) => acc + s.sim.attached, 0);
  const ufundAtt = data.staffList.reduce((acc, s) => acc + s.ufund.attached, 0);
  const filmAtt = data.staffList.reduce((acc, s) => acc + s.film.attached, 0);
  const sandiskAtt = data.staffList.reduce((acc, s) => acc + s.sandisk.attached, 0);

  const [attachFilter, setAttachFilter] = React.useState<'all' | 'pass' | 'near' | 'fail'>('all');

  const attachmentCards = [
    createAttachment('careIphone', 'UTC+ สำหรับ SMP', data.targets.careIphone, careIphoneAtt, totalSmpUnits),
    createAttachment('careMac', 'Social Care+', data.targets.careMac, careMacAtt, totalNbUnits),
    createAttachment('careWatch', 'UTC+ For Gadget', data.targets.careWatch, careWatchAtt, totalNbUnits),
    createAttachment('sim', 'เปิดเบอร์ SIM True', data.targets.sim, simAtt, totalSmpUnits, 'ชิ้น'),
    createAttachment('ufund', 'UFUND APPIN', data.targets.ufund, ufundAtt, totalSmpUnits, 'สัญญา'),
    createAttachment('film', 'ฟิล์มกันรอย', data.targets.film, filmAtt, totalSmpUnits, 'ชิ้น'),
    createAttachment('sandisk', 'SanDisk', data.targets.sandisk, sandiskAtt, totalNbUnits, 'ชิ้น'),
    createAttachment('careIpad', 'TI Care (NB)', data.targets.careIpad, careIpadAtt, totalNbUnits),
  ];

  const filteredAttachments = attachmentCards.filter((c) => {
    if (attachFilter === 'all') return true;
    return c.status === attachFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Branch Total Revenue Card (Screenshot 1 Top) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                ยอดขายรวมสาขา ({data.quarter})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              รวมทุกหมวดสินค้า (SMP, NB, Tablet, Gadget) • พนักงานประจำสาขา {data.staffList.length} คน
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-bold text-slate-500">เป้าหมาย:</span>
            <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {totalTarget.toLocaleString()} ฿
            </span>
          </div>
        </div>

        {/* Big numbers row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
          {/* Col 1: Actual Revenue */}
          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-semibold">ยอดขายจริงสะสม</div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {totalActual.toLocaleString()} ฿
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <span>ขายได้แล้ว:</span>
              <strong className="text-slate-800 font-extrabold">{totalUnits} เครื่อง/ชิ้น</strong>
            </div>
          </div>

          {/* Col 2: Deficit */}
          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-semibold">ยอดที่ยังขาดถึงเป้า</div>
            <div className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight">
              {deficit.toLocaleString()} ฿
            </div>
            <div className="text-xs text-slate-500 pt-1">
              {deficit === 0 ? '🎉 บรรลุเป้าหมายครบ 100%' : `ต้องทำเพิ่มอีก ${deficit.toLocaleString()} ฿`}
            </div>
          </div>

          {/* Col 3: Achieve % and Forecast */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">ความสำเร็จ (% Att)</span>
              <span className="text-2xl font-black text-indigo-700">
                {achievePct.toFixed(1)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(achievePct, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
              <span>คาดการณ์สิ้นงวด:</span>
              <span className="font-extrabold text-slate-800">
                {forecastTotal.toLocaleString()} ฿ ({forecastPct.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-slate-50/70 -mx-6 -mb-6 p-4 px-6 rounded-b-3xl">
          <div className="text-slate-600">
            ⏳ เหลือเวลาทำงานอีก <strong className="text-slate-900 font-black">{data.daysRemaining} วัน</strong>
            {' '}• ต้องทำยอดเฉลี่ย <strong className="text-indigo-700 font-black">{(deficit / Math.max(1, data.daysRemaining)).toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿ / วัน</strong> เพื่อแตะเป้า 100%
          </div>
          <button
            onClick={onOpenSimulator}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline cursor-pointer"
          >
            เปิดระบบจำลองยอดขาย →
          </button>
        </div>
      </div>

      {/* 2. Product Categories Grid (Screenshot 1 Middle) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((prod) => {
          const prodAttPct = prod.targetRev > 0 ? (prod.actualRev / prod.targetRev) * 100 : 0;
          const prodDeficit = Math.max(0, prod.targetRev - prod.actualRev);
          const Icon = prod.icon;

          return (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-black text-sm text-slate-900">{prod.name}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                    {prod.units} เครื่อง
                  </span>
                </div>

                <div className="mt-3 space-y-0.5">
                  <div className="text-xs text-slate-500">ยอดขายจริง</div>
                  <div className="text-xl font-black text-slate-900">
                    {prod.actualRev.toLocaleString()} ฿
                  </div>
                  <div className="text-[11px] text-slate-400">
                    เป้า: {prod.targetRev.toLocaleString()} ฿
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-slate-500 font-semibold">% บรรลุผล</span>
                  <span className="font-black text-indigo-700">{prodAttPct.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${prod.color} h-full rounded-full`}
                    style={{ width: `${Math.min(prodAttPct, 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>ขาดอีก {prodDeficit.toLocaleString()} ฿</span>
                  <span className="text-slate-400">คาดการณ์ {prod.forecastRev.toLocaleString()} ฿</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Key Attachments Cards Grid (Screenshot 2) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                อัตราการแนบบริการสำคัญ (Attach Rate Targets)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ติดตามบริการสำคัญ: UTC+, UFUND, SIM, ฟิล์ม, TI Care, Social Care+, SanDisk
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
            <button
              onClick={() => setAttachFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({attachmentCards.length})
            </button>
            <button
              onClick={() => setAttachFilter('pass')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'pass'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              ผ่านเกณฑ์ ({attachmentCards.filter((c) => c.status === 'pass').length})
            </button>
            <button
              onClick={() => setAttachFilter('near')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'near'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              ใกล้ถึง ({attachmentCards.filter((c) => c.status === 'near').length})
            </button>
            <button
              onClick={() => setAttachFilter('fail')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                attachFilter === 'fail'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              ไม่ผ่าน ({attachmentCards.filter((c) => c.status === 'fail').length})
            </button>
          </div>
        </div>

        {/* Attachment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAttachments.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{card.title}</span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {card.targetLabel}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-2xl font-black text-slate-900">
                    {card.rate.toFixed(1)}%
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      card.status === 'pass'
                        ? 'bg-emerald-100 text-emerald-800'
                        : card.status === 'near'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {card.statusLabel}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${card.colorBar} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(card.vsTarget, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="truncate">{card.note}</span>
                <span className="font-bold text-slate-700 shrink-0 ml-1">
                  {card.attached}/{card.base}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
