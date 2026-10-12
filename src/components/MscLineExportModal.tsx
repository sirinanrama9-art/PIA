import React, { useState } from 'react';
import { BranchDataState } from '../types/mscTypes';
import { X, Copy, Check, MessageCircle, Send } from 'lucide-react';

interface MscLineExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BranchDataState;
}

export const MscLineExportModal: React.FC<MscLineExportModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalActual = data.actualRevenue || data.staffList.reduce((acc, s) => {
    return acc + s.iphone.actualRevenue + s.ipad.actualRevenue + s.mac.actualRevenue + s.appleWatch.actualRevenue;
  }, 0);

  const totalTarget = data.targetRevenue || data.staffList.reduce((acc, s) => {
    return acc + s.iphone.targetRevenue + s.ipad.targetRevenue + s.mac.targetRevenue + s.appleWatch.targetRevenue;
  }, 0);

  const totalUnits = data.staffList.reduce((acc, s) => {
    return acc + s.iphone.actualUnits + s.ipad.actualUnits + s.mac.actualUnits + s.appleWatch.actualUnits;
  }, 0);

  const smpUnits = data.staffList.reduce((acc, s) => acc + s.iphone.actualUnits, 0);
  const nbUnits = data.staffList.reduce((acc, s) => acc + s.mac.actualUnits, 0);
  const achievePct = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

  // Attachments calculations
  const careIphoneAtt = data.staffList.reduce((acc, s) => acc + s.careIphone.attached, 0);
  const careIphoneRate = smpUnits > 0 ? (careIphoneAtt / smpUnits) * 100 : 0;

  const simAtt = data.staffList.reduce((acc, s) => acc + s.sim.attached, 0);
  const simRate = smpUnits > 0 ? (simAtt / smpUnits) * 100 : 0;

  const ufundAtt = data.staffList.reduce((acc, s) => acc + s.ufund.attached, 0);
  const ufundRate = smpUnits > 0 ? (ufundAtt / smpUnits) * 100 : 0;

  const filmAtt = data.staffList.reduce((acc, s) => acc + s.film.attached, 0);
  const filmRate = smpUnits > 0 ? (filmAtt / smpUnits) * 100 : 0;

  const sandiskAtt = data.staffList.reduce((acc, s) => acc + s.sandisk.attached, 0);
  const sandiskRate = nbUnits > 0 ? (sandiskAtt / nbUnits) * 100 : 0;

  // Staff summary text
  const staffSummaryLines = data.staffList.map((s, idx) => {
    const sActual = s.iphone.actualRevenue + s.ipad.actualRevenue + s.mac.actualRevenue + s.appleWatch.actualRevenue;
    const sTarget = s.iphone.targetRevenue + s.ipad.targetRevenue + s.mac.targetRevenue + s.appleWatch.targetRevenue;
    const sPct = sTarget > 0 ? (sActual / sTarget) * 100 : 0;
    const sUnits = s.iphone.actualUnits + s.ipad.actualUnits + s.mac.actualUnits + s.appleWatch.actualUnits;
    const sCarePct = s.iphone.actualUnits > 0 ? (s.careIphone.attached / s.iphone.actualUnits) * 100 : 0;
    return `${idx + 1}. ${s.name} (${s.staffId}): ${sActual.toLocaleString()} ฿ (${sPct.toFixed(1)}%) | เครื่อง: ${sUnits} | UTC+: ${sCarePct.toFixed(1)}%`;
  }).join('\n');

  const lineText = `📢 【รายงานสรุปยอดขาย ${data.branchName} (${data.quarter})】
📅 ข้อมูล ณ วันที่: ${data.asOfDate}
━━━━━━━━━━━━━━━━━━━━━
💰 ยอดขายจริงรวม: ${totalActual.toLocaleString()} ฿ / เป้าหมาย ${totalTarget.toLocaleString()} ฿
📈 บรรลุผล (% Achieve): ${achievePct.toFixed(2)}%
📱 ยอดขายเครื่องรวม: ${totalUnits} เครื่อง
(SMP ${smpUnits} | NB ${nbUnits})

🎯 อัตราแนบบริการสำคัญ (KPI Status):
• UTC+ สำหรับ SMP: ${careIphoneRate.toFixed(1)}% (เป้า ${data.targets.careIphone}% - ${careIphoneRate >= data.targets.careIphone ? 'ผ่านเกณฑ์ ✓' : `ขาดอีก ${Math.max(0, Math.ceil((data.targets.careIphone / 100) * smpUnits) - careIphoneAtt)} เครื่อง`})
• เปิดเบอร์ SIM: ${simRate.toFixed(1)}% (เป้า ${data.targets.sim}% - ${simRate >= data.targets.sim ? 'ผ่านเกณฑ์ ✓' : 'ไปอีกนิด'})
• UFUND APPIN: ${ufundRate.toFixed(1)}% (เป้า ${data.targets.ufund}%)
• ฟิล์มกันรอย: ${filmRate.toFixed(1)}% (เป้า ${data.targets.film}%)
• SanDisk: ${sandiskRate.toFixed(1)}% (เป้า ${data.targets.sandisk}%)

👤 สรุปผลงานรายบุคคล (${data.staffList.length} คน):
${staffSummaryLines}
━━━━━━━━━━━━━━━━━━━━━
สรุปยอดรายงานเรียบร้อยครับ/ค่ะ ✨`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lineText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-200">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">ส่งสรุปยอดเข้ากลุ่ม LINE</h3>
              <p className="text-xs text-emerald-200">ฟอร์แมตสำเร็จรูปพร้อมส่งต่อทีมงานและผู้จัดการ</p>
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
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="bg-slate-950 text-slate-50 p-4.5 rounded-2xl font-sans text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner select-all max-h-72 overflow-y-auto custom-scrollbar">
            {lineText}
          </div>

          <p className="text-[11px] text-slate-500">
            💡 กดปุ่มคัดลอกด้านล่าง แล้วนำไป Paste ลงใน LINE กลุ่มสาขาได้ทันที
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
          >
            ปิด
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>คัดลอกข้อความสรุป LINE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
