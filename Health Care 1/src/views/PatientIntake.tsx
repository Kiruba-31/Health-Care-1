import { useState } from 'react';
import type { Patient } from '../data/patients';

const ALL_SYMPTOMS = [
  'Retrosternal chest pain', 'Radiating left arm pain', 'Diaphoresis', 'Dyspnea',
  'Nausea', 'Jaw pain', 'Fever / Rigors', 'Productive cough', 'Dysuria',
  'Flank pain', 'Confusion', 'Hypotension', 'Orthopnea',
  'Bilateral leg edema', 'Paroxysmal nocturnal dyspnea', 'Fatigue', 'Reduced urine output',
];

function Slider({ label, unit, value, min, max, step, onChange, criticalAbove, warnAbove }: {
  label: string; unit: string; value: number;
  min: number; max: number; step: number;
  onChange: (v: number) => void;
  criticalAbove?: number; warnAbove?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const color = criticalAbove && value > criticalAbove ? '#f43f5e'
    : warnAbove && value > warnAbove ? '#f59e0b' : '#0ea5e9';
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#94a3b8]">{label}</span>
        <span className="font-mono text-sm font-semibold" style={{ color }}>
          {value} <span className="text-[#64748b] text-xs font-normal">{unit}</span>
        </span>
      </div>
      <div className="relative h-1.5 bg-[#1e2d45] rounded-full">
        <div className="absolute h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#64748b]">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

export default function PatientIntake({ patient }: { patient: Patient }) {
  const [sbp, setSbp] = useState(Number(patient.vitals.bp.value.split('/')[0]));
  const [dbp, setDbp] = useState(Number(patient.vitals.bp.value.split('/')[1]));
  const [hr, setHr] = useState(Number(patient.vitals.hr.value));
  const [spo2, setSpo2] = useState(Number(patient.vitals.spo2.value));
  const [troponin, setTroponin] = useState(8.42);
  const [wbc, setWbc] = useState(11.2);
  const [creatinine, setCreatinine] = useState(1.6);
  const [lactate, setLactate] = useState(3.8);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set(patient.symptoms));
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setCalculated(true); }, 1800);
  };

  const riskScore = Math.min(
    Math.round(
      (sbp < 90 ? 25 : sbp < 110 ? 15 : 0) +
      (hr > 120 ? 20 : hr > 100 ? 12 : 0) +
      (spo2 < 90 ? 20 : spo2 < 94 ? 10 : 0) +
      (troponin > 4 ? 20 : troponin > 0.5 ? 10 : 0) +
      (lactate > 4 ? 15 : lactate > 2 ? 8 : 0) +
      (selectedSymptoms.size * 2)
    ), 100
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Hemodynamics */}
        <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-[#94a3b8]">Hemodynamic Parameters</h3>
          <Slider label="Systolic BP" unit="mmHg" value={sbp} min={60} max={200} step={1} onChange={setSbp} criticalAbove={180} warnAbove={130} />
          <Slider label="Diastolic BP" unit="mmHg" value={dbp} min={40} max={130} step={1} onChange={setDbp} criticalAbove={110} warnAbove={90} />
          <Slider label="Heart Rate" unit="bpm" value={hr} min={30} max={200} step={1} onChange={setHr} criticalAbove={150} warnAbove={100} />
          <Slider label="SpO₂" unit="%" value={spo2} min={70} max={100} step={1} onChange={setSpo2} criticalAbove={100} warnAbove={94} />
        </div>

        {/* Biomarkers */}
        <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-[#94a3b8]">Biomarker Panel</h3>
          <Slider label="Cardiac Troponin I" unit="ng/mL" value={troponin} min={0} max={20} step={0.01} onChange={setTroponin} criticalAbove={1} warnAbove={0.04} />
          <Slider label="WBC Count" unit="k/µL" value={wbc} min={1} max={30} step={0.1} onChange={setWbc} criticalAbove={20} warnAbove={11} />
          <Slider label="Serum Creatinine" unit="mg/dL" value={creatinine} min={0.4} max={10} step={0.01} onChange={setCreatinine} criticalAbove={4} warnAbove={1.3} />
          <Slider label="Blood Lactate" unit="mmol/L" value={lactate} min={0.5} max={15} step={0.1} onChange={setLactate} criticalAbove={4} warnAbove={2} />
        </div>
      </div>

      {/* Symptom Selector */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">Clinical Symptom Checklist</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SYMPTOMS.map(s => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                selectedSymptoms.has(s)
                  ? 'bg-[#0ea5e9]/15 border-[#0ea5e9]/40 text-[#0ea5e9]'
                  : 'bg-[#1a2236] border-[#1e2d45] text-[#94a3b8] hover:border-[#0ea5e9]/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-[#64748b]">{selectedSymptoms.size} symptom(s) selected</div>
      </div>

      {/* Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-[#0ea5e9]/40 text-white font-semibold rounded-lg transition-all text-sm"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              Recalculating CDSS Inference...
            </>
          ) : (
            'Recalculate CDSS Inference & Risk Scores'
          )}
        </button>
      </div>

      {/* Result */}
      {calculated && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`bg-[#111827] border rounded-xl p-4 ${riskScore >= 60 ? 'border-rose-500/40' : riskScore >= 30 ? 'border-amber-500/40' : 'border-emerald-500/40'}`}>
            <div className="text-xs text-[#64748b] mb-1">Composite Risk Score</div>
            <div className={`font-mono text-4xl font-bold ${riskScore >= 60 ? 'text-rose-400' : riskScore >= 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {riskScore}<span className="text-lg text-[#64748b]">/100</span>
            </div>
            <div className="text-xs mt-2 text-[#94a3b8]">
              {riskScore >= 60 ? '⚠ CRITICAL — Immediate intervention required' : riskScore >= 30 ? '⚡ ELEVATED — Close monitoring advised' : '✓ Low risk'}
            </div>
          </div>
          <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
            <div className="text-xs text-[#64748b] mb-2">Updated MAP Estimate</div>
            <div className="font-mono text-2xl font-bold text-[#0ea5e9]">
              {Math.round((sbp + 2 * dbp) / 3)} <span className="text-sm text-[#64748b]">mmHg</span>
            </div>
            <div className="text-xs text-[#94a3b8] mt-2">
              {Math.round((sbp + 2 * dbp) / 3) < 65 ? '🔴 Below perfusion threshold (<65 mmHg)' : 'Within perfusion range'}
            </div>
          </div>
          <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
            <div className="text-xs text-[#64748b] mb-2">Inferred Priority Pathway</div>
            <div className="text-sm font-semibold text-[#0ea5e9]">
              {troponin > 1 ? 'STEMI Protocol + Cath Lab' : lactate > 4 ? 'Sepsis Bundle + ICU' : spo2 < 90 ? 'Respiratory Support' : 'Monitoring + Reassess'}
            </div>
            <div className="text-xs text-[#94a3b8] mt-2">{selectedSymptoms.size} symptoms correlated</div>
          </div>
        </div>
      )}
    </div>
  );
}
