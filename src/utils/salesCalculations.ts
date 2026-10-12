import { StaffInfo, StaffRecordsMap, KPITargets, StaffSummary, DailySummary } from '../types/sales';
import { KPI_TARGETS } from '../data/initialData';

export function calculateStaffSummary(
  staff: StaffInfo,
  records: StaffRecordsMap,
  maxDay: number = 31
): StaffSummary {
  const staffRecord = records[staff.id] || {};
  let totalSmp = 0;
  let totalNb = 0;
  let totalCustomers = 0;

  let totalUtcSmp = 0;
  let totalUfund = 0;
  let totalSim = 0;
  let totalFilm = 0;

  let totalTiCare = 0;
  let totalSocialCare = 0;
  let totalUtcGadget = 0;
  let totalSandisk = 0;

  for (let d = 1; d <= maxDay; d++) {
    const day = staffRecord[d];
    if (!day) continue;

    totalSmp += day.smp.smpUnits || 0;
    totalCustomers += day.smp.customersCount || 0;
    totalUtcSmp += day.smp.utcCount || 0;
    totalUfund += day.smp.ufundCount || 0;
    totalSim += day.smp.simCount || 0;
    totalFilm += day.smp.filmCount || 0;

    totalNb += day.nb.nbUnits || 0;
    totalTiCare += day.nb.tiCareCount || 0;
    totalSocialCare += day.nb.socialCareCount || 0;
    totalUtcGadget += day.nb.utcGadgetCount || 0;
    totalSandisk += day.nb.sandiskCount || 0;
  }

  const smpBase = totalSmp > 0 ? totalSmp : 0;
  const nbBase = totalNb > 0 ? totalNb : 0;

  return {
    staffId: staff.id,
    name: staff.name,
    totalSmp,
    totalNb,
    totalDevices: totalSmp + totalNb,
    totalCustomers,
    totalUtcSmp,
    utcSmpRate: smpBase > 0 ? (totalUtcSmp / smpBase) * 100 : 0,
    totalUfund,
    ufundRate: smpBase > 0 ? (totalUfund / smpBase) * 100 : 0,
    totalSim,
    simRate: smpBase > 0 ? (totalSim / smpBase) * 100 : 0,
    totalFilm,
    filmRate: smpBase > 0 ? (totalFilm / smpBase) * 100 : 0,
    totalTiCare,
    tiCareRate: nbBase > 0 ? (totalTiCare / nbBase) * 100 : 0,
    totalSocialCare,
    socialCareRate: nbBase > 0 ? (totalSocialCare / nbBase) * 100 : 0,
    totalUtcGadget,
    utcGadgetRate: nbBase > 0 ? (totalUtcGadget / nbBase) * 100 : 0,
    totalSandisk,
    sandiskRate: nbBase > 0 ? (totalSandisk / nbBase) * 100 : 0,
    conversionRate: totalCustomers > 0 ? ((totalSmp + totalNb) / totalCustomers) * 100 : 0,
  };
}

export function calculateStoreSummary(
  staffList: StaffInfo[],
  records: StaffRecordsMap,
  maxDay: number = 31
): StaffSummary {
  const staffSummaries = staffList.map(s => calculateStaffSummary(s, records, maxDay));

  let totalSmp = 0;
  let totalNb = 0;
  let totalCustomers = 0;
  let totalUtcSmp = 0;
  let totalUfund = 0;
  let totalSim = 0;
  let totalFilm = 0;
  let totalTiCare = 0;
  let totalSocialCare = 0;
  let totalUtcGadget = 0;
  let totalSandisk = 0;

  for (const s of staffSummaries) {
    totalSmp += s.totalSmp;
    totalNb += s.totalNb;
    totalCustomers += s.totalCustomers;
    totalUtcSmp += s.totalUtcSmp;
    totalUfund += s.totalUfund;
    totalSim += s.totalSim;
    totalFilm += s.totalFilm;
    totalTiCare += s.totalTiCare;
    totalSocialCare += s.totalSocialCare;
    totalUtcGadget += s.totalUtcGadget;
    totalSandisk += s.totalSandisk;
  }

  const smpBase = totalSmp > 0 ? totalSmp : 0;
  const nbBase = totalNb > 0 ? totalNb : 0;

  return {
    staffId: 'STORE_TOTAL',
    name: 'รวมทั้งสาขา',
    totalSmp,
    totalNb,
    totalDevices: totalSmp + totalNb,
    totalCustomers,
    totalUtcSmp,
    utcSmpRate: smpBase > 0 ? (totalUtcSmp / smpBase) * 100 : 0,
    totalUfund,
    ufundRate: smpBase > 0 ? (totalUfund / smpBase) * 100 : 0,
    totalSim,
    simRate: smpBase > 0 ? (totalSim / smpBase) * 100 : 0,
    totalFilm,
    filmRate: smpBase > 0 ? (totalFilm / smpBase) * 100 : 0,
    totalTiCare,
    tiCareRate: nbBase > 0 ? (totalTiCare / nbBase) * 100 : 0,
    totalSocialCare,
    socialCareRate: nbBase > 0 ? (totalSocialCare / nbBase) * 100 : 0,
    totalUtcGadget,
    utcGadgetRate: nbBase > 0 ? (totalUtcGadget / nbBase) * 100 : 0,
    totalSandisk,
    sandiskRate: nbBase > 0 ? (totalSandisk / nbBase) * 100 : 0,
    conversionRate: totalCustomers > 0 ? ((totalSmp + totalNb) / totalCustomers) * 100 : 0,
  };
}

export function calculateDailySummaries(
  staffList: StaffInfo[],
  records: StaffRecordsMap
): DailySummary[] {
  const summaries: DailySummary[] = [];

  for (let d = 1; d <= 31; d++) {
    let smpUnits = 0;
    let nbUnits = 0;
    let customersCount = 0;
    let utcSmpCount = 0;
    let ufundCount = 0;
    let simCount = 0;
    let filmCount = 0;
    let tiCareCount = 0;
    let socialCareCount = 0;
    let utcGadgetCount = 0;
    let sandiskCount = 0;
    let hasData = false;

    for (const s of staffList) {
      const dayRec = records[s.id]?.[d];
      if (!dayRec) continue;

      if (
        dayRec.smp.smpUnits > 0 ||
        dayRec.smp.utcCount > 0 ||
        dayRec.smp.ufundCount > 0 ||
        dayRec.smp.simCount > 0 ||
        dayRec.smp.filmCount > 0 ||
        dayRec.nb.nbUnits > 0 ||
        dayRec.nb.socialCareCount > 0 ||
        dayRec.nb.sandiskCount > 0 ||
        dayRec.nb.utcGadgetCount > 0
      ) {
        hasData = true;
      }

      smpUnits += dayRec.smp.smpUnits || 0;
      customersCount += dayRec.smp.customersCount || 0;
      utcSmpCount += dayRec.smp.utcCount || 0;
      ufundCount += dayRec.smp.ufundCount || 0;
      simCount += dayRec.smp.simCount || 0;
      filmCount += dayRec.smp.filmCount || 0;

      nbUnits += dayRec.nb.nbUnits || 0;
      tiCareCount += dayRec.nb.tiCareCount || 0;
      socialCareCount += dayRec.nb.socialCareCount || 0;
      utcGadgetCount += dayRec.nb.utcGadgetCount || 0;
      sandiskCount += dayRec.nb.sandiskCount || 0;
    }

    summaries.push({
      day: d,
      smpUnits,
      nbUnits,
      totalDevices: smpUnits + nbUnits,
      customersCount,
      utcSmpCount,
      utcSmpRate: smpUnits > 0 ? (utcSmpCount / smpUnits) * 100 : 0,
      ufundCount,
      ufundRate: smpUnits > 0 ? (ufundCount / smpUnits) * 100 : 0,
      simCount,
      simRate: smpUnits > 0 ? (simCount / smpUnits) * 100 : 0,
      filmCount,
      filmRate: smpUnits > 0 ? (filmCount / smpUnits) * 100 : 0,
      tiCareCount,
      tiCareRate: nbUnits > 0 ? (tiCareCount / nbUnits) * 100 : 0,
      socialCareCount,
      socialCareRate: nbUnits > 0 ? (socialCareCount / nbUnits) * 100 : 0,
      utcGadgetCount,
      utcGadgetRate: nbUnits > 0 ? (utcGadgetCount / nbUnits) * 100 : 0,
      sandiskCount,
      sandiskRate: nbUnits > 0 ? (sandiskCount / nbUnits) * 100 : 0,
      hasData,
    });
  }

  return summaries;
}

export function getKPIStatus(actual: number, target: number): {
  status: 'passed' | 'warning' | 'danger';
  color: string;
  bgLight: string;
  borderColor: string;
  diff: number;
} {
  const diff = actual - target;
  if (actual >= target) {
    return {
      status: 'passed',
      color: 'text-emerald-700',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      diff,
    };
  } else if (actual >= target - 10) {
    return {
      status: 'warning',
      color: 'text-amber-700',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
      diff,
    };
  } else {
    return {
      status: 'danger',
      color: 'text-rose-700',
      bgLight: 'bg-rose-50',
      borderColor: 'border-rose-200',
      diff,
    };
  }
}

export function generateLineSummaryText(
  day: number,
  staffList: StaffInfo[],
  records: StaffRecordsMap,
  storeSummary: StaffSummary,
  targets: KPITargets = KPI_TARGETS,
  revenueData?: import('../types/sales').BranchRevenueKPI
): string {
  const isMonthTotal = day === 0;

  if (isMonthTotal) {
    let text = `📢 【สรุปยอดขายสะสมทั้งเดือน (MTD) - สาขา PIA】\n`;
    if (revenueData) {
      text += `🏢 ${revenueData.branchName} (${revenueData.quarter})\n`;
      text += `💰 ยอดขายจริง: ${revenueData.actualRevenue.toLocaleString()} ฿\n`;
      text += `🎯 เป้าหมายรวม: ${revenueData.targetRevenue.toLocaleString()} ฿\n`;
      text += `📉 ขาดจากเป้า: ${revenueData.deficitRevenue.toLocaleString()} ฿\n`;
      text += `📈 % ความสำเร็จ: ${revenueData.achievementPercent}% (${revenueData.statusNote})\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📱 SMP รวม: ${storeSummary.totalSmp} เครื่อง\n`;
    text += `💻 NB รวม: ${storeSummary.totalNb} เครื่อง\n`;
    text += `📦 รวมอุปกรณ์ทั้งหมด: ${storeSummary.totalDevices} เครื่อง\n\n`;

    text += `🎯 KPI อัตราแนบ (เป้าหมาย vs ยอดจริง):\n`;
    text += `• UTC+ (SMP): ${storeSummary.totalUtcSmp} ชิ้น (${storeSummary.utcSmpRate.toFixed(1)}% / เป้า ${targets.utcSmp}%)\n`;
    text += `• UFund ผ่อน: ${storeSummary.totalUfund} สัญญา (${storeSummary.ufundRate.toFixed(1)}% / เป้า ${targets.ufund}%)\n`;
    text += `• SIM เปิดเบอร์: ${storeSummary.totalSim} ซิม (${storeSummary.simRate.toFixed(1)}% / เป้า ${targets.sim}%)\n`;
    text += `• ติดฟิล์ม: ${storeSummary.totalFilm} ชิ้น (${storeSummary.filmRate.toFixed(1)}% / เป้า ${targets.film}%)\n`;
    text += `• Social Care+ (NB): ${storeSummary.totalSocialCare} ชิ้น (${storeSummary.socialCareRate.toFixed(1)}% / เป้า ${targets.socialCare}%)\n`;
    text += `• UTC+ Gadget: ${storeSummary.totalUtcGadget} ชิ้น (${storeSummary.utcGadgetRate.toFixed(1)}% / เป้า ${targets.utcGadget}%)\n`;
    text += `• SanDisk: ${storeSummary.totalSandisk} ชิ้น (${storeSummary.sandiskRate.toFixed(1)}% / เป้า ${targets.sandisk}%)\n\n`;

    text += `🏆 ยอดขายสะสมรายบุคคล (SMP + NB):\n`;
    const sorted = [...staffList]
      .map(s => calculateStaffSummary(s, records))
      .sort((a, b) => b.totalDevices - a.totalDevices);

    sorted.forEach((s, idx) => {
      text += `${idx + 1}. ${s.name} (${s.staffId}): SMP ${s.totalSmp} | NB ${s.totalNb} (รวม ${s.totalDevices} เครื่อง) | UTC+ ${s.utcSmpRate.toFixed(0)}%\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `สร้างรายงานอัตโนมัติจากระบบติดตามยอดขายสาขา`;
    return text;
  }

  // Daily text
  let daySmp = 0;
  let dayNb = 0;
  let dayUtcSmp = 0;
  let dayUfund = 0;
  let daySim = 0;
  let dayFilm = 0;
  let daySocialCare = 0;
  let dayUtcGadget = 0;
  let daySandisk = 0;

  const staffDayList = staffList.map(s => {
    const rec = records[s.id]?.[day];
    const smp = rec?.smp.smpUnits || 0;
    const nb = rec?.nb.nbUnits || 0;
    const utcSmp = rec?.smp.utcCount || 0;
    const ufund = rec?.smp.ufundCount || 0;
    const sim = rec?.smp.simCount || 0;
    const film = rec?.smp.filmCount || 0;
    const socialCare = rec?.nb.socialCareCount || 0;
    const utcGadget = rec?.nb.utcGadgetCount || 0;
    const sandisk = rec?.nb.sandiskCount || 0;

    daySmp += smp;
    dayNb += nb;
    dayUtcSmp += utcSmp;
    dayUfund += ufund;
    daySim += sim;
    dayFilm += film;
    daySocialCare += socialCare;
    dayUtcGadget += utcGadget;
    daySandisk += sandisk;

    return {
      name: s.name,
      id: s.id,
      smp,
      nb,
      total: smp + nb,
      utcSmp,
      ufund,
      sim,
      film,
    };
  }).sort((a, b) => b.total - a.total);

  const utcSmpPct = daySmp > 0 ? (dayUtcSmp / daySmp) * 100 : 0;
  const ufundPct = daySmp > 0 ? (dayUfund / daySmp) * 100 : 0;
  const simPct = daySmp > 0 ? (daySim / daySmp) * 100 : 0;
  const filmPct = daySmp > 0 ? (dayFilm / daySmp) * 100 : 0;

  let text = `📊 【รายงานยอดขายประจำวันที่ ${day}】\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📱 ยอดขาย SMP: ${daySmp} เครื่อง\n`;
  text += `💻 ยอดขาย NB: ${dayNb} เครื่อง\n`;
  text += `📦 ยอดรวมเครื่อง: ${daySmp + dayNb} เครื่อง\n\n`;

  text += `🎯 อัตราแนบวันนี้ (Attach Rate):\n`;
  text += `• UTC+ (SMP): ${dayUtcSmp} ชิ้น (${utcSmpPct.toFixed(1)}% / เป้า ${targets.utcSmp}%)\n`;
  text += `• UFund ผ่อน: ${dayUfund} ราย (${ufundPct.toFixed(1)}% / เป้า ${targets.ufund}%)\n`;
  text += `• Sim: ${daySim} ซิม (${simPct.toFixed(1)}% / เป้า ${targets.sim}%)\n`;
  text += `• ติดฟิล์ม: ${dayFilm} ชิ้น (${filmPct.toFixed(1)}% / เป้า ${targets.film}%)\n`;
  if (daySocialCare > 0) text += `• Social Care+: ${daySocialCare} ชิ้น\n`;
  if (dayUtcGadget > 0) text += `• UTC+ Gadget: ${dayUtcGadget} ชิ้น\n`;
  if (daySandisk > 0) text += `• SanDisk: ${daySandisk} ชิ้น\n`;

  text += `\n👤 ยอดขายแยกรายบุคคล วันที่ ${day}:\n`;
  staffDayList.forEach((s, idx) => {
    text += `${idx + 1}. ${s.name}: SMP ${s.smp} | NB ${s.nb} | UTC+ ${s.utcSmp} | ฟิล์ม ${s.film}\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `สรุปยอดประจำวันเรียบร้อยครับ/ค่ะ ✨`;
  return text;
}
