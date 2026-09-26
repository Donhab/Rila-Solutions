import React, { useState } from 'react';
import { Calculator, ArrowRight, Server, Check, HelpCircle, GraduationCap, Shield } from 'lucide-react';

interface CostCalculatorProps {
  onSelectScope: (scopeSummary: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onSelectScope, onNavigate }) => {
  const [projectType, setProjectType] = useState<'cloud_enterprise' | 'edtech_schools' | 'hybrid_full'>('cloud_enterprise');
  const [scaleFactor, setScaleFactor] = useState<number>(3); // 1-5
  const [includeZeroTrust, setIncludeZeroTrust] = useState<boolean>(true);
  const [includeDisasterRecovery, setIncludeDisasterRecovery] = useState<boolean>(true);
  const [teacherCohorts, setTeacherCohorts] = useState<number>(2); // 1-10

  // Calculate dynamics
  let estimatedWeeks = 6;
  let teamComposition: string[] = [];
  let baseEstimate = '$18,000 - $24,000 / mo';
  let deliverableSummary = '';

  if (projectType === 'cloud_enterprise') {
    estimatedWeeks = 6 + scaleFactor * 2 + (includeDisasterRecovery ? 2 : 0);
    teamComposition = ['1 Principal Cloud Architect', '2 Senior DevOps / SREs', '1 Cybersecurity Specialist'];
    const minCost = 20000 + scaleFactor * 8000 + (includeZeroTrust ? 6000 : 0);
    const maxCost = minCost + 12000;
    baseEstimate = `$${(minCost / 1000).toFixed(0)}k - $${(maxCost / 1000).toFixed(0)}k / mo`;
    deliverableSummary = `Enterprise Cloud Infrastructure (Scale Tier ${scaleFactor}, Zero-Trust: ${includeZeroTrust ? 'Yes' : 'No'}, Multi-Region DR: ${includeDisasterRecovery ? 'Yes' : 'No'})`;
  } else if (projectType === 'edtech_schools') {
    estimatedWeeks = 4 + teacherCohorts * 1.5;
    teamComposition = ['1 Lead EdTech Architect', '2 Certified School Trainers', '1 LMS Integration Engineer'];
    const minCost = 12000 + teacherCohorts * 4500;
    const maxCost = minCost + 8000;
    baseEstimate = `$${(minCost / 1000).toFixed(0)}k - $${(maxCost / 1000).toFixed(0)}k Project`;
    deliverableSummary = `K-12 Educator LMS Training (${teacherCohorts} Primary/Secondary Cohorts, FERPA/COPPA Audited)`;
  } else {
    estimatedWeeks = 10 + scaleFactor * 2 + teacherCohorts;
    teamComposition = ['1 Principal Architect', '2 Senior Cloud Engineers', '2 EdTech Specialists', '1 Security Auditor'];
    const minCost = 32000 + scaleFactor * 7000 + teacherCohorts * 3000;
    const maxCost = minCost + 15000;
    baseEstimate = `$${(minCost / 1000).toFixed(0)}k - $${(maxCost / 1000).toFixed(0)}k / mo`;
    deliverableSummary = `Complete Enterprise Cloud + District-wide Educator Transformation`;
  }

  const handleApplyToConsultation = () => {
    onSelectScope(deliverableSummary + ` | Timeline: ~${estimatedWeeks} Weeks | Est: ${baseEstimate}`);
    onNavigate('consultation');
  };

  return (
    <section id="estimator" className="py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-2">
            <Calculator className="h-4 w-4" />
            <span>Interactive Scope & Architecture Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Transparent engineering estimates in minutes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Estimate team velocity, operational timelines, and infrastructure scopes tailored to your technical requirements or school district size.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-8">
            
            {/* Project Domain Switcher */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                1. Project Classification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'cloud_enterprise', label: 'Enterprise Cloud & Software', icon: Server },
                  { id: 'edtech_schools', label: 'School Educator Academy', icon: GraduationCap },
                  { id: 'hybrid_full', label: 'Enterprise + District Hybrid', icon: Shield }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setProjectType(item.id as any)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-cyan-500 bg-cyan-950/30 text-white' 
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`h-4 w-4 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scale Slider */}
            {projectType !== 'edtech_schools' && (
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono uppercase text-slate-400">
                    2. Infrastructure Throughput & Node Volume
                  </span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    Tier {scaleFactor} ({scaleFactor === 1 ? 'Startup / Single Region' : scaleFactor <= 3 ? 'Mid-Enterprise Multi-AZ' : 'High-Concurrency Global Mesh'})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>10k Daily Req</span>
                  <span>1M Daily Req</span>
                  <span>50M+ Req/day</span>
                </div>
              </div>
            )}

            {/* School Cohorts Slider */}
            {projectType !== 'cloud_enterprise' && (
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono uppercase text-slate-400">
                    {projectType === 'hybrid_full' ? '3.' : '2.'} School Training Cohorts (Primary & Secondary)
                  </span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    {teacherCohorts} Cohorts (~{teacherCohorts * 35} Educators)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={teacherCohorts}
                  onChange={(e) => setTeacherCohorts(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>Single School (35 Staff)</span>
                  <span>Consortium (180 Staff)</span>
                  <span>Metropolitan District (350+ Staff)</span>
                </div>
              </div>
            )}

            {/* Additional Security & Compliance Controls */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Security & Resilience Modules
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 cursor-pointer hover:border-slate-700">
                  <div className="text-xs">
                    <div className="font-semibold text-slate-200">Zero-Trust mTLS & Automated KMS Vault</div>
                    <div className="text-[11px] text-slate-400">Continuous posture enforcement and cryptographically signed deployments</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeZeroTrust}
                    onChange={(e) => setIncludeZeroTrust(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 cursor-pointer hover:border-slate-700">
                  <div className="text-xs">
                    <div className="font-semibold text-slate-200">Active-Active Multi-Region Disaster Recovery</div>
                    <div className="text-[11px] text-slate-400">Sub-minute automated cross-cloud failover validation</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeDisasterRecovery}
                    onChange={(e) => setIncludeDisasterRecovery(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-800/60 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                Preliminary Scope Blueprint
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Estimated Delivery Profile
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Sprint Timeline</div>
                <div className="text-2xl font-mono font-extrabold text-white tabular-nums mt-1">
                  ~{estimatedWeeks} Weeks
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">To full production launch</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Budget Envelope</div>
                <div className="text-xl font-mono font-extrabold text-cyan-400 tabular-nums mt-1">
                  {baseEstimate}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Transparent SOW</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Dedicated Engineering & Training Squad:
              </div>
              <ul className="space-y-1.5">
                {teamComposition.map((role, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Included Deliverables:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Full GitOps Terraform code, automated CI/CD pipelines, SOC 2/FERPA audit binders, and LMS educator workshop recordings.
              </p>
            </div>

            <button
              onClick={handleApplyToConsultation}
              className="w-full rounded-xl bg-cyan-400 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <span>Apply Blueprint to Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <p className="text-center text-[11px] text-slate-500">
              Zero obligation. Free 45-minute technical discovery session included.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
