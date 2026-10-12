import React, { useState, useEffect } from 'react';
import { BranchDataState } from '../types/mscTypes';
import { 
  parseGoogleSheetPaste, 
  generateGoogleSheetTsv, 
  ParsedSheetResult 
} from '../utils/sheetSyncParser';
import { 
  X, 
  FileSpreadsheet, 
  Link2, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Table, 
  HelpCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ClipboardPaste,
  ShieldAlert
} from 'lucide-react';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BranchDataState;
  onUpdateData: (newData: BranchDataState) => void;
}

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'paste' | 'copy' | 'guide'>('link');
  
  // Google Sheet Link state (persisted)
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem('saved_google_sheet_url') || '';
  });
  const [sheetTabName, setSheetTabName] = useState<string>(() => {
    return localStorage.getItem('saved_google_sheet_name') || 'ภาพรวม PIA';
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Raw content & parse result
  const [rawSheetContent, setRawSheetContent] = useState<string>('');
  const [parseResult, setParseResult] = useState<ParsedSheetResult | null>(null);
  const [copiedTsv, setCopiedTsv] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setFetchError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Fetch sheet from URL
  const handleFetchSheet = async (urlToFetch?: string, tabToFetch?: string) => {
    const target = (urlToFetch || sheetUrl).trim();
    const tabName = (tabToFetch !== undefined ? tabToFetch : sheetTabName).trim();

    if (!target) {
      setFetchError('กรุณากรอกหรือวางลิงก์ Google Sheet ก่อนกดดึงข้อมูล');
      return;
    }

    if (!target.includes('docs.google.com/spreadsheets')) {
      setFetchError('ลิงก์ที่กรอกไม่ใช่ Google Sheet (ลิงก์ต้องขึ้นต้นด้วย https://docs.google.com/spreadsheets/...)');
      return;
    }

    setIsFetching(true);
    setFetchError(null);
    setParseResult(null);

    try {
      // Save sheet URL to localStorage
      localStorage.setItem('saved_google_sheet_url', target);
      localStorage.setItem('saved_google_sheet_name', tabName);

      // Attempt 1: Fetch via local backend proxy route with sheet tab name
      let csvText = '';
      try {
        const query = new URLSearchParams({
          url: target,
          sheet: tabName,
        });
        const res = await fetch(`/api/fetch-sheet?${query.toString()}`);
        if (res.ok) {
          csvText = await res.text();
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }
      } catch (proxyErr: any) {
        console.warn('Backend proxy fetch failed, trying direct gviz fetch...', proxyErr);

        // Attempt 2: Direct Google gviz CSV fetch fallback
        let directUrl = target;
        const idMatch = target.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (idMatch) {
          const spreadsheetId = idMatch[1];
          directUrl = tabName
            ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`
            : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=0`;
        }

        const directRes = await fetch(directUrl);
        if (!directRes.ok) {
          throw new Error(proxyErr.message || `ไม่สามารถดึงข้อมูลจาก Google Sheet ได้ (สถานะ ${directRes.status})`);
        }
        csvText = await directRes.text();
      }

      if (!csvText || csvText.trim().length === 0) {
        throw new Error('Google Sheet ตอบกลับมาเป็นข้อมูลว่างเปล่า กรุณาตรวจสอบแท็บ Sheet และสิทธิ์การเข้าถึง');
      }

      setRawSheetContent(csvText);

      // Parse the CSV
      const result = parseGoogleSheetPaste(csvText, data);
      setParseResult(result);

      if (!result.success) {
        setFetchError(result.message || 'ดึงข้อมูลสำเร็จ แต่รูปแบบตารางใน Sheet ไม่ตรงกับเกณฑ์ข้อมูล');
      }
    } catch (err: any) {
      console.error(err);
      setFetchError(
        err.message || 
        'ไม่สามารถดึงข้อมูลได้: กรุณาตรวจสอบว่า Google Sheet ตั้งค่าการแชร์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" แล้วหรือไม่'
      );
    } finally {
      setIsFetching(false);
    }
  };

  // Direct paste URL from clipboard
  const handlePasteUrlFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.includes('docs.google.com')) {
        setSheetUrl(text.trim());
        handleFetchSheet(text.trim());
      } else if (text) {
        setSheetUrl(text.trim());
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Preset demo test sheet
  const handleLoadDemoSheet = () => {
    // Generate synthetic response and load
    const demoCsv = `รหัสพนักงาน,ชื่อพนักงาน,เป้าหมาย,ยอดขายจริง,เครื่องSMP,UTC+,UFUND,SIM,ฟิล์ม,เครื่องNB,SanDisk
24583,จิ๊บ,2557587,1750000,38,10,4,5,4,18,9
21865,เมย์,2557587,1780500,46,12,12,7,14,5,5
29253,วา,2557587,1920000,52,16,8,6,15,5,13
35350,สตาร์,2557587,1810000,49,15,3,5,12,5,7`;
    
    setSheetUrl('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0');
    setRawSheetContent(demoCsv);
    const result = parseGoogleSheetPaste(demoCsv, data);
    setParseResult(result);
    setFetchError(null);
  };

  // Apply updates to the system
  const handleApplyUpdate = () => {
    if (!parseResult || !parseResult.success) return;

    let updated = { ...data };

    if (parseResult.updatedBranchData) {
      updated = {
        ...updated,
        ...parseResult.updatedBranchData,
      };
    }

    if (parseResult.updatedStaffList) {
      updated.staffList = parseResult.updatedStaffList;
    }

    onUpdateData(updated);
    onClose();
  };

  // Generate TSV for copying to Google Sheet
  const tsvForSheet = generateGoogleSheetTsv(data);

  const handleCopyTsv = async () => {
    try {
      await navigator.clipboard.writeText(tsvForSheet);
      setCopiedTsv(true);
      setTimeout(() => setCopiedTsv(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">เชื่อมต่อ Google Sheet</h3>
                <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                  ดึงข้อมูลด้วยลิงก์ (URL Sync)
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                วางลิงก์ Google Sheet เพื่อดึงยอดขายและ KPI มาแสดงที่แอพนี้อัตโนมัติ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-xl transition-colors cursor-pointer hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Bar */}
        <div className="flex items-center gap-2 p-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('link')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'link'
                ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>วางลิงก์ Google Sheet (ดึงข้อมูล)</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'paste'
                ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-slate-500" />
            <span>วางตารางข้อความ (Paste เซลล์)</span>
          </button>

          <button
            onClick={() => setActiveTab('copy')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'copy'
                ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>คัดลอกตารางไปวางใน Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>วิธีแชร์ลิงก์ & รูปแบบ Sheet</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {/* TAB 1: PASTE LINK TO FETCH (PRIMARY REQUEST) */}
          {activeTab === 'link' && (
            <div className="space-y-5">
              {/* Main URL Input Box */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-emerald-600" />
                    <span>ช่องวางลิงก์ Google Sheet (URL Link):</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePasteUrlFromClipboard}
                      className="text-emerald-700 hover:text-emerald-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                    >
                      <ClipboardPaste className="w-3.5 h-3.5" />
                      <span>วางจากคลิปบอร์ด</span>
                    </button>
                    <button
                      onClick={handleLoadDemoSheet}
                      className="text-slate-600 hover:text-slate-900 text-xs font-medium inline-flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded-lg border border-slate-200"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>ลองตัวอย่าง</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleFetchSheet();
                      }}
                      placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5.../edit#gid=0"
                      className="w-full pl-3.5 pr-8 py-3 text-xs font-mono bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-2xs text-slate-800"
                    />
                    {sheetUrl && (
                      <button
                        onClick={() => setSheetUrl('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="relative w-full sm:w-48">
                    <input
                      type="text"
                      value={sheetTabName}
                      onChange={(e) => setSheetTabName(e.target.value)}
                      placeholder="ชื่อแท็บ เช่น ภาพรวม PIA"
                      className="w-full px-3 py-3 text-xs font-bold bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                    />
                  </div>

                  <button
                    onClick={() => handleFetchSheet()}
                    disabled={isFetching || !sheetUrl.trim()}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-md shrink-0 cursor-pointer ${
                      isFetching || !sheetUrl.trim()
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                    <span>{isFetching ? 'กำลังดึงข้อมูล...' : 'ดึงข้อมูลชีตภาพรวม PIA'}</span>
                  </button>
                </div>

                {/* Preset Sheet Tabs */}
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="text-slate-500 font-medium">แท็บที่ต้องการดึง:</span>
                  <button
                    onClick={() => {
                      setSheetTabName('ภาพรวม PIA');
                      if (sheetUrl) handleFetchSheet(sheetUrl, 'ภาพรวม PIA');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
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
                      if (sheetUrl) handleFetchSheet(sheetUrl, 'PIA');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
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
                      if (sheetUrl) handleFetchSheet(sheetUrl, 'ตาราง 31 วัน');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                      sheetTabName === 'ตาราง 31 วัน'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
                    }`}
                  >
                    ตาราง 31 วัน
                  </button>
                </div>

                {/* Sharing Notice */}
                <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-amber-950">ข้อสำคัญในการแชร์ Google Sheet: </span>
                    <span>
                      ต้องเปิดสิทธิ์แชร์ไฟล์เป็น <strong>"ทุกคนที่มีลิงก์ (Anyone with link) มีสิทธิ์ดู"</strong> หรือใช้เมนู <strong>ไฟล์ ➔ แชร์ ➔ เผยแพร่ไปยังเว็บ (Publish to web) ➔ CSV</strong> เพื่อให้ระบบดึงข้อมูลได้
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {fetchError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="font-extrabold text-rose-950">เกิดข้อผิดพลาดในการดึงข้อมูล:</div>
                    <p>{fetchError}</p>
                    <div className="pt-1 text-[11px] text-rose-800">
                      💡 <strong>วิธีแก้ไข:</strong> หากยังไม่ได้เปิดสิทธิ์แชร์สาธารณะ สามารถสลับไปที่แท็บ <strong>"วางตารางข้อความ"</strong> ด้านบน แล้วก๊อปปี้ตารางมาวางได้ทันทีเช่นกันครับ
                    </div>
                  </div>
                </div>
              )}

              {/* Success & Preview */}
              {parseResult && parseResult.success && (
                <div className="space-y-3 pt-1 animate-fade-in">
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs flex items-center justify-between gap-3 text-emerald-950">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm">{parseResult.message}</div>
                        <div className="text-[11px] text-emerald-700">
                          พร้อมอัปเดตลงในแดชบอร์ดสาขา {data.branchName} ทันที
                        </div>
                      </div>
                    </div>

                    <span className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full font-bold shadow-xs">
                      {parseResult.rowCount} แถวสำเร็จ
                    </span>
                  </div>

                  {/* Preview Table */}
                  {parseResult.previewRows && parseResult.previewRows.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <Table className="w-3.5 h-3.5 text-indigo-600" />
                          <span>ข้อมูลที่ดึงได้จาก Google Sheet (Preview):</span>
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          ตรวจสอบยอดขายและพนักงาน
                        </span>
                      </div>

                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs max-h-60 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold border-b border-slate-200 sticky top-0">
                            <tr>
                              {Object.keys(parseResult.previewRows[0]).map((key) => (
                                <th key={key} className="px-3 py-2 whitespace-nowrap">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {parseResult.previewRows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                {Object.values(row).map((val: any, cIdx) => (
                                  <td key={cIdx} className="px-3 py-2 whitespace-nowrap font-medium text-slate-800">
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PASTE RAW TEXT (MANUAL BACKUP) */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">คัดลอกเซลล์มาวางโดยตรง: </span>
                <span>หาก Google Sheet ของคุณไม่ได้เปิดแชร์ สามารถคลุมดำใน Google Sheet แล้วกด Ctrl+C นำมาวางที่ช่องนี้ได้เลย</span>
              </div>

              <textarea
                rows={7}
                value={rawSheetContent}
                onChange={(e) => {
                  setRawSheetContent(e.target.value);
                  if (e.target.value.trim()) {
                    const res = parseGoogleSheetPaste(e.target.value, data);
                    setParseResult(res);
                  } else {
                    setParseResult(null);
                  }
                }}
                placeholder="วางข้อความตารางที่คัดลอกจาก Google Sheet ที่นี่..."
                className="w-full p-3.5 text-xs font-mono bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 custom-scrollbar leading-relaxed"
              />

              {parseResult && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between border ${
                    parseResult.success
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {parseResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{parseResult.message}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COPY TO GOOGLE SHEET */}
          {activeTab === 'copy' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-blue-950">
                  <Copy className="w-4 h-4 text-blue-600" />
                  <span>คัดลอกตารางยอดขายไปสร้างใน Google Sheet</span>
                </div>
                <p>
                  กดปุ่มคัดลอกด้านล่าง แล้วเปิด Google Sheet ใหม่ คลิกช่อง A1 แล้วกด <strong>Ctrl+V</strong> ข้อมูลจะถูกจัดลงคอลัมน์อย่างสวยงามทันที
                </p>
              </div>

              <textarea
                readOnly
                rows={7}
                value={tsvForSheet}
                className="w-full p-3.5 text-xs font-mono bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 custom-scrollbar select-all"
              />

              <button
                onClick={handleCopyTsv}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copiedTsv ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>คัดลอกลงคลิปบอร์ดแล้ว! (นำไป Paste ลงใน Google Sheet ได้เลย)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>คัดลอกตารางทั้งหมดสำหรับ Google Sheet</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 4: GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="font-black text-sm text-slate-900">
                  วิธีตั้งค่าแชร์ Google Sheet ให้ดึงข้อมูลได้:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-1">
                  <li>เปิดไฟล์ Google Sheet ของคุณ</li>
                  <li>
                    กดปุ่ม <strong>"แชร์" (Share)</strong> สีเขียว/น้ำเงินที่มุมบนขวา
                  </li>
                  <li>
                    ในส่วน <em>"การเข้าถึงทั่วไป" (General access)</em> ให้เปลี่ยนเป็น <strong>"ทุกคนที่มีลิงก์" (Anyone with the link)</strong> และกำหนดสิทธิ์เป็น <strong>"มีสิทธิ์ดู" (Viewer)</strong>
                  </li>
                  <li>
                    กด <strong>"คัดลอกลิงก์" (Copy link)</strong> แล้วนำมาวางในช่องลิงก์ของแอพนี้ได้ทันที!
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <span className="font-bold text-emerald-950">หัวคอลัมน์ที่แนะนำใน Google Sheet:</span>
                <p className="text-emerald-800 font-mono text-[11px] bg-white p-2.5 rounded-xl border border-emerald-200">
                  รหัสพนักงาน | ชื่อพนักงาน | เป้าหมาย | ยอดขายจริง | เครื่องSMP | UTC+ | UFUND | SIM | ฟิล์ม | เครื่องNB | SanDisk
                </p>
              </div>
            </div>
          )}
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
            onClick={handleApplyUpdate}
            disabled={!parseResult || !parseResult.success}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              parseResult && parseResult.success
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>นำข้อมูลนี้มาแสดงในแอพทันที</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
