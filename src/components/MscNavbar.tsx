import React from 'react';
import { 
  Moon, 
  Sun, 
  Smartphone, 
  Users, 
  Calculator, 
  TrendingUp,
  Table,
  SlidersHorizontal,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import { BranchDataState } from '../types/mscTypes';

interface MscNavbarProps {
  data: BranchDataState;
  activeTab: 'overview' | 'staff' | 'simulator' | 'daily' | 'master';
  setActiveTab: (tab: 'overview' | 'staff' | 'simulator' | 'daily' | 'master') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenLineModal: () => void;
  onOpenDataManager?: () => void;
  onOpenGoogleSheet?: () => void;
}

export const MscNavbar: React.FC<MscNavbarProps> = ({
  data,
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenLineModal,
  onOpenDataManager,
  onOpenGoogleSheet,
}) => {
  const brandInitial = data.branchName.trim().charAt(0).toUpperCase() || 'P';

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Top line: Brand and Right Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-black text-xl shadow-md shadow-indigo-500/25">
              {brandInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 tracking-tight">
                  {data.branchName}
                </h1>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-full">
                  {data.quarter}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{data.asOfDate}</span>
              </div>
            </div>
          </div>

          {/* Right action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* Google Sheet Sync - Small compact icon button */}
            {onOpenGoogleSheet && (
              <button
                onClick={onOpenGoogleSheet}
                title="ซิงค์ลิงก์ Google Sheet"
                className="relative inline-flex items-center justify-center p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 group"
                aria-label="ซิงค์ Google Sheet"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>สว่าง</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>มืด</span>
                </>
              )}
            </button>

            {/* LINE Summary button */}
            <button
              onClick={onOpenLineModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>ส่ง LINE</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar border-t border-slate-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>ภาพรวมสาขา & KPI</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'staff'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ยอดขายรายบุคคล ({data.staffList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>จำลองยอด & แผนเร่งด่วน</span>
          </button>

          <button
            onClick={() => setActiveTab('daily')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>แนวโน้มรายวัน</span>
          </button>

          <button
            onClick={() => setActiveTab('master')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'master'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>ตาราง 31 วันเต็ม</span>
          </button>
        </div>
      </div>
    </header>
  );
};
