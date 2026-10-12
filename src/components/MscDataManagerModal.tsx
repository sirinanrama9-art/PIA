import React, { useState } from 'react';
import { BranchDataState, StaffPerformanceData } from '../types/mscTypes';
import { INITIAL_PIA_DATA } from '../data/mscInitialData';
import { 
  X, 
  Save, 
  RotateCcw, 
  Upload, 
  Users, 
  Building, 
  Plus, 
  Trash2, 
  Check, 
  FileText, 
  Download,
  AlertCircle
} from 'lucide-react';

interface MscDataManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BranchDataState;
  onSave: (newData: BranchDataState) => void;
  onResetDefault: () => void;
}

export const MscDataManagerModal: React.FC<MscDataManagerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onResetDefault,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'branch' | 'staff' | 'import' | 'backup'>('branch');
  const [formData, setFormData] = useState<BranchDataState>(JSON.parse(JSON.stringify(data)));
  const [csvInput, setCsvInput] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Sync state if modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setImportStatus(null);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  // Handle branch form changes
  const handleBranchChange = (field: keyof BranchDataState, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTargetChange = (field: keyof BranchDataState['targets'], value: number) => {
    setFormData((prev) => ({
      ...prev,
      targets: {
        ...prev.targets,
        [field]: value,
      },
    }));
  };

  // Staff updates
  const handleStaffFieldChange = (staffIndex: number, path: string[], value: any) => {
    setFormData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let cur = next.staffList[staffIndex];
      for (let i = 0; i < path.length - 1; i++) {
        cur = cur[path[i]];
      }
      cur[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleAddStaff = () => {
    const newId = String(Math.floor(10000 + Math.random() * 90000));
    const newStaff: StaffPerformanceData = {
      staffId: newId,
      name: 'พนักงานใหม่',
      avatarLetter: 'พ',
      iphone: { actualRevenue: 0, targetRevenue: 2000000, actualUnits: 0, forecastRevenue: 0 },
      ipad: { actualRevenue: 0, targetRevenue: 100000, actualUnits: 0, forecastRevenue: 0 },
      mac: { actualRevenue: 0, targetRevenue: 200000, actualUnits: 0, forecastRevenue: 0 },
      appleWatch: { actualRevenue: 0, targetRevenue: 50000, actualUnits: 0, forecastRevenue: 0 },
      careIphone: { attached: 0, total: 0 },
      careIpad: { attached: 0, total: 0 },
      careMac: { attached: 0, total: 0 },
      careWatch: { attached: 0, total: 0 },
      sim: { attached: 0, total: 0 },
      ufund: { attached: 0, total: 0 },
      film: { attached: 0, total: 0 },
      sandisk: { attached: 0, total: 0 },
    };
    setFormData((prev) => ({
      ...prev,
      staffList: [...prev.staffList, newStaff],
    }));
  };

  const handleDeleteStaff = (staffIndex: number) => {
    if (formData.staffList.length <= 1) {
      alert('ต้องมีพนักงานอย่างน้อย 1 คนในระบบ');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      staffList: prev.staffList.filter((_, idx) => idx !== staffIndex),
    }));
  };

  // Import CSV text parser
  const handleImportCsv = () => {
    if (!csvInput.trim()) {
      setImportStatus('กรุณากรอกหรือวางข้อความ CSV ก่อน');
      return;
    }

    try {
      const lines = csvInput.trim().split(/\r?\n/);
      let importedCount = 0;

      // Check if it's simple staff list: ID,Name,Target,Actual
      const updatedStaff = [...formData.staffList];

      for (const line of lines) {
        const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
        if (parts.length >= 2 && parts[0] && parts[1] && !isNaN(Number(parts[0]))) {
          const id = parts[0];
          const name = parts[1];
          const target = parts[2] ? Number(parts[2].replace(/,/g, '')) : 2500000;
          const actual = parts[3] ? Number(parts[3].replace(/,/g, '')) : 1500000;

          const existingIndex = updatedStaff.findIndex((s) => s.staffId === id || s.name === name);
          if (existingIndex >= 0) {
            updatedStaff[existingIndex].name = name;
            if (!isNaN(target)) updatedStaff[existingIndex].iphone.targetRevenue = target;
            if (!isNaN(actual)) updatedStaff[existingIndex].iphone.actualRevenue = actual;
          } else {
            updatedStaff.push({
              staffId: id,
              name,
              avatarLetter: name.charAt(0),
              iphone: { actualRevenue: isNaN(actual) ? 0 : actual, targetRevenue: isNaN(target) ? 2000000 : target, actualUnits: 30, forecastRevenue: actual * 1.5 },
              ipad: { actualRevenue: 0, targetRevenue: 100000, actualUnits: 0, forecastRevenue: 0 },
              mac: { actualRevenue: 0, targetRevenue: 200000, actualUnits: 0, forecastRevenue: 0 },
              appleWatch: { actualRevenue: 0, targetRevenue: 50000, actualUnits: 0, forecastRevenue: 0 },
              careIphone: { attached: 5, total: 30 },
              careIpad: { attached: 0, total: 0 },
              careMac: { attached: 0, total: 0 },
              careWatch: { attached: 0, total: 0 },
              sim: { attached: 5, total: 30 },
              ufund: { attached: 5, total: 30 },
              film: { attached: 10, total: 30 },
              sandisk: { attached: 3, total: 10 },
            });
          }
          importedCount++;
        }
      }

      if (importedCount > 0) {
        setFormData((prev) => ({
          ...prev,
          staffList: updatedStaff,
        }));
        setImportStatus(`นำเข้าข้อมูลสำเร็จ ${importedCount} รายการ!`);
      } else {
        setImportStatus('ไม่พบแถวข้อมูลพนักงานที่ถูกต้อง (รูปแบบ: รหัส,ชื่อ,เป้า,ยอดขาย)');
      }
    } catch (err: any) {
      setImportStatus(`เกิดข้อผิดพลาดในการนำเข้า: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvInput(content);
    };
    reader.readAsText(file);
  };

  const handleSaveAll = () => {
    onSave(formData);
    onClose();
  };

  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pia_sales_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
              <Building className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">จัดการข้อมูลสาขา & นำเข้าไฟล์</h3>
              <p className="text-xs text-blue-100">ปรับแต่งชื่อสาขา, ยอดขายจริง, เป้าหมาย KPI และรายชื่อพนักงานของคุณ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white rounded-xl transition-colors cursor-pointer hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 p-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('branch')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'branch'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>ข้อมูลสาขา & เป้า KPI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('staff')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'staff'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>พนักงานในทีม ({formData.staffList.length} คน)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('import')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'import'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>นำเข้าไฟล์ CSV</span>
          </button>

          <button
            onClick={() => setActiveSubTab('backup')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'backup'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>สำรอง & คืนค่า</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {/* SubTab 1: Branch Info & Targets */}
          {activeSubTab === 'branch' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>ข้อมูลทั่วไปของสาขา</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อสาขา</label>
                    <input
                      type="text"
                      value={formData.branchName}
                      onChange={(e) => handleBranchChange('branchName', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ไตรมาส / ประจำงวด</label>
                    <input
                      type="text"
                      value={formData.quarter}
                      onChange={(e) => handleBranchChange('quarter', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความอัปเดต ณ วันที่</label>
                    <input
                      type="text"
                      value={formData.asOfDate}
                      onChange={(e) => handleBranchChange('asOfDate', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">จำนวนวันที่เหลือในงวด (วัน)</label>
                    <input
                      type="number"
                      value={formData.daysRemaining}
                      onChange={(e) => handleBranchChange('daysRemaining', Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เป้าหมายยอดขายรวมสาขา (บาท)</label>
                    <input
                      type="number"
                      value={formData.targetRevenue || 10230348}
                      onChange={(e) => handleBranchChange('targetRevenue', Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-bold text-indigo-700 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ยอดขายจริงรวมสาขาปัจจุบัน (บาท)</label>
                    <input
                      type="number"
                      value={formData.actualRevenue || 6500152}
                      onChange={(e) => handleBranchChange('actualRevenue', Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-bold text-emerald-700 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Targets KPI % */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-black text-sm text-slate-900">เกณฑ์เป้าหมายอัตราแนบ KPI (% Target)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">UTC+ สำหรับ SMP (%)</label>
                    <input
                      type="number"
                      value={formData.targets.careIphone}
                      onChange={(e) => handleTargetChange('careIphone', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">UFUND APPIN (%)</label>
                    <input
                      type="number"
                      value={formData.targets.ufund}
                      onChange={(e) => handleTargetChange('ufund', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">เปิดเบอร์ SIM (%)</label>
                    <input
                      type="number"
                      value={formData.targets.sim}
                      onChange={(e) => handleTargetChange('sim', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">ฟิล์มกันรอย (%)</label>
                    <input
                      type="number"
                      value={formData.targets.film}
                      onChange={(e) => handleTargetChange('film', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">TI Care (NB) (%)</label>
                    <input
                      type="number"
                      value={formData.targets.careIpad}
                      onChange={(e) => handleTargetChange('careIpad', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Social Care+ (%)</label>
                    <input
                      type="number"
                      value={formData.targets.careMac}
                      onChange={(e) => handleTargetChange('careMac', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">UTC+ For Gadget (%)</label>
                    <input
                      type="number"
                      value={formData.targets.careWatch}
                      onChange={(e) => handleTargetChange('careWatch', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">SanDisk (%)</label>
                    <input
                      type="number"
                      value={formData.targets.sandisk}
                      onChange={(e) => handleTargetChange('sandisk', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SubTab 2: Staff Management */}
          {activeSubTab === 'staff' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm text-slate-900">รายชื่อและตัวเลขพนักงาน</h4>
                  <p className="text-xs text-slate-500">สามารถแก้ไขชื่อ รหัส เป้าหมาย ยอดขาย และจำนวนเครื่องได้โดยตรง</p>
                </div>
                <button
                  onClick={handleAddStaff}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มพนักงาน</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.staffList.map((staff, idx) => (
                  <div key={staff.staffId || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                          {staff.avatarLetter || staff.name.charAt(0)}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={staff.name}
                            onChange={(e) => handleStaffFieldChange(idx, ['name'], e.target.value)}
                            placeholder="ชื่อพนักงาน"
                            className="px-2.5 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg w-28 sm:w-36"
                          />
                          <input
                            type="text"
                            value={staff.staffId}
                            onChange={(e) => handleStaffFieldChange(idx, ['staffId'], e.target.value)}
                            placeholder="รหัส"
                            className="px-2.5 py-1 text-xs text-slate-500 bg-white border border-slate-300 rounded-lg w-20"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteStaff(idx)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="ลบพนักงาน"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">ยอดขายจริง (SMP/iPhone)</label>
                        <input
                          type="number"
                          value={staff.iphone.actualRevenue}
                          onChange={(e) => handleStaffFieldChange(idx, ['iphone', 'actualRevenue'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">เป้าหมาย (SMP/iPhone)</label>
                        <input
                          type="number"
                          value={staff.iphone.targetRevenue}
                          onChange={(e) => handleStaffFieldChange(idx, ['iphone', 'targetRevenue'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">จำนวนเครื่อง SMP</label>
                        <input
                          type="number"
                          value={staff.iphone.actualUnits}
                          onChange={(e) => handleStaffFieldChange(idx, ['iphone', 'actualUnits'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">แนบ UTC+ (เครื่อง)</label>
                        <input
                          type="number"
                          value={staff.careIphone.attached}
                          onChange={(e) => handleStaffFieldChange(idx, ['careIphone', 'attached'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs pt-1">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">แนบ UFUND</label>
                        <input
                          type="number"
                          value={staff.ufund.attached}
                          onChange={(e) => handleStaffFieldChange(idx, ['ufund', 'attached'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">แนบ SIM</label>
                        <input
                          type="number"
                          value={staff.sim.attached}
                          onChange={(e) => handleStaffFieldChange(idx, ['sim', 'attached'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">แนบ ฟิล์ม</label>
                        <input
                          type="number"
                          value={staff.film.attached}
                          onChange={(e) => handleStaffFieldChange(idx, ['film', 'attached'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block">แนบ SanDisk</label>
                        <input
                          type="number"
                          value={staff.sandisk.attached}
                          onChange={(e) => handleStaffFieldChange(idx, ['sandisk', 'attached'], Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SubTab 3: Import CSV */}
          {activeSubTab === 'import' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>รองรับการนำเข้าไฟล์ CSV หรือวางข้อความตาราง</span>
                </div>
                <p>
                  รูปแบบที่แนะนำ: <code className="bg-white/80 px-1 py-0.5 rounded text-blue-800">รหัส,ชื่อพนักงาน,เป้าหมายยอดขาย,ยอดขายจริง</code>
                </p>
                <p className="text-slate-600">ตัวอย่าง: <code className="bg-white/80 px-1 py-0.5 rounded text-slate-700">24583,จิ๊บ,2557587,1562400</code></p>
              </div>

              {/* Upload Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">เลือกไฟล์ CSV จากเครื่อง</label>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              {/* Paste Textarea */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">หรือ วางข้อมูล CSV ลงในช่องนี้:</label>
                <textarea
                  rows={6}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={`24583,จิ๊บ,2557587,1562400\n21865,เมย์,2557587,1580250\n29253,วา,2557587,1712500\n35350,สตาร์,2557587,1645002`}
                  className="w-full p-3 text-xs font-mono bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar"
                />
              </div>

              {importStatus && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  importStatus.includes('สำเร็จ') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importStatus}</span>
                </div>
              )}

              <button
                onClick={handleImportCsv}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                ประมวลผลและนำเข้าข้อมูลทันที
              </button>
            </div>
          )}

          {/* SubTab 4: Backup & Reset */}
          {activeSubTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-black text-sm text-slate-900">สำรองข้อมูล (Export JSON)</h4>
                <p className="text-xs text-slate-500">
                  ดาวน์โหลดข้อมูลทั้งหมดเก็บไว้เป็นไฟล์ JSON สำหรับนำไปใช้งานต่อหรือเป็นข้อมูลสำรอง
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>ดาวน์โหลดไฟล์สำรอง</span>
                </button>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                <h4 className="font-black text-sm text-rose-900">รีเซ็ตเป็นค่าเริ่มต้นของสาขา PIA</h4>
                <p className="text-xs text-rose-700">
                  คืนค่าข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นของสาขา PIA (พนักงาน 4 คน: จิ๊บ, เมย์, วา, สตาร์, ยอดเป้า 10,230,348 ฿, ยอดจริง 6,500,152 ฿)
                </p>
                <button
                  onClick={() => {
                    if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นของสาขา PIA ใช่หรือไม่?')) {
                      onResetDefault();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>รีเซ็ตกลับเป็นข้อมูลสาขา PIA เริ่มต้น</span>
                </button>
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
            ยกเลิก
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกการเปลี่ยนแปลงทั้งหมด</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
