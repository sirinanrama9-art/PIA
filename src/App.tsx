import React, { useState, useEffect } from 'react';
import { BranchDataState } from './types/mscTypes';
import { INITIAL_PIA_DATA } from './data/mscInitialData';
import { MscNavbar } from './components/MscNavbar';
import { FocusNoticeBanner } from './components/FocusNoticeBanner';
import { MscOverviewTab } from './components/MscOverviewTab';
import { MscStaffTab } from './components/MscStaffTab';
import { MscSimulatorTab } from './components/MscSimulatorTab';
import { MscDailyTab } from './components/MscDailyTab';
import { MscLineExportModal } from './components/MscLineExportModal';
import { MscDataManagerModal } from './components/MscDataManagerModal';
import { GoogleSheetSyncModal } from './components/GoogleSheetSyncModal';
import { MasterDataTable } from './components/MasterDataTable';
import { DayInspector } from './components/DayInspector';
import { buildInitialData } from './data/initialData';
import { KPI_TARGETS } from './data/initialData';
import { StaffRecordsMap, StaffInfo } from './types/sales';
import { CheckCircle2, SlidersHorizontal, Table, X } from 'lucide-react';

export default function App() {
  // Load saved branch data or fallback to INITIAL_PIA_DATA
  const [data, setData] = useState<BranchDataState>(() => {
    try {
      const saved = localStorage.getItem('pia_branch_data_v4_q4_2569');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PIA_DATA;
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'simulator' | 'daily' | 'master'>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState<boolean>(false);
  const [isDataManagerOpen, setIsDataManagerOpen] = useState<boolean>(false);
  const [isGoogleSheetModalOpen, setIsGoogleSheetModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 31-Day Master Table State
  const [records, setRecords] = useState<StaffRecordsMap>(() => {
    try {
      const saved = localStorage.getItem('pia_master_records_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return buildInitialData();
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(12);
  const [editingStaffDay, setEditingStaffDay] = useState<{ staffId: string; day: number } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveData = (newData: BranchDataState) => {
    setData(newData);
    try {
      localStorage.setItem('pia_branch_data_v4_q4_2569', JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
    showToast('บันทึกข้อมูลสาขาและพนักงานเรียบร้อยแล้ว');
  };

  const handleResetDefault = () => {
    setData(INITIAL_PIA_DATA);
    setRecords(buildInitialData());
    try {
      localStorage.removeItem('pia_branch_data_v4_q4_2569');
      localStorage.removeItem('pia_branch_data_v2');
      localStorage.removeItem('pia_master_records_v1');
    } catch (e) {
      console.error(e);
    }
    showToast('รีเซ็ตกลับเป็นข้อมูลเริ่มต้นของสาขา PIA เรียบร้อย');
  };
  // Convert current staff list for MasterDataTable
  const staffListForMaster: StaffInfo[] = data.staffList.map((s) => ({
    id: s.staffId,
    name: s.name,
    avatarColor: 'indigo',
  }));

  const handleEditRecordField = (field: string, val: number) => {
    if (!editingStaffDay) return;
    const { staffId, day } = editingStaffDay;
    setRecords((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next[staffId]) next[staffId] = {};
      if (!next[staffId][day]) {
        next[staffId][day] = {
          smp: { smpUnits: 0, utcCount: 0, ufundCount: 0, simCount: 0, filmCount: 0, customersCount: 0 },
          nb: { nbUnits: 0, tiCareCount: 0, socialCareCount: 0, utcGadgetCount: 0, sandiskCount: 0 },
        };
      }
      if (field in next[staffId][day].smp) {
        next[staffId][day].smp[field] = val;
      } else if (field in next[staffId][day].nb) {
        next[staffId][day].nb[field] = val;
      }
      try {
        localStorage.setItem('pia_master_records_v1', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f4f6fa] text-slate-900'} transition-colors duration-200 font-sans`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <MscNavbar
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenDataManager={() => setIsDataManagerOpen(true)}
        onOpenGoogleSheet={() => setIsGoogleSheetModalOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Yellow Notice Banner */}
        <FocusNoticeBanner 
          data={data}
          onOpenSimulator={() => setActiveTab('simulator')} 
        />

        {/* Tab 1: Overview & KPI */}
        {activeTab === 'overview' && (
          <MscOverviewTab 
            data={data} 
            onOpenSimulator={() => setActiveTab('simulator')} 
          />
        )}

        {/* Tab 2: Individual Performance & Targets */}
        {activeTab === 'staff' && (
          <MscStaffTab data={data} />
        )}

        {/* Tab 3: Simulator & Forecast Calculator */}
        {activeTab === 'simulator' && (
          <MscSimulatorTab data={data} />
        )}

        {/* Tab 4: Daily Trends */}
        {activeTab === 'daily' && (
          <MscDailyTab data={data} />
        )}

        {/* Tab 5: Master 31-Day Table */}
        {activeTab === 'master' && (
          <div className="space-y-6">
            <MasterDataTable
              staffList={staffListForMaster}
              records={records}
              targets={KPI_TARGETS}
              onSelectDay={(d) => setSelectedDay(d)}
              onEditDayStaff={(sId, d) => setEditingStaffDay({ staffId: sId, day: d })}
            />

            {/* Daily Detailed Inspector */}
            {selectedDay !== null && (
              <DayInspector
                day={selectedDay}
                staffList={staffListForMaster}
                records={records}
                targets={KPI_TARGETS}
                onSelectDay={(d) => setSelectedDay(d)}
                onEditDayStaff={(sId, d) => setEditingStaffDay({ staffId: sId, day: d })}
                onOpenLineModalForDay={() => setIsLineModalOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* Single Staff Day Record Edit Modal */}
      {editingStaffDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  แก้ไขยอดขาย วันที่ {editingStaffDay.day}
                </h3>
                <p className="text-xs text-slate-500">
                  พนักงาน: {data.staffList.find((s) => s.staffId === editingStaffDay.staffId)?.name || editingStaffDay.staffId}
                </p>
              </div>
              <button
                onClick={() => setEditingStaffDay(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">ยอดขายเครื่อง SMP</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.smp?.smpUnits || 0}
                  onChange={(e) => handleEditRecordField('smpUnits', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">UTC+ สำหรับ SMP</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.smp?.utcCount || 0}
                  onChange={(e) => handleEditRecordField('utcCount', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">UFUND APPIN</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.smp?.ufundCount || 0}
                  onChange={(e) => handleEditRecordField('ufundCount', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">เปิดเบอร์ SIM</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.smp?.simCount || 0}
                  onChange={(e) => handleEditRecordField('simCount', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">ฟิล์มกันรอย</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.smp?.filmCount || 0}
                  onChange={(e) => handleEditRecordField('filmCount', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">ยอดขายเครื่อง NB</label>
                <input
                  type="number"
                  defaultValue={records[editingStaffDay.staffId]?.[editingStaffDay.day]?.nb?.nbUnits || 0}
                  onChange={(e) => handleEditRecordField('nbUnits', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setEditingStaffDay(null);
                  showToast('อัปเดตยอดรายวันเรียบร้อย');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Line Export Modal */}
      <MscLineExportModal
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
        data={data}
      />

      {/* Data Manager & Import Modal */}
      <MscDataManagerModal
        isOpen={isDataManagerOpen}
        onClose={() => setIsDataManagerOpen(false)}
        data={data}
        onSave={handleSaveData}
        onResetDefault={handleResetDefault}
      />

      {/* Google Sheet Sync Modal */}
      <GoogleSheetSyncModal
        isOpen={isGoogleSheetModalOpen}
        onClose={() => setIsGoogleSheetModalOpen(false)}
        data={data}
        onUpdateData={(newData) => {
          handleSaveData(newData);
          showToast('ซิงค์และอัปเดตข้อมูลจาก Google Sheet สำเร็จ!');
        }}
      />
    </div>
  );
}
