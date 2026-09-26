import React from 'react';
import { ArrowRight, ShieldCheck, Server, GraduationCap, Lock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPortal, onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed category metadata with typographic separator (Anti-slop Zero-Pill) */}
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-cyan-400 mb-6">
          <span>Enterprise Cloud Systems</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Zero-Trust Cybersecurity</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>K-12 EdTech Transformation</span>
        </div>

        {/* Main headline with text-wrap: balance */}
        <div className="max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08] [text-wrap:balance]">
            Engineering mission-critical cloud software. Empowering the educators of tomorrow.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
            Rila Solutions architectures resilient multi-cloud infrastructures and enterprise software systems built for zero-trust cybersecurity and infinite scale. In parallel, our dedicated academy trains Primary and Secondary school educators in digital literacy and cloud-native LMS workflows.
          </p>
        </div>

        {/* Action button cluster */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('services')}
            className="group inline-flex items-center gap-2.5 rounded-lg bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
          >
            <span>Explore Architecture & Services</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onOpenPortal('enterprise_client')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:border-slate-500 hover:bg-slate-800 cursor-pointer"
          >
            <Lock className="h-4 w-4 text-cyan-400" />
            <span>Launch Secure Client Portal</span>
          </button>

          <button
            onClick={() => onNavigate('educator-academy')}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-800/60 bg-cyan-950/40 px-5 py-3.5 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-900/50 hover:border-cyan-600 cursor-pointer"
          >
            <GraduationCap className="h-4 w-4 text-cyan-400" />
            <span>School Educator Training</span>
          </button>
        </div>

        {/* Claim-to-Proof Quantitative Adjacency Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-slate-800/80 pt-8">
          <div>
            <div className="font-mono text-3xl font-extrabold text-white tabular-nums tracking-tight">
              99.999%
            </div>
            <div className="mt-1 text-sm font-medium text-slate-400">
              Verified Production Uptime SLA
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Active-active multi-region failover across AWS & Azure with automated mTLS.
            </p>
          </div>

          <div>
            <div className="font-mono text-3xl font-extrabold text-cyan-400 tabular-nums tracking-tight">
              Zero-Trust
            </div>
            <div className="mt-1 text-sm font-medium text-slate-400">
              SOC 2 Type II, ISO 27001 & FERPA
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Hardware-backed KMS encryption, immutable SIEM logging & isolated student data vaults.
            </p>
          </div>

          <div>
            <div className="font-mono text-3xl font-extrabold text-white tabular-nums tracking-tight">
              14,200+
            </div>
            <div className="mt-1 text-sm font-medium text-slate-400">
              Educators Certified Across 340+ Schools
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Primary & Secondary teacher digital literacy, Canvas & Google Classroom mastery.
            </p>
          </div>
        </div>

        {/* Marquee Hero Image Canvas with fallback */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl relative group">
          <img
            src="/src/assets/images/hero_cloud_datacenter_1790425680373.jpg"
            alt="Rila Solutions mission critical enterprise cloud infrastructure"
            className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Resilient fallback container
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-slate-900', 'to-slate-950', 'h-96');
                const placeholder = document.createElement('div');
                placeholder.className = 'text-center p-8';
                placeholder.innerHTML = '<div class="text-cyan-400 font-bold text-xl mb-2">Rila Solutions Enterprise Cloud</div><div class="text-slate-400 text-sm">Zero-Trust Cloud Architecture & Operations</div>';
                parent.appendChild(placeholder);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                System Architecture Showcase
              </span>
              <p className="text-sm font-medium text-slate-200 mt-1">
                Zero-Trust Kubernetes control planes with automated policy-as-code enforcement and sub-50ms global latency routing.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 pointer-events-auto">
              <button
                onClick={() => onOpenPortal('enterprise_client')}
                className="rounded-lg bg-slate-900/90 border border-slate-700 px-3 py-1.5 font-medium text-slate-200 hover:text-white hover:border-cyan-400 transition-colors"
              >
                Inspect Live Telemetry in Portal →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
