import React, { useState } from 'react';
import { Cloud, Code, ShieldCheck, GraduationCap, ArrowUpRight, Cpu, Database, CheckCircle2, Layers } from 'lucide-react';

interface ServicesBentoProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenPortal, onNavigate }) => {
  const [selectedService, setSelectedService] = useState<number>(0);

  const services = [
    {
      index: '01',
      title: 'Cloud Infrastructure & High-Availability DevOps',
      subtitle: 'Multi-Cloud Orchestration & Scalable Control Planes',
      description: 'We engineer multi-region Kubernetes topologies and declarative infrastructure-as-code pipelines that scale smoothly under intense transactional spikes with guaranteed 99.999% uptime.',
      features: [
        'Multi-Cloud & Hybrid Architectures (AWS, Azure, Google Cloud)',
        'Containerization & Kubernetes (EKS/AKS/GKE) with GitOps automation',
        'Infrastructure-as-Code via Terraform, OpenTofu & Pulumi',
        'Sub-second autoscaling and cross-region database replication'
      ],
      deliverable: 'Terraform blueprints, 99.999% SLA SLAs, and 24/7 SRE playbooks'
    },
    {
      index: '02',
      title: 'Enterprise Software Engineering & Microservices',
      subtitle: 'Distributed Systems Engineered for Concurrency & Speed',
      description: 'From high-throughput payment gateways to complex distributed inventory engines, our software engineers build resilient, test-driven systems designed for decades of maintainability.',
      features: [
        'Event-Driven Microservices utilizing Apache Kafka & RabbitMQ',
        'High-concurrency backends engineered in Go, Rust, Java, and TypeScript',
        'Clean Domain-Driven Design (DDD) & Event Sourcing patterns',
        'Resilient GraphQL, gRPC, and RESTful API ecosystems'
      ],
      deliverable: 'Tested modular microservices, CI/CD automated test gates & OpenAPI specs'
    },
    {
      index: '03',
      title: 'Zero-Trust Cybersecurity & Compliance Engineering',
      subtitle: 'Proactive Hardening & Automated Regulatory Governance',
      description: 'Security is not an afterthought or audit-time scramble. We bake continuous posture verification, mutual TLS (mTLS), and cryptographically signed artifacts directly into deployment pipelines.',
      features: [
        'SOC 2 Type II, ISO/IEC 27001, and HIPAA compliance readiness',
        'FERPA & COPPA compliant isolation for educational institutions',
        'Automated SAST/DAST scanning and container vulnerability triage',
        'Zero-Trust Identity & Access Management (IAM) with context verification'
      ],
      deliverable: 'Audit-ready compliance evidence binders & immutable SIEM pipelines'
    },
    {
      index: '04',
      title: 'Educator Academy: Primary & Secondary Digital Literacy',
      subtitle: 'Transforming Teaching Through Cloud Learning Management Tools',
      description: 'Technology is only as effective as the educators utilizing it. Our certified education architects train teachers in both Primary and Secondary schools to confidently deploy and teach with cloud LMS platforms.',
      features: [
        'Secondary School LMS Mastery: Canvas Cloud & Microsoft 365 Education',
        'Primary School Foundational Literacy: Google Classroom & Seesaw setups',
        'Digital grading workflows, interactive rubrics, and automated feedback',
        'Student digital safeguarding, cyber hygiene, and data privacy protocols'
      ],
      deliverable: 'Accredited teacher certification cohorts & ready-to-use lesson templates'
    }
  ];

  return (
    <section id="services" className="py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 font-mono mb-2">
              Capabilities & Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Engineered for resilience. Tailored for enterprise and education.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Every solution Rila Solutions builds follows strict zero-trust principles, clean architectural boundaries, and verifiable operational metrics.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Cloud Infrastructure (Span 7) */}
          <div 
            onClick={() => setSelectedService(0)}
            className={`lg:col-span-7 rounded-2xl border p-8 transition-all cursor-pointer relative overflow-hidden ${
              selectedService === 0 
                ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg shadow-cyan-500/10' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-400">01. CLOUD ARCHITECTURE</span>
              <Cloud className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">
              Cloud Infrastructure & High-Availability DevOps
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              We design, provision, and maintain active-active multi-region Kubernetes clusters with automated GitOps deployments, eliminating single points of failure.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-800">
              {services[0].features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Standard: AWS Well-Architected & CNCF Certified</span>
              <span className="font-mono text-cyan-400 font-semibold">99.999% SLA Target</span>
            </div>
          </div>

          {/* Card 2: Enterprise Software (Span 5) */}
          <div 
            onClick={() => setSelectedService(1)}
            className={`lg:col-span-5 rounded-2xl border p-8 transition-all cursor-pointer relative overflow-hidden ${
              selectedService === 1 
                ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg shadow-cyan-500/10' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-400">02. SOFTWARE ENGINEERING</span>
              <Code className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">
              Enterprise Software & Microservices
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Decoupled, event-driven services capable of ingesting millions of messages per second with deterministic latency and zero lock-in.
            </p>

            <div className="mt-6 space-y-2.5 pt-6 border-t border-slate-800">
              {services[1].features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Languages: Go · Rust · Node · Java</span>
              <span className="font-mono text-white">Sub-20ms p99</span>
            </div>
          </div>

          {/* Card 3: Cybersecurity & Compliance (Span 5) */}
          <div 
            onClick={() => setSelectedService(2)}
            className={`lg:col-span-5 rounded-2xl border p-8 transition-all cursor-pointer relative overflow-hidden ${
              selectedService === 2 
                ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg shadow-cyan-500/10' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-400">03. ZERO-TRUST CYBERSECURITY</span>
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">
              Zero-Trust Security & Compliance
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              SOC 2 Type II, ISO 27001, and FERPA/COPPA compliance guardrails enforced at every commit, ingress controller, and database transaction.
            </p>

            <div className="mt-6 space-y-2.5 pt-6 border-t border-slate-800">
              {services[2].features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Hardware-backed KMS Encryption</span>
              <span className="font-mono text-emerald-400 font-semibold">Continuous Audit</span>
            </div>
          </div>

          {/* Card 4: Educator Academy (Span 7) */}
          <div 
            onClick={() => setSelectedService(3)}
            className={`lg:col-span-7 rounded-2xl border p-8 transition-all cursor-pointer relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-950/90 ${
              selectedService === 3 
                ? 'border-cyan-400/80 shadow-lg shadow-cyan-500/10' 
                : 'border-cyan-900/40 hover:border-cyan-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-400">04. K-12 EDUCATOR ACADEMY</span>
              <GraduationCap className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">
              Digital Literacy & Cloud LMS Training for Schools
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Equipping Primary and Secondary school teachers with practical digital literacy and mastery over Google Classroom, Canvas, and Microsoft 365 Education tools to transform classroom outcomes.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-800">
              {services[3].features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Tailored for: Primary (K-5) & Secondary (6-12) Faculties</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('educator-academy');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <span>View Full Curriculum & Cohorts</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Detail Expander */}
        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                Selected Focus: Service {services[selectedService].index}
              </div>
              <h4 className="text-lg font-bold text-white">
                {services[selectedService].subtitle}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              {selectedService === 3 ? (
                <button
                  onClick={() => onNavigate('educator-academy')}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  Explore School Training Modules
                </button>
              ) : (
                <button
                  onClick={() => onOpenPortal('enterprise_client')}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Review Architecture Deliverables in Portal
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400">
            <div>
              <span className="text-slate-400">Key Deliverable: </span>
              <span className="text-slate-200 font-medium">{services[selectedService].deliverable}</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="text-slate-400">Assurance: </span>
              <span className="text-cyan-400 font-mono">100% Production Audit Passed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
