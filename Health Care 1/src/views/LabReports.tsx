import type { Patient, LabResult } from '../data/patients';

type Status = 'normal' | 'elevated' | 'critical' | 'low';

const STATUS_STYLES: Record<Status, string> = {
  normal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  elevated: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse',
  low: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

const STATUS_LABELS: Record<Status, string> = {
  normal: 'NORMAL',
  elevated: 'HIGH ↑',
  critical: 'CRITICAL ↑↑',
  low: 'LOW ↓',
};

const ECG_PATH = `
M 0 50 L 20 50 L 25 45 L 30 55 L 35 20 L 40 80 L 45 50 L 55 50
L 60 50 L 65 45 L 70 55 L 75 20 L 80 80 L 85 50 L 95 50
L 100 50 L 105 45 L 110 55 L 115 20 L 120 80 L 125 50 L 135 50
L 140 50 L 145 45 L 150 55 L 155 20 L 160 80 L 165 50 L 175 50
L 180 50 L 185 45 L 190 55 L 195 20 L 200 80 L 205 50 L 215 50
L 220 50 L 225 45 L 230 55 L 235 20 L 240 80 L 245 50 L 260 50
`;

function ECGStrip() {
  return (
    <div className="bg-[#0d1a10] border border-emerald-900/40 rounded-xl p-4 overflow-hidden relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-emerald-400">12-Lead ECG Digital Strip — Automated Analysis</h3>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">LIVE</span>
      </div>
      {/* Grid background */}
      <div className="relative h-24 overflow-hidden mb-2">
        <svg width="100%" height="96" viewBox="0 0 260 96" preserveAspectRatio="none">
          <defs>
            <pattern id="ecgGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#14532d" strokeWidth="0.3" />
            </pattern>
            <pattern id="ecgGridBig" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#ecgGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#166534" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ecgGridBig)" />
          <polyline fill="none" stroke="#22c55e" strokeWidth="1.5" points={ECG_PATH.trim().replace(/\n/g, ' ').replace(/[ML]\s/g, '').split('L ').slice(1).map(p => p.trim()).join(' ')} />
          <path d={ECG_PATH} fill="none" stroke="#22c55e" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-rose-300 font-semibold">Sinus Tachycardia — Rate: 112 bpm</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-300">2.5 mm ST-segment elevation in Leads V2–V4</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-300">T-wave inversion in aVL — Reciprocal changes in II, III, aVF</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[#94a3b8]">QRS complex: 88 ms (normal) · QTc: 442 ms (borderline)</span>
        </div>
        <div className="mt-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded text-xs text-rose-300 font-medium">
          ⚠ ECG Impression: Acute Anteroseptal ST-Elevation MI (STEMI) — Cath Lab activation recommended per ACC/AHA STEMI guidelines
        </div>
      </div>
    </div>
  );
}

function LabTable({ group, results }: { group: string; results: LabResult[] }) {
  return (
    <div className="bg-[#111827] border border-[#1e2d45] rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-[#1a2236] border-b border-[#1e2d45]">
        <h3 className="text-sm font-semibold text-[#94a3b8]">{group}</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] text-[#64748b] uppercase tracking-widest border-b border-[#1e2d45]">
            <th className="text-left px-4 py-2 font-medium">Parameter</th>
            <th className="text-right px-4 py-2 font-medium font-mono">Value</th>
            <th className="text-right px-4 py-2 font-medium">Reference</th>
            <th className="text-center px-4 py-2 font-medium">Status</th>
            <th className="text-right px-4 py-2 font-medium">Collected</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#162032]">
          {results.map(r => (
            <tr key={r.parameter} className="hover:bg-[#1a2236]/50 transition-colors">
              <td className="px-4 py-2.5 text-[#e2e8f0]">{r.parameter}</td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-[#e2e8f0]">
                {r.value} <span className="text-[#64748b] text-xs font-normal">{r.unit}</span>
              </td>
              <td className="px-4 py-2.5 text-right text-[#64748b] font-mono text-xs">{r.reference}</td>
              <td className="px-4 py-2.5 text-center">
                <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${STATUS_STYLES[r.status as Status]}`}>
                  {STATUS_LABELS[r.status as Status]}
                </span>
              </td>
              <td className="px-4 py-2.5 text-right text-[#64748b] font-mono text-xs">{r.collected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LabReports({ patient }: { patient: Patient }) {
  const groups = Array.from(new Set(patient.labs.map(l => l.group)));
  return (
    <div className="space-y-5">
      <ECGStrip />
      {groups.map(g => (
        <LabTable key={g} group={g} results={patient.labs.filter(l => l.group === g)} />
      ))}
    </div>
  );
}
