import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { BranchDataState } from '../types/mscTypes';

interface FocusNoticeBannerProps {
  data: BranchDataState;
  onOpenSimulator: () => void;
}

export const FocusNoticeBanner: React.FC<FocusNoticeBannerProps> = ({ data, onOpenSimulator }) => {
  const totalSmp = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0);
  const careIphoneAtt = data.staffList.reduce((acc, s) => acc + s.careIphone.attached, 0);
  const careRate = totalSmp > 0 ? (careIphoneAtt / totalSmp) * 100 : 0;
  const careTarget = data.targets.careIphone || 40;
  const careNeeded = Math.max(0, Math.ceil((careTarget / 100) * totalSmp) - careIphoneAtt);

  const ufundAtt = data.staffList.reduce((acc, s) => acc + s.ufund.attached, 0);
  const ufundRate = totalSmp > 0 ? (ufundAtt / totalSmp) * 100 : 0;
  const ufundTarget = data.targets.ufund || 50;

  return (
    <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/80 border border-amber-300/80 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-amber-500/20">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-800 leading-snug">
          <span className="font-extrabold text-amber-900">จุดเน้นสัปดาห์นี้ ({data.branchName}): </span>
          <span>เร่งอัตราแนบ </span>
          <strong className="font-black text-slate-900">UTC+ สำหรับ SMP</strong>
          <span> {careNeeded > 0 ? `(ขาดอีก ${careNeeded} เครื่องถึงเป้า ${careTarget}%)` : `(ทำได้ ${careRate.toFixed(1)}%)`} และ </span>
          <strong className="font-black text-slate-900">UFUND APPIN</strong>
          <span> (ได้ {ufundRate.toFixed(1)}% / เป้า {ufundTarget}%)</span>
        </div>
      </div>

      <button
        onClick={onOpenSimulator}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-lg transition-all shadow-2xs border border-amber-300 cursor-pointer self-end sm:self-auto shrink-0"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
        <span>เปิดระบบจำลองยอด</span>
      </button>
    </div>
  );
};
