import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Cpu, 
  Database, 
  Network, 
  KeyRound, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { SECURITY_AUDITS } from '../data/mockData';

interface ArchitectureSecurityProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate?: (sectionId: string) => void;
}

export const ArchitectureSecurity: React.FC<ArchitectureSecurityProps> = ({ onOpenPortal, onNavigate }) => {
  const [selectedLayer, setSelectedLayer] = useState<'ingress' | 'mesh' | 'data' | 'identity'>('mesh');

  const layers = [
    {
      id: 'ingress' as const,
      name: 'Global Edge & WAF Layer',
      icon: Network,
      tag: 'Anycast DNS / Cloudflare / WAF',
      description: 'DDoS mitigation with sub-millisecond route optimization, TLS 1.3 termination, and automated bot challenge solving.'
    },
    {
      id: 'mesh' as const,
      name: 'Zero-Trust Service Mesh & Ingress',
      icon: Server,
      tag: 'Envoy mTLS / Istio / SPIFFE',
      description: 'Every internal microservice communication is cryptographically authenticated and encrypted with short-lived X.509 certs.'
    },
    {
      id: 'data' as const,
      name: 'Distributed State & Cold Vaults',
      icon: Database,
      tag: 'PostgreSQL / Firestore / Cloud Storage',
      description: 'KMS customer-managed keys (CMK) with automated 90-day rotation, multi-region synchronous replication, and cold tier backups.'
    },
    {
      id: 'identity' as const,
      name: 'Context-Aware Identity & RBAC',
      icon: KeyRound,
      tag: 'OIDC / WebAuthn / ABAC',
      description: 'Fine-grained attribute-based access control with biometric MFA and zero persistent administrative privileges (Just-in-Time access).'
    }
  ];

  return (
    <section id="architecture" className="py-20 sm:py-28 bg-slate-900/50 border-y border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Zero-Trust Architecture & Security Engine
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Built on zero-trust principles. Verified in production.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenPortal('enterprise_client')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <span>Inspect in Live Portal</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Blueprint Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Layer Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
              Architectural Security Tiers
            </div>

            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = selectedLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive 
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {layer.name}
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {layer.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Inspection Canvas */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 font-mono relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-bold">SYSTEM POSTURE: HARDENED</span>
              </div>
              <span className="text-slate-500 text-[11px]">Audit Engine: Live Telemetry</span>
            </div>

            {/* Terminal View */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="text-slate-400 flex items-center gap-2">
                <span className="text-cyan-400">$</span>
                <span>rila-security verify --tier={selectedLayer} --strict</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-2 text-[11px]">
                <div className="text-cyan-400 font-bold">▶ Active Security Attestation:</div>
                <div className="text-slate-300">
                  {selectedLayer === 'ingress' && '✓ TLS 1.3 Strict Mode enforced. Zero SSLv3/TLS 1.0/1.1 accepted.'}
                  {selectedLayer === 'mesh' && '✓ Envoy proxy sidecars enrolled in mutual TLS (mTLS). SPIFFE identities verified.'}
                  {selectedLayer === 'data' && '✓ AES-256 GCM envelope encryption. Firestore & Postgres storage tiers segregated.'}
                  {selectedLayer === 'identity' && '✓ FIDO2 / WebAuthn hardware tokens active for all root architectural roles.'}
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Validation passed across 4 clusters in 18ms.</span>
                </div>
              </div>

              {/* Compliance Benchmarks Grid */}
              <div className="pt-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Institutional Certifications & Frameworks
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SECURITY_AUDITS.map((audit) => (
                    <div key={audit.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-200">{audit.framework}</span>
                        <span className="text-emerald-400 font-bold">{audit.score}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        {audit.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
