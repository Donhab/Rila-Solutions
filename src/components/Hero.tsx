import React from 'react';
import { ArrowRight, ShieldCheck, Server, GraduationCap, Lock, CheckCircle2 } from 'lucide-react';
import { HeroSlider } from './HeroSlider';

interface HeroProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPortal, onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-20 sm:pt-6 sm:pb-28">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 5-Image Interactive Showcase Slider: At the top of the page */}
        <div className="mb-10 sm:mb-14">
          <HeroSlider 
            onOpenPortal={onOpenPortal} 
            onNavigate={onNavigate} 
          />
        </div>

        {/* Category metadata & Direct Contact Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-cyan-400">
            <span>Enterprise Cloud Systems</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Zero-Trust Cybersecurity</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>K-12 EdTech Transformation</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/50 backdrop-blur-md px-3.5 py-1 text-xs text-slate-300 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-300">Call or WhatsApp us @</span>
            <a 
              href="tel:+2349150480873" 
              className="font-mono text-white font-bold hover:text-cyan-300 transition-colors"
              title="Call +2349150480873"
            >
              +2349150480873
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="https://wa.me/2349150480873" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors underline decoration-emerald-500/50"
              title="Open WhatsApp chat"
            >
              WhatsApp
            </a>
          </div>
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

      </div>
    </section>
  );
};
