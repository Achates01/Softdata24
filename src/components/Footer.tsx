import React from 'react';
import { Briefcase, ShieldCheck, Globe, Cpu, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white text-xs">
                SD
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                SoftData<span className="text-cyan-400">24</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-performance IT staffing, recruitment operations, and specialized engineering talent acquisition powered by neural matching algorithms.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              All systems operational · ATS Core v4.8
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Platform Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• AI-Driven Resume Parsing (Gemini 3.8 Flash)</li>
              <li>• Multi-Vector Candidate-Job Matching</li>
              <li>• Automated ATS Candidate Pipeline</li>
              <li>• LinkedIn & Indeed Syndication Hub</li>
              <li>• Automated Multi-Stage Email System</li>
            </ul>
          </div>

          {/* Delivery Hubs & Compliance */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Global Operations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Bangalore: Electronic City Tech Park</li>
              <li>• Hyderabad: HITEC City Cyber Towers</li>
              <li>• Pune: Hinjawadi Phase 2</li>
              <li>• US Operations: San Jose, CA</li>
              <li>• UK Center: London EC2</li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Enterprise Trust & Security
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 27001 & SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>GDPR & Equal Opportunity Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Sub-15ms Sourcing Query Index</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} SoftData24 & Software Experts India Enterprise Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">API Integration Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
