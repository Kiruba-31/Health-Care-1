import React from 'react';
import { 
  Activity, 
  HeartPulse, 
  Thermometer, 
  Wind, 
  Droplet,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  FileWarning
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Patient Summary Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Jane Doe</h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
              58F • PT-1024
            </span>
            <span className="px-3 py-1 bg-rose-100 text-rose-700 text-sm font-bold rounded-full border border-rose-200 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> STEMI / Sepsis Alert
            </span>
          </div>
          <p className="text-slate-600 text-sm">
            Admitted: 18 Sep 2026, 08:30 AM • Attending: Dr. Alex
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 mb-1">Current Status</p>
          <p className="text-lg font-bold text-rose-600">Critical Observation</p>
        </div>
      </div>

      {/* Real-time Vitals Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* HR */}
        <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <span className="font-medium text-sm">Heart Rate</span>
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded">High</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">118</span>
            <span className="text-sm text-slate-500">bpm</span>
          </div>
        </div>

        {/* BP */}
        <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Activity className="w-5 h-5 text-rose-500" />
              <span className="font-medium text-sm">Blood Pressure</span>
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded">Low</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">88/54</span>
            <span className="text-sm text-slate-500">mmHg</span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Droplet className="w-5 h-5 text-emerald-500" />
              <span className="font-medium text-sm">SpO₂</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Normal</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">96</span>
            <span className="text-sm text-slate-500">%</span>
          </div>
        </div>

        {/* Respiratory Rate */}
        <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Wind className="w-5 h-5 text-rose-500" />
              <span className="font-medium text-sm">Resp. Rate</span>
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded">High</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">24</span>
            <span className="text-sm text-slate-500">/min</span>
          </div>
        </div>

        {/* Temp */}
        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Thermometer className="w-5 h-5 text-amber-500" />
              <span className="font-medium text-sm">Body Temp</span>
            </div>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">Elevated</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">101.2</span>
            <span className="text-sm text-slate-500">°F</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Risk Scores & Alerts */}
        <div className="space-y-6">
          {/* Clinical Risk Scores */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Clinical Risk Scores
            </h3>
            
            <div className="space-y-4">
              {/* qSOFA Score */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-800">qSOFA Score</span>
                  <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded border border-rose-200">High Risk (2/3)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>
                <p className="text-xs text-slate-500">
                  Criteria met: Low BP (&lt;100 mmHg), High Resp Rate (≥22/min)
                </p>
              </div>

              {/* TIMI Risk Score */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-800">TIMI Risk Score</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded border border-amber-200">Moderate (4/7)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                </div>
                <p className="text-xs text-slate-500">
                  14-day risk of all-cause mortality, new MI, or severe ischemia: ~20%
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines / GDMT */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-primary" /> Recommended Pathways
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Sepsis 3-Hour Bundle</p>
                  <p className="text-xs text-slate-500">Initiate broad-spectrum antibiotics and fluid resuscitation (30ml/kg).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">STEMI Protocol (GDMT)</p>
                  <p className="text-xs text-slate-500">Consider immediate PCI capability check. Administer Aspirin 325mg if not given.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Differential Diagnosis */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" /> AI Differential Diagnosis
              </h3>
              <span className="text-xs text-slate-500 italic">Decision support only</span>
            </div>

            <div className="space-y-4">
              {/* DDx 1 */}
              <div className="border border-rose-200 rounded-lg p-4 bg-rose-50/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Severe Sepsis w/ Septic Shock</h4>
                    <p className="text-sm text-slate-600">Primary consideration requiring immediate evaluation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-rose-600">85%</span>
                    <p className="text-xs text-slate-500">Probability</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border border-rose-100 text-sm">
                  <p className="font-semibold text-slate-800 mb-1">Clinical Justification:</p>
                  <ul className="list-disc pl-5 text-slate-600 space-y-1">
                    <li>Hypotension (88/54) unresponsive to initial fluids</li>
                    <li>Tachycardia (118 bpm) and Tachypnea (24/min)</li>
                    <li>Elevated temperature (101.2°F)</li>
                    <li>qSOFA score &ge; 2</li>
                  </ul>
                </div>
              </div>

              {/* DDx 2 */}
              <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Acute Myocardial Infarction (STEMI)</h4>
                    <p className="text-sm text-slate-600">Secondary consideration based on telemetry</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-amber-600">62%</span>
                    <p className="text-xs text-slate-500">Probability</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border border-amber-100 text-sm">
                  <p className="font-semibold text-slate-800 mb-1">Clinical Justification:</p>
                  <ul className="list-disc pl-5 text-slate-600 space-y-1">
                    <li>Pending Troponin results</li>
                    <li>Patient age and reported chest discomfort prior to admission</li>
                    <li>Hypotension could be cardiogenic in origin</li>
                  </ul>
                </div>
              </div>

              {/* DDx 3 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Pulmonary Embolism</h4>
                    <p className="text-sm text-slate-600">Alternative consideration</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-600">30%</span>
                    <p className="text-xs text-slate-500">Probability</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                  <p className="font-semibold text-slate-800 mb-1">Clinical Justification:</p>
                  <ul className="list-disc pl-5 text-slate-600 space-y-1">
                    <li>Tachycardia and tachypnea present</li>
                    <li>However, SpO₂ remains stable at 96% on room air</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
