import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  TestTube, 
  BrainCircuit, 
  Pill, 
  BarChart3, 
  BellRing, 
  FileText, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: ClipboardList, label: 'Clinical Assessments', path: '/assessments' },
  { icon: TestTube, label: 'Diagnostics', path: '/diagnostics' },
  { icon: BrainCircuit, label: 'AI Insights', path: '/insights' },
  { icon: Pill, label: 'Medications', path: '/medications' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: BellRing, label: 'Alerts', path: '/alerts' },
  { icon: FileText, label: 'Reports', path: '/reports' },
];

const bottomNavItems = [
  { icon: BellRing, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="text-primary text-2xl">🩺</span> MediAssist AI
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Clinical Decision Support</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-slate-200 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold">
            DA
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Dr. Alex</p>
            <p className="text-xs text-slate-500">Physician</p>
          </div>
        </div>
      </div>
    </div>
  );
}
