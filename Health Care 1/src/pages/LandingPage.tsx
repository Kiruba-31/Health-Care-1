import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Shield, Activity, FileSearch, ArrowRight, BrainCircuit, Users } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="border-b border-slate-200 py-4 px-8 flex justify-between items-center bg-white w-full">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-slate-900">MediAssist</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors">
            Login
          </Link>
          <Link to="/login" className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
          Clinical Decision Support <br />
          <span className="text-primary">for Healthcare Professionals</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-10">
          A traditional, secure, and robust platform to analyze patient symptoms, medical history, and diagnostic reports for faster, evidence-based clinical assessments.
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <Link to="/login" className="px-8 py-3 text-base font-semibold bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            Enter Portal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full text-left">
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-md">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Patient Records</h3>
            <p className="text-slate-600 text-sm">
              Securely manage patient demographics, medical history, and ongoing clinical assessments in a centralized database.
            </p>
          </div>
          
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-md">
            <FileSearch className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnostic Data</h3>
            <p className="text-slate-600 text-sm">
              Upload and structure laboratory reports and diagnostic imaging data for quick review and historical tracking.
            </p>
          </div>

          <div className="p-8 bg-slate-50 border border-slate-200 rounded-md">
            <BrainCircuit className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Decision Support</h3>
            <p className="text-slate-600 text-sm">
              Receive structured clinical considerations based on aggregated patient data to assist your professional judgment.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-slate-500 text-sm mt-auto">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Shield className="w-4 h-4" /> HIPAA Compliant Infrastructure
        </div>
        <p>© 2026 MediAssist Systems. For authorized healthcare providers only.</p>
      </footer>
    </div>
  );
}
