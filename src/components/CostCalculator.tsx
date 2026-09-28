import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Cloud, 
  GraduationCap, 
  ShieldCheck, 
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface CostCalculatorProps {
  onSelectScope?: (summary: string) => void;
  onNavigate?: (sectionId: string) => void;
  onEstimateReady?: (summary: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onSelectScope, onNavigate, onEstimateReady }) => {
  const [track, setTrack] = useState<'enterprise' | 'education'>('enterprise');

  // Enterprise track controls
  const [cloudScale, setCloudScale] = useState<'standard' | 'multi_region' | 'global_mesh'>('multi_region');
  const [concurrency, setConcurrency] = useState<'medium' | 'high' | 'ultra'>('high');
  const [securityTier, setSecurityTier] = useState<'soc2' | 'zero_trust_strict'>('zero_trust_strict');

  // Education track controls
  const [teacherCount, setTeacherCount] = useState<number>(45);
  const [schoolTier, setSchoolTier] = useState<'primary' | 'secondary' | 'district'>('secondary');
  const [lmsSelection, setLmsSelection] = useState<'canvas' | 'google' | 'hybrid'>('canvas');

  // Calculate enterprise estimates
  const getEnterpriseEstimate = () => {
    let baseTimeWeeks = 4;
    let basePriceMin = 4500;
    let basePriceMax = 9500;

    if (cloudScale === 'multi_region') {
      baseTimeWeeks += 3;
      basePriceMin += 3500;
      basePriceMax += 7000;
    } else if (cloudScale === 'global_mesh') {
      baseTimeWeeks += 6;
      basePriceMin += 7500;
      basePriceMax += 15000;
    }

    if (concurrency === 'high') {
      basePriceMin += 2000;
      basePriceMax += 4000;
    } else if (concurrency === 'ultra') {
      basePriceMin += 5000;
      basePriceMax += 9000;
    }

    if (securityTier === 'zero_trust_strict') {
      basePriceMin += 2500;
      basePriceMax += 4500;
    }

    return {
      weeks: baseTimeWeeks,
      min: basePriceMin,
      max: basePriceMax,
      deliverables: [
        'Hardened Terraform & GitOps Infrastructure Repository',
        'Active-Active Multi-Region Cluster Architecture',
        'Zero-Trust Envoy Ingress & Automated Secret Rotation',
        '30-Day Engineering Warranty & 24/7 SLA Handover'
      ]
    };
  };

  // Calculate education estimates
  const getEducationEstimate = () => {
    const weeks = Math.ceil(teacherCount / 30) + 2;
    const costPerTeacher = schoolTier === 'district' ? 65 : schoolTier === 'secondary' ? 85 : 75;
    const min = Math.max(1200, teacherCount * costPerTeacher);
    const max = Math.round(min * 1.35);

    return {
      weeks,
      min,
      max,
      deliverables: [
        `Direct In-Person & Cloud Lab Cohorts for ${teacherCount} Educators`,
        `Customized ${lmsSelection.toUpperCase()} LMS Rubrics & Template Systems`,
        'Student Data Privacy & Child Safeguarding Compliance Audit',
        'Official Rila Academy Teacher Master Certification'
      ]
    };
  };

  const currentEnterprise = getEnterpriseEstimate();
  const currentEducation = getEducationEstimate();

  const handleApplyEstimate = () => {
    const summary = track === 'enterprise'
      ? `Enterprise Architecture Track: ${cloudScale.toUpperCase()} scale, ${concurrency.toUpperCase()} concurrency, ${securityTier.toUpperCase()} security (${currentEnterprise.weeks} weeks timeline, est. $${currentEnterprise.min.toLocaleString()} - $${currentEnterprise.max.toLocaleString()})`
      : `Educator Academy Track: ${teacherCount} teachers, ${schoolTier.toUpperCase()} school tier, ${lmsSelection.toUpperCase()} LMS (${currentEducation.weeks} weeks cohort, est. $${currentEducation.min.toLocaleString()} - $${currentEducation.max.toLocaleString()})`;

    if (onSelectScope) {
      onSelectScope(summary);
    }
    if (onEstimateReady) {
      onEstimateReady(summary);
    }

    if (onNavigate) {
      onNavigate('consultation');
    } else {
      const formEl = document.getElementById('consultation');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Transparent Scoping & Value Estimator
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Plan your cloud architecture or school cohort.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Instant transparent scope and investment benchmarks tailored for corporate IT teams and school district administrators.
          </p>
        </div>

        {/* Track Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-slate-900 p-1.5 border border-slate-800">
            <button
              onClick={() => setTrack('enterprise')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                track === 'enterprise' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cloud className="h-4 w-4" />
              <span>Enterprise Cloud & Systems</span>
            </button>
            <button
              onClick={() => setTrack('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                track === 'education' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>School & Educator Academy</span>
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Area (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            
            {track === 'enterprise' ? (
              <>
                {/* Enterprise Cloud Scale */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Cluster Topology & Redundancy
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'standard', label: 'Single Region', sub: 'Sub-99.9% HA' },
                      { id: 'multi_region', label: 'Multi-Region Mesh', sub: '99.999% SLA' },
                      { id: 'global_mesh', label: 'Global Distributed', sub: 'Cross-Continent' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCloudScale(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          cloudScale === item.id 
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concurrency Load */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Peak Transaction Throughput
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'medium', label: 'Up to 25k msg/s', sub: 'Core Business' },
                      { id: 'high', label: '100k - 500k msg/s', sub: 'Fintech / Telecom' },
                      { id: 'ultra', label: '1M+ msg/s', sub: 'Global Telemetry' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setConcurrency(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          concurrency === item.id 
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security Framework */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Security Baseline
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'soc2', label: 'SOC 2 & ISO 27001', sub: 'Standard Enterprise Compliance' },
                      { id: 'zero_trust_strict', label: 'Zero-Trust Strict (mTLS & HSM)', sub: 'Banking & Military-Grade' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSecurityTier(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          securityTier === item.id 
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Educator Count Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Participating Teachers & Administrators
                    </label>
                    <span className="font-mono text-emerald-400 font-bold text-base">
                      {teacherCount} Educators
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={teacherCount}
                    onChange={(e) => setTeacherCount(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>10 Teachers (Single Department)</span>
                    <span>500+ (Full District)</span>
                  </div>
                </div>

                {/* School Tier */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Educational Institution Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'primary', label: 'Primary / Basic', sub: 'Ages 5 - 11' },
                      { id: 'secondary', label: 'Secondary / High School', sub: 'Ages 11 - 18' },
                      { id: 'district', label: 'District / Multi-Campus', sub: '5+ Campuses' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSchoolTier(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          schoolTier === item.id 
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target LMS */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Learning Management System (LMS)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'canvas', label: 'Canvas Cloud LMS', sub: 'Institutional Standard' },
                      { id: 'google', label: 'Google Classroom & AI', sub: 'Workspace for Edu' },
                      { id: 'hybrid', label: 'Microsoft Teams & STEM', sub: 'Technical Schools' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setLmsSelection(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          lmsSelection === item.id 
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Breakdown & Scope Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Calculated Scope Breakdown
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {track === 'enterprise' ? 'SLA Tier: Platinum' : 'Certified Cohort'}
                </span>
              </div>

              {/* Estimated Investment Range */}
              <div className="my-6">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Estimated Investment Benchmark
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-mono tracking-tight">
                  ${(track === 'enterprise' ? currentEnterprise.min : currentEducation.min).toLocaleString()}
                  <span className="text-slate-500 text-lg font-normal"> - </span>
                  ${(track === 'enterprise' ? currentEnterprise.max : currentEducation.max).toLocaleString()}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>Timeline: ~{track === 'enterprise' ? currentEnterprise.weeks : currentEducation.weeks} Delivery Weeks</span>
                  <span>·</span>
                  <span className="text-emerald-400">Fixed-Price Milestone Model</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Included Architectural Deliverables:
                </div>
                {(track === 'enterprise' ? currentEnterprise.deliverables : currentEducation.deliverables).map((del, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <button
                onClick={handleApplyEstimate}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Export Estimate to Consultation Inquiry</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2 font-mono">
                No commitment required · Instant routing to principal engineers
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
