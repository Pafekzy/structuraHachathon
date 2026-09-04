import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  GitBranch, 
  HardHat, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock, 
  KeyRound,
  Check,
  Building,
  Sparkles,
  Fingerprint,
  LogIn
} from 'lucide-react';
import { ConstructionProject, NavigationTab, UserRole } from '../../types';

interface StakeholderPortalHubProps {
  project: ConstructionProject;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenAdvisorModal: () => void;
}

export const StakeholderPortalHub: React.FC<StakeholderPortalHubProps> = ({
  project,
  activeRole,
  onChangeRole,
  onNavigateTab,
  onOpenAdvisorModal,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const stakeholders: Array<{
    id: UserRole;
    tabTarget: NavigationTab;
    title: string;
    persona: string;
    badgeColor: string;
    clearanceLevel: string;
    icon: React.ReactNode;
    description: string;
    primaryMetrics: Array<{ label: string; value: string; detail: string }>;
    allowedAccess: string[];
    restrictedFrom: string[];
    actionLabel: string;
    accentGlow: string;
  }> = [
    {
      id: 'Owner / Client',
      tabTarget: 'stakeholder_owner',
      title: 'Owner & Investor Portal',
      persona: project.clientName || 'Crown Real Estate Holdings',
      clearanceLevel: 'LEVEL 4: FIDUCIARY & ESCROW AUTHORIZATION',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      accentGlow: 'border-amber-500/40 hover:border-amber-500 hover:shadow-amber-500/10',
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      description: 'Fiduciary capital management, dual-signatory escrow release PIN authorizations, live 4K site PTZ webcams, and turnkey asset handover.',
      primaryMetrics: [
        { label: 'Committed Capital', value: `$${project.totalBaselineBudgetUSD.toLocaleString()}`, detail: 'Fixed Cap' },
        { label: 'Escrow Reserves', value: `$${(project.totalBaselineBudgetUSD - project.actualCostIncurredUSD).toLocaleString()}`, detail: 'Protected Trust' },
        { label: 'Projected Value', value: `$${Math.round(project.totalBaselineBudgetUSD * 1.48).toLocaleString()}`, detail: '+48% Equity' }
      ],
      allowedAccess: [
        'Milestone Escrow Payout Dual-Signatory PIN Releases',
        '360° Turnkey 3D Architectural Model Visualizer',
        'Live 4K Pan-Tilt-Zoom (PTZ) Site Webcam Feeds',
        'Aesthetic & Budget Change-Order Approvals'
      ],
      restrictedFrom: [
        'Direct Field Workforce Dispatch & Subcontractor Claims',
        'Raw Engineering Rebar & Structural Calculation Edits',
        'Concrete Test Machine Calibration Logs'
      ],
      actionLabel: 'Authenticate as Owner / Client',
    },
    {
      id: 'Senior Project Director',
      tabTarget: 'stakeholder_director',
      title: 'Senior Project Director Hub',
      persona: 'Marcus Vance, AIA, PE (Lead PM)',
      clearanceLevel: 'LEVEL 4: ENGINEERING AUTHORITY & CRITICAL PATH',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      accentGlow: 'border-blue-500/40 hover:border-blue-500 hover:shadow-blue-500/10',
      icon: <GitBranch className="w-6 h-6 text-blue-500" />,
      description: 'Master EVM schedule critical path, technical RFI resolutions, cross-trade orchestration, and change-order simulations.',
      primaryMetrics: [
        { label: 'Schedule Index (SPI)', value: '1.04', detail: 'Ahead of Path' },
        { label: 'Cost Index (CPI)', value: '1.02', detail: 'Under Budget' },
        { label: 'Technical RFIs', value: '2 Open', detail: '1 Directive Pending' }
      ],
      allowedAccess: [
        'Master EVM Critical Path Gantt & Risk Simulation Engine',
        'Cross-Discipline Technical RFI Issuance & Clearances',
        'Executive Cockpit & Cross-Trade Coordination',
        'Project Estimator & Feasibility Wizard'
      ],
      restrictedFrom: [
        'Unilateral Escrow Capital Withdrawal Without Owner Co-Sign',
        'Subcontractor Trade Daily Shift Self-Certifications'
      ],
      actionLabel: 'Authenticate as Project Director',
    },
    {
      id: 'General Contractor',
      tabTarget: 'stakeholder_contractor',
      title: 'Prime General Contractor Station',
      persona: `${project.contractorName || 'Apex Urban Builders Ltd'} (Site Superintendent)`,
      clearanceLevel: 'LEVEL 3: SITE OPERATIONS & SUBCONTRACTOR DISPATCH',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      accentGlow: 'border-amber-500/40 hover:border-amber-500 hover:shadow-amber-500/10',
      icon: <HardHat className="w-6 h-6 text-amber-500" />,
      description: 'Daily workforce headcount, trade crew dispatch, crane & heavy plant operations, and milestone progress claim uploads.',
      primaryMetrics: [
        { label: 'Active Workforce', value: '38 Crew', detail: '5 Trade Teams' },
        { label: 'Safety Streak', value: '142 Days', detail: 'Zero Incidents' },
        { label: 'Laydown Capacity', value: '84% Full', detail: 'Glazing & Sika' }
      ],
      allowedAccess: [
        'Daily Workforce Headcount & Trade Shift Log Submission',
        'Crane & Heavy Plant Logistics Management',
        'Milestone Trade Progress Claim Dossier Uploads',
        'Toolbox Safety Meeting Records & Incident Reporting'
      ],
      restrictedFrom: [
        'Escrow Account Direct Payout Authorizations',
        'Modifying Architectural Contract Drawings',
        'Statutory Building Code Compliance Sign-Off'
      ],
      actionLabel: 'Authenticate as General Contractor',
    },
    {
      id: 'Structural QA/QC Auditor',
      tabTarget: 'stakeholder_qaqc',
      title: 'Independent Structural QA/QC Portal',
      persona: 'Dr. Henrik Lindqvist, PE (Lead Auditor)',
      clearanceLevel: 'LEVEL 4: INDEPENDENT LAB & CODE AUDIT AUTHORITY',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      accentGlow: 'border-emerald-500/40 hover:border-emerald-500 hover:shadow-emerald-500/10',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      description: 'Material laboratory cylinder crush test data, laser plumbness total station scans, and statutory code certifications.',
      primaryMetrics: [
        { label: 'QA Compliance', value: '98.4%', detail: 'ISO 17025 Spec' },
        { label: '28-Day Compressive', value: '42.8 MPa', detail: 'Exceeds 35 MPa' },
        { label: 'Laser Plumbness', value: '±1.2 mm', detail: 'Within Limits' }
      ],
      allowedAccess: [
        '7-Day & 28-Day Concrete Cylinder Compression Lab Curves',
        'Total Station Laser Plumbness & Level Survey Audits',
        'Non-Conformance Report (NCR) Remediation Protocol',
        'Phase Statutory Building Code Clearance Certificates'
      ],
      restrictedFrom: [
        'Financial Escrow Disbursements or Claim Reductions',
        'Re-scheduling Master Construction Milestones'
      ],
      actionLabel: 'Authenticate as Structural QA/QC',
    }
  ];

  const handleEnterSingleRole = (role: UserRole, targetTab: NavigationTab) => {
    onChangeRole(role);
    onNavigateTab(targetTab);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Hero Welcome Gateway */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a1727] to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 border border-amber-500/30">
              <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
              <span>Single-Role Access Gateway</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              PROJECT: <span className="text-white font-semibold">{project.name}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Select Your Role to Enter Portal
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Please choose your specific professional identity. Once authenticated, your session will be locked exclusively to that single stakeholder portal with tailored metrics, zero cross-role access leakage, and distinct governance permissions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Strict Role-Based Access Control (RBAC)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Single-Portal View</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Isolated Fiduciary & Technical Governance</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Dedicated Stakeholder Selection Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-500" />
            <span>Select One Stakeholder Role</span>
          </h2>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            1 Portal Session Active at a Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stakeholders.map((sh) => {
            return (
              <div
                key={sh.id}
                className={`bg-white dark:bg-[#091524] border rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group border-slate-200 dark:border-[#162c46] ${sh.accentGlow}`}
              >
                <div className="space-y-5">
                  {/* Top Role Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0e2136] border border-slate-200 dark:border-[#1b385a] group-hover:scale-105 transition-transform">
                        {sh.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${sh.badgeColor}`}>
                            {sh.id}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-amber-500 transition-colors">
                          {sh.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">{sh.persona}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clearance Badge */}
                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#07111c] border border-slate-200 dark:border-[#162b44] text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{sh.clearanceLevel}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sh.description}
                  </p>

                  {/* Primary Snapshot Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {sh.primaryMetrics.map((pm, pIdx) => (
                      <div key={pIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0b1b2d] border border-slate-200 dark:border-[#183352] space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">{pm.label}</span>
                        <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-mono">{pm.value}</div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 block truncate">{pm.detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Access Scope Breakdown: Allowed vs Restricted */}
                  <div className="space-y-3 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Granted Portal Modules:</span>
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                        {sh.allowedAccess.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 space-y-1">
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        <span>Access Boundaries (RBAC Protected):</span>
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Restricted from {sh.restrictedFrom.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-[#162c46]">
                  <button
                    onClick={() => handleEnterSingleRole(sh.id, sh.tabTarget)}
                    className="w-full py-3 rounded-xl bg-[#0B192C] dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-[#122c4a] dark:hover:bg-amber-400 font-extrabold text-xs transition duration-150 flex items-center justify-center gap-2 shadow-md group/btn"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{sh.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Stakeholder Real-Time Cross-Collaboration Ledger */}
      <div className="bg-white dark:bg-[#091524] border border-slate-200 dark:border-[#162c46] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-[#162c46] pb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Project Audit Trail & Multi-Role Governance</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live immutable stream of approvals, technical RFIs, laboratory crush tests, and contractor daily shift logs
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 w-fit">
            ● LIVE AUDIT LEDGER
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0c1c2e] border border-slate-200 dark:border-[#18324e] flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                  STRUCTURAL QA/QC AUDITOR
                </span>
                <span className="font-bold text-slate-900 dark:text-white">Dr. Henrik Lindqvist certified SGS Concrete Batch #CON-304</span>
                <span className="text-slate-400 text-[10px] font-mono">10:45 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                28-day concrete compressive breaks reached 42.8 MPa (exceeded 35.0 MPa baseline requirement). Phase 3 slab clearance issued.
              </p>
            </div>
            <button
              onClick={() => handleEnterSingleRole('Structural QA/QC Auditor', 'stakeholder_qaqc')}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline shrink-0 text-[11px] flex items-center gap-1"
            >
              <span>Login as QA/QC</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0c1c2e] border border-slate-200 dark:border-[#18324e] flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] border border-blue-500/20">
                  PROJECT DIRECTOR
                </span>
                <span className="font-bold text-slate-900 dark:text-white">Marcus Vance resolved RFI-084 for Facade Cantilever</span>
                <span className="text-slate-400 text-[10px] font-mono">09:30 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Approved 30mm horizontal bracket offset with supplementary 12mm hairpin rebar as per Detail SK-104.
              </p>
            </div>
            <button
              onClick={() => handleEnterSingleRole('Senior Project Director', 'stakeholder_director')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0 text-[11px] flex items-center gap-1"
            >
              <span>Login as Director</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0c1c2e] border border-slate-200 dark:border-[#18324e] flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] border border-amber-500/20">
                  GENERAL CONTRACTOR
                </span>
                <span className="font-bold text-slate-900 dark:text-white">Site Superintendent logged 38 tradesmen & Schüco delivery</span>
                <span className="text-slate-400 text-[10px] font-mono">07:15 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                16 triple-glazed crates safely stored in Laydown Yard Zone B; safety toolbox briefing completed with zero incidents.
              </p>
            </div>
            <button
              onClick={() => handleEnterSingleRole('General Contractor', 'stakeholder_contractor')}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline shrink-0 text-[11px] flex items-center gap-1"
            >
              <span>Login as Contractor</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
