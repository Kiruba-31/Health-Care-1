import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, Users, ClipboardCheck, Stethoscope, Sparkles, Pill, BarChart3, 
  AlertTriangle, FileText, Bell, Settings, HelpCircle, Heart, Search, 
  CheckCircle2, Info, ChevronRight, ShieldAlert, Zap, Printer, Download, 
  Thermometer, Wind, Droplet, HeartPulse, FileWarning, AlertCircle, 
  X, Check, Beaker, BrainCircuit
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { listPatients, createPatient } from './api/patientApi';
import { Show, SignIn, UserButton, useUser } from '@clerk/react';

// --- MOCK DATA ---
const MOCK_PATIENTS = [
  { id: 'MRN-84920', name: 'Jane Doe', age: 58, sex: 'F', bed: '4A - Cardiac ICU', dx: 'STEMI / Acute Angina', acuity: 'Emergency', alerts: 2, hr: 104, bp: '142/88', spo2: 94 },
  { id: 'MRN-11234', name: 'Marcus Vance', age: 67, sex: 'M', bed: '2B - Ward', dx: 'Urosepsis / Septic Shock', acuity: 'High Risk', alerts: 1, hr: 118, bp: '88/54', spo2: 92 },
  { id: 'MRN-99821', name: 'Elena Rostova', age: 72, sex: 'F', bed: '6C - Ward', dx: 'Decompensated HF & CKD', acuity: 'Moderate', alerts: 0, hr: 88, bp: '150/90', spo2: 96 },
  { id: 'MRN-44512', name: 'David Kim', age: 45, sex: 'M', bed: '1A - ER', dx: 'Diabetic Ketoacidosis', acuity: 'High Risk', alerts: 1, hr: 110, bp: '100/60', spo2: 98 },
  { id: 'MRN-33211', name: 'Sarah Jenkins', age: 31, sex: 'F', bed: '3D - Ward', dx: 'Acute Appendicitis', acuity: 'Low Risk', alerts: 0, hr: 92, bp: '118/76', spo2: 99 },
];

const TELEMETRY_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  map: 65 + Math.random() * 20,
  hr: 80 + Math.random() * 30,
  spo2: 92 + Math.random() * 8
}));

const ANALYTICS_DATA = [
  { month: 'Jan', volume: 120, guidelineAdoption: 82 },
  { month: 'Feb', volume: 150, guidelineAdoption: 85 },
  { month: 'Mar', volume: 180, guidelineAdoption: 89 },
  { month: 'Apr', volume: 140, guidelineAdoption: 91 },
  { month: 'May', volume: 190, guidelineAdoption: 94 },
  { month: 'Jun', volume: 210, guidelineAdoption: 96 },
];

const LAB_PANEL = [
  { param: 'Sodium', value: 138, unit: 'mEq/L', ref: '135-145', status: 'Normal' },
  { param: 'Potassium', value: 4.1, unit: 'mEq/L', ref: '3.5-5.0', status: 'Normal' },
  { param: 'Creatinine', value: 1.8, unit: 'mg/dL', ref: '0.6-1.2', status: 'High' },
  { param: 'Troponin I', value: 0.14, unit: 'ng/mL', ref: '< 0.04', status: 'Critical' },
  { param: 'Lactate', value: 3.2, unit: 'mmol/L', ref: '0.5-1.0', status: 'High' },
];

// --- MAIN APP COMPONENT ---
export default function MediAssistApp() {
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || localStorage.getItem("userRole") || "PATIENT";
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [patientsList, setPatientsList] = useState<any[]>(MOCK_PATIENTS); // Fallback to mock data if API fails
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const loadPatients = () => {
    listPatients()
      .then(response => {
        if (response.data && response.data.length > 0) {
          const apiPatients = response.data.map((p: any) => ({
            id: p.patientId || `PT-${p.id || Math.floor(Math.random()*1000)}`,
            name: p.name,
            age: p.age,
            sex: p.gender === 'Male' ? 'M' : 'F',
            bed: 'TBD - API',
            dx: 'Pending API DX',
            acuity: 'Moderate',
            alerts: 0,
            hr: 90,
            bp: '120/80',
            spo2: 98
          }));
          setPatientsList(apiPatients);
          // Only change selected if none is selected or it's just the mock
          setSelectedPatient((prev) => prev.id === MOCK_PATIENTS[0].id ? apiPatients[0] : prev);
        }
      })
      .catch(error => {
        console.warn("Could not fetch patients from Spring Boot API. Using mock data instead.", error);
      });
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Handlers
  const handleTabChange = (tabName: string) => setActiveTab(tabName);

  const handleAddPatient = async (formData: any) => {
    const normalizedPatient = {
      id: formData.patientId || formData.id || `PT-${Date.now()}`,
      name: formData.name?.trim(),
      age: Number(formData.age) || 0,
      sex: formData.sex || 'F',
      bed: formData.bed?.trim() || 'TBD - New Admission',
      dx: formData.dx?.trim() || 'Awaiting assessment',
      acuity: formData.acuity || 'Moderate',
      alerts: 0,
      hr: Number(formData.hr) || 90,
      bp: formData.bp || '120/80',
      spo2: Number(formData.spo2) || 98,
    };

    if (!normalizedPatient.name) return;

    try {
      await createPatient({
        patientId: normalizedPatient.id,
        name: normalizedPatient.name,
        age: normalizedPatient.age,
        gender: normalizedPatient.sex === 'M' ? 'Male' : 'Female',
        bloodGroup: formData.bloodGroup || 'O+',
      });
      loadPatients(); // Automatically fetches the newly saved patient from PostgreSQL
    } catch (error) {
      console.warn('Could not save patient to backend. Added locally instead.', error);
      setPatientsList((previous) => [normalizedPatient, ...previous]);
    }

    setSelectedPatient(normalizedPatient);
    setActiveTab('Patients');
    setIsAddPatientOpen(false);
  };
  
  return (
    <>
    <Show when="signed-out">
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-3 mb-8">
          <Stethoscope className="w-10 h-10 text-blue-600" />
          <span className="text-3xl font-bold text-slate-900 tracking-tight">MediAssist AI</span>
        </div>
        <SignIn routing="hash" />
      </div>
    </Show>
    <Show when="signed-in">
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20 shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">MediAssist AI</h1>
            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Clinical Decision Support</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {[
            { name: 'Dashboard', icon: Activity, roles: ['PATIENT', 'DOCTOR', 'ADMIN'] },
            { name: 'Patients', icon: Users, roles: ['DOCTOR', 'ADMIN'] },
            { name: 'Clinical Assessments', icon: ClipboardCheck, roles: ['DOCTOR'] },
            { name: 'Diagnostics', icon: Stethoscope, roles: ['DOCTOR'] },
            { name: 'AI Insights', icon: Zap, roles: ['DOCTOR'] },
            { name: 'Medications', icon: Pill, roles: ['DOCTOR', 'PATIENT'] },
            { name: 'Analytics', icon: BarChart3, roles: ['ADMIN', 'DOCTOR'] },
            { name: 'Alerts', icon: AlertTriangle, roles: ['DOCTOR', 'ADMIN'] },
            { name: 'Reports', icon: FileText, roles: ['DOCTOR', 'PATIENT', 'ADMIN'] },
          ]
          .filter(tab => tab.roles.includes(role.toUpperCase()))
          .map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.name 
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.name ? 'text-blue-600' : 'text-slate-400'}`} />
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1 bg-slate-50">
          <button onClick={() => handleTabChange('Alerts')} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">
            <Bell className="w-4 h-4 text-slate-400" /> Notifications
          </button>
          <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">
            <Settings className="w-4 h-4 text-slate-400" /> Settings
          </button>
          <button onClick={() => setIsHelpOpen(true)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md">
            <HelpCircle className="w-4 h-4 text-slate-400" /> Help & Support
          </button>
          
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm uppercase">
              {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.fullName || user?.username || 'User'}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{role.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Good Morning, {user?.firstName || user?.username || (role.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()))} 👋
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {role.toUpperCase() === 'PATIENT' ? 'My Health Portal' : role.toUpperCase() === 'ADMIN' ? 'Hospital Administration' : 'Clinical Decision Support Overview'}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 transition-all"
              />
            </div>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors" onClick={() => handleTabChange('Alerts')}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <UserButton />
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          {activeTab === 'Dashboard' && <TabDashboard patient={selectedPatient} />}
          {activeTab === 'Patients' && <TabPatients patients={patientsList} onSelect={setSelectedPatient} onInspect={() => setIsPatientModalOpen(true)} onAdd={() => setIsAddPatientOpen(true)} />}
          {activeTab === 'Clinical Assessments' && <TabAssessments />}
          {activeTab === 'Diagnostics' && <TabDiagnostics />}
          {activeTab === 'AI Insights' && <TabAIInsights />}
          {activeTab === 'Medications' && <TabMedications />}
          {activeTab === 'Analytics' && <TabAnalytics />}
          {activeTab === 'Alerts' && <TabAlerts />}
          {activeTab === 'Reports' && <TabReports patient={selectedPatient} />}
        </div>
      </main>

      {/* MODALS */}
      {isAddPatientOpen && (
        <AddPatientModal onClose={() => setIsAddPatientOpen(false)} onSubmit={handleAddPatient} />
      )}

      {isPatientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Patient Record Inspection</h2>
              <button onClick={() => setIsPatientModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 bg-white rounded-md border border-slate-200"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedPatient.name}</h3>
                  <p className="text-slate-600">{selectedPatient.id} • {selectedPatient.age}y {selectedPatient.sex} • {selectedPatient.bed}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${selectedPatient.acuity === 'Emergency' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {selectedPatient.acuity} Triage
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-lg p-4 bg-white">
                  <h4 className="font-bold text-slate-800 mb-2 border-b pb-2">Clinical History</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>Type 2 Diabetes Mellitus</li>
                    <li>Hypertension</li>
                    <li>Hyperlipidemia</li>
                    <li>Prior appendectomy (2012)</li>
                  </ul>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 bg-white">
                  <h4 className="font-bold text-slate-800 mb-2 border-b pb-2">Active Medications</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>Metformin 1000mg BID</li>
                    <li>Lisinopril 10mg Daily</li>
                    <li>Atorvastatin 40mg Nightly</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsPatientModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md font-medium text-slate-700 bg-white hover:bg-slate-50">Close</button>
              <button onClick={() => {setIsPatientModalOpen(false); handleTabChange('Dashboard');}} className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">Open in Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Settings className="w-5 h-5 text-slate-500"/> Preferences</h2>
              <button onClick={() => setIsSettingsOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">Unit System</span>
                <select className="border border-slate-300 rounded-md p-1 text-sm bg-white">
                  <option>Metric (°C, kg)</option>
                  <option>Imperial (°F, lbs)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">AI Sensitivity Threshold</span>
                <input type="range" min="0" max="100" defaultValue="75" className="w-32" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">Dark Mode</span>
                <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-not-allowed opacity-50">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isHelpOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-slate-500"/> Help & Support</h2>
              <button onClick={() => setIsHelpOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
            </div>
            <div className="p-6 space-y-4 text-sm text-slate-600">
              <p><strong>IT Emergency Hotline:</strong> Ext. 9911</p>
              <p><strong>CDSS User Manual:</strong> <a href="#" className="text-blue-600 underline">View Documentation</a></p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-xs">
                <strong>FDA Class II SaMD Disclaimer:</strong> This software is designed for clinical decision support and does not replace the professional judgment of a qualified healthcare provider.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Show>
    </>
  );
}


// --- TAB COMPONENTS ---

function TabDashboard({ patient }: { patient: any }) {
  if (!patient) return null;
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Active Patient Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
        <div className="ml-2">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded border border-slate-200">
              {patient.age}{patient.sex} • {patient.id}
            </span>
            <span className="px-2.5 py-0.5 bg-red-50 text-red-700 text-sm font-bold rounded border border-red-200 flex items-center gap-1 shadow-sm">
              <AlertTriangle className="w-4 h-4" /> {patient.dx} Alert
            </span>
          </div>
          <p className="text-slate-600 text-sm flex gap-4">
            <span><strong>Loc:</strong> {patient.bed}</span>
            <span><strong>Allergies:</strong> Penicillin</span>
            <span><strong>Attending:</strong> Dr. Alex</span>
          </p>
        </div>
      </div>

      {/* Real-Time Vitals Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <VitalCard title="Heart Rate" value={patient.hr} unit="bpm" icon={HeartPulse} status="Elevated" color="text-red-600" bg="bg-red-50" border="border-red-200" />
        <VitalCard title="Blood Pressure" value={patient.bp} unit="mmHg" icon={Activity} status="Borderline" color="text-amber-600" bg="bg-amber-50" border="border-amber-200" />
        <VitalCard title="SpO2" value={patient.spo2} unit="%" icon={Droplet} status="Mild Hypoxemia" color="text-amber-600" bg="bg-amber-50" border="border-amber-200" />
        <VitalCard title="Resp. Rate" value="22" unit="bpm" icon={Wind} status="Tachypnea" color="text-red-600" bg="bg-red-50" border="border-red-200" />
        <VitalCard title="Core Temp" value="38.6" unit="°C" icon={Thermometer} status="Febrile" color="text-red-600" bg="bg-red-50" border="border-red-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Telemetry Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Activity className="w-5 h-5 text-blue-600" /> 24-Hour Hemodynamic Telemetry
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TELEMETRY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="map" name="MAP (mmHg)" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorMap)" />
                <Line type="monotone" dataKey="hr" name="HR (bpm)" stroke="#EF4444" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center text-xs font-medium">
            <span className="flex items-center gap-1 text-blue-700"><div className="w-3 h-3 bg-blue-500 rounded-sm opacity-50"></div> MAP</span>
            <span className="flex items-center gap-1 text-red-600"><div className="w-3 h-1 bg-red-500 rounded-sm"></div> Heart Rate</span>
          </div>
        </div>

        {/* Risk Stratification */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Risk Stratification
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-semibold text-sm text-slate-700">Sepsis Risk (qSOFA)</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 rounded border border-red-100">High (2/3)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-semibold text-sm text-slate-700">Acute Coronary (TIMI)</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 rounded border border-amber-100">Mod-High (4/7)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <h4 className="font-bold text-red-800 flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4" /> Active Clinical Warnings
            </h4>
            <p className="text-xs text-red-700 leading-relaxed">
              Patient exhibits sustained hypotension (MAP &lt; 65) and tachypnea. Emergent review of Troponin and Lactate levels required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ title, value, unit, icon: Icon, status, color, bg, border }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="font-semibold text-xs tracking-wide uppercase">{title}</span>
        </div>
        <span className={`px-1.5 py-0.5 ${bg} ${color} text-[10px] font-bold rounded ${border} border`}>{status}</span>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</span>
        <span className="text-sm font-medium text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

function AddPatientModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (formData: any) => Promise<void> | void; }) {
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    age: '',
    sex: 'F',
    bed: '',
    dx: '',
    acuity: 'Moderate',
    bloodGroup: 'O+',
    hr: '90',
    bp: '120/80',
    spo2: '98',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim()) return;
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Add New Patient</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 bg-white rounded-md border border-slate-200"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Patient ID / MRN</span>
              <input value={formData.patientId} onChange={(e) => handleChange('patientId', e.target.value)} placeholder="PT-1001" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Full Name</span>
              <input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Smith" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Age</span>
              <input type="number" min="0" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="42" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Sex</span>
              <select value={formData.sex} onChange={(e) => handleChange('sex', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Bed / Location</span>
              <input value={formData.bed} onChange={(e) => handleChange('bed', e.target.value)} placeholder="4A - Ward" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Blood Group</span>
              <select value={formData.bloodGroup} onChange={(e) => handleChange('bloodGroup', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700 md:col-span-2">
              <span>Primary Diagnosis</span>
              <input value={formData.dx} onChange={(e) => handleChange('dx', e.target.value)} placeholder="Acute appendicitis" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Triage Acuity</span>
              <select value={formData.acuity} onChange={(e) => handleChange('acuity', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="Emergency">Emergency</option>
                <option value="High Risk">High Risk</option>
                <option value="Moderate">Moderate</option>
                <option value="Low Risk">Low Risk</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Heart Rate (bpm)</span>
              <input type="number" min="0" value={formData.hr} onChange={(e) => handleChange('hr', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>Blood Pressure</span>
              <input value={formData.bp} onChange={(e) => handleChange('bp', e.target.value)} placeholder="120/80" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              <span>SpO2 (%)</span>
              <input type="number" min="0" max="100" value={formData.spo2} onChange={(e) => handleChange('spo2', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-md font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">Save Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TabPatients({ patients, onSelect, onInspect, onAdd }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search MRN or Name..." className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-md text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {['All', 'Emergency', 'High Risk', 'Moderate', 'Low Risk'].map(f => (
              <button key={f} className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-slate-300 text-slate-600 hover:bg-slate-50">{f}</button>
            ))}
          </div>
          <button onClick={onAdd} className="px-3 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700">+ Add Patient</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="p-4 font-semibold">Patient Name & MRN</th>
              <th className="p-4 font-semibold">Age/Sex</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Primary Diagnosis</th>
              <th className="p-4 font-semibold">Triage Acuity</th>
              <th className="p-4 font-semibold">Vitals Preview</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => onSelect(p)}>
                <td className="p-4">
                  <div className="font-bold text-slate-900 group-hover:text-blue-700">{p.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{p.id}</div>
                </td>
                <td className="p-4 text-sm text-slate-700">{p.age} {p.sex}</td>
                <td className="p-4 text-sm text-slate-700">{p.bed}</td>
                <td className="p-4 text-sm font-medium text-slate-800">{p.dx}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-md border ${
                    p.acuity === 'Emergency' ? 'bg-red-50 text-red-700 border-red-200' :
                    p.acuity === 'High Risk' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    p.acuity === 'Moderate' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>{p.acuity}</span>
                </td>
                <td className="p-4 text-xs text-slate-600 space-y-0.5 font-mono">
                  <div>HR: <span className={p.hr > 100 ? 'text-red-600 font-bold' : ''}>{p.hr}</span></div>
                  <div>BP: {p.bp}</div>
                </td>
                <td className="p-4 text-right">
                  <button onClick={(e) => {e.stopPropagation(); onSelect(p); onInspect();}} className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm">
                    Inspect Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabAssessments() {
  const [gcs, setGcs] = useState({ eye: 4, verbal: 5, motor: 6 });
  const [qsofa, setQsofa] = useState({ resp: false, mental: false, sbp: false });
  
  const gcsTotal = gcs.eye + gcs.verbal + gcs.motor;
  const qsofaTotal = (qsofa.resp ? 1 : 0) + (qsofa.mental ? 1 : 0) + (qsofa.sbp ? 1 : 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* GCS Calculator */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-blue-600"/> Glasgow Coma Scale (GCS)</h3>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-900">{gcsTotal}</span><span className="text-slate-500">/15</span>
          </div>
        </div>
        <div className="p-5 space-y-6 flex-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Eye Opening (1-4)</label>
            <select className="w-full border border-slate-300 rounded-md p-2 bg-white" value={gcs.eye} onChange={e => setGcs({...gcs, eye: parseInt(e.target.value)})}>
              <option value="4">4 - Spontaneous</option>
              <option value="3">3 - To sound</option>
              <option value="2">2 - To pressure</option>
              <option value="1">1 - None</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Verbal Response (1-5)</label>
            <select className="w-full border border-slate-300 rounded-md p-2 bg-white" value={gcs.verbal} onChange={e => setGcs({...gcs, verbal: parseInt(e.target.value)})}>
              <option value="5">5 - Orientated</option>
              <option value="4">4 - Confused</option>
              <option value="3">3 - Words</option>
              <option value="2">2 - Sounds</option>
              <option value="1">1 - None</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Motor Response (1-6)</label>
            <select className="w-full border border-slate-300 rounded-md p-2 bg-white" value={gcs.motor} onChange={e => setGcs({...gcs, motor: parseInt(e.target.value)})}>
              <option value="6">6 - Obeys commands</option>
              <option value="5">5 - Localising</option>
              <option value="4">4 - Normal flexion</option>
              <option value="3">3 - Abnormal flexion</option>
              <option value="2">2 - Extension</option>
              <option value="1">1 - None</option>
            </select>
          </div>
        </div>
        <div className={`p-4 text-sm font-bold text-center border-t border-slate-200 ${gcsTotal <= 8 ? 'bg-red-50 text-red-700' : gcsTotal <= 12 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {gcsTotal <= 8 ? 'Severe Brain Injury / Coma' : gcsTotal <= 12 ? 'Moderate Brain Injury' : 'Mild / No Brain Injury'}
        </div>
      </div>

      {/* qSOFA & Checklists */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity className="w-5 h-5 text-red-600"/> Quick SOFA (qSOFA)</h3>
          </div>
          <div className="p-5 space-y-4">
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input type="checkbox" className="w-5 h-5 text-blue-600" checked={qsofa.resp} onChange={e => setQsofa({...qsofa, resp: e.target.checked})} />
              <span className="font-medium text-slate-700">Respiratory rate ≥ 22 /min</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input type="checkbox" className="w-5 h-5 text-blue-600" checked={qsofa.mental} onChange={e => setQsofa({...qsofa, mental: e.target.checked})} />
              <span className="font-medium text-slate-700">Altered mental status (GCS &lt; 15)</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input type="checkbox" className="w-5 h-5 text-blue-600" checked={qsofa.sbp} onChange={e => setQsofa({...qsofa, sbp: e.target.checked})} />
              <span className="font-medium text-slate-700">Systolic blood pressure ≤ 100 mmHg</span>
            </label>
            
            {qsofaTotal >= 2 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-in zoom-in-95">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-red-800">High risk of poor outcome / ICU admission recommended (Score: {qsofaTotal}/3)</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h3 className="font-bold text-slate-800">Dynamic Symptom Checklist</h3>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {['Retrosternal Chest Pain', 'Radiating Arm Pain', 'Diaphoresis', 'Shortness of Breath', 'Rigors/Chills', 'Nausea', 'Syncope'].map(sym => (
                <button key={sym} className="px-3 py-1.5 border border-slate-300 rounded-full text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:bg-blue-100 focus:border-blue-600 focus:text-blue-800">
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabDiagnostics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* 12-Lead ECG Visualizer */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity className="w-5 h-5 text-slate-600"/> 12-Lead ECG Visualizer</h3>
          <span className="text-xs font-mono text-slate-500">Captured: 18 Sep 2026, 09:12 AM</span>
        </div>
        <div className="p-4 bg-rose-50/20 border-b border-slate-200 relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(#fecdd3 1px, transparent 1px), linear-gradient(90deg, #fecdd3 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          {/* Simulated ECG Waveform */}
          <svg className="w-full h-32 stroke-emerald-600" fill="none" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 L50,50 L60,40 L70,50 L80,50 L90,20 L100,90 L110,40 L120,50 L140,50 L160,30 L180,50 L250,50 L260,40 L270,50 L280,50 L290,20 L300,90 L310,40 L320,50 L340,50 L360,30 L380,50 L450,50 L460,40 L470,50 L480,50 L490,20 L500,90 L510,40 L520,50 L540,50 L560,30 L580,50 L650,50 L660,40 L670,50 L680,50 L690,20 L700,90 L710,40 L720,50 L740,50 L760,30 L780,50 L850,50 L860,40 L870,50 L880,50 L890,20 L900,90 L910,40 L920,50 L940,50 L960,30 L980,50 L1000,50" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="p-4 bg-slate-50">
          <p className="text-sm font-bold text-slate-900 mb-1">Automated Diagnostic Impression:</p>
          <p className="text-sm text-slate-700 leading-relaxed font-mono">
            Sinus tachycardia at 104 bpm. 2.5mm ST-segment elevation in Leads V2-V4. Hyperacute T-waves in aVL.<br/>
            <strong className="text-red-700">Impression: Consistent with acute anteroseptal myocardial infarction.</strong>
          </p>
        </div>
      </div>

      {/* Lab Panels */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Beaker className="w-5 h-5 text-blue-600"/> Comprehensive Diagnostic Panels</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="p-4 font-semibold">Parameter</th>
              <th className="p-4 font-semibold">Measured Value</th>
              <th className="p-4 font-semibold">Reference Interval</th>
              <th className="p-4 font-semibold">Status Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LAB_PANEL.map((lab, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{lab.param}</td>
                <td className="p-4">
                  <span className={`font-mono text-base ${lab.status === 'Critical' ? 'text-red-700 font-bold' : lab.status === 'High' ? 'text-amber-600 font-bold' : 'text-slate-900'}`}>
                    {lab.value} <span className="text-xs text-slate-500">{lab.unit}</span>
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600 font-mono">{lab.ref}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-md border ${
                    lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    lab.status === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>{lab.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabAIInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* AI Differential Engine */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-purple-600"/> Differential Diagnostic Engine</h3>
          <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-2 rounded">Decision Support</span>
        </div>
        <div className="p-5 space-y-4 flex-1">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
            <div className="flex justify-between items-start mb-2 ml-2">
              <h4 className="font-bold text-slate-900 text-lg">Acute Anteroseptal STEMI</h4>
              <span className="text-xl font-black text-red-600">92%</span>
            </div>
            <div className="ml-2 mt-3 space-y-3 text-sm">
              <div>
                <p className="font-bold text-slate-800 text-xs uppercase mb-1">Supporting Clinical Drivers</p>
                <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                  <li>ECG: 2.5mm STE in V2-V4</li>
                  <li>Troponin I: 0.14 ng/mL (Critical)</li>
                  <li>Symptom: Retrosternal Chest Pain</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-red-100">
                <p className="font-bold text-slate-800 text-xs uppercase mb-1">Required Actions</p>
                <p className="text-red-700 font-medium">Activate Cath Lab / PCI Protocol Immediately</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-amber-200 rounded-lg bg-amber-50/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
            <div className="flex justify-between items-start mb-2 ml-2">
              <h4 className="font-bold text-slate-900 text-lg">Acute Pulmonary Embolism</h4>
              <span className="text-xl font-black text-amber-600">68%</span>
            </div>
            <div className="ml-2 mt-2 space-y-2 text-sm">
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Tachycardia (104 bpm) & Tachypnea</li>
                <li>D-Dimer elevation (Pending)</li>
              </ul>
              <p className="text-amber-800 text-xs font-medium mt-2">Required Rule-Out: CT Angiography of Chest</p>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
            <div className="flex justify-between items-start ml-2">
              <h4 className="font-bold text-slate-900 text-lg">Acute Aortic Dissection</h4>
              <span className="text-xl font-black text-slate-500">35%</span>
            </div>
          </div>
        </div>
      </div>

      {/* GDMT Pathways */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600"/> Guideline-Directed Medical Therapy (GDMT)</h3>
        </div>
        <div className="p-5 flex-1 space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-bold text-emerald-900 mb-3 border-b border-emerald-200 pb-2">STEMI Immediate Protocol Checklist</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-900 font-medium">Emergent Cardiac Catheterization / PCI activation (Goal &lt; 90 min)</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-900 font-medium">Aspirin 162-325 mg chewed</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-900 font-medium">P2Y12 Inhibitor (e.g., Ticagrelor 180 mg oral)</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-900 font-medium">Anticoagulation (Heparin protocol / Bivalirudin)</span>
              </li>
            </ul>
          </div>
          <div className="mt-auto pt-4 flex items-start gap-2 text-xs text-slate-500 italic">
            <Info className="w-4 h-4 shrink-0" />
            Citation: ACC/AHA STEMI Guidelines 2023. Ensure no contraindications prior to administration.
          </div>
        </div>
      </div>
    </div>
  );
}

function TabMedications() {
  const [testMed, setTestMed] = useState('');
  const [interaction, setInteraction] = useState<string | null>(null);

  const checkInteraction = (val: string) => {
    setTestMed(val);
    if (val === 'Sildenafil') {
      setInteraction('FATAL: Co-administration with Nitroglycerin causes severe hypotension.');
    } else if (val === 'Penicillin') {
      setInteraction('ALLERGY: Patient has a documented allergy to Penicillin.');
    } else {
      setInteraction(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Pill className="w-5 h-5 text-blue-600"/> Active Medication Administration Record (MAR)</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="p-4 font-semibold">Drug Name</th>
              <th className="p-4 font-semibold">Dosage & Route</th>
              <th className="p-4 font-semibold">Frequency</th>
              <th className="p-4 font-semibold">Start Timestamp</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800">Nitroglycerin</td>
              <td className="p-4 text-slate-600">0.4 mg SL</td>
              <td className="p-4 text-slate-600">Q5min x 3 doses</td>
              <td className="p-4 text-slate-600 font-mono text-xs">18 Sep, 08:45</td>
              <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-200">Active</span></td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800">Aspirin</td>
              <td className="p-4 text-slate-600">325 mg PO (Chewed)</td>
              <td className="p-4 text-slate-600">Once</td>
              <td className="p-4 text-slate-600 font-mono text-xs">18 Sep, 08:35</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-amber-600"/> Real-Time Drug Interaction Sandbox</h3>
        </div>
        <div className="p-6">
          <div className="max-w-md space-y-4">
            <label className="block text-sm font-bold text-slate-700">Test New Medication Order</label>
            <select 
              className="w-full border border-slate-300 rounded-md p-2.5 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={testMed}
              onChange={(e) => checkInteraction(e.target.value)}
            >
              <option value="">-- Select drug to test --</option>
              <option value="Lisinopril">Lisinopril</option>
              <option value="Heparin">Heparin</option>
              <option value="Sildenafil">Sildenafil (Viagra)</option>
              <option value="Penicillin">Penicillin</option>
            </select>
          </div>

          {interaction && (
            <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3 animate-in zoom-in-95">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <h4 className="font-bold text-red-900 text-lg">Contraindication Detected</h4>
                <p className="text-red-700 font-medium">{interaction}</p>
                <button className="mt-3 px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 shadow-sm">Acknowledge Override Warning</button>
              </div>
            </div>
          )}
          {testMed && !interaction && (
             <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 font-medium animate-in zoom-in-95">
               <CheckCircle2 className="w-5 h-5 text-emerald-600"/> No known severe interactions or allergies detected.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabAnalytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Diagnostic Accuracy</p>
          <p className="text-3xl font-extrabold text-slate-900">94.8%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Door-to-Balloon (Median)</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-slate-900">42 <span className="text-sm font-medium text-slate-500">mins</span></p>
            <p className="text-xs text-amber-600 font-bold bg-amber-50 px-1 rounded">Target: &lt; 90</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Sepsis Early Detection</p>
          <p className="text-3xl font-extrabold text-slate-900">88.2%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Protocol Adherence</p>
          <p className="text-3xl font-extrabold text-emerald-600">96.4%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-600"/> Monthly Triage Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B'}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}}/>
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Bar dataKey="volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><LineChart className="w-5 h-5 text-emerald-600"/> CDSS Guideline Adoption Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B'}}/>
                <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748B'}}/>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Line type="monotone" dataKey="guidelineAdoption" stroke="#10B981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Emergency', msg: 'MRN-84920: Troponin I Critical (0.14 ng/mL). STEMI Protocol active.', time: 'Just now' },
    { id: 2, type: 'Warning', msg: 'MRN-11234: MAP dropped below 65 mmHg. Review vasopressors.', time: '5m ago' },
    { id: 3, type: 'System', msg: 'CDSS Core Engine update completed successfully.', time: '1h ago' }
  ]);

  const dismissAlert = (id: number) => setAlerts(alerts.filter(a => a.id !== id));

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Bell className="w-5 h-5 text-slate-600"/> Active Telemetry & System Notifications</h3>
          <button className="text-sm font-medium text-blue-600 hover:underline" onClick={() => setAlerts([])}>Clear All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No active alerts.</div>
          ) : alerts.map(alert => (
            <div key={alert.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
              <div className="shrink-0 mt-0.5">
                {alert.type === 'Emergency' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                 alert.type === 'Warning' ? <AlertCircle className="w-5 h-5 text-amber-500" /> :
                 <Info className="w-5 h-5 text-blue-500" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${alert.type === 'Emergency' ? 'text-red-800' : 'text-slate-800'}`}>{alert.msg}</p>
                <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
              </div>
              <button onClick={() => dismissAlert(alert.id)} className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded hover:bg-slate-100 text-slate-600 transition-colors">
                Acknowledge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabReports({ patient }: { patient: any }) {
  if (!patient) return null;
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex gap-4 mb-4">
        <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 shadow-sm rounded-md font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Printer className="w-4 h-4"/> Print Official Clinical Report
        </button>
        <button onClick={() => alert('Downloaded FHIR JSON')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 shadow-sm rounded-md font-medium text-white hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4"/> Export HL7/FHIR v4 JSON
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-10 print:shadow-none print:border-none print:p-0">
        <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start">
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Clinical Encounter Summary</h1>
             <p className="text-slate-500 font-medium mt-1">Generated by MediAssist AI • 18 Sep 2026, 10:45 AM</p>
           </div>
           <div className="text-right">
             <p className="font-bold text-slate-800">{patient.name}</p>
             <p className="text-sm text-slate-600">MRN: {patient.id}</p>
             <p className="text-sm text-slate-600">{patient.age}y {patient.sex} • Bed: {patient.bed}</p>
           </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1 mb-3">Admission Vitals</h2>
            <div className="grid grid-cols-4 gap-4 text-sm font-mono bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div><strong className="text-slate-700">HR:</strong> {patient.hr} bpm</div>
              <div><strong className="text-slate-700">BP:</strong> {patient.bp} mmHg</div>
              <div><strong className="text-slate-700">SpO2:</strong> {patient.spo2}%</div>
              <div><strong className="text-slate-700">Temp:</strong> 38.6 °C</div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1 mb-3">Diagnostic Findings</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>ECG:</strong> Sinus tachycardia. 2.5mm ST-segment elevation in V2-V4. Consistent with acute anteroseptal MI.<br/>
              <strong>Labs:</strong> Troponin I elevated at 0.14 ng/mL.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1 mb-3">CDSS AI Assessment</h2>
            <p className="text-sm text-slate-700 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
              <strong>Primary Consideration:</strong> Acute Anteroseptal STEMI (92% confidence based on telemetry and biomarker drivers).<br/>
              <strong>Recommended Pathway:</strong> Immediate Cath Lab activation and GDMT administration initiated.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
