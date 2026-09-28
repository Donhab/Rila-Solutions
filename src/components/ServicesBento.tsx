import React from 'react';
import { 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  ArrowRight, 
  Server, 
  Zap, 
  Terminal, 
  Lock, 
  Database, 
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ServicesBentoProps {
  onOpenPortal?: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate?: (sectionId: string) => void;
  onSelectService?: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenPortal, onNavigate, onSelectService }) => {
  const handleScope = (service: string, sectionTarget?: string) => {
    if (onSelectService) {
      onSelectService(service);
    }
    if (onNavigate && sectionTarget) {
      onNavigate(sectionTarget);
    } else if (sectionTarget) {
      const el = document.getElementById(sectionTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Core Capabilities & Service Tracks
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Architectural rigor for enterprise systems & school ecosystems.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            From distributed fintech microservices with sub-20ms p99 SLAs to nationwide primary & secondary teacher digital empowerment.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Enterprise Multi-Region Cloud & Kubernetes (2 col) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Cloud className="h-6 w-6" />
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-cyan-300">
                  99.999% SLA Target
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Multi-Region Cloud Architecture & Kubernetes
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Active-active cloud topology on AWS, Google Cloud, and Azure. Automated GitOps pipelines, zero-downtime rolling canary deployments, and resilient multi-cluster disaster recovery orchestration.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Cross-Region Mesh</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Terraform & GitOps</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>mTLS Envoy Ingress</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Horizontal Pod Autoscaling</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleScope('Enterprise Cloud Architecture (Multi-Region / Kubernetes)', 'consultation')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <span>Select for Project Scope</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">Track: CLD-01</span>
            </div>
          </div>

          {/* Card 2: High-Concurrency Software & Microservices (1 col) */}
          <div className="md:col-span-1 lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                  <Cpu className="h-6 w-6" />
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-blue-300">
                  Sub-20ms p99
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Distributed Microservices & Event Streams
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Decoupled backend microservices built in Go, Rust, and TypeScript. Event streaming with Apache Kafka, Redis clustering, and relational Postgres / Cloud SQL high-throughput pipelines.
              </p>

              <div className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span>Kafka / Event Streaming</span>
                  <span className="text-emerald-400 font-bold">140k msg/s</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span>Redis Distributed Cache</span>
                  <span className="text-cyan-400 font-bold">&lt;1.8ms</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleScope('Distributed Microservices & Concurrency Core', 'consultation')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                <span>Select for Project Scope</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">Track: SFW-02</span>
            </div>
          </div>

          {/* Card 3: Zero-Trust Cybersecurity & Compliance (2 col) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-slate-800 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  SOC 2 & FERPA Hardened
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Zero-Trust IAM & Security Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Hardware-backed KMS key vaults, continuous posture validation, perimeter isolation, and child privacy safeguarding (COPPA/FERPA) for educational portals.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['mTLS Everywhere', 'Context-Aware IAM', 'Immutable SIEM Logs', 'KMS Encryption', 'NDPR & GDPR Compliant'].map(badge => (
                  <span key={badge} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleScope('Zero-Trust Cybersecurity & Audit', 'consultation')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <span>Select for Project Scope</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">Track: SEC-03</span>
            </div>
          </div>

          {/* Card 4: Primary & Secondary Educator Digital Literacy Academy (2 col) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-900/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 font-semibold">
                  School Transformation Hub
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                K-12 School & Educator Training Academy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Practical, immersive digital literacy cohorts for Primary and Secondary teachers. Mastering Canvas Cloud, Google Classroom, automated student rubrics, secure exam delivery, and student cyber safeguarding.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Verified Client: GSTC Garki Area 3 Abuja</span>
                  <span className="text-emerald-400 font-bold font-mono">100% Deployed</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Live index & campus portal deployed at <a href="https://gstcgarki.vercel.app/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">gstcgarki.vercel.app</a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleScope('Primary & Secondary Educator Training Academy', 'educator-academy')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <span>View Academy Modules & Cohorts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">Track: EDU-04</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
