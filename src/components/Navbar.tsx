import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Table, 
  Trophy, 
  Share2, 
  PlusCircle, 
  Download, 
  RotateCcw,
  Sparkles,
  Layers,
  Calendar
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'smp' | 'nb' | 'table' | 'staff';
  setActiveTab: (tab: 'overview' | 'smp' | 'nb' | 'table' | 'staff') => void;
  onOpenQuickEntry: () => void;
  onOpenLineModal: () => void;
  onOpenImportExport: () => void;
  onResetData: () => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  hasCustomEdits: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickEntry,
  onOpenLineModal,
  onOpenImportExport,
  onResetData,
  selectedDay,
  setSelectedDay,
  hasCustomEdits,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      {/* Dynamic top gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 w-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-black text-slate-900 tracking-tight">
                  Executive Sales Dashboard & Team Leaderboard
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                  PIA Q4/2569
                </span>
                {hasCustomEdits && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded-md border border-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    บันทึกแล้ว
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                🏢 สาขา PIA (Branch Total) · ติดตามยอดขายจริง 6.50M / เป้า 10.23M & กระดานผู้นำทีมขาย
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onOpenLineModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-700" />
              สรุปส่ง LINE
            </button>

            <button
              onClick={onOpenQuickEntry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              บันทึกยอดขาย
            </button>

            <button
              onClick={onOpenImportExport}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              title="นำเข้า / ส่งออก CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              CSV
            </button>

            {hasCustomEdits && (
              <button
                onClick={onResetData}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="รีเซ็ตกลับเป็นข้อมูลตั้งต้น"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                รีเซ็ต
              </button>
            )}
          </div>
        </div>

        {/* Bottom row: Navigation tabs and Day Quick Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 gap-2">
          {/* Main Tabs in sleek modern executive styling */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Executive Dashboard
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Team Leaderboard
            </button>

            <button
              onClick={() => setActiveTab('smp')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'smp'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-4 h-4 text-sky-400" />
              หมวดสมาร์ทโฟน (SMP)
            </button>

            <button
              onClick={() => setActiveTab('nb')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'nb'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Laptop className="w-4 h-4 text-purple-400" />
              หมวดโน้ตบุ๊ก (NB)
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'table'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Table className="w-4 h-4 text-emerald-400" />
              ตาราง 31 วันเต็ม
            </button>
          </div>

          {/* Day selection helper */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              ดูวันที่:
            </span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-2xs"
            >
              <option value={0}>ทั้งหมดทั้งเดือน (MTD สะสม)</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  วันที่ {d} {d <= 11 ? '(มีข้อมูล)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
