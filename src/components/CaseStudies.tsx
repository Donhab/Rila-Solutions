import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Globe, 
  Sparkles, 
  X, 
  School, 
  ShieldCheck, 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw,
  Lock
} from 'lucide-react';

interface CaseStudiesProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenPortal, onNavigate }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const gstcProject = CASE_STUDIES.find(c => c.id === 'case-gstc');

  return (
    <section id="case-studies" className="py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Created Projects & Client Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Projects we have created & deployed.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Explore live production web apps, public educational portals, and enterprise-grade cloud systems architected and maintained by Rila Solutions.
          </p>
        </div>

        {/* Featured Live Deployment Showcase Banner: GSTC Garki */}
        <div className="mb-14 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Production Deployment
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono">
                  Educational & Technical Portal
                </span>
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-semibold">
                  Powered by:©Rila Solutions
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Government Science and Technical College (GSTC Garki, Abuja)
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                A modern, responsive digital campus portal engineered for secondary and technical students, vocational training departments, admission guidelines, staff management, and official institutional announcements in the Federal Capital Territory.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Sub-second mobile loading
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Full department & curriculum index
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Live 24/7 on Vercel Edge
                </span>
              </div>
            </div>

            {/* Direct Project Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[280px]">
              {/* Primary: Open GSTC Index Page */}
              <a
                href="https://gstcgarki.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all group/btn cursor-pointer"
                title="Open GSTC Garki Index Page (gstcgarki.vercel.app)"
              >
                <Globe className="h-4 w-4" />
                <span>Open GSTC Garki Index Page</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>

              {/* Secondary: Preview Index In-App */}
              <button
                onClick={() => setLivePreviewUrl('https://gstcgarki.vercel.app/')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Monitor className="h-3.5 w-3.5 text-emerald-400" />
                <span>Interactive Live Index Preview</span>
              </button>

              {/* Tertiary: Architecture Case Study */}
              <button
                onClick={() => {
                  if (gstcProject) setSelectedCase(gstcProject);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Read Project Architecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Case Studies Cards Grid (4 items: GSTC Garki + 3 Enterprise Cases) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border ${
                item.liveUrl ? 'border-emerald-500/40 bg-slate-900/80' : 'border-slate-800 bg-slate-900/60'
              } overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group`}
            >
              <div>
                {/* Visual card header */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-md px-2.5 py-1 text-[11px] font-mono text-cyan-400">
                      {item.industry}
                    </span>
                    {item.liveUrl && (
                      <span className="bg-emerald-950/90 border border-emerald-500/50 rounded-md px-2 py-0.5 text-[11px] font-mono text-emerald-300 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Link
                      </span>
                    )}
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

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2.5">
                {item.liveUrl && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-emerald-950/90 border border-emerald-600 hover:bg-emerald-900 text-emerald-300 py-2.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`Open Index Page: ${item.liveUrl}`}
                    >
                      <Globe className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Open GSTC Garki Index Page</span>
                      <ExternalLink className="h-3 w-3 text-emerald-400" />
                    </a>

                    <button
                      onClick={() => setLivePreviewUrl(item.liveUrl || 'https://gstcgarki.vercel.app/')}
                      className="rounded-lg border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-200 py-2.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Preview index page in interactive modal"
                    >
                      <Monitor className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Live Preview</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCase(item)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Live Index Page In-App Viewer Modal */}
        {livePreviewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
              
              {/* Browser Mockup Top Chrome Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                    GSTC Garki Digital Campus · Live Index Page
                  </span>
                </div>

                {/* Simulated URL Bar */}
                <div className="flex-1 max-w-md mx-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                    <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">https://gstcgarki.vercel.app/</span>
                    <button
                      onClick={() => setIframeKey(k => k + 1)}
                      className="ml-auto text-slate-400 hover:text-white"
                      title="Reload Index Page"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Right controls: Device Switcher, Open Tab & Close */}
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-1 border border-slate-800 bg-slate-900 p-1 rounded-lg">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                      title="Desktop view"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-1 rounded ${previewDevice === 'tablet' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                      title="Tablet view"
                    >
                      <Tablet className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                      title="Mobile view"
                    >
                      <Smartphone className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <a
                    href="https://gstcgarki.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
                    title="Open in new browser tab"
                  >
                    <span>Open in Tab</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    onClick={() => setLivePreviewUrl(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    aria-label="Close live preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Viewport Container with Responsive Max Width */}
              <div className="flex-1 bg-slate-950/90 flex items-center justify-center p-1 sm:p-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-lg overflow-hidden border border-slate-800 bg-white ${
                    previewDevice === 'desktop' ? 'w-full' : previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={livePreviewUrl}
                    title="GSTC Garki Live Index Page"
                    className="w-full h-full border-0"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>

              {/* Sub-bar footer with quick jump */}
              <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GSTC Garki Government Science & Technical College School Portal</span>
                </div>
                <a
                  href="https://gstcgarki.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Launch full index page at gstcgarki.vercel.app</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

            </div>
          </div>
        )}

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

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Detailed Case Study · {selectedCase.industry}
                </span>
                {selectedCase.liveUrl && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-[10px]">
                    Live in Production
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white pr-8">
                {selectedCase.title}
              </h3>
              
              <div className="mt-2 text-sm text-slate-400">
                Client: <strong className="text-white">{selectedCase.client}</strong>
              </div>

              {/* Live Link Callout inside Modal if available */}
              {selectedCase.liveUrl && (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-700/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-emerald-200 flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Live project index page: <strong>{selectedCase.liveUrl}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const url = selectedCase.liveUrl;
                        setSelectedCase(null);
                        setLivePreviewUrl(url || 'https://gstcgarki.vercel.app/');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-600 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <Monitor className="h-3 w-3" />
                      <span>Interactive Preview</span>
                    </button>

                    <a
                      href={selectedCase.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      <span>Open GSTC Garki Index Page</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Audited Result / Status</div>
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
                <div className="flex flex-wrap items-center gap-3">
                  {selectedCase.liveUrl && (
                    <a
                      href={selectedCase.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Open GSTC Index Page</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      const role = (selectedCase.id === 'case-2' || selectedCase.id === 'case-gstc') 
                        ? 'educator_admin' 
                        : 'enterprise_client';
                      setSelectedCase(null);
                      onOpenPortal(role);
                    }}
                    className="rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
                  >
                    View Related Artifacts in Portal
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
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
