import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';
import { CheckCircle2, ArrowRight, ExternalLink, Building, X } from 'lucide-react';

interface CaseStudiesProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenPortal, onNavigate }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Proven Enterprise & Educational Impact
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Measurable outcomes. Zero marketing hyperbole.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Real deployments in production. From mission-critical banking infrastructure to district-wide educator digital training cohorts.
          </p>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Visual card header */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-md px-2.5 py-1 text-[11px] font-mono text-cyan-400">
                    {item.industry}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-mono text-2xl font-extrabold text-white tabular-nums tracking-tight">
                      {item.metric}
                    </div>
                    <div className="text-xs text-cyan-300 font-medium">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-bold text-slate-400 mb-1">
                    {item.client}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {item.challenge}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-slate-800/80 pt-4">
                    {item.outcomes.map((out, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedCase(item)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Read In-Depth Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth Case Study */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                aria-label="Close case study modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Detailed Case Study · {selectedCase.industry}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white pr-8">
                {selectedCase.title}
              </h3>
              
              <div className="mt-2 text-sm text-slate-400">
                Client: <strong className="text-white">{selectedCase.client}</strong>
              </div>

              <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Audited Result</div>
                  <div className="text-2xl font-mono font-extrabold text-cyan-400 tabular-nums">
                    {selectedCase.metric}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-300">
                  {selectedCase.metricLabel}
                </div>
              </div>

              <div className="space-y-6 text-sm text-slate-300">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                    The Architectural Challenge
                  </h4>
                  <p className="leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800/80">
                    {selectedCase.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                    The Rila Solutions Implementation
                  </h4>
                  <p className="leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800/80">
                    {selectedCase.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                    Production Outcomes & Audits
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.outcomes.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const role = selectedCase.id === 'case-2' ? 'educator_admin' : 'enterprise_client';
                    setSelectedCase(null);
                    onOpenPortal(role);
                  }}
                  className="rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  View Related Artifacts in Client Portal
                </button>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
