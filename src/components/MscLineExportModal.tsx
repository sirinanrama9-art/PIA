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

  const totalActual = 6500152;
  const totalTarget = 10230348;
  const deficit = 3730196;
  const achievePct = 63.5;

  const lineText = `📊 Dashboard & KPI Scorecards (ภาพรวมสาขา PIA - Q4/2569)
🏢 PIA (Branch Total)
💰 ยอดขายจริง: 6,500,152 ฿
🎯 เป้าหมายรวม: 10,230,348 ฿
📉 ขาดจากเป้า: 3,730,196 ฿
📈 % ความสำเร็จ: 63.5% ⚠️ ต่ำกว่าเป้าหมายรวม
ความคืบหน้าสะสม 63.5% จากเป้าหมาย 10.23 ล้านบาท

📦 สรุปยอดขายรายหมวดหมู่หลัก (Category Sales Performance)
📱 Smartphone: 5,559,793 ฿ | เป้า 8,111,260 ฿ | 68.5% 🤘 กำลังไปได้ดี
💻 Notebook: 731,079 ฿ | เป้า 1,864,036 ฿ | 39.2% ⚠️ ต้องเร่งยอด
💻 DIY: 159,300 ฿ | เป้า 59,492 ฿ | 267.8% ✅ บรรลุเป้า
🖥️ Desktop: 49,980 ฿ | เป้า 195,560 ฿ | 25.6% ⚠️ ต้องเร่งยอด
🏆 รวม 4 หมวดหมู่: 6,500,152 ฿ | 10,230,348 ฿ | 63.5% ⚠️ ต่ำกว่าเป้า
📌 บรรลุเป้าแล้ว 1 หมวดหมู่ | ต้องเร่งผลักดันอีก 3 หมวดหมู่

🛡️ บริการเสริมหลัก (Key Attach Rate KPI)
เกณฑ์มาตรฐานคุณภาพงานขาย & สถิติรวมสาขา PIA
• 🛡️ Ultra Care+ SMP: 40 เครื่อง (23.5%) | เป้า ≥ 40% | ❌ ไม่ผ่าน (ขาด 16.5%)
• 📶 เปิดเบอร์ SIM True: 13 เบอร์ (7.6%) | เป้า ≥ 30% | ❌ ไม่ผ่าน (ขาด 22.4%)
• 💳 UFUND APPIN: 15 สัญญา (8.8%) | เป้า ≥ 50% | ❌ ไม่ผ่าน (ขาด 41.2%)
• ✨ ฟิล์มกันรอย SMP: 30 ชิ้น (17.6%) | เป้า ≥ 70% | ❌ ไม่ผ่าน (ขาด 52.4%)
• 🛡️ Social Care+: 16 (9.4%) | เป้า ≥ 30% | ❌ ไม่ผ่าน
• 💻 TI Care+: 1 (3.3%) | เป้า ≥ 30% | ❌ ไม่ผ่าน
• ⌚ UTC+ For Gadget: 8 (4.7%) | เป้า ≥ 20% | ❌ ไม่ผ่าน
• 💾 SanDisk: 29 (17.1%) | เป้า ≥ 50% | ❌ ไม่ผ่าน

🎯 สรุปดัชนีชี้วัดหลักสาขา (Summary Scorecard)
ยอดขายเฉลี่ยต่อวัน: 541,679 ฿
คาดการณ์สิ้นเดือน: 16,792,060 ฿
แนวโน้มเทียบเป้า: 164.1% 🚀 ทะลุเป้าหมาย
ยอดขายเครื่องรวม: 170 เครื่อง (SMP)
บริการเสริมรวม: 152 รายการ
📊 ข้อมูลตัดรอบอัตโนมัติ | วันที่: 12/10/2026

🏆 ตารางอันดับผลงานยอดขายรายบุคคล (Sales Leaderboard Q4)
🥇 อันดับ 1: จิ๊บ (PIA: 24583): 1,015,039 ฿ / 2,557,587 ฿ (39.7% | ขาด 1,542,548)
🥈 อันดับ 2: วา (PIA: 29253): 769,458 ฿ / 2,557,587 ฿ (30.1% | ขาด 1,788,129)
🥉 อันดับ 3: เมย์ (PIA: 21865): 706,284 ฿ / 2,557,587 ฿ (27.6% | ขาด 1,851,303)
🏅 อันดับ 4: สตาร์ (PIA: 35350): 635,550 ฿ / 2,557,587 ฿ (24.8% | ขาด 1,922,037)
👥 รวมผลงานทีม 4 ท่าน: 3,126,331 ฿ (30.6% | เฉลี่ย 781,583 บ./คน)
🌟 ยอดขายสูงสุด: จิ๊บ (1,015,039 ฿) | ต้องหนุนเสริม: สตาร์ (635,550 ฿)

💡 ข้อเสนอแนะเชิงกลยุทธ์ (Strategic Action Plan)
1. สมาร์ตโฟน: เร่งปิดยอดอีก 2.55 ลบ. ผลักดันยอดรวมสาขาให้แตะเป้าหมาย 10.23 ลบ.
2. โน้ตบุ๊ก: จัดโปรคู่บริการเสริม TI Care+ ดันอัตราพ่วง Attach Rate สู่เกณฑ์ ≥30%
3. บริการเสริม: กระตุ้นการเสนอขาย UFUND (ปัจจุบัน 8.8%) และเปิดเบอร์ SIM (7.6%)
4. พัฒนาบุคคล: สนับสนุน สตาร์ และ เมย์ พร้อมถอดบทเรียนการขายจาก จิ๊บ และ วา
━━━━━━━━━━━━━━━━━━━━━
รายงานประจำสาขา PIA เรียบร้อยครับ/ค่ะ ✨`;

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
        {/* Header - Decorated Gradient */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/20 shadow-2xs">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">ส่งสรุปยอดเข้ากลุ่ม LINE (PIA Q4)</h3>
              <p className="text-xs text-emerald-100">ฟอร์แมตสำเร็จรูปพร้อมส่งต่อทีมงานและผู้จัดการสาขา</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="bg-slate-950 text-slate-50 p-4 rounded-2xl font-sans text-xs whitespace-pre-wrap leading-relaxed border border-emerald-900/60 shadow-inner select-all max-h-72 overflow-y-auto custom-scrollbar">
            {lineText}
          </div>

          <p className="text-[11px] text-slate-500">
            💡 กดปุ่มคัดลอกด้านล่าง แล้วนำไป Paste ลงใน LINE กลุ่มสาขา PIA ได้ทันที
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
                <span>คัดลอกสำเร็จแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>คัดลอกข้อความ LINE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
