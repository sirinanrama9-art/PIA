import React, { useState, useEffect } from 'react';
import { StaffInfo, StaffRecordsMap, KPITargets, StaffDailyRecord } from '../types/sales';
import { X, Save, Smartphone, Laptop, Sparkles, Check } from 'lucide-react';

interface QuickEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  targets: KPITargets;
  initialStaffId?: string;
  initialDay?: number;
  onSaveRecord: (staffId: string, day: number, record: StaffDailyRecord) => void;
}

export const QuickEntryModal: React.FC<QuickEntryModalProps> = ({
  isOpen,
  onClose,
  staffList,
  records,
  targets,
  initialStaffId,
  initialDay = 1,
  onSaveRecord,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>(initialStaffId || staffList[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<number>(initialDay > 0 ? initialDay : 1);

  // Form states
  const [smpUnits, setSmpUnits] = useState<number>(0);
  const [utcCount, setUtcCount] = useState<number>(0);
  const [ufundCount, setUfundCount] = useState<number>(0);
  const [simCount, setSimCount] = useState<number>(0);
  const [filmCount, setFilmCount] = useState<number>(0);
  const [customersCount, setCustomersCount] = useState<number>(0);

  const [nbUnits, setNbUnits] = useState<number>(0);
  const [tiCareCount, setTiCareCount] = useState<number>(0);
  const [socialCareCount, setSocialCareCount] = useState<number>(0);
  const [utcGadgetCount, setUtcGadgetCount] = useState<number>(0);
  const [sandiskCount, setSandiskCount] = useState<number>(0);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Sync form when staff or day changes
  useEffect(() => {
    if (initialStaffId) setSelectedStaffId(initialStaffId);
    if (initialDay > 0) setSelectedDay(initialDay);
  }, [initialStaffId, initialDay, isOpen]);

  useEffect(() => {
    const existing = records[selectedStaffId]?.[selectedDay];
    if (existing) {
      setSmpUnits(existing.smp.smpUnits || 0);
      setUtcCount(existing.smp.utcCount || 0);
      setUfundCount(existing.smp.ufundCount || 0);
      setSimCount(existing.smp.simCount || 0);
      setFilmCount(existing.smp.filmCount || 0);
      setCustomersCount(existing.smp.customersCount || 0);

      setNbUnits(existing.nb.nbUnits || 0);
      setTiCareCount(existing.nb.tiCareCount || 0);
      setSocialCareCount(existing.nb.socialCareCount || 0);
      setUtcGadgetCount(existing.nb.utcGadgetCount || 0);
      setSandiskCount(existing.nb.sandiskCount || 0);
    } else {
      setSmpUnits(0);
      setUtcCount(0);
      setUfundCount(0);
      setSimCount(0);
      setFilmCount(0);
      setCustomersCount(0);
      setNbUnits(0);
      setTiCareCount(0);
      setSocialCareCount(0);
      setUtcGadgetCount(0);
      setSandiskCount(0);
    }
  }, [selectedStaffId, selectedDay, records]);

  if (!isOpen) return null;

  const currentStaff = staffList.find((s) => s.id === selectedStaffId) || staffList[0];

  // Calculated rates
  const utcPct = smpUnits > 0 ? (utcCount / smpUnits) * 100 : 0;
  const ufundPct = smpUnits > 0 ? (ufundCount / smpUnits) * 100 : 0;
  const simPct = smpUnits > 0 ? (simCount / smpUnits) * 100 : 0;
  const filmPct = smpUnits > 0 ? (filmCount / smpUnits) * 100 : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRecord: StaffDailyRecord = {
      smp: {
        smpUnits,
        utcCount,
        utcPercent: utcPct,
        ufundCount,
        ufundPercent: ufundPct,
        simCount,
        simPercent: simPct,
        filmCount,
        filmPercent: filmPct,
        customersCount,
      },
      nb: {
        nbUnits,
        tiCareCount,
        socialCareCount,
        utcGadgetCount,
        sandiskCount,
      },
    };

    onSaveRecord(selectedStaffId, selectedDay, updatedRecord);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-indigo-400 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">บันทึก / แก้ไขยอดขายประจำวัน</h3>
              <p className="text-xs text-slate-300 font-medium">
                เลือกพนักงานและวันที่เพื่อลงข้อมูลยอดขายจริง
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-5 custom-scrollbar">
          {/* Staff & Day Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                พนักงานขาย (Staff)
              </label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                วันที่ (Day 1 - 31)
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    วันที่ {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 1: Smartphone */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-sm text-slate-900">
                หมวดสมาร์ทโฟน (SMP) & อัตราแนบ
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-indigo-900 mb-1">
                  ยอดขาย SMP (เครื่อง) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={smpUnits}
                  onChange={(e) => setSmpUnits(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-indigo-200 bg-indigo-50/40 rounded-lg px-3 py-1.5 text-sm font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  UTC+ For SMP (ชิ้น)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={utcCount}
                    onChange={(e) => setUtcCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-bold text-blue-600">
                    {utcPct.toFixed(0)}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">เป้า {targets.utcSmp}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  UFUND APPIN (สัญญา)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={ufundCount}
                    onChange={(e) => setUfundCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-bold text-emerald-600">
                    {ufundPct.toFixed(0)}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">เป้า {targets.ufund}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sim (ซิม)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={simCount}
                    onChange={(e) => setSimCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-bold text-amber-600">
                    {simPct.toFixed(0)}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">เป้า {targets.sim}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ฟิล์ม (ชิ้น)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={filmCount}
                    onChange={(e) => setFilmCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-bold text-purple-600">
                    {filmPct.toFixed(0)}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">เป้า {targets.film}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  รับลูกค้ากี่คน (คน)
                </label>
                <input
                  type="number"
                  min="0"
                  value={customersCount}
                  onChange={(e) => setCustomersCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Notebook & Gadget */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Laptop className="w-4 h-4 text-teal-600" />
              <h4 className="font-bold text-sm text-slate-900">
                หมวดโน้ตบุ๊ก (NB) & ประกัน/อุปกรณ์เสริม
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-teal-900 mb-1">
                  ยอดขาย NB (เครื่อง) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={nbUnits}
                  onChange={(e) => setNbUnits(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-teal-200 bg-teal-50/40 rounded-lg px-3 py-1.5 text-sm font-bold text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  TI Care (ชิ้น)
                </label>
                <input
                  type="number"
                  min="0"
                  value={tiCareCount}
                  onChange={(e) => setTiCareCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-[10px] text-slate-400">เป้า {targets.tiCare}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Social Care+ (ชิ้น)
                </label>
                <input
                  type="number"
                  min="0"
                  value={socialCareCount}
                  onChange={(e) => setSocialCareCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">เป้า {targets.socialCare}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  UTC+ For Gadget (ชิ้น)
                </label>
                <input
                  type="number"
                  min="0"
                  value={utcGadgetCount}
                  onChange={(e) => setUtcGadgetCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-[10px] text-slate-400">เป้า {targets.utcGadget}%</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  SanDisk (ชิ้น)
                </label>
                <input
                  type="number"
                  min="0"
                  value={sandiskCount}
                  onChange={(e) => setSandiskCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <span className="text-[10px] text-slate-400">เป้า {targets.sandisk}%</span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  บันทึกสำเร็จแล้ว!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  บันทึกข้อมูลวันที่ {selectedDay} ({currentStaff.name})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
