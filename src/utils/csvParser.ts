import { StaffInfo, StaffRecordsMap, DaySMPRecord, DayNBRecord } from '../types/sales';
import { createEmptyDayRecord } from '../data/initialData';

/**
 * Robust CSV parser that parses PIA 31-day sales format.
 * Supports standard CSV with quotes, commas, BOM, CRLF/LF line endings.
 */
export function parsePIAExportedCsv(csvText: string, staffList: StaffInfo[]): {
  success: boolean;
  records?: StaffRecordsMap;
  message?: string;
} {
  try {
    // Remove BOM if present
    const cleanText = csvText.replace(/^\uFEFF/, '').trim();
    if (!cleanText) {
      return { success: false, message: 'ไฟล์หรือข้อความว่างเปล่า' };
    }

    const lines = cleanText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 3) {
      return { success: false, message: 'ข้อมูลมีจำนวนแถวน้อยเกินไป ไม่ตรงตามรูปแบบตาราง PIA 31 วัน' };
    }

    // Split CSV line handling quotes
    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    // Initialize blank records for staff
    const records: StaffRecordsMap = {};
    for (const staff of staffList) {
      records[staff.id] = {};
      for (let d = 1; d <= 31; d++) {
        records[staff.id][d] = createEmptyDayRecord();
      }
    }

    let isParsingNB = false;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const cells = parseLine(line);
      const col0 = cells[0] || '';
      const col1 = cells[1] || '';

      // Check header switch
      if (col0.toUpperCase().includes('PIA') && col1.includes('เครื่อง NB')) {
        isParsingNB = true;
        continue;
      }

      // Check if this is a staff row (staff ID or known name)
      const matchedStaff = staffList.find(s => s.id === col0 || s.name === col1 || s.id === col1);
      if (!matchedStaff) {
        continue;
      }

      const staffId = matchedStaff.id;

      if (!isParsingNB) {
        // Parsing SMP row: each day has 10 columns starting at index 2
        // [smp, utc, utcPct, ufund, ufundPct, sim, simPct, film, filmPct, cust]
        for (let d = 1; d <= 31; d++) {
          const startIndex = 2 + (d - 1) * 10;
          if (startIndex >= cells.length) break;

          const smpUnits = parseInt(cells[startIndex] || '0', 10) || 0;
          const utcCount = parseInt(cells[startIndex + 1] || '0', 10) || 0;
          const ufundCount = parseInt(cells[startIndex + 3] || '0', 10) || 0;
          const simCount = parseInt(cells[startIndex + 5] || '0', 10) || 0;
          const filmCount = parseInt(cells[startIndex + 7] || '0', 10) || 0;
          const customersCount = parseInt(cells[startIndex + 9] || '0', 10) || 0;

          records[staffId][d].smp = {
            smpUnits,
            utcCount,
            ufundCount,
            simCount,
            filmCount,
            customersCount,
          };
        }
      } else {
        // Parsing NB row: each day has 9 columns starting at index 2
        // [nb, ti, tiPct, sc, scPct, utcGadget, utcGpct, sandisk, sdPct]
        for (let d = 1; d <= 31; d++) {
          const startIndex = 2 + (d - 1) * 9;
          if (startIndex >= cells.length) break;

          const nbUnits = parseInt(cells[startIndex] || '0', 10) || 0;
          const tiCareCount = parseInt(cells[startIndex + 1] || '0', 10) || 0;
          const socialCareCount = parseInt(cells[startIndex + 3] || '0', 10) || 0;
          const utcGadgetCount = parseInt(cells[startIndex + 5] || '0', 10) || 0;
          const sandiskCount = parseInt(cells[startIndex + 7] || '0', 10) || 0;

          records[staffId][d].nb = {
            nbUnits,
            tiCareCount,
            socialCareCount,
            utcGadgetCount,
            sandiskCount,
          };
        }
      }
    }

    return {
      success: true,
      records,
      message: 'นำเข้าข้อมูลยอดขายทั้ง 31 วันเรียบร้อยแล้ว',
    };
  } catch (err) {
    return {
      success: false,
      message: `เกิดข้อผิดพลาดในการประมวลผลไฟล์: ${(err as Error).message}`,
    };
  }
}
