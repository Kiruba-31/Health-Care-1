import React from "react";
import { SignInButton, Show } from "@clerk/react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem("userRole", role);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-3 text-white">MediAssist AI Healthcare</h1>
      <p className="text-slate-400 mb-10 text-lg">Select your portal to continue</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Patient Portal */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-cyan-500 transition">
          <div className="text-5xl mb-4">🩺</div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Patient</h2>
          <p className="text-slate-400 text-sm mb-6">
            View appointments, personal health telemetry, and prescription history.
          </p>
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button
                onClick={() => handleRoleSelect("PATIENT")}
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition cursor-pointer"
              >
                Sign In as Patient
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <button
              onClick={() => {
                handleRoleSelect("PATIENT");
                navigate("/dashboard");
              }}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Continue as Patient
            </button>
          </Show>
        </div>

        {/* Doctor Portal */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-emerald-500 transition">
          <div className="text-5xl mb-4">👨‍⚕️</div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Doctor</h2>
          <p className="text-slate-400 text-sm mb-6">
            Monitor real-time patient vitals, clinical alerts, and diagnostics.
          </p>
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button
                onClick={() => handleRoleSelect("DOCTOR")}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition cursor-pointer"
              >
                Sign In as Doctor
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <button
              onClick={() => {
                handleRoleSelect("DOCTOR");
                navigate("/dashboard");
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Continue as Doctor
            </button>
          </Show>
        </div>

        {/* Admin Portal */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-purple-500 transition">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Admin</h2>
          <p className="text-slate-400 text-sm mb-6">
            Manage hospital staff, system permissions, and audit logs.
          </p>
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button
                onClick={() => handleRoleSelect("ADMIN")}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition cursor-pointer"
              >
                Sign In as Admin
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <button
              onClick={() => {
                handleRoleSelect("ADMIN");
                navigate("/dashboard");
              }}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Continue as Admin
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
}
