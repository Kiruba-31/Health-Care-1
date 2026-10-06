import { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { Patient } from '../data/patients';

const STATUS_COLORS: Record<string, string> = {
  normal: '#10b981',
  elevated: '#f59e0b',
  critical: '#f43f5e',
};

const STATUS_BG: Record<string, string> = {
  normal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  elevated: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

function SparkLine({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
}

function GaugeMeter({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(value / max, 1);
  const r = 40;
  const cx = 55, cy = 55;
  const startAngle = 210;
  const totalAngle = 300;
  const angle = startAngle + pct * totalAngle;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arc = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg - 90)),
    y: cy + r * Math.sin(toRad(deg - 90)),
  });
  const s = arc(startAngle);
  const e = arc(angle);
  const largeArc = pct * totalAngle > 180 ? 1 : 0;
  const bg = arc(startAngle + totalAngle);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={110} height={80} viewBox="0 0 110 110">
        <path
          d={`M ${s.x} ${s.y} A ${r} ${r} 0 1 1 ${bg.x} ${bg.y}`}
          fill="none" stroke="#1e2d45" strokeWidth="8" strokeLinecap="round"
        />
        {pct > 0 && (
          <path
            d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`}
            fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          />
        )}
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="16" fontWeight="700" fill={color} fontFamily="JetBrains Mono">
          {value}/{max}
        </text>
      </svg>
      <span className="text-xs text-[#64748b] font-medium">{label}</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a2236] border border-[#1e2d45] rounded px-3 py-2 text-xs space-y-1">
      <div className="text-[#94a3b8] font-medium mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ClinicalOverview({ patient }: { patient: Patient }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-5">
      {/* Patient Header Banner */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-[#e2e8f0]">{patient.name}</h2>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                {patient.codeStatus}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#94a3b8]">
              <span><span className="text-[#64748b]">MRN</span> <span className="font-mono text-[#e2e8f0]">{patient.mrn}</span></span>
              <span><span className="text-[#64748b]">Age</span> <span className="text-[#e2e8f0]">{patient.age}y</span></span>
              <span><span className="text-[#64748b]">Sex</span> <span className="text-[#e2e8f0]">{patient.sex}</span></span>
              <span><span className="text-[#64748b]">BG</span> <span className="text-[#e2e8f0]">{patient.bloodGroup}</span></span>
              <span><span className="text-[#64748b]">Ht/Wt</span> <span className="text-[#e2e8f0]">{patient.height} / {patient.weight}</span></span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#64748b]">Attending</div>
            <div className="text-sm font-medium text-[#0ea5e9]">{patient.attending}</div>
            <div className="text-xs text-[#94a3b8] mt-1">
              Allergies: {' '}
              {patient.allergies.map(a => (
                <span key={a} className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-xs mr-1">{a}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#1e2d45]">
          <span className="text-xs text-[#64748b]">Primary Diagnosis: </span>
          <span className="text-sm font-semibold text-[#0ea5e9]">{patient.diagnosis}</span>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.values(patient.vitals).map(vital => (
          <div key={vital.label} className="bg-[#111827] border border-[#1e2d45] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#64748b]">{vital.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold uppercase tracking-wide ${STATUS_BG[vital.status]}`}>
                {vital.status}
              </span>
            </div>
            <div className="font-mono text-2xl font-bold" style={{ color: STATUS_COLORS[vital.status] }}>
              {vital.value}
              <span className="text-xs font-normal text-[#64748b] ml-1">{vital.unit}</span>
            </div>
            <div className="text-[11px] text-[#64748b] mt-1">Baseline: {vital.baseline} {vital.unit}</div>
            <div className="mt-2">
              <SparkLine data={vital.trend} color={STATUS_COLORS[vital.status]} />
            </div>
          </div>
        ))}
      </div>

      {/* Risk Gauges + Hemodynamic Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4 flex flex-col items-center justify-center gap-4">
          <h3 className="text-sm font-semibold text-[#94a3b8] self-start">Risk Stratification</h3>
          <div className="flex gap-6 flex-wrap justify-center">
            <GaugeMeter label="qSOFA Score" value={patient.qsofa} max={3} color={patient.qsofa >= 2 ? '#f43f5e' : '#f59e0b'} />
            <GaugeMeter label="TIMI Risk Index" value={patient.timi} max={10} color={patient.timi >= 6 ? '#f43f5e' : patient.timi >= 4 ? '#f59e0b' : '#10b981'} />
          </div>
          <div className="w-full space-y-2 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              <span className="text-[#64748b]">qSOFA ≥2 → High sepsis risk — ICU review</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              <span className="text-[#64748b]">TIMI ≥6 → High cardiac mortality risk</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#94a3b8] mb-4">24-Hour Hemodynamic Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={patient.hemodynamicTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradMap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradHr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSpo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              <Area type="monotone" dataKey="map" name="MAP (mmHg)" stroke="#0ea5e9" fill="url(#gradMap)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="hr" name="HR (bpm)" stroke="#f43f5e" fill="url(#gradHr)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="spo2" name="SpO₂ (%)" stroke="#10b981" fill="url(#gradSpo2)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Symptoms */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">Reported Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {patient.symptoms.map(s => (
            <span key={s} className="px-3 py-1 rounded-full bg-[#1a2236] border border-[#1e2d45] text-sm text-[#e2e8f0]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
