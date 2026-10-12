import React, { useState, useEffect } from 'react';
import { BranchDataState } from '../types/mscTypes';
import { parseGoogleSheetPaste } from '../utils/sheetSyncParser';
import { 
  FileSpreadsheet, 
  Link2, 
  RefreshCw, 
  ClipboardPaste, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Layers, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GoogleSheetQuickBarProps {
  data: BranchDataState;
  onUpdateData: (newData: BranchDataState) => void;
  onOpenDetailedModal: () => void;
}

export const GoogleSheetQuickBar: React.FC<GoogleSheetQuickBarProps> = ({
  data,
  onUpdateData,
  onOpenDetailedModal,
}) => {
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem('saved_google_sheet_url') || '';
  });

  const [sheetTabName, setSheetTabName] = useState<string>(() => {
    return localStorage.getItem('saved_google_sheet_name') || 'ภาพรวม PIA';
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem('last_sheet_sync_time');
  });
  const [syncStatus, setSyncStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Sync sheet from URL and update data
  const handleFetchAndApply = async (overrideUrl?: string, overrideTab?: string) => {
    const targetUrl = (overrideUrl || sheetUrl).trim();
    const targetTab = (overrideTab !== undefined ? overrideTab : sheetTabName).trim();

    if (!targetUrl) {
      setSyncStatus({
        type: 'error',
        message: 'กรุณากรอกหรือวางลิงก์ Google Sheet ในช่องด้านล่างก่อนกดดึงข้อมูล',
      });
      return;
    }

    if (!targetUrl.includes('docs.google.com/spreadsheets')) {
      setSyncStatus({
        type: 'error',
        message: 'ลิงก์ไม่ถูกต้อง: ต้องเป็นลิงก์ Google Sheet (https://docs.google.com/spreadsheets/d/...)',
      });
      return;
    }

    setIsFetching(true);
    setSyncStatus({ type: 'idle', message: '' });

    try {
      // Save settings to localStorage
      localStorage.setItem('saved_google_sheet_url', targetUrl);
      localStorage.setItem('saved_google_sheet_name', targetTab);

      // 1. Fetch via backend proxy route
      let csvText = '';
      try {
        const queryParams = new URLSearchParams({
          url: targetUrl,
          sheet: targetTab,
        });

        const res = await fetch(`/api/fetch-sheet?${queryParams.toString()}`);
        if (res.ok) {
          csvText = await res.text();
        } else {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || `HTTP ${res.status}`);
        }
      } catch (proxyErr: any) {
        console.warn('Backend proxy fetch failed, attempting client direct gviz fetch...', proxyErr);

        // Fallback: direct Google gviz endpoint
        const idMatch = targetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (idMatch) {
          const spreadsheetId = idMatch[1];
          const directUrl = targetTab
            ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(targetTab)}`
            : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=0`;

          const directRes = await fetch(directUrl);
          if (directRes.ok) {
            csvText = await directRes.text();
          } else {
            throw new Error(proxyErr.message || `ไม่สามารถดึงข้อมูลได้ (สถานะ ${directRes.status})`);
          }
        } else {
          throw proxyErr;
        }
      }

      if (!csvText || csvText.trim().length === 0) {
        throw new Error('Google Sheet ตอบกลับมาเป็นข้อมูลว่างเปล่า กรุณาตรวจสอบว่าชื่อแท็บและข้อมูลในชีตถูกต้อง');
      }

      // 2. Parse the CSV
      const parseResult = parseGoogleSheetPaste(csvText, data);

      if (!parseResult.success) {
        throw new Error(parseResult.message || 'ไม่สามารถแปลงรูปแบบข้อมูลของชีตได้ กรุณาตรวจสอบหัวคอลัมน์');
      }

      // 3. Apply updates to the state
      let updatedData = { ...data };
      if (parseResult.updatedBranchData) {
        updatedData = {
          ...updatedData,
          ...parseResult.updatedBranchData,
        };
      }
      if (parseResult.updatedStaffList) {
        updatedData.staffList = parseResult.updatedStaffList;
      }

      onUpdateData(updatedData);

      const nowStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(nowStr);
      localStorage.setItem('last_sheet_sync_time', nowStr);

      setSyncStatus({
        type: 'success',
        message: `${parseResult.message} • อัปเดตยอดและ KPI บนแอพแล้วเรียบร้อย`,
      });
    } catch (err: any) {
      console.error('Fetch Google Sheet Error:', err);
      setSyncStatus({
        type: 'error',
        message: err.message || 'ไม่สามารถดึงข้อมูลได้: กรุณาตรวจสอบว่า Google Sheet ตั้งค่าการแชร์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" แล้วหรือไม่',
      });
    } finally {
      setIsFetching(false);
    }
  };

  // Direct paste URL from clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setSheetUrl(text.trim());
        if (text.includes('docs.google.com')) {
          handleFetchAndApply(text.trim());
        }
      }
    } catch (e) {
      console.warn('Clipboard read error:', e);
    }
  };

  // Preset demo test sheet
  const handleLoadDemoPia = () => {
    const demoCsv = `สาขา,PIA (พระราม 9)
เป้าหมายรวม,10230348
ยอดขายจริง,6500152
วันคงเหลือ,20
รหัส,ชื่อพนักงาน,เป้าหมาย,ยอดขายจริง,เครื่องSMP,UTC+,UFUND,SIM,ฟิล์ม,เครื่องNB,SanDisk
24583,จิ๊บ,2557587,1750000,38,10,4,5,4,18,9
21865,เมย์,2557587,1780500,46,12,12,7,14,5,5
29253,วา,2557587,1920000,52,16,8,6,15,5,13
35350,สตาร์,2557587,1810000,49,15,3,5,12,5,7`;

    const res = parseGoogleSheetPaste(demoCsv, data);
    if (res.success && res.updatedBranchData) {
      const updated = {
        ...data,
        ...res.updatedBranchData,
        staffList: res.updatedStaffList || data.staffList,
      };
      onUpdateData(updated);
      const nowStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(nowStr);
      setSyncStatus({
        type: 'success',
        message: 'โหลดตัวอย่างข้อมูลชีตภาพรวม PIA สำเร็จ • ยอดรวม 6.50M / 10.23M ฿',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-emerald-50/90 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5 transition-all">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                ช่องวางลิงก์ Google Sheet เพื่อดึงข้อมูลแสดงที่แอพนี้
              </h2>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Layers className="w-3 h-3 text-emerald-700" />
                ชีต: {sheetTabName || 'ภาพรวม PIA'}
              </span>
              {lastSyncTime && (
                <span className="text-[11px] font-semibold text-slate-600 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-full">
                  ซิงค์ล่าสุด {lastSyncTime} น.
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              วาง URL ของ Google Sheet แล้วกดปุ่มเพื่อดึงยอดขาย เป้าหมาย และ KPI ของสาขามาอัปเดตลงหน้านี้ทันที
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
            title={isExpanded ? 'ย่อแถบ' : 'ขยายแถบ'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3 pt-1">
          {/* Main Input Row */}
          <div className="flex flex-col lg:flex-row gap-2.5">
            {/* Sheet Link Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-700">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFetchAndApply();
                }}
                placeholder="วางลิงก์ Google Sheet ที่นี่ (เช่น https://docs.google.com/spreadsheets/d/1ABC.../edit#gid=0)"
                className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm font-mono bg-white border-2 border-emerald-200/90 rounded-2xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none shadow-2xs text-slate-800 placeholder:text-slate-400 placeholder:font-sans"
              />
              <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
                {sheetUrl && (
                  <button
                    onClick={() => setSheetUrl('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                    title="ล้างข้อความ"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={handlePasteClipboard}
                  className="px-2 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200 bg-emerald-50/80"
                  title="วางจากคลิปบอร์ด"
                >
                  <span className="flex items-center gap-1">
                    <ClipboardPaste className="w-3 h-3" />
                    <span>วาง</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Sheet Tab Name Input */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative w-44 sm:w-52">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
                  แท็บ:
                </div>
                <input
                  type="text"
                  value={sheetTabName}
                  onChange={(e) => setSheetTabName(e.target.value)}
                  placeholder="ภาพรวม PIA"
                  className="w-full pl-12 pr-3 py-2.5 text-xs font-bold bg-white border border-slate-300 rounded-2xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-slate-800"
                />
              </div>

              {/* Main Submit Button */}
              <button
                onClick={() => handleFetchAndApply()}
                disabled={isFetching || !sheetUrl.trim()}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer ${
                  isFetching || !sheetUrl.trim()
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 active:scale-98'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                <span>{isFetching ? 'กำลังดึงข้อมูล...' : 'อัปเดตและดึงข้อมูลตามลิงก์'}</span>
              </button>
            </div>
          </div>

          {/* Quick presets and shortcut chips */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
            <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
              <span className="text-slate-500 font-medium">แท็บชีตแนะนำ:</span>
              <button
                onClick={() => {
                  setSheetTabName('ภาพรวม PIA');
                  if (sheetUrl) handleFetchAndApply(sheetUrl, 'ภาพรวม PIA');
                }}
                className={`px-2 py-0.5 rounded-lg border font-bold cursor-pointer transition-colors ${
                  sheetTabName === 'ภาพรวม PIA'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
                }`}
              >
                ภาพรวม PIA
              </button>
              <button
                onClick={() => {
                  setSheetTabName('PIA');
                  if (sheetUrl) handleFetchAndApply(sheetUrl, 'PIA');
                }}
                className={`px-2 py-0.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                  sheetTabName === 'PIA'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
                }`}
              >
                PIA
              </button>
              <button
                onClick={() => {
                  setSheetTabName('ตาราง 31 วัน');
                  if (sheetUrl) handleFetchAndApply(sheetUrl, 'ตาราง 31 วัน');
                }}
                className={`px-2 py-0.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                  sheetTabName === 'ตาราง 31 วัน'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
                }`}
              >
                ตาราง 31 วัน
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLoadDemoPia}
                className="text-[11px] text-indigo-700 hover:text-indigo-900 font-bold inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-indigo-200 hover:bg-indigo-50/50 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>ทดลองชุดข้อมูลภาพรวม PIA</span>
              </button>

              <button
                onClick={onOpenDetailedModal}
                className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-emerald-300 hover:bg-emerald-50/50 shadow-2xs cursor-pointer"
              >
                <ExternalLink className="w-3 h-3 text-emerald-600" />
                <span>ดูตัวอย่างตารางละเอียด</span>
              </button>
            </div>
          </div>

          {/* Status feedback message */}
          {syncStatus.message && (
            <div
              className={`p-3 rounded-2xl text-xs flex items-start gap-2.5 border transition-all animate-fade-in ${
                syncStatus.type === 'success'
                  ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950'
                  : syncStatus.type === 'error'
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {syncStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              ) : syncStatus.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : null}
              <div className="flex-1 font-medium">
                <div>{syncStatus.message}</div>
                {syncStatus.type === 'error' && (
                  <div className="mt-1 text-[11px] text-rose-800/90 font-normal">
                    📌 <strong>คำแนะนำ:</strong> ใน Google Sheet ให้คลิกเมนู <strong>"แชร์ (Share)"</strong> ที่มุมขวาบน แล้วเปลี่ยนสิทธิ์การเข้าถึงทั่วไปเป็น <strong>"ทุกคนที่มีลิงก์ (Anyone with the link)" มีสิทธิ์ดู</strong> เพื่อให้ระบบดึงข้อมูลได้
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
