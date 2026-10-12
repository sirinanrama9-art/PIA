import React, { useState } from 'react';
import { StaffInfo, StaffRecordsMap, KPITargets } from '../types/sales';
import { calculateStoreSummary, generateLineSummaryText } from '../utils/salesCalculations';
import { X, Copy, Check, Share2, Sparkles, MessageCircle } from 'lucide-react';

interface LineExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  targets: KPITargets;
  defaultDay?: number;
  revenueData?: import('../types/sales').BranchRevenueKPI;
}

export const LineExportModal: React.FC<LineExportModalProps> = ({
  isOpen,
  onClose,
  staffList,
  records,
  targets,
  defaultDay = 0,
  revenueData,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(defaultDay);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const storeSummary = calculateStoreSummary(staffList, records);
  const lineText = generateLineSummaryText(selectedDay, staffList, records, storeSummary, targets, revenueData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lineText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-base">คัดลอกสรุปยอดส่งกลุ่ม LINE</h3>
              <p className="text-xs text-emerald-200">
                ข้อความจัดรูปแบบสำเร็จรูปพร้อมส่งต่อหน้าร้านทันที
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {/* Day Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
              เลือกรูปแบบรายงาน:
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={0}>📢 สรุปภาพรวมสะสมทั้งเดือน (MTD)</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  📊 สรุปยอดประจำวันที่ {d} {d <= 11 ? '(มีข้อมูล)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Preview Box */}
          <div className="relative">
            <div className="bg-slate-950 text-slate-50 rounded-xl p-4.5 font-sans text-[13px] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto border border-slate-800 shadow-inner custom-scrollbar select-all">
              {lineText}
            </div>

            <div className="absolute top-2 right-2">
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                ตัวอย่างข้อความ
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            💡 กดปุ่มด้านล่างเพื่อคัดลอก แล้วนำไปวาง (Paste) ใน LINE กลุ่มสาขาหรือส่งให้ผู้จัดการได้ทันที
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            ปิด
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-500'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                คัดลอกลงคลิปบอร์ดแล้ว!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                คัดลอกข้อความสำหรับ LINE
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
