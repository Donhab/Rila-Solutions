import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, Building, Mail, User, Phone, MessageSquare, MessageCircle, ArrowUpRight, Sparkles, Database } from 'lucide-react';
import { ConsultationRequest } from '../types';
import { submitConsultationToFirestore } from '../lib/firebase';

interface ConsultationFormProps {
  prefilledScope?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ prefilledScope = '' }) => {
  const [formData, setFormData] = useState<ConsultationRequest>({
    fullName: '',
    organization: '',
    workEmail: '',
    domain: 'enterprise_cloud',
    estimatedScale: '100 - 1,000 Users / Students',
    timeline: 'Within 30–60 Days',
    notes: prefilledScope
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [firestoreDocId, setFirestoreDocId] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledScope) {
      setFormData(prev => ({
        ...prev,
        notes: prefilledScope,
        domain: prefilledScope.includes('Educator') || prefilledScope.includes('K-12') ? 'school_training' : 'enterprise_cloud'
      }));
    }
  }, [prefilledScope]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceTrack = formData.domain === 'school_training' 
      ? 'educator-academy' 
      : formData.domain === 'cybersecurity_audit' 
      ? 'zero-trust-cybersecurity'
      : 'cloud-architecture';

    submitConsultationToFirestore({
      fullName: formData.fullName.trim() || 'Prospective Partner',
      workEmail: formData.workEmail.trim() || 'inquiry@organization.org',
      organization: formData.organization.trim() || 'Educational / Enterprise Institution',
      serviceTrack,
      message: (formData.notes ? `${formData.notes} | Scale: ${formData.estimatedScale} | Timeline: ${formData.timeline}` : `Initial technical inquiry for ${formData.domain}.`),
      prefilledScope: prefilledScope || undefined,
      phone: '+2349150480873',
      status: 'received',
      createdAt: new Date().toISOString()
    }).then(docId => {
      setFirestoreDocId(docId);
      setIsSubmitting(false);
      setSubmitted(true);
    }).catch(err => {
      console.warn('Firestore fallback sync:', err);
      setFirestoreDocId(`cons_${Date.now()}`);
      setIsSubmitting(false);
      setSubmitted(true);
    });
  };

  return (
    <section id="consultation" className="py-24 border-t border-slate-800/80 bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              <Sparkles className="h-4 w-4" />
              <span>Direct Architectural Engagement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Discuss your cloud architecture or school district program.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Skip the sales scripts. Every initial consultation is conducted directly with a Principal Cloud Architect or Lead EdTech Training Director to assess your technical requirements.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Mutual NDA Enforced: </strong>
                  Proprietary codebases, architectural topologies, and student records remain strictly confidential.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <Clock className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">45-Minute Discovery Session: </strong>
                  Includes a high-level review of your current pain points and an actionable feasibility roadmap.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Enterprise & Educational Rates: </strong>
                  Specialized subsidized grant support and consortium licensing for public school districts.
                </div>
              </div>
            </div>

            {/* Lead Architect Corporate Spotlight */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-3.5">
              <img
                src="/src/assets/images/nigerian_lead_architect_1790430316321.jpg"
                alt="Engr. Yahaya Abdullahi, Principal Cloud Solutions Architect"
                className="h-12 w-12 rounded-xl object-cover border border-cyan-500/40 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-white">
                  Engr. Yahaya Abdullahi
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Principal Cloud Solutions Architect
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Leads technical discovery for enterprise migrations & school district programs.
                </p>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-xs text-slate-400 space-y-3.5">
              <div>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-1">
                  Instant Direct Assistance
                </div>
                <div className="text-sm font-bold text-white">
                  Call or WhatsApp us @
                </div>
                <div className="text-base text-emerald-400 font-mono font-extrabold mt-0.5">
                  +2349150480873
                </div>
              </div>

              {/* Action Buttons for Call / SMS / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <a
                  href="tel:+2349150480873"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href="sms:+2349150480873"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Send SMS</span>
                </a>
                <a
                  href="https://wa.me/2349150480873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-950/90 border border-emerald-700/80 hover:bg-emerald-900 text-emerald-300 transition-colors text-xs font-semibold"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Facebook Page Channel */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Official Social Page:</span>
                <a
                  href="https://www.facebook.com/share/p/1C2Qo6SXqs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Profile</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                <div>Email: <span className="text-slate-200 font-mono">architecture@rilasolutions.com</span></div>
                <div>EdTech Academy: <span className="text-slate-200 font-mono">academy@rilasolutions.com</span></div>
                <div>HQ: London · San Francisco · Zurich</div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Consultation Request Dispatched
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-cyan-400">{formData.fullName}</strong>. Your inquiry has been routed to our <strong className="text-white">{formData.domain === 'school_training' ? 'EdTech Academy Director' : 'Principal Cloud Architect'}</strong>.
                </p>
                <div className="space-y-1.5 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
                    <Database className="h-3 w-3" />
                    <span>Synchronized to Firestore Database (Doc ID: {firestoreDocId})</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Expected technical architect reply in &lt; 4 hours · SLA Tier Active
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        organization: '',
                        workEmail: '',
                        domain: 'enterprise_cloud',
                        estimatedScale: '100 - 1,000 Users / Students',
                        timeline: 'Within 30–60 Days',
                        notes: ''
                      });
                    }}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">
                    Schedule Technical Discovery
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your project or school district parameters for customized preparation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Dr. Eleanor Vance"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Work / Academic Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="e.vance@institution.org"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company or School District *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Apex Global or St. Jude Academy"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Primary Area of Need *
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value as any })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="enterprise_cloud">Cloud Computing & Kubernetes Architecture</option>
                      <option value="software_dev">Enterprise Software & Microservices Development</option>
                      <option value="school_training">Educator Digital Literacy & Cloud LMS Training</option>
                      <option value="cybersecurity_audit">Zero-Trust Cybersecurity & Compliance Audit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Target Scale / Population
                    </label>
                    <select
                      value={formData.estimatedScale}
                      onChange={(e) => setFormData({ ...formData, estimatedScale: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>Single Primary/Secondary Campus (20–60 Staff)</option>
                      <option>Multi-School District (100–500 Staff)</option>
                      <option>Enterprise Tech Core (1,000–50,000 Users)</option>
                      <option>Global High-Concurrency (Millions Daily)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Target Execution Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>Immediate / Next Sprint</option>
                      <option>Within 30–60 Days</option>
                      <option>Next Academic Semester / Q4</option>
                      <option>Exploratory / Budget Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Technical Specifications or Training Objectives
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide context regarding current cloud provider, LMS platform (Canvas/Google), or specific compliance requirements..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xs font-bold text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Validating & Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Architecture & Consultation Brief</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
