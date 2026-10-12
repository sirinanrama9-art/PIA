import { BranchDataState, StaffPerformanceData } from '../types/mscTypes';

export interface ParsedSheetResult {
  success: boolean;
  message: string;
  detectedType: 'staff_summary' | 'pia_matrix' | 'branch_overview' | 'pia_mixed_overview' | 'unknown';
  updatedBranchData?: Partial<BranchDataState>;
  updatedStaffList?: StaffPerformanceData[];
  previewRows?: Array<Record<string, any>>;
  rowCount?: number;
}

/**
 * Clean numbers from string (handles "1,500,000 ฿", "34.5%", "63.5", quotes, etc.)
 */
export function cleanNumber(val: any, fallback = 0): number {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  const str = String(val).replace(/,/g, '').replace(/฿/g, '').replace(/%/g, '').trim();
  const num = Number(str);
  return isNaN(num) ? fallback : num;
}

/**
 * Parse lines from TSV (Google Sheets copy) or CSV (Google Sheets export)
 */
export function splitSheetLine(line: string): string[] {
  // If line contains Tab, it's copied directly from Google Sheets!
  if (line.includes('\t')) {
    return line.split('\t').map(cell => cell.trim().replace(/^"|"$/g, ''));
  }

  // Otherwise handle CSV with quotes
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current.trim().replace(/^"|"$/g, ''));
  return cells;
}

/**
 * Parse Google Sheet CSV/TSV data into branch & staff performance data.
 * Specifically optimized for "ชีตภาพรวม PIA" as well as individual staff and daily matrices.
 */
export function parseGoogleSheetPaste(
  pastedText: string,
  currentData: BranchDataState
): ParsedSheetResult {
  const clean = pastedText.replace(/^\uFEFF/, '').trim();
  if (!clean) {
    return {
      success: false,
      message: 'ไม่มีข้อมูลที่ดึงมาได้ (กรุณาตรวจสอบว่ามีข้อมูลในชีต Google Sheet)',
      detectedType: 'unknown',
    };
  }

  const lines = clean.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    return {
      success: false,
      message: 'ไม่พบแถวข้อมูลในชีต',
      detectedType: 'unknown',
    };
  }

  // Check 1: 31-day PIA daily matrix (contains multiple day columns or 'เครื่อง SMP' with 1, 2, 3...)
  if (clean.includes('เครื่อง SMP') && (clean.includes('วันที่') || clean.includes('UTC+ For SMP') || lines[0].includes('1,'))) {
    return parsePiaMatrixFormat(lines, currentData);
  }

  // Check 2: Try comprehensive "ภาพรวม PIA" mixed parser
  const mixedResult = parsePiaMixedOverview(lines, currentData);
  if (mixedResult.success && (mixedResult.previewRows?.length || 0) > 0) {
    return mixedResult;
  }

  // Check 3: Standard Branch Overview (2-4 rows)
  const firstRow = splitSheetLine(lines[0]);
  const isBranchOverview = firstRow.some(c => c.includes('สาขา') || c.includes('เป้าหมายรวม') || c.includes('ยอดรวม'));
  if (isBranchOverview && lines.length <= 6) {
    return parseBranchOverviewFormat(lines, currentData);
  }

  // Check 4: Standard Staff performance table
  return parseStaffPerformanceTable(lines, currentData);
}

/**
 * Comprehensive parser for "ภาพรวม PIA"
 * Handles key-value summary metrics (เป้าหมาย, ยอดขายจริง, วันคงเหลือ) AND staff list together!
 */
function parsePiaMixedOverview(lines: string[], currentData: BranchDataState): ParsedSheetResult {
  let updatedBranch: Partial<BranchDataState> = {};
  let updatedStaff: StaffPerformanceData[] = [...currentData.staffList];
  const preview: Record<string, any>[] = [];

  // 1. Scan for Key-Value pairs anywhere in the lines
  for (const line of lines) {
    const cells = splitSheetLine(line);
    if (cells.length < 2) continue;

    const key = cells[0].toLowerCase().trim();
    const val = cells[1].trim();
    const valNum = cleanNumber(val, 0);

    // Branch Name
    if ((key.includes('สาขา') || key.includes('branch') || key.includes('ร้าน')) && !key.includes('เป้า') && !key.includes('ยอด')) {
      if (val && !val.includes('เป้า')) {
        updatedBranch.branchName = val;
      }
    }

    // Target Revenue
    if (key.includes('เป้าหมายรวม') || key.includes('เป้ารวม') || (key.includes('เป้าหมาย') && !key.includes('smp') && !key.includes('พนักงาน'))) {
      if (valNum > 100000) {
        updatedBranch.targetRevenue = valNum;
      }
    }

    // Actual Revenue
    if (key.includes('ยอดขายจริง') || key.includes('ยอดรวมจริง') || (key.includes('ยอดขาย') && !key.includes('เครื่อง') && !key.includes('smp'))) {
      if (valNum > 100000) {
        updatedBranch.actualRevenue = valNum;
      }
    }

    // Days Remaining
    if (key.includes('วันคงเหลือ') || key.includes('เหลืออีก') || key.includes('days')) {
      if (valNum > 0 && valNum <= 31) {
        updatedBranch.daysRemaining = valNum;
      }
    }

    // Quarter / As of date
    if (key.includes('quarter') || key.includes('ไตรมาส')) {
      updatedBranch.quarter = val;
    }
    if (key.includes('ณ วันที่') || key.includes('as of')) {
      updatedBranch.asOfDate = `${val} (Sheet Sync)`;
    }
  }

  // 2. Scan for Staff Table Rows
  let staffHeaderIdx = -1;
  let idCol = 0;
  let nameCol = 1;
  let targetCol = 2;
  let actualCol = 3;
  let smpCol = 4;
  let utcCol = 5;
  let ufundCol = 6;
  let simCol = 7;
  let filmCol = 8;
  let nbCol = 9;

  for (let i = 0; i < lines.length; i++) {
    const cells = splitSheetLine(lines[i]);
    const lower = cells.map(c => c.toLowerCase());
    if (lower.some(c => c.includes('รหัส') || c.includes('ชื่อพนักงาน') || (c.includes('ชื่อ') && (c.includes('เป้า') || lower.some(x => x.includes('ยอด')))))) {
      staffHeaderIdx = i;
      cells.forEach((c, idx) => {
        const text = c.toLowerCase();
        if (text.includes('รหัส') || text.includes('id')) idCol = idx;
        else if (text.includes('ชื่อ') || text.includes('name')) nameCol = idx;
        else if (text.includes('เป้า') || text.includes('target')) targetCol = idx;
        else if (text.includes('จริง') || text.includes('actual') || text.includes('ยอดขาย')) actualCol = idx;
        else if (text.includes('smp') || text.includes('เครื่อง')) smpCol = idx;
        else if (text.includes('utc')) utcCol = idx;
        else if (text.includes('ufund')) ufundCol = idx;
        else if (text.includes('sim')) simCol = idx;
        else if (text.includes('ฟิล์ม') || text.includes('film')) filmCol = idx;
        else if (text.includes('nb') || text.includes('notebook')) nbCol = idx;
      });
      break;
    }
  }

  // If header found, extract staff rows
  let staffFoundCount = 0;
  const startRow = staffHeaderIdx >= 0 ? staffHeaderIdx + 1 : 0;

  for (let r = startRow; r < lines.length; r++) {
    const cells = splitSheetLine(lines[r]);
    if (cells.length < 2) continue;

    // Skip total row
    if (cells[0].includes('รวม') || cells[1]?.includes('รวม') || cells[0].includes('สาขา')) continue;

    const rawId = (cells[idCol] || cells[0] || '').trim();
    const rawName = (cells[nameCol] || cells[1] || '').trim();

    // Check if matches known staff (จิ๊บ, เมย์, วา, สตาร์) or looks like a valid staff row
    const matchedKnown = updatedStaff.find(s => s.staffId === rawId || s.name === rawName);
    const looksLikeStaff = matchedKnown || (rawName && rawName.length <= 15 && !rawName.includes('เป้า') && !rawName.includes('ยอด') && (cells.length >= 3));

    if (!looksLikeStaff) continue;

    const staffName = rawName || (matchedKnown ? matchedKnown.name : 'พนักงาน');
    const staffId = rawId || (matchedKnown ? matchedKnown.staffId : String(Date.now()).slice(-5));

    const targetRev = cleanNumber(cells[targetCol], matchedKnown ? matchedKnown.iphone.targetRevenue : 2557587);
    const actualRev = cleanNumber(cells[actualCol], matchedKnown ? matchedKnown.iphone.actualRevenue : 1600000);
    const smpUnits = cleanNumber(cells[smpCol], matchedKnown ? matchedKnown.iphone.actualUnits : 35);
    const utcCount = cells[utcCol] !== undefined ? cleanNumber(cells[utcCol], 10) : (matchedKnown ? matchedKnown.careIphone.attached : 10);
    const ufundCount = cells[ufundCol] !== undefined ? cleanNumber(cells[ufundCol], 6) : (matchedKnown ? matchedKnown.ufund.attached : 6);
    const simCount = cells[simCol] !== undefined ? cleanNumber(cells[simCol], 5) : (matchedKnown ? matchedKnown.sim.attached : 5);
    const filmCount = cells[filmCol] !== undefined ? cleanNumber(cells[filmCol], 10) : (matchedKnown ? matchedKnown.film.attached : 10);
    const nbUnits = cells[nbCol] !== undefined ? cleanNumber(cells[nbCol], 5) : (matchedKnown ? matchedKnown.mac.actualUnits : 5);

    const existingIdx = updatedStaff.findIndex(s => s.staffId === staffId || s.name === staffName);
    const staffObj: StaffPerformanceData = {
      staffId,
      name: staffName,
      avatarLetter: staffName.charAt(0) || 'พ',
      iphone: {
        actualRevenue: actualRev,
        targetRevenue: targetRev,
        actualUnits: smpUnits,
        forecastRevenue: Math.round(actualRev * 1.45),
      },
      ipad: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].ipad.actualRevenue : 75000,
        targetRevenue: 150000,
        actualUnits: 2,
        forecastRevenue: 120000,
      },
      mac: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].mac.actualRevenue : 150000,
        targetRevenue: 250000,
        actualUnits: nbUnits,
        forecastRevenue: 200000,
      },
      appleWatch: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].appleWatch.actualRevenue : 30000,
        targetRevenue: 60000,
        actualUnits: 1,
        forecastRevenue: 45000,
      },
      careIphone: { attached: utcCount, total: smpUnits },
      careIpad: { attached: 0, total: 2 },
      careMac: { attached: Math.min(nbUnits, 3), total: nbUnits },
      careWatch: { attached: 1, total: 1 },
      sim: { attached: simCount, total: smpUnits },
      ufund: { attached: ufundCount, total: smpUnits },
      film: { attached: filmCount, total: smpUnits },
      sandisk: { attached: Math.min(nbUnits, 5), total: nbUnits },
    };

    if (existingIdx >= 0) {
      updatedStaff[existingIdx] = staffObj;
    } else {
      updatedStaff.push(staffObj);
    }

    staffFoundCount++;
    preview.push({
      'รหัส': staffObj.staffId,
      'พนักงาน': staffObj.name,
      'เป้าหมาย': targetRev.toLocaleString() + ' ฿',
      'ยอดขายจริง': actualRev.toLocaleString() + ' ฿',
      'เครื่อง SMP': smpUnits,
      'แนบ UTC+': utcCount,
      'แนบ UFUND': ufundCount,
      'เปิด SIM': simCount,
      'ติดฟิล์ม': filmCount,
    });
  }

  // If no staff rows detected, but we found branch KPIs
  if (staffFoundCount === 0 && (updatedBranch.targetRevenue || updatedBranch.actualRevenue || updatedBranch.branchName)) {
    preview.push({
      'สาขา': updatedBranch.branchName || currentData.branchName,
      'เป้าหมาย': (updatedBranch.targetRevenue || currentData.targetRevenue || 10230348).toLocaleString() + ' ฿',
      'ยอดขายจริง': (updatedBranch.actualRevenue || currentData.actualRevenue || 6500152).toLocaleString() + ' ฿',
      'วันคงเหลือ': updatedBranch.daysRemaining || currentData.daysRemaining || 20,
    });

    return {
      success: true,
      message: `ดึงข้อมูลภาพรวมสาขาสำเร็จ (เป้าหมาย: ${(updatedBranch.targetRevenue || currentData.targetRevenue || 10230348).toLocaleString()} ฿)`,
      detectedType: 'branch_overview',
      updatedBranchData: {
        ...updatedBranch,
        asOfDate: `${new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} (Live Sync)`,
      },
      previewRows: preview,
      rowCount: preview.length,
    };
  }

  if (staffFoundCount > 0) {
    const sumActual = updatedStaff.reduce((sum, s) => sum + s.iphone.actualRevenue, 0);
    const sumTarget = updatedStaff.reduce((sum, s) => sum + s.iphone.targetRevenue, 0);

    return {
      success: true,
      message: `ดึงข้อมูลชีตภาพรวม PIA สำเร็จ (${staffFoundCount} พนักงาน, เป้าหมายรวม: ${(updatedBranch.targetRevenue || sumTarget).toLocaleString()} ฿)`,
      detectedType: 'pia_mixed_overview',
      updatedStaffList: updatedStaff,
      updatedBranchData: {
        ...updatedBranch,
        staffList: updatedStaff,
        actualRevenue: updatedBranch.actualRevenue || sumActual,
        targetRevenue: updatedBranch.targetRevenue || sumTarget,
        asOfDate: `${new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} (Google Sheet Sync)`,
      },
      previewRows: preview,
      rowCount: preview.length,
    };
  }

  return {
    success: false,
    message: 'ไม่สามารถระบุแถวข้อมูลของชีตภาพรวม PIA ได้ กรุณาตรวจสอบหัวตารางใน Sheet',
    detectedType: 'unknown',
  };
}

function parseBranchOverviewFormat(lines: string[], currentData: BranchDataState): ParsedSheetResult {
  const resultData: Partial<BranchDataState> = {};
  const preview: Record<string, any>[] = [];

  for (let i = 0; i < lines.length; i++) {
    const cells = splitSheetLine(lines[i]);
    if (i === 0 && cells.some(c => c.includes('สาขา'))) continue; // skip header

    if (cells.length >= 2) {
      const branchName = cells[0] || currentData.branchName;
      const target = cleanNumber(cells[1], currentData.targetRevenue || 10230348);
      const actual = cells[2] ? cleanNumber(cells[2], currentData.actualRevenue || 6500152) : currentData.actualRevenue;
      const days = cells[3] ? cleanNumber(cells[3], currentData.daysRemaining) : currentData.daysRemaining;

      resultData.branchName = branchName;
      resultData.targetRevenue = target;
      if (actual) resultData.actualRevenue = actual;
      if (days) resultData.daysRemaining = days;

      preview.push({
        'ชื่อสาขา': branchName,
        'เป้าหมาย (บาท)': target.toLocaleString(),
        'ยอดขายจริง (บาท)': actual?.toLocaleString(),
        'วันคงเหลือ': days,
      });
    }
  }

  return {
    success: preview.length > 0,
    message: `อ่านข้อมูลสรุปภาพรวมสาขาสำเร็จ (${preview.length} แถว)`,
    detectedType: 'branch_overview',
    updatedBranchData: {
      ...resultData,
      asOfDate: `${new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} (Sheet Sync)`,
    },
    previewRows: preview,
    rowCount: preview.length,
  };
}

function parseStaffPerformanceTable(lines: string[], currentData: BranchDataState): ParsedSheetResult {
  const updatedStaff: StaffPerformanceData[] = [...currentData.staffList];
  const preview: Record<string, any>[] = [];

  let headerIndex = -1;
  let idCol = 0;
  let nameCol = 1;
  let targetCol = 2;
  let actualCol = 3;
  let smpUnitsCol = 4;
  let utcCol = 5;
  let ufundCol = 6;
  let simCol = 7;
  let filmCol = 8;
  let nbUnitsCol = 9;
  let sandiskCol = 10;

  for (let i = 0; i < Math.min(lines.length, 3); i++) {
    const cells = splitSheetLine(lines[i]);
    const lowerCells = cells.map(c => c.toLowerCase());
    if (lowerCells.some(c => c.includes('รหัส') || c.includes('ชื่อ') || c.includes('name') || c.includes('target') || c.includes('เป้า'))) {
      headerIndex = i;
      cells.forEach((c, idx) => {
        const text = c.toLowerCase();
        if (text.includes('รหัส') || text.includes('id')) idCol = idx;
        else if (text.includes('ชื่อ') || text.includes('name') || text.includes('พนักงาน')) nameCol = idx;
        else if (text.includes('เป้า') || text.includes('target')) targetCol = idx;
        else if (text.includes('จริง') || text.includes('actual') || text.includes('ยอดขาย')) actualCol = idx;
        else if (text.includes('smp') || text.includes('เครื่อง')) smpUnitsCol = idx;
        else if (text.includes('utc')) utcCol = idx;
        else if (text.includes('ufund')) ufundCol = idx;
        else if (text.includes('sim')) simCol = idx;
        else if (text.includes('ฟิล์ม') || text.includes('film')) filmCol = idx;
        else if (text.includes('nb') || text.includes('โน้ตบุ๊ก')) nbUnitsCol = idx;
        else if (text.includes('sandisk')) sandiskCol = idx;
      });
      break;
    }
  }

  const startRow = headerIndex >= 0 ? headerIndex + 1 : 0;

  for (let r = startRow; r < lines.length; r++) {
    const cells = splitSheetLine(lines[r]);
    if (cells.length < 2) continue;

    if (cells[0].includes('รวม') || cells[1]?.includes('รวม')) continue;

    const rawId = cells[idCol] || cells[0] || '';
    const rawName = cells[nameCol] || cells[1] || '';

    if (!rawId && !rawName) continue;

    const targetRev = cleanNumber(cells[targetCol], 2557587);
    const actualRev = cleanNumber(cells[actualCol], 1500000);
    const smpUnits = cleanNumber(cells[smpUnitsCol], 30);
    const utcCount = cells[utcCol] !== undefined ? cleanNumber(cells[utcCol], 5) : 5;
    const ufundCount = cells[ufundCol] !== undefined ? cleanNumber(cells[ufundCol], 5) : 5;
    const simCount = cells[simCol] !== undefined ? cleanNumber(cells[simCol], 4) : 4;
    const filmCount = cells[filmCol] !== undefined ? cleanNumber(cells[filmCol], 8) : 8;
    const nbUnits = cells[nbUnitsCol] !== undefined ? cleanNumber(cells[nbUnitsCol], 4) : 4;
    const sandiskCount = cells[sandiskCol] !== undefined ? cleanNumber(cells[sandiskCol], 4) : 4;

    const existingIdx = updatedStaff.findIndex(s => s.staffId === rawId || s.name === rawName);

    const staffObj: StaffPerformanceData = {
      staffId: rawId || (existingIdx >= 0 ? updatedStaff[existingIdx].staffId : String(Date.now()).slice(-5)),
      name: rawName || (existingIdx >= 0 ? updatedStaff[existingIdx].name : 'พนักงาน'),
      avatarLetter: (rawName || 'พ').charAt(0),
      iphone: {
        actualRevenue: actualRev,
        targetRevenue: targetRev,
        actualUnits: smpUnits,
        forecastRevenue: Math.round(actualRev * 1.45),
      },
      ipad: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].ipad.actualRevenue : 50000,
        targetRevenue: 150000,
        actualUnits: 2,
        forecastRevenue: 120000,
      },
      mac: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].mac.actualRevenue : 150000,
        targetRevenue: 250000,
        actualUnits: nbUnits,
        forecastRevenue: 200000,
      },
      appleWatch: {
        actualRevenue: existingIdx >= 0 ? updatedStaff[existingIdx].appleWatch.actualRevenue : 20000,
        targetRevenue: 50000,
        actualUnits: 1,
        forecastRevenue: 40000,
      },
      careIphone: { attached: utcCount, total: smpUnits },
      careIpad: { attached: 0, total: 2 },
      careMac: { attached: Math.min(nbUnits, 3), total: nbUnits },
      careWatch: { attached: 1, total: 1 },
      sim: { attached: simCount, total: smpUnits },
      ufund: { attached: ufundCount, total: smpUnits },
      film: { attached: filmCount, total: smpUnits },
      sandisk: { attached: sandiskCount, total: nbUnits },
    };

    if (existingIdx >= 0) {
      updatedStaff[existingIdx] = staffObj;
    } else {
      updatedStaff.push(staffObj);
    }

    preview.push({
      'รหัส': staffObj.staffId,
      'ชื่อพนักงาน': staffObj.name,
      'เป้าหมาย (บาท)': targetRev.toLocaleString(),
      'ยอดขายจริง (บาท)': actualRev.toLocaleString(),
      'เครื่อง SMP': smpUnits,
      'แนบ UTC+': `${utcCount} (${smpUnits > 0 ? ((utcCount / smpUnits) * 100).toFixed(0) : 0}%)`,
      'แนบ UFUND': `${ufundCount}`,
      'เปิด SIM': `${simCount}`,
      'ฟิล์ม': `${filmCount}`,
    });
  }

  const newTotalActual = updatedStaff.reduce((sum, s) => sum + s.iphone.actualRevenue, 0);
  const newTotalTarget = updatedStaff.reduce((sum, s) => sum + s.iphone.targetRevenue, 0);

  return {
    success: preview.length > 0,
    message: `อ่านข้อมูลผลงานพนักงานจาก Google Sheet สำเร็จ ${preview.length} คน`,
    detectedType: 'staff_summary',
    updatedStaffList: updatedStaff,
    updatedBranchData: {
      staffList: updatedStaff,
      actualRevenue: newTotalActual,
      targetRevenue: newTotalTarget,
      asOfDate: `${new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} (Sheet Sync)`,
    },
    previewRows: preview,
    rowCount: preview.length,
  };
}

function parsePiaMatrixFormat(lines: string[], currentData: BranchDataState): ParsedSheetResult {
  const updatedStaff: StaffPerformanceData[] = [...currentData.staffList];
  const preview: Record<string, any>[] = [];

  for (const line of lines) {
    const cells = splitSheetLine(line);
    if (cells.length < 5) continue;
    const col0 = cells[0];
    const col1 = cells[1];

    if (col0.includes('PIA') || col0.includes('วันที่') || col0.includes('รวม')) continue;

    const matchedIdx = updatedStaff.findIndex(s => s.staffId === col0 || s.name === col1);
    if (matchedIdx >= 0) {
      let smpTotal = 0;
      let utcTotal = 0;
      let ufundTotal = 0;
      let simTotal = 0;
      let filmTotal = 0;

      for (let d = 1; d <= 31; d++) {
        const start = 2 + (d - 1) * 10;
        if (start >= cells.length) break;
        smpTotal += cleanNumber(cells[start], 0);
        utcTotal += cleanNumber(cells[start + 1], 0);
        ufundTotal += cleanNumber(cells[start + 3], 0);
        simTotal += cleanNumber(cells[start + 5], 0);
        filmTotal += cleanNumber(cells[start + 7], 0);
      }

      if (smpTotal > 0) {
        updatedStaff[matchedIdx].iphone.actualUnits = smpTotal;
        updatedStaff[matchedIdx].careIphone = { attached: utcTotal, total: smpTotal };
        updatedStaff[matchedIdx].ufund = { attached: ufundTotal, total: smpTotal };
        updatedStaff[matchedIdx].sim = { attached: simTotal, total: smpTotal };
        updatedStaff[matchedIdx].film = { attached: filmTotal, total: smpTotal };

        preview.push({
          'รหัส': updatedStaff[matchedIdx].staffId,
          'ชื่อ': updatedStaff[matchedIdx].name,
          'SMP รวม 31 วัน': smpTotal,
          'UTC+ รวม': `${utcTotal} (${((utcTotal / smpTotal) * 100).toFixed(1)}%)`,
          'UFUND รวม': `${ufundTotal}`,
          'SIM รวม': `${simTotal}`,
          'ฟิล์ม รวม': `${filmTotal}`,
        });
      }
    }
  }

  return {
    success: preview.length > 0,
    message: `อ่านข้อมูลตาราง 31 วันจาก Google Sheet สำเร็จ (${preview.length} คน)`,
    detectedType: 'pia_matrix',
    updatedStaffList: updatedStaff,
    updatedBranchData: { 
      staffList: updatedStaff,
      asOfDate: `${new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} (Sheet Sync)`,
    },
    previewRows: preview,
    rowCount: preview.length,
  };
}

/**
 * Generate formatted TSV text ready for Google Sheets paste
 */
export function generateGoogleSheetTsv(data: BranchDataState): string {
  const headers = [
    'รหัสพนักงาน',
    'ชื่อพนักงาน',
    'เป้าหมายยอดขาย (บาท)',
    'ยอดขายจริง (บาท)',
    '% ความสำเร็จ',
    'เครื่อง SMP',
    'แนบ UTC+ (เครื่อง)',
    '% UTC+',
    'แนบ UFUND',
    '% UFUND',
    'เปิด SIM',
    '% SIM',
    'ฟิล์ม',
    '% ฟิล์ม',
    'เครื่อง NB',
    'แนบ SanDisk',
  ];

  const rows = data.staffList.map(s => {
    const sActual = s.iphone.actualRevenue + s.ipad.actualRevenue + s.mac.actualRevenue + s.appleWatch.actualRevenue;
    const sTarget = s.iphone.targetRevenue + s.ipad.targetRevenue + s.mac.targetRevenue + s.appleWatch.targetRevenue;
    const achievePct = sTarget > 0 ? ((sActual / sTarget) * 100).toFixed(1) + '%' : '0%';
    const smp = s.iphone.actualUnits;
    const utcPct = smp > 0 ? ((s.careIphone.attached / smp) * 100).toFixed(1) + '%' : '0%';
    const ufundPct = smp > 0 ? ((s.ufund.attached / smp) * 100).toFixed(1) + '%' : '0%';
    const simPct = smp > 0 ? ((s.sim.attached / smp) * 100).toFixed(1) + '%' : '0%';
    const filmPct = smp > 0 ? ((s.film.attached / smp) * 100).toFixed(1) + '%' : '0%';
    const nb = s.mac.actualUnits;

    return [
      s.staffId,
      s.name,
      sTarget,
      sActual,
      achievePct,
      smp,
      s.careIphone.attached,
      utcPct,
      s.ufund.attached,
      ufundPct,
      s.sim.attached,
      simPct,
      s.film.attached,
      filmPct,
      nb,
      s.sandisk.attached,
    ].join('\t');
  });

  return [headers.join('\t'), ...rows].join('\n');
}
