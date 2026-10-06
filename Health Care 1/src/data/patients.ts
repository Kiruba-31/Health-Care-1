export type AlertLevel = 'normal' | 'elevated' | 'critical';

export interface Vital {
  label: string;
  value: string;
  unit: string;
  status: AlertLevel;
  baseline: string;
  trend: number[];
}

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  age: number;
  sex: string;
  bloodGroup: string;
  height: string;
  weight: string;
  codeStatus: string;
  allergies: string[];
  attending: string;
  diagnosis: string;
  vitals: Record<string, Vital>;
  qsofa: number;
  timi: number;
  hemodynamicTrend: Array<{ time: string; map: number; hr: number; spo2: number }>;
  symptoms: string[];
  labs: LabResult[];
}

export interface LabResult {
  group: string;
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: AlertLevel | 'low';
  collected: string;
}

export const patients: Patient[] = [
  {
    id: 'pt-001',
    name: 'James Harrington',
    mrn: 'MRN-2024-00441',
    age: 58,
    sex: 'Male',
    bloodGroup: 'A+',
    height: '178 cm',
    weight: '91 kg',
    codeStatus: 'FULL CODE',
    allergies: ['Penicillin', 'Sulfonamides'],
    attending: 'Dr. Sarah Chen, MD, FACC',
    diagnosis: 'Acute Coronary Syndrome — STEMI',
    vitals: {
      hr: { label: 'Heart Rate', value: '112', unit: 'bpm', status: 'elevated', baseline: '72', trend: [72, 78, 88, 95, 104, 108, 112] },
      bp: { label: 'Blood Pressure', value: '88/60', unit: 'mmHg', status: 'critical', baseline: '120/80', trend: [120, 110, 102, 95, 90, 88, 88] },
      spo2: { label: 'SpO₂', value: '91', unit: '%', status: 'critical', baseline: '98', trend: [98, 97, 95, 94, 92, 91, 91] },
      rr: { label: 'Resp. Rate', value: '22', unit: 'bpm', status: 'elevated', baseline: '16', trend: [16, 17, 18, 20, 21, 22, 22] },
      temp: { label: 'Body Temp', value: '37.2', unit: '°C', status: 'normal', baseline: '36.8', trend: [36.8, 36.9, 37.0, 37.1, 37.2, 37.2, 37.2] },
    },
    qsofa: 2,
    timi: 7,
    hemodynamicTrend: [
      { time: '00:00', map: 95, hr: 72, spo2: 98 },
      { time: '03:00', map: 88, hr: 80, spo2: 97 },
      { time: '06:00', map: 82, hr: 90, spo2: 95 },
      { time: '09:00', map: 75, hr: 98, spo2: 93 },
      { time: '12:00', map: 70, hr: 105, spo2: 91 },
      { time: '15:00', map: 68, hr: 110, spo2: 91 },
      { time: '18:00', map: 69, hr: 112, spo2: 91 },
      { time: '21:00', map: 69, hr: 112, spo2: 91 },
    ],
    symptoms: ['Retrosternal chest pain', 'Radiating left arm pain', 'Diaphoresis', 'Dyspnea', 'Nausea', 'Jaw pain'],
    labs: [
      { group: 'CBC', parameter: 'WBC', value: '11.2', unit: 'k/µL', reference: '4.5–11.0', status: 'elevated', collected: '09:15' },
      { group: 'CBC', parameter: 'Hemoglobin', value: '13.8', unit: 'g/dL', reference: '13.5–17.5', status: 'normal', collected: '09:15' },
      { group: 'CBC', parameter: 'Platelets', value: '198', unit: 'k/µL', reference: '150–400', status: 'normal', collected: '09:15' },
      { group: 'CMP', parameter: 'Sodium', value: '138', unit: 'mEq/L', reference: '136–145', status: 'normal', collected: '09:20' },
      { group: 'CMP', parameter: 'Potassium', value: '4.1', unit: 'mEq/L', reference: '3.5–5.0', status: 'normal', collected: '09:20' },
      { group: 'CMP', parameter: 'Creatinine', value: '1.6', unit: 'mg/dL', reference: '0.7–1.3', status: 'elevated', collected: '09:20' },
      { group: 'CMP', parameter: 'BUN', value: '28', unit: 'mg/dL', reference: '7–20', status: 'elevated', collected: '09:20' },
      { group: 'Cardiac', parameter: 'Troponin I', value: '8.42', unit: 'ng/mL', reference: '<0.04', status: 'critical', collected: '09:18' },
      { group: 'Cardiac', parameter: 'CK-MB', value: '142', unit: 'U/L', reference: '0–25', status: 'critical', collected: '09:18' },
      { group: 'Cardiac', parameter: 'BNP', value: '680', unit: 'pg/mL', reference: '<100', status: 'critical', collected: '09:18' },
      { group: 'Cardiac', parameter: 'D-Dimer', value: '1.2', unit: 'µg/mL', reference: '<0.5', status: 'elevated', collected: '09:18' },
      { group: 'Inflammatory', parameter: 'CRP', value: '42.1', unit: 'mg/L', reference: '<5.0', status: 'critical', collected: '09:22' },
      { group: 'Inflammatory', parameter: 'Lactate', value: '3.8', unit: 'mmol/L', reference: '0.5–2.2', status: 'critical', collected: '09:22' },
    ],
  },
  {
    id: 'pt-002',
    name: 'Maria Delgado',
    mrn: 'MRN-2024-00512',
    age: 67,
    sex: 'Female',
    bloodGroup: 'O−',
    height: '161 cm',
    weight: '73 kg',
    codeStatus: 'FULL CODE',
    allergies: ['Cephalosporins', 'NSAIDs'],
    attending: 'Dr. Michael Torres, MD, FIDSA',
    diagnosis: 'Sepsis / Septic Shock — Urosepsis',
    vitals: {
      hr: { label: 'Heart Rate', value: '126', unit: 'bpm', status: 'critical', baseline: '74', trend: [74, 82, 95, 108, 118, 122, 126] },
      bp: { label: 'Blood Pressure', value: '82/52', unit: 'mmHg', status: 'critical', baseline: '118/76', trend: [118, 105, 96, 88, 84, 82, 82] },
      spo2: { label: 'SpO₂', value: '93', unit: '%', status: 'elevated', baseline: '99', trend: [99, 98, 97, 95, 94, 93, 93] },
      rr: { label: 'Resp. Rate', value: '28', unit: 'bpm', status: 'critical', baseline: '15', trend: [15, 18, 20, 23, 26, 28, 28] },
      temp: { label: 'Body Temp', value: '39.4', unit: '°C', status: 'critical', baseline: '36.9', trend: [36.9, 37.5, 38.2, 38.8, 39.1, 39.4, 39.4] },
    },
    qsofa: 3,
    timi: 3,
    hemodynamicTrend: [
      { time: '00:00', map: 88, hr: 74, spo2: 99 },
      { time: '03:00', map: 80, hr: 86, spo2: 98 },
      { time: '06:00', map: 72, hr: 98, spo2: 96 },
      { time: '09:00', map: 65, hr: 112, spo2: 94 },
      { time: '12:00', map: 60, hr: 120, spo2: 93 },
      { time: '15:00', map: 58, hr: 124, spo2: 93 },
      { time: '18:00', map: 57, hr: 126, spo2: 93 },
      { time: '21:00', map: 58, hr: 126, spo2: 93 },
    ],
    symptoms: ['Fever / Rigors', 'Productive cough', 'Dysuria', 'Flank pain', 'Confusion', 'Hypotension'],
    labs: [
      { group: 'CBC', parameter: 'WBC', value: '18.6', unit: 'k/µL', reference: '4.5–11.0', status: 'critical', collected: '10:05' },
      { group: 'CBC', parameter: 'Hemoglobin', value: '10.2', unit: 'g/dL', reference: '12.0–16.0', status: 'low', collected: '10:05' },
      { group: 'CBC', parameter: 'Platelets', value: '88', unit: 'k/µL', reference: '150–400', status: 'low', collected: '10:05' },
      { group: 'CMP', parameter: 'Sodium', value: '132', unit: 'mEq/L', reference: '136–145', status: 'low', collected: '10:10' },
      { group: 'CMP', parameter: 'Potassium', value: '5.2', unit: 'mEq/L', reference: '3.5–5.0', status: 'elevated', collected: '10:10' },
      { group: 'CMP', parameter: 'Creatinine', value: '2.8', unit: 'mg/dL', reference: '0.5–1.1', status: 'critical', collected: '10:10' },
      { group: 'Inflammatory', parameter: 'Procalcitonin', value: '48.2', unit: 'ng/mL', reference: '<0.5', status: 'critical', collected: '10:12' },
      { group: 'Inflammatory', parameter: 'Lactate', value: '5.1', unit: 'mmol/L', reference: '0.5–2.2', status: 'critical', collected: '10:12' },
      { group: 'Inflammatory', parameter: 'CRP', value: '180', unit: 'mg/L', reference: '<5.0', status: 'critical', collected: '10:12' },
    ],
  },
  {
    id: 'pt-003',
    name: 'Robert Kimani',
    mrn: 'MRN-2024-00589',
    age: 71,
    sex: 'Male',
    bloodGroup: 'B+',
    height: '170 cm',
    weight: '86 kg',
    codeStatus: 'DNR/DNI',
    allergies: ['Aspirin', 'Contrast dye'],
    attending: 'Dr. Priya Patel, MD, FACC, FAHA',
    diagnosis: 'Acute Decompensated Heart Failure with Renal Dysfunction',
    vitals: {
      hr: { label: 'Heart Rate', value: '98', unit: 'bpm', status: 'elevated', baseline: '68', trend: [68, 74, 80, 86, 92, 96, 98] },
      bp: { label: 'Blood Pressure', value: '162/104', unit: 'mmHg', status: 'critical', baseline: '132/82', trend: [132, 140, 148, 155, 160, 162, 162] },
      spo2: { label: 'SpO₂', value: '89', unit: '%', status: 'critical', baseline: '95', trend: [95, 93, 92, 91, 90, 89, 89] },
      rr: { label: 'Resp. Rate', value: '26', unit: 'bpm', status: 'critical', baseline: '16', trend: [16, 18, 20, 22, 24, 26, 26] },
      temp: { label: 'Body Temp', value: '37.0', unit: '°C', status: 'normal', baseline: '36.7', trend: [36.7, 36.8, 36.9, 37.0, 37.0, 37.0, 37.0] },
    },
    qsofa: 1,
    timi: 5,
    hemodynamicTrend: [
      { time: '00:00', map: 99, hr: 68, spo2: 95 },
      { time: '03:00', map: 104, hr: 74, spo2: 94 },
      { time: '06:00', map: 110, hr: 80, spo2: 92 },
      { time: '09:00', map: 115, hr: 88, spo2: 91 },
      { time: '12:00', map: 120, hr: 94, spo2: 90 },
      { time: '15:00', map: 123, hr: 96, spo2: 89 },
      { time: '18:00', map: 123, hr: 98, spo2: 89 },
      { time: '21:00', map: 123, hr: 98, spo2: 89 },
    ],
    symptoms: ['Dyspnea on exertion', 'Orthopnea', 'Bilateral leg edema', 'Paroxysmal nocturnal dyspnea', 'Fatigue', 'Reduced urine output'],
    labs: [
      { group: 'CBC', parameter: 'WBC', value: '9.4', unit: 'k/µL', reference: '4.5–11.0', status: 'normal', collected: '08:30' },
      { group: 'CBC', parameter: 'Hemoglobin', value: '11.1', unit: 'g/dL', reference: '13.5–17.5', status: 'low', collected: '08:30' },
      { group: 'CBC', parameter: 'Platelets', value: '220', unit: 'k/µL', reference: '150–400', status: 'normal', collected: '08:30' },
      { group: 'CMP', parameter: 'Sodium', value: '134', unit: 'mEq/L', reference: '136–145', status: 'low', collected: '08:35' },
      { group: 'CMP', parameter: 'Creatinine', value: '3.2', unit: 'mg/dL', reference: '0.7–1.3', status: 'critical', collected: '08:35' },
      { group: 'CMP', parameter: 'BUN', value: '62', unit: 'mg/dL', reference: '7–20', status: 'critical', collected: '08:35' },
      { group: 'CMP', parameter: 'eGFR', value: '22', unit: 'mL/min', reference: '>60', status: 'critical', collected: '08:35' },
      { group: 'Cardiac', parameter: 'BNP', value: '2840', unit: 'pg/mL', reference: '<100', status: 'critical', collected: '08:38' },
      { group: 'Cardiac', parameter: 'Troponin I', value: '0.12', unit: 'ng/mL', reference: '<0.04', status: 'elevated', collected: '08:38' },
    ],
  },
];
