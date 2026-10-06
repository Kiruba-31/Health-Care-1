import { useState } from 'react';

const STAGES = [
  {
    id: 1,
    label: 'Data Ingestion',
    icon: '📡',
    color: '#0ea5e9',
    description: 'Multi-modal clinical data ingestion from bedside telemetry, HL7/FHIR EHR sync, PACS imaging, and LIS laboratory feeds.',
    sources: ['Bedside Telemetry (GE CARESCAPE)', 'HL7/FHIR R4 EHR Sync (Epic/Cerner)', 'PACS Imaging (DICOM 3.0)', 'LIS Laboratory Feed (ORU^R01 HL7)'],
    payload: `{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "resource": {
        "resourceType": "Observation",
        "id": "obs-vitals-hr-001",
        "status": "final",
        "category": [{ "coding": [{ "code": "vital-signs" }] }],
        "code": { "coding": [{ "system": "http://loinc.org", "code": "8867-4", "display": "Heart rate" }] },
        "subject": { "reference": "Patient/pt-001" },
        "valueQuantity": { "value": 112, "unit": "beats/min", "system": "http://unitsofmeasure.org" },
        "effectiveDateTime": "2024-09-18T09:15:00Z"
      }
    }
  ]
}`,
  },
  {
    id: 2,
    label: 'Preprocessing & Normalization',
    icon: '⚙️',
    color: '#8b5cf6',
    description: 'FHIR R4 resource formatting, artifact rejection, time-series alignment, unit normalization, and duplicate detection.',
    sources: ['FHIR R4 Validator', 'Artifact Rejection Filter', 'Time-Series Aligner', 'Unit Normalizer (UCUM)'],
    payload: `{
  "pipeline_stage": "preprocessing",
  "input_records": 847,
  "rejected_artifacts": 12,
  "normalized_records": 835,
  "fhir_validation": "PASSED",
  "time_alignment": {
    "reference_timezone": "UTC",
    "aligned_observations": 835,
    "interpolation_method": "linear"
  },
  "unit_conversions": [
    { "from": "mg/dL", "to": "mmol/L", "field": "glucose" },
    { "from": "°F", "to": "°C", "field": "temperature" }
  ]
}`,
  },
  {
    id: 3,
    label: 'CDSS Multi-Model Inference',
    icon: '🧠',
    color: '#f59e0b',
    description: 'Biomarker threshold rules engine, BioBERT clinical summarizer, and predictive ML risk engines running in parallel ensemble.',
    sources: ['Biomarker Threshold Rules (300+ clinical rules)', 'BioBERT/ClinicalBERT NLP Model', 'XGBoost Risk Predictor', 'TIMI/qSOFA Score Calculator'],
    payload: `{
  "inference_timestamp": "2024-09-18T09:18:42Z",
  "models_used": ["BiomarkerRulesEngine_v3.2", "ClinicalBERT_MIMIC_v1.8", "XGBoost_STEMI_Risk_v2.1"],
  "ensemble_method": "weighted_average",
  "primary_diagnosis": {
    "condition": "Acute Anteroseptal STEMI",
    "icd10": "I21.09",
    "confidence": 0.94,
    "supporting_features": 6
  },
  "risk_scores": {
    "qSOFA": 2,
    "TIMI": 7,
    "composite_risk": 88
  },
  "inference_latency_ms": 142
}`,
  },
  {
    id: 4,
    label: 'Clinical Validation & Safety Guardrails',
    icon: '🛡️',
    color: '#10b981',
    description: 'Real-time contraindication checking, allergy-drug interaction matrix validation, dosage safety verification, and human-in-the-loop flag generation.',
    sources: ['FDA Orange Book Drug DB', 'Allergy-Drug Interaction Matrix', 'RxNorm Terminology', 'STOPP/START Criteria Engine'],
    payload: `{
  "safety_check_id": "safe-2024-09-18-001",
  "patient_id": "pt-001",
  "checks_performed": 28,
  "contraindications_flagged": [
    {
      "drug": "Nitroglycerin",
      "reason": "Systolic BP < 90 mmHg — absolute contraindication",
      "severity": "CRITICAL",
      "action": "BLOCK"
    }
  ],
  "allergy_conflicts": [
    { "allergen": "Penicillin", "drugs_affected": ["Amoxicillin", "Ampicillin"], "action": "EXCLUDE" }
  ],
  "guardrail_status": "HUMAN_REVIEW_REQUIRED"
}`,
  },
  {
    id: 5,
    label: 'Physician Interface & Order Generation',
    icon: '📋',
    color: '#f43f5e',
    description: 'Structured clinical output delivered to the EHR system, smart alert generation, care plan push, and order set activation.',
    sources: ['EHR Order Entry (CPOE)', 'Smart Alert Engine', 'Care Plan Generator', 'Audit Trail Logger (HIPAA)'],
    payload: `{
  "order_set_id": "STEMI-PCI-2024-001",
  "generated_at": "2024-09-18T09:19:05Z",
  "physician_id": "dr-chen-001",
  "status": "PENDING_PHYSICIAN_APPROVAL",
  "orders": [
    { "type": "LAB", "name": "Troponin I", "frequency": "Q3H × 3", "priority": "STAT" },
    { "type": "MEDICATION", "name": "Aspirin 325 mg", "route": "PO", "priority": "STAT" },
    { "type": "PROCEDURE", "name": "Cardiac Catheterization", "urgency": "EMERGENT" },
    { "type": "CONSULT", "name": "Interventional Cardiology", "priority": "EMERGENT" }
  ],
  "ehr_push_status": "AWAITING_APPROVAL",
  "audit_log": "HIPAA_COMPLIANT"
}`,
  },
];

export default function Pipeline() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-1">CDSS Data Architecture Pipeline</h3>
        <p className="text-xs text-[#64748b]">Click any stage to inspect the sample data payload and sub-systems.</p>
      </div>

      {/* Pipeline Flow */}
      <div className="flex flex-col gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex flex-col items-center">
            <button
              onClick={() => setSelected(selected === stage.id ? null : stage.id)}
              className={`w-full text-left bg-[#111827] border rounded-xl p-4 transition-all hover:bg-[#1a2236] ${
                selected === stage.id ? 'border-[color:var(--c)]' : 'border-[#1e2d45]'
              }`}
              style={{ '--c': stage.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}30` }}>
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#64748b]">Stage {stage.id}</span>
                    <span className="font-semibold text-sm text-[#e2e8f0]">{stage.label}</span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-0.5">{stage.description}</p>
                </div>
                <span className="text-[#64748b] text-lg shrink-0">{selected === stage.id ? '▼' : '▶'}</span>
              </div>

              {selected === stage.id && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" onClick={e => e.stopPropagation()}>
                  <div>
                    <div className="text-xs font-semibold text-[#94a3b8] mb-2">Sub-Systems / Data Sources</div>
                    <ul className="space-y-1.5">
                      {stage.sources.map(s => (
                        <li key={s} className="flex gap-2 items-center text-xs text-[#94a3b8]">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: stage.color }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#94a3b8] mb-2">Sample JSON Payload</div>
                    <pre className="text-[10px] font-mono text-emerald-300 bg-[#0d1a0d] border border-emerald-900/30 rounded p-2 overflow-auto max-h-48">
                      {stage.payload}
                    </pre>
                  </div>
                </div>
              )}
            </button>

            {i < STAGES.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-px h-3 bg-[#1e2d45]" />
                <span className="text-[#1e2d45] text-xs">▼</span>
                <div className="w-px h-3 bg-[#1e2d45]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Architecture Overview */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">System Architecture Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { layer: 'Frontend', stack: 'React 19 + TypeScript\nTailwind CSS v4\nRecharts', color: '#0ea5e9' },
            { layer: 'Backend / API', stack: 'FastAPI (Python)\nSpring Boot (Java)\nGraphQL + REST', color: '#8b5cf6' },
            { layer: 'AI / ML Engine', stack: 'BioBERT / ClinicalBERT\nXGBoost Risk Models\nOpenAI GPT-4 Clinical', color: '#f59e0b' },
            { layer: 'Data Layer', stack: 'PostgreSQL + TimescaleDB\nRedis (cache)\nHAPI-FHIR Server', color: '#10b981' },
            { layer: 'Integration', stack: 'HL7 FHIR R4\nDICOM 3.0\nSMARTon FHIR OAuth2', color: '#f43f5e' },
            { layer: 'Infrastructure', stack: 'Docker / Kubernetes\nAWS GovCloud\nHIPAA BAA signed', color: '#94a3b8' },
          ].map(item => (
            <div key={item.layer} className="bg-[#0b1120] border border-[#1e2d45] rounded-lg p-3">
              <div className="font-semibold mb-1.5" style={{ color: item.color }}>{item.layer}</div>
              <div className="text-[#64748b] whitespace-pre-line">{item.stack}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
