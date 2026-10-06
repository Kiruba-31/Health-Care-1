const COMPLIANCE_ITEMS = [
  { category: 'Privacy & Security', items: [
    { label: 'HIPAA Security Rule Compliance', status: 'compliant', detail: '45 CFR §164.312 — Technical Safeguards implemented' },
    { label: 'HIPAA Privacy Rule (PHI Handling)', status: 'compliant', detail: 'De-identification per Safe Harbor method (45 CFR §164.514)' },
    { label: 'AES-256 Encryption at Rest', status: 'compliant', detail: 'All PHI stored encrypted via AWS KMS' },
    { label: 'TLS 1.3 Encryption in Transit', status: 'compliant', detail: 'All API endpoints enforce TLS 1.3 minimum' },
    { label: 'Role-Based Access Control (RBAC)', status: 'compliant', detail: 'Physician / Nurse / Admin roles with audit trail' },
  ]},
  { category: 'Interoperability', items: [
    { label: 'HL7 FHIR R4 Standard', status: 'compliant', detail: 'Full FHIR R4 resource support (Observation, Medication, Patient)' },
    { label: 'DICOM Imaging Integration', status: 'in-progress', detail: 'PACS connectivity — 80% implementation complete' },
    { label: 'SMART on FHIR OAuth2', status: 'compliant', detail: 'SSO with Epic MyChart, Cerner PowerChart' },
    { label: 'ICD-10-CM Coding', status: 'compliant', detail: 'All diagnoses mapped to ICD-10-CM codes' },
  ]},
  { category: 'Regulatory & SaMD', items: [
    { label: 'FDA 21st Century Cures Act', status: 'compliant', detail: 'API interoperability requirements met' },
    { label: 'SaMD Class II FDA (21 CFR 882.5010)', status: 'in-progress', detail: '510(k) premarket notification submission in preparation' },
    { label: 'EU MDR Article 22 (SaMD)', status: 'planned', detail: 'CE marking process planned for EU market' },
    { label: 'Explainability (XAI) Requirement', status: 'compliant', detail: 'SHAP values exposed for all ML predictions' },
    { label: 'Human-in-the-Loop Constraint', status: 'compliant', detail: 'All orders require physician approval — no autonomous action' },
  ]},
];

const STATUS_STYLES: Record<string, string> = {
  'compliant': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'planned': 'bg-[#1a2236] text-[#64748b] border-[#1e2d45]',
};

const STATUS_ICONS: Record<string, string> = {
  'compliant': '✓',
  'in-progress': '◐',
  'planned': '○',
};

const TECH_STACK = [
  {
    category: 'Frontend',
    color: '#0ea5e9',
    items: [
      { name: 'React 19 + TypeScript 5.7', purpose: 'UI framework + type safety' },
      { name: 'Tailwind CSS v4', purpose: 'Utility-first styling system' },
      { name: 'Recharts 2.x', purpose: 'Hemodynamic trend visualization' },
      { name: 'Vite 8', purpose: 'Build tooling + HMR' },
    ],
  },
  {
    category: 'Backend / API',
    color: '#8b5cf6',
    items: [
      { name: 'FastAPI (Python 3.12)', purpose: 'High-performance REST API' },
      { name: 'Spring Boot 3 (Java 21)', purpose: 'Enterprise business logic, HL7 processing' },
      { name: 'GraphQL (Strawberry)', purpose: 'Flexible data querying layer' },
      { name: 'Celery + Redis', purpose: 'Async task queue for ML inference' },
    ],
  },
  {
    category: 'AI / ML Engine',
    color: '#f59e0b',
    items: [
      { name: 'ClinicalBERT / BioBERT', purpose: 'Clinical NLP summarization' },
      { name: 'XGBoost / LightGBM', purpose: 'Risk stratification models (TIMI, qSOFA)' },
      { name: 'SHAP (SHapley values)', purpose: 'Explainable AI for model outputs' },
      { name: 'MIMIC-IV Fine-tuned Models', purpose: 'Trained on 400k+ ICU patient records' },
    ],
  },
  {
    category: 'Data & Storage',
    color: '#10b981',
    items: [
      { name: 'PostgreSQL 16 + TimescaleDB', purpose: 'Relational + time-series vital data' },
      { name: 'Redis 7 Cluster', purpose: 'Session cache, real-time vital caching' },
      { name: 'HAPI-FHIR Server', purpose: 'FHIR R4 resource store' },
      { name: 'MinIO / S3', purpose: 'DICOM image & document object storage' },
    ],
  },
];

const WIREFRAME_ZONES = [
  { id: 'nav', label: 'Sidebar Navigation (240px)', x: 0, y: 0, w: 20, h: 100, color: '#0ea5e9' },
  { id: 'header', label: 'Patient Header Banner', x: 21, y: 0, w: 79, h: 12, color: '#8b5cf6' },
  { id: 'vitals', label: 'Vitals Cards Grid (5-col)', x: 21, y: 14, w: 79, h: 22, color: '#f59e0b' },
  { id: 'gauge', label: 'Risk Gauges', x: 21, y: 38, w: 28, h: 28, color: '#f43f5e' },
  { id: 'chart', label: 'Hemodynamic Chart', x: 51, y: 38, w: 49, h: 28, color: '#10b981' },
  { id: 'symptoms', label: 'Symptoms Panel', x: 21, y: 68, w: 79, h: 14, color: '#94a3b8' },
  { id: 'footer', label: 'Status Bar', x: 21, y: 84, w: 79, h: 6, color: '#64748b' },
];

export default function Blueprints() {
  return (
    <div className="space-y-6">
      {/* Wireframe */}
      <div className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">UI Wireframe — Clinical Overview Layout</h3>
        <div className="relative bg-[#0b1120] border border-[#1e2d45] rounded-lg overflow-hidden" style={{ paddingTop: '56%' }}>
          <div className="absolute inset-0 p-2">
            {WIREFRAME_ZONES.map(z => (
              <div
                key={z.id}
                className="absolute flex items-center justify-center text-center rounded"
                style={{
                  left: `${z.x}%`, top: `${z.y}%`,
                  width: `${z.w}%`, height: `${z.h}%`,
                  border: `1px solid ${z.color}40`,
                  background: `${z.color}0d`,
                }}
              >
                <span className="text-[9px] font-mono px-1" style={{ color: z.color }}>{z.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Desktop (≥1280px)', desc: '5-col vitals grid, full sidebar' },
            { label: 'Tablet (768–1280px)', desc: '3-col vitals, collapsed sidebar' },
            { label: 'Mobile (<768px)', desc: '1-col, bottom nav, swipe tabs' },
            { label: 'ICU Monitor (4K)', desc: 'Max density, dual panel layout' },
          ].map(bp => (
            <div key={bp.label} className="bg-[#0b1120] border border-[#1e2d45] rounded p-2 text-xs">
              <div className="font-semibold text-[#94a3b8]">{bp.label}</div>
              <div className="text-[#64748b] mt-0.5">{bp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">Production Tech Stack</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECH_STACK.map(cat => (
            <div key={cat.category} className="bg-[#111827] border border-[#1e2d45] rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-[#1e2d45]" style={{ borderLeftWidth: 3, borderLeftColor: cat.color }}>
                <span className="text-sm font-semibold" style={{ color: cat.color }}>{cat.category}</span>
              </div>
              <div className="divide-y divide-[#162032]">
                {cat.items.map(item => (
                  <div key={item.name} className="px-4 py-2.5 flex items-start justify-between gap-2">
                    <span className="text-xs font-mono text-[#e2e8f0]">{item.name}</span>
                    <span className="text-xs text-[#64748b] text-right shrink-0">{item.purpose}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Checklist */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">Clinical Regulatory & Compliance Checklist</h3>
        <div className="space-y-4">
          {COMPLIANCE_ITEMS.map(section => (
            <div key={section.category} className="bg-[#111827] border border-[#1e2d45] rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-[#1a2236] border-b border-[#1e2d45]">
                <span className="text-sm font-semibold text-[#94a3b8]">{section.category}</span>
              </div>
              <div className="divide-y divide-[#162032]">
                {section.items.map(item => (
                  <div key={item.label} className="px-4 py-3 flex flex-wrap items-start gap-3">
                    <span className={`shrink-0 mt-0.5 text-[10px] px-2 py-0.5 rounded border font-bold ${STATUS_STYLES[item.status]}`}>
                      {STATUS_ICONS[item.status]} {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <div>
                      <div className="text-sm text-[#e2e8f0]">{item.label}</div>
                      <div className="text-xs text-[#64748b] mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Clinical Rules', value: '300+', sub: 'Active decision rules', color: '#0ea5e9' },
          { label: 'Training Records', value: '400K+', sub: 'MIMIC-IV ICU patients', color: '#10b981' },
          { label: 'Inference Latency', value: '<200ms', sub: 'P99 API response time', color: '#f59e0b' },
          { label: 'FHIR Resources', value: '42', sub: 'Resource types supported', color: '#8b5cf6' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#111827] border border-[#1e2d45] rounded-xl p-4 text-center">
            <div className="font-mono text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs font-semibold text-[#94a3b8] mt-1">{stat.label}</div>
            <div className="text-[10px] text-[#64748b]">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
