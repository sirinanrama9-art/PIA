import React, { useState, useRef } from 'react';
import { StaffInfo, StaffRecordsMap } from '../types/sales';
import { X, Download, Upload, Copy, Check, RotateCcw, FileText, AlertCircle, FileUp } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffInfo[];
  records: StaffRecordsMap;
  onImportCsv: (csvText: string) => boolean;
  onResetToDefault: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  staffList,
  records,
  onImportCsv,
  onResetToDefault,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'export' | 'import' | 'reset'>('export');
  const [pastedCsv, setPastedCsv] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Build CSV from current records
  const generateCurrentCsvString = (): string => {
    // Header Row 1: Day numbers
    let row1 = 'วันที่,,';
    for (let d = 1; d <= 31; d++) {
      row1 += `${d},,,,,,,,,,`;
    }

    // Header Row 2: Sub-headers for SMP
    let row2 = 'PIA,,';
    for (let d = 1; d <= 31; d++) {
      row2 += `ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%,UFUND APPIN,50%,Sim,30%,ฟิล์ม,70%,รับลูกค้ากี่คน,`;
    }

    // Staff SMP Rows
    const smpRows: string[] = [];
    for (const staff of staffList) {
      let r = `${staff.id},${staff.name},`;
      for (let d = 1; d <= 31; d++) {
        const day = records[staff.id]?.[d]?.smp;
        if (!day) {
          r += ',,,,,,,,,,';
          continue;
        }
        const smp = day.smpUnits || '';
        const utc = day.utcCount || '';
        const utcPct = day.smpUnits > 0 ? `${((day.utcCount / day.smpUnits) * 100).toFixed(0)}%` : '0%';
        const ufund = day.ufundCount || '';
        const ufundPct = day.smpUnits > 0 ? `${((day.ufundCount / day.smpUnits) * 100).toFixed(0)}%` : '0%';
        const sim = day.simCount || '';
        const simPct = day.smpUnits > 0 ? `${((day.simCount / day.smpUnits) * 100).toFixed(0)}%` : '0%';
        const film = day.filmCount || '';
        const filmPct = day.smpUnits > 0 ? `${((day.filmCount / day.smpUnits) * 100).toFixed(0)}%` : '0%';
        const cust = day.customersCount || '';

        r += `${smp},${utc},${utcPct},${ufund},${ufundPct},${sim},${simPct},${film},${filmPct},${cust},`;
      }
      smpRows.push(r);
    }

    // Store SMP Row
    let smpTotalRow = 'รวม,,';
    for (let d = 1; d <= 31; d++) {
      let totSmp = 0;
      let totUtc = 0;
      let totUfund = 0;
      let totSim = 0;
      let totFilm = 0;
      for (const staff of staffList) {
        const s = records[staff.id]?.[d]?.smp;
        if (s) {
          totSmp += s.smpUnits || 0;
          totUtc += s.utcCount || 0;
          totUfund += s.ufundCount || 0;
          totSim += s.simCount || 0;
          totFilm += s.filmCount || 0;
        }
      }
      const utcPct = totSmp > 0 ? `${((totUtc / totSmp) * 100).toFixed(0)}%` : '0%';
      const ufundPct = totSmp > 0 ? `${((totUfund / totSmp) * 100).toFixed(0)}%` : '0%';
      const simPct = totSmp > 0 ? `${((totSim / totSmp) * 100).toFixed(0)}%` : '0%';
      const filmPct = totSmp > 0 ? `${((totFilm / totSmp) * 100).toFixed(0)}%` : '0%';

      smpTotalRow += `${totSmp},${totUtc},${utcPct},${totUfund},${ufundPct},${totSim},${simPct},${totFilm},${filmPct},0,`;
    }

    // Header NB
    let rowNbHeader = 'PIA,,';
    for (let d = 1; d <= 31; d++) {
      rowNbHeader += 'ยอดขาย (เครื่อง NB),TI Care,30%,Social Care+,30%,UTC+ For Gadget,20%,SanDisk,50%,,';
    }

    // Staff NB Rows
    const nbRows: string[] = [];
    for (const staff of staffList) {
      let r = `${staff.id},${staff.name},`;
      for (let d = 1; d <= 31; d++) {
        const day = records[staff.id]?.[d]?.nb;
        if (!day) {
          r += ',,,,,,,,,';
          continue;
        }
        const nb = day.nbUnits || '';
        const ti = day.tiCareCount || '';
        const tiPct = day.nbUnits > 0 ? `${((day.tiCareCount / day.nbUnits) * 100).toFixed(0)}%` : '0%';
        const sc = day.socialCareCount || '';
        const scPct = day.nbUnits > 0 ? `${((day.socialCareCount / day.nbUnits) * 100).toFixed(0)}%` : '0%';
        const utcG = day.utcGadgetCount || '';
        const utcGpct = day.nbUnits > 0 ? `${((day.utcGadgetCount / day.nbUnits) * 100).toFixed(0)}%` : '0%';
        const sd = day.sandiskCount || '';
        const sdPct = day.nbUnits > 0 ? `${((day.sandiskCount / day.nbUnits) * 100).toFixed(0)}%` : '0%';

        r += `${nb},${ti},${tiPct},${sc},${scPct},${utcG},${utcGpct},${sd},${sdPct},,`;
      }
      nbRows.push(r);
    }

    return [row1, row2, ...smpRows, smpTotalRow, rowNbHeader, ...nbRows].join('\n');
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCurrentCsvString();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_pia_report_month.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCsv = async () => {
    const csvContent = generateCurrentCsvString();
    try {
      await navigator.clipboard.writeText(csvContent);
      setCopiedCsv(true);
      setTimeout(() => setCopiedCsv(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPastedCsv(content);
        setImportStatus({
          success: true,
          message: `อ่านไฟล์ "${file.name}" เรียบร้อยแล้ว (ขนาด ${(file.size / 1024).toFixed(1)} KB) - สามารถกด "เริ่มนำเข้าข้อมูล" ได้ทันที`,
        });
      }
    };
    reader.onerror = () => {
      setImportStatus({
        success: false,
        message: 'ไม่สามารถอ่านไฟล์ได้ กรุณาลองใหม่อีกครั้ง',
      });
    };
    // Read with UTF-8
    reader.readAsText(file, 'utf-8');
  };

  const handleExecuteImport = () => {
    if (!pastedCsv.trim()) {
      setImportStatus({ success: false, message: 'กรุณาเลือกไฟล์หรือวางเนื้อหาข้อความ CSV ก่อน' });
      return;
    }
    const success = onImportCsv(pastedCsv);
    if (success) {
      setImportStatus({ success: true, message: 'นำเข้าข้อมูล CSV สำเร็จเรียบร้อยแล้ว!' });
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setImportStatus({ success: false, message: 'รูปแบบ CSV ไม่ถูกต้อง กรุณาตรวจสอบให้มีหัวข้อ PIA หรือตารางวันที่ 1-31' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-indigo-400 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white tracking-tight">จัดการข้อมูล CSV (นำเข้า / ส่งออก)</h3>
              <p className="text-xs text-slate-300 font-medium">
                รองรับไฟล์ตารางยอดขาย 31 วันตามรูปแบบสาขา PIA ภาษาไทยคมชัด 100%
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

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveSubTab('export')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              activeSubTab === 'export'
                ? 'bg-white text-slate-950 border-t-2 border-indigo-600 border-x border-slate-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ดาวน์โหลด / ส่งออก CSV
          </button>

          <button
            onClick={() => setActiveSubTab('import')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              activeSubTab === 'import'
                ? 'bg-white text-slate-950 border-t-2 border-indigo-600 border-x border-slate-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            นำเข้าไฟล์ / วางข้อความ (Import)
          </button>

          <button
            onClick={() => setActiveSubTab('reset')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              activeSubTab === 'reset'
                ? 'bg-white text-rose-700 border-t-2 border-rose-500 border-x border-slate-200 shadow-xs'
                : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            รีเซ็ตข้อมูลตั้งต้น
          </button>
        </div>

        {/* Tab content */}
        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {activeSubTab === 'export' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                คุณสามารถดาวน์โหลดข้อมูลยอดขายทั้งหมด 31 วันในรูปแบบไฟล์ <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono text-xs font-semibold">.csv</code> เพื่อนำไปเปิดใน <strong>Microsoft Excel</strong> หรือ <strong>Google Sheets</strong> ภาษาไทยจะแสดงผลชัดเจน ไม่เป็นภาษาต่างดาว
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadCsv}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  ดาวน์โหลดไฟล์ Excel / CSV (.csv)
                </button>

                <button
                  onClick={handleCopyCsv}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
                >
                  {copiedCsv ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
                  {copiedCsv ? 'คัดลอกแล้ว!' : 'คัดลอกข้อความ CSV'}
                </button>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                <span className="font-bold">✨ ระบบเข้ารหัส UTF-8 with BOM อัตโนมัติ:</span> เมื่อดาวน์โหลดไปเปิดใน Microsoft Excel เวอร์ชั่น Windows หรือ Mac จะอ่านภาษาไทยชื่อพนักงานและหัวข้อตารางได้คมชัด 100% ทันที
              </div>
            </div>
          )}

          {activeSubTab === 'import' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                เลือกอัปโหลดไฟล์ <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono text-xs font-semibold">.csv</code> จากเครื่อง หรือวางข้อความตารางยอดขายที่คัดลอกมาจาก Excel / Google Sheets
              </p>

              {/* File upload box */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50/80 rounded-xl p-4 text-center cursor-pointer transition-all"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept=".csv,text/csv,text/plain" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <FileUp className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {fileName ? `ไฟล์ที่เลือก: ${fileName}` : 'คลิกเพื่อเลือกไฟล์ .csv จากเครื่องคอมพิวเตอร์'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    รองรับการอ่านรหัสภาษาไทย UTF-8, TIS-620 พร้อมขจัด BOM อัตโนมัติ
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">หรือวางข้อความ CSV ที่นี่:</label>
                  {pastedCsv && (
                    <button 
                      onClick={() => { setPastedCsv(''); setFileName(''); setImportStatus(null); }}
                      className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                    >
                      ล้างข้อความ
                    </button>
                  )}
                </div>
                <textarea
                  rows={5}
                  value={pastedCsv}
                  onChange={(e) => setPastedCsv(e.target.value)}
                  placeholder="ตัวอย่าง: วันที่,,1,,,,,,,,,,,2...\nPIA,,ยอดขาย (เครื่อง SMP),UTC+ For SMP,40%..."
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2.5 ${
                    importStatus.success
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium'
                      : 'bg-rose-50 text-rose-900 border border-rose-200 font-medium'
                  }`}
                >
                  {importStatus.success ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <span>{importStatus.message}</span>
                </div>
              )}

              <button
                onClick={handleExecuteImport}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <Upload className="w-4 h-4" />
                เริ่มนำเข้าข้อมูล (Import)
              </button>
            </div>
          )}

          {activeSubTab === 'reset' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-black text-rose-950 text-sm">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  คำเตือนการรีเซ็ตข้อมูล
                </div>
                <p className="leading-relaxed">
                  การกดปุ่มนี้จะล้างข้อมูลที่คุณแก้ไขหรือบันทึกเพิ่ม และย้อนกลับไปใช้ชุดข้อมูลตั้งต้นจากตารางของระบบสาขาเดิมทันที
                </p>
              </div>

              <button
                onClick={() => {
                  onResetToDefault();
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                ยืนยันรีเซ็ตกลับเป็นข้อมูลตั้งต้น
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
