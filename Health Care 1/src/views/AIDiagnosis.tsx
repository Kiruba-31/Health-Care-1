import { useState } from 'react';
import type { Patient } from '../data/patients';

interface Diagnosis {
  rank: number;
  condition: string;
  confidence: number;
  icd: string;
  supporting: string[];
  ruleOut: string[];
  color: string;
}

interface Drug {
  name: string;
  dose: string;
  route: string;
  warning?: string;
}

interface Protocol {
  title: string;
  steps: string[];
  urgency: 'immediate' | 'urgent' | 'routine';
  reference: string;
}

const PATIENT_DATA: Record<string, { diagnoses: Diagnosis[]; drugs: Drug[]; protocols: Protocol[]; allergyWarning?: string }> = {
  'pt-001': {
    diagnoses: [
      {
        rank: 1, condition: 'Acute Anteroseptal STEMI', confidence: 94, icd: 'I21.09', color: '#f43f5e',
        supporting: ['Troponin I 8.42 ng/mL (>200× ULN)', 'ST-elevation ≥2.5mm in V2–V4', 'CK-MB 142 U/L elevated', 'Classic chest pain radiation pattern', 'Diaphoresis + jaw pain presentation', 'TIMI score 7/10 (high risk)'],
        ruleOut: ['Aortic dissection (no pulse differential, BP symmetric)', 'Pulmonary embolism (no S1Q3T3 pattern on ECG)', 'Pericarditis (elevation not concave, no PR depression)'],
      },
      {
        rank: 2, condition: 'Cardiogenic Shock', confidence: 72, icd: 'R57.0', color: '#f59e0b',
        supporting: ['MAP 69 mmHg (below 70 threshold)', 'SpO₂ 91% on room air', 'BNP 680 pg/mL elevated', 'Tachycardia HR 112 bpm'],
        ruleOut: ['Hypovolemic shock (no bleeding source identified)', 'Distributive shock (lactate 3.8, borderline — confirm sepsis markers)'],
      },
      {
        rank: 3, condition: 'Acute Kidney Injury (AKI Stage 1)', confidence: 55, icd: 'N17.9', color: '#8b5cf6',
        supporting: ['Creatinine 1.6 mg/dL (baseline 0.9)', 'BUN 28 elevated', 'Reduced renal perfusion from low MAP'],
        ruleOut: ['CKD exacerbation (insufficient prior labs to confirm)', 'Contrast nephropathy (no recent contrast use)'],
      },
    ],
    drugs: [
      { name: 'Aspirin (Acetylsalicylic acid)', dose: '325 mg', route: 'PO (loading)', warning: undefined },
      { name: 'Ticagrelor', dose: '180 mg', route: 'PO (loading)', warning: undefined },
      { name: 'Heparin UFH', dose: '60 U/kg IV bolus, 12 U/kg/hr infusion', route: 'IV', warning: undefined },
      { name: 'Nitroglycerin', dose: 'HOLD', route: '—', warning: 'CONTRAINDICATED: BP 88/60 mmHg — severe hypotension. Nitrate use prohibited. Risk of fatal hemodynamic collapse.' },
      { name: 'Morphine Sulfate', dose: 'CAUTION 2–4 mg PRN', route: 'IV', warning: 'CAUTION: May mask ischemia symptoms; limited evidence in STEMI. Use cautiously.' },
      { name: 'Metoprolol', dose: 'HOLD until hemodynamic stabilization', route: '—', warning: 'CAUTION: Active cardiogenic shock — hold beta-blocker until MAP >70 mmHg.' },
    ],
    protocols: [
      {
        title: 'Emergency Cardiac Catheterization Lab Activation', urgency: 'immediate',
        steps: [
          'Activate cath lab via code STEMI — target door-to-balloon ≤90 minutes',
          'Primary PCI preferred over thrombolysis per ACC/AHA 2023 STEMI Guidelines',
          'Obtain 12-lead ECG every 15 min until cath lab handoff',
          'Place 2 large-bore IVs (18G+), draw full cardiac panel, blood type & cross-match',
          'NPO immediately; anesthesia consult for possible intubation support',
        ],
        reference: 'ACC/AHA 2023 STEMI Guideline — Class I Recommendation (LOE A)',
      },
      {
        title: 'Dual Antiplatelet Therapy (DAPT)', urgency: 'immediate',
        steps: [
          'Aspirin 325 mg loading PO immediately (if no allergy — verify penicillin allergy only, not salicylate)',
          'Ticagrelor 180 mg PO loading (preferred over clopidogrel per PLATO trial data)',
          'Confirm penicillin allergy does not extend to ASA — chart review performed',
          'Continue maintenance: ASA 81 mg daily + Ticagrelor 90 mg BID × 12 months post-PCI',
        ],
        reference: 'ACC/AHA 2023 STEMI · ESC 2023 · PLATO Trial (NEJM 2009)',
      },
      {
        title: 'Oxygenation & Hemodynamic Support', urgency: 'urgent',
        steps: [
          'Supplemental O₂ via high-flow mask (FiO₂ 0.50) — target SpO₂ ≥94%',
          'Vasopressor support: Norepinephrine 0.1–0.3 mcg/kg/min if MAP <65 mmHg persists',
          'IABP (Intra-Aortic Balloon Pump) consult if cardiogenic shock confirmed post-PCI',
          'Continuous hemodynamic monitoring: arterial line + central venous access',
        ],
        reference: 'ESC 2021 Cardiogenic Shock · IABP-SHOCK II Trial',
      },
    ],
    allergyWarning: 'Patient allergic to Penicillin — Beta-lactam antibiotics contraindicated. If antibiotics required, use Azithromycin or Fluoroquinolone. Sulfonamide allergy noted — avoid Trimethoprim-Sulfamethoxazole.',
  },
  'pt-002': {
    diagnoses: [
      {
        rank: 1, condition: 'Septic Shock — Urosepsis', confidence: 91, icd: 'A41.9', color: '#f43f5e',
        supporting: ['qSOFA 3/3 (maximum score)', 'Procalcitonin 48.2 ng/mL (severe elevation)', 'Lactate 5.1 mmol/L (>4 = shock threshold)', 'WBC 18.6 k/µL', 'Fever 39.4°C + rigors', 'MAP 57 mmHg'],
        ruleOut: ['Bacterial meningitis (no nuchal rigidity, LP not performed)', 'Pneumonia (productive cough noted — blood culture pending)'],
      },
      {
        rank: 2, condition: 'Acute Kidney Injury (AKI Stage 2)', confidence: 82, icd: 'N17.9', color: '#f59e0b',
        supporting: ['Creatinine 2.8 mg/dL (↑ from baseline)', 'Low urine output reported', 'Reduced renal perfusion from septic shock'],
        ruleOut: ['CKD (acute presentation, baseline creatinine needed)'],
      },
      {
        rank: 3, condition: 'Thrombocytopenia (DIC precursor)', confidence: 48, icd: 'D69.6', color: '#8b5cf6',
        supporting: ['Platelets 88 k/µL (markedly reduced)', 'High WBC + high inflammatory markers'],
        ruleOut: ['Primary hematologic disorder (no prior thrombocytopenia history)'],
      },
    ],
    drugs: [
      { name: 'Piperacillin-Tazobactam', dose: '4.5g q6h', route: 'IV', warning: 'CAUTION: Cephalosporin allergy noted. Cross-reactivity with penicillin-class rare but possible — confirm no penicillin allergy extension before administration.' },
      { name: 'Vancomycin', dose: '25–30 mg/kg loading IV', route: 'IV', warning: undefined },
      { name: 'Norepinephrine', dose: '0.1–0.5 mcg/kg/min titrated', route: 'IV (central)', warning: undefined },
      { name: 'Hydrocortisone', dose: '200 mg/day continuous infusion', route: 'IV', warning: undefined },
    ],
    protocols: [
      {
        title: 'Surviving Sepsis Bundle (Hour-1)', urgency: 'immediate',
        steps: [
          'Obtain blood cultures (×2 sets) before antibiotic administration',
          'Administer broad-spectrum antibiotics within 1 hour of sepsis recognition',
          'Initiate 30 mL/kg crystalloid (0.9% NaCl or Lactated Ringer\'s) for fluid resuscitation',
          'Vasopressors (Norepinephrine) if MAP <65 mmHg after fluid challenge',
          'Measure serum lactate — repeat in 2 hours if initial >2 mmol/L',
        ],
        reference: 'Surviving Sepsis Campaign 2021 International Guidelines (SSCG 2021)',
      },
    ],
    allergyWarning: 'Cephalosporin allergy: Avoid Cefazolin, Ceftriaxone, and all cephalosporins. Use Piperacillin-Tazobactam (verify penicillin tolerance) or Aztreonam + Vancomycin. NSAID allergy — avoid ketorolac, ibuprofen for antipyresis; use Acetaminophen only.',
  },
  'pt-003': {
    diagnoses: [
      {
        rank: 1, condition: 'Acute Decompensated Heart Failure (ADHF)', confidence: 88, icd: 'I50.9', color: '#f43f5e',
        supporting: ['BNP 2840 pg/mL (markedly elevated)', 'Bilateral leg edema + orthopnea', 'SpO₂ 89% on room air', 'Respiratory rate 26 bpm', 'Hypertensive crisis BP 162/104'],
        ruleOut: ['Pulmonary embolism (no DVT exam, D-dimer normal)', 'Pneumonia (no fever, WBC normal)'],
      },
      {
        rank: 2, condition: 'Cardiorenal Syndrome Type 1', confidence: 76, icd: 'N18.9', color: '#f59e0b',
        supporting: ['Creatinine 3.2 mg/dL', 'eGFR 22 mL/min (Stage 4 CKD equivalent)', 'BUN 62 mg/dL (azotemia)', 'Low MAP contributing to reduced renal perfusion'],
        ruleOut: ['Primary CKD (acute on chronic likely given presentation)'],
      },
      {
        rank: 3, condition: 'Hypertensive Emergency', confidence: 65, icd: 'I16.1', color: '#8b5cf6',
        supporting: ['BP 162/104 mmHg', 'End-organ damage: renal (Cr 3.2), cardiac (BNP 2840)'],
        ruleOut: ['Hypertensive urgency (end-organ damage present → emergency not urgency)'],
      },
    ],
    drugs: [
      { name: 'Furosemide (IV)', dose: '80 mg IV bolus then 10 mg/hr infusion', route: 'IV', warning: 'CAUTION: Monitor renal function closely — creatinine 3.2 mg/dL. Avoid aggressive diuresis causing AKI worsening.' },
      { name: 'Nitroglycerin', dose: '5–200 mcg/min IV titrated', route: 'IV infusion', warning: undefined },
      { name: 'Aspirin', dose: 'HOLD', route: '—', warning: 'CONTRAINDICATED: Patient has documented Aspirin allergy. Do not administer. Use alternative antiplatelet if required.' },
    ],
    protocols: [
      {
        title: 'ADHF Management & Volume Offloading', urgency: 'immediate',
        steps: [
          'IV diuresis: Furosemide 80mg IV — target urine output 0.5–1 mL/kg/hr',
          'Continuous SpO₂ monitoring; BiPAP/CPAP if SpO₂ fails to improve on supplemental O₂',
          'Daily weights, strict I&O, BMP + BNP every 12 hours',
          'Cardiology and nephrology co-management given cardiorenal syndrome',
          'Echocardiogram within 24h to assess EF and valvular pathology',
        ],
        reference: 'AHA/ACC 2022 HF Guidelines · ESC 2021 Acute HF Management',
      },
    ],
    allergyWarning: 'Aspirin allergy documented — absolute contraindication. Avoid all salicylates. Contrast dye allergy: Pre-medicate with corticosteroids + antihistamines if imaging with contrast is required. Discuss risks/benefits of catheterization given DNR/DNI status.',
  },
};

const URGENCY_STYLES = {
  immediate: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  urgent: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  routine: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
};

export default function AIDiagnosis({ patient }: { patient: Patient }) {
  const data = PATIENT_DATA[patient.id];
  const [openDrug, setOpenDrug] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Differential Diagnoses */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">AI-Ranked Differential Diagnoses</h3>
        <div className="space-y-3">
          {data.diagnoses.map(d => (
            <div key={d.rank} className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#64748b] bg-[#1a2236] border border-[#1e2d45] px-2 py-1 rounded">
                    #{d.rank}
                  </span>
                  <div>
                    <div className="font-semibold text-[#e2e8f0]">{d.condition}</div>
                    <div className="text-xs text-[#64748b] font-mono">{d.icd}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#64748b] mb-1">Confidence</div>
                  <div className="font-mono text-xl font-bold" style={{ color: d.color }}>{d.confidence}%</div>
                </div>
              </div>
              {/* Confidence bar */}
              <div className="h-1.5 bg-[#1e2d45] rounded-full mb-3 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.confidence}%`, backgroundColor: d.color }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748b] font-semibold mb-1.5">Key Supporting Drivers</div>
                  <ul className="space-y-1">
                    {d.supporting.map(s => (
                      <li key={s} className="flex gap-2 text-[#94a3b8]">
                        <span className="text-emerald-400 shrink-0">✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[#64748b] font-semibold mb-1.5">Rule-Out Criteria</div>
                  <ul className="space-y-1">
                    {d.ruleOut.map(r => (
                      <li key={r} className="flex gap-2 text-[#94a3b8]">
                        <span className="text-rose-400 shrink-0">✗</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drug / Allergy Warning */}
      {data.allergyWarning && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex gap-2 items-start">
            <span className="text-amber-400 text-lg shrink-0">⚠</span>
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-1">Drug-Allergy Safety Alert</div>
              <p className="text-xs text-amber-300/80">{data.allergyWarning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Medication Table */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-[#1a2236] border-b border-[#1e2d45]">
          <h3 className="text-sm font-semibold text-[#94a3b8]">Drug-Drug Interaction & Therapy Checker</h3>
        </div>
        <div className="divide-y divide-[#162032]">
          {data.drugs.map((drug, i) => (
            <div key={i} className={`px-4 py-3 ${drug.warning ? 'bg-rose-500/5' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-sm text-[#e2e8f0]">{drug.name}</div>
                  <div className="text-xs text-[#64748b] mt-0.5 font-mono">{drug.dose} · {drug.route}</div>
                </div>
                {drug.warning && (
                  <span className="text-[10px] px-2 py-0.5 rounded border bg-rose-500/10 border-rose-500/20 text-rose-400 font-bold">
                    CONTRAINDICATED / CAUTION
                  </span>
                )}
              </div>
              {drug.warning && (
                <div className="mt-2 text-xs text-rose-300/80 flex gap-2">
                  <span className="shrink-0">⚠</span> {drug.warning}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* GDMT Protocols */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">Guideline-Directed Medical Therapy (GDMT)</h3>
        <div className="space-y-3">
          {data.protocols.map((p, i) => (
            <div key={i} className={`border rounded-xl overflow-hidden ${URGENCY_STYLES[p.urgency]}`}>
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-current/20">
                <span className="text-sm font-semibold">{p.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase tracking-wide border-current/30 ${p.urgency === 'immediate' ? 'text-rose-400' : p.urgency === 'urgent' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {p.urgency}
                </span>
              </div>
              <div className="px-4 py-3 bg-[#111827]">
                <ol className="space-y-1.5 text-xs text-[#94a3b8]">
                  {p.steps.map((s, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="font-mono text-[#64748b] shrink-0">{j + 1}.</span> {s}
                    </li>
                  ))}
                </ol>
                <div className="mt-3 pt-2 border-t border-[#1e2d45] text-[10px] text-[#64748b] font-mono">
                  Reference: {p.reference}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-[#64748b] border border-[#1e2d45] rounded-lg p-3 bg-[#111827]">
        <span className="font-semibold text-[#94a3b8]">Clinical Disclaimer: </span>
        This AI-assisted analysis is a decision support tool only and does not replace qualified clinical judgment. All recommendations require physician review and approval before implementation. MediAssist CDSS is classified as FDA Class II SaMD under 21 CFR 882.5010.
      </div>
    </div>
  );
}
