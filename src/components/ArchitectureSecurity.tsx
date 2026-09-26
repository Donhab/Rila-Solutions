import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, Server, RefreshCw, FileCheck, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { SECURITY_AUDITS } from '../data/mockData';

interface ArchitectureSecurityProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const ArchitectureSecurity: React.FC<ArchitectureSecurityProps> = ({ onOpenPortal, onNavigate }) => {
  // Interactive Security Posture Self-Assessment
  const [controls, setControls] = useState<{ [key: string]: boolean }>({
    mfa: true,
    mtls: true,
    kms: true,
    siem: true,
    ferpa: true,
    rbac: true,
    penTest: false,
    disasterRecovery: true
  });

  const toggleControl = (key: string) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCount = Object.values(controls).filter(Boolean).length;
  const totalCount = Object.keys(controls).length;
  const posturePercentage = Math.round((activeCount / totalCount) * 100);

  const securityPillars = [
    {
      title: 'Zero-Trust Network Architecture',
      description: 'Strict identity verification for every packet. No implicit trust inside the perimeter; mutual TLS (mTLS) with cryptographic SPIFFE/SPIRE certificates across all service endpoints.',
      stat: '100% mTLS Encrypted'
    },
    {
      title: 'Scalable Active-Active Multi-Region',
      description: 'Distributed Kubernetes clusters across AWS and Azure regions with sub-second health probes and automated Route53 / Cloudflare DNS traffic failover.',
      stat: '< 150ms Regional RTO'
    },
    {
      title: 'Hardware-Backed Key Cryptography',
      description: 'Envelope encryption utilizing AWS KMS and HashiCorp Vault. Automated 90-day key rotation and hardware security module (HSM) level 3 isolation.',
      stat: 'AES-256-GCM / ChaCha20'
    },
    {
      title: 'Auditable K-12 Student Privacy Fences',
      description: 'FERPA & COPPA compliant data tenancy. Strict isolation between school administrative records and student educational submissions with cryptographic data deletion guarantees.',
      stat: 'Zero Cross-Tenant Leakage'
    }
  ];

  return (
    <section id="architecture" className="py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Cybersecurity & Elastic Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Hardened by design. Scalable without limits.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Enterprise software and cloud systems cannot compromise on uptime or safety. We engineer architectures where security controls accelerate velocity rather than impeding it.
          </p>
        </div>

        {/* 2-Column Showcase: Architecture Image + Security Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Visual Asset Canvas */}
          <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 relative group">
            <img
              src="/src/assets/images/cybersecurity_shield_vault_1790425714057.jpg"
              alt="Rila Solutions cryptographic vault and zero-trust cloud infrastructure"
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                Cryptographic Control Plane
              </span>
              <p className="text-sm font-medium text-slate-200 mt-1">
                Air-gapped key management, role-based boundary policies, and immutable ledger audit trails.
              </p>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 space-y-4">
            {securityPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-white">
                    {pillar.title}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400 font-semibold tabular-nums shrink-0">
                    {pillar.stat}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Live Regulatory Compliance Grid */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-cyan-400" />
            <span>Continuous Regulatory Audit & Attestations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECURITY_AUDITS.map((audit) => (
              <div
                key={audit.id}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-white">{audit.framework}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3 w-3" />
                      {audit.status}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-cyan-400 font-semibold mb-2">
                    {audit.score}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {audit.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                  Verified: {audit.lastChecked}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Self-Assessment Posture Workbench */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Interactive Infrastructure Audit
              </div>
              <h3 className="text-2xl font-bold text-white">
                Zero-Trust Posture Verification Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Toggle your organization's active controls to evaluate production readiness and compliance confidence.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
              <div className="text-right">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Readiness Index</div>
                <div className="font-mono text-2xl font-extrabold text-white tabular-nums">
                  {posturePercentage}%
                </div>
              </div>
              <div className={`h-3 w-3 rounded-full ${posturePercentage >= 85 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'mfa', label: 'Hardware FIDO2 / MFA', desc: 'Enforced for all console & bastion access' },
              { key: 'mtls', label: 'Mutual TLS Service Mesh', desc: 'Encrypted microservice communication' },
              { key: 'kms', label: 'KMS Key Auto-Rotation', desc: '90-day HSM cryptographic rotation' },
              { key: 'siem', label: 'Immutable SIEM Logs', desc: 'WORM compliant audit trail storage' },
              { key: 'ferpa', label: 'FERPA/COPPA Privacy Fence', desc: 'Student PII data isolation' },
              { key: 'rbac', label: 'Least-Privilege RBAC', desc: 'Zero permanent root or admin tokens' },
              { key: 'penTest', label: 'Continuous DAST Scanning', desc: 'Automated vulnerability regression' },
              { key: 'disasterRecovery', label: 'Automated Multi-Region DR', desc: 'Active-active hot failover validated' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleControl(item.key)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  controls[item.key]
                    ? 'border-cyan-500/70 bg-cyan-950/20 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-200">{item.label}</span>
                  <div className={`h-4 w-4 rounded flex items-center justify-center text-[10px] ${
                    controls[item.key] ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-700'
                  }`}>
                    {controls[item.key] ? '✓' : ''}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span className="text-slate-300 font-semibold">{activeCount} of {totalCount} controls satisfied. </span>
              {posturePercentage === 100 
                ? 'Your deployment satisfies Enterprise Tier 1 Zero-Trust verification.'
                : 'Recommendations: Schedule automated penetration testing and review student data retention.'}
            </div>

            <button
              onClick={() => onOpenPortal('enterprise_client')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Examine Real Audit Evidence in Client Portal →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
