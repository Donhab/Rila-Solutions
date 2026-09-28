import React from 'react';
import { ShieldCheck, Lock, GraduationCap, ArrowUpRight, Phone, MessageSquare, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-sm">
                R
              </div>
              <span className="font-extrabold tracking-tight text-base text-white">
                Rila <span className="text-cyan-400 font-medium">Solutions</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Engineering mission-critical enterprise cloud architectures, scalable distributed software, and zero-trust security. Empowering Primary and Secondary school educators with transformative digital literacy and cloud LMS training.
            </p>

            {/* Direct Contact Banner */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 max-w-md">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Direct Contact & Support
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Powered by:<strong className="text-cyan-400 font-bold">©Rila Solutions</strong>
                </div>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Call or WhatsApp us @ +2349150480873
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="tel:+2349150480873"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-mono"
                  title="Call Rila Solutions"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Call</span>
                </a>
                <a
                  href="sms:+2349150480873"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-mono"
                  title="Send SMS"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                  <span>SMS</span>
                </a>
                <a
                  href="https://wa.me/2349150480873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 transition-colors text-xs font-mono font-semibold"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp: +2349150480873</span>
                </a>
              </div>
            </div>

            {/* Social Media Handles */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                Follow & Connect
              </div>
              <div className="flex items-center gap-3">
                {/* Facebook Handle Requested */}
                <a
                  href="https://www.facebook.com/share/p/1C2Qo6SXqs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-cyan-500/60 hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
                  title="Rila Solutions on Facebook"
                >
                  <svg className="h-4 w-4 fill-current text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-xs font-medium">Facebook</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-cyan-400" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-500">
              <span>SOC 2 Type II Certified</span>
              <span>·</span>
              <span>ISO/IEC 27001</span>
              <span>·</span>
              <span>FERPA & COPPA Audited</span>
            </div>
          </div>

          {/* Navigation Column 1: Enterprise Cloud */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Cloud & Software
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Multi-Region Kubernetes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Distributed Microservices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Zero-Trust IAM & Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('estimator')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Cloud Scope Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Created Projects & Cases
                </button>
              </li>
              <li>
                <a 
                  href="https://gstcgarki.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 text-emerald-400/90 transition-colors text-left flex items-center gap-1 font-mono text-[11px]"
                  title="Open GSTC Garki Index Page"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GSTC Garki (Open Index Page)</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Educator Academy */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Educator Academy
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('educator-academy')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Primary School Literacy (K-5)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('educator-academy')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Secondary LMS Mastery (6-12)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('educator-academy')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Google Classroom & Canvas Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('educator-academy')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  School Readiness Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('educator_admin')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer flex items-center gap-1">
                  <span>School District Portal</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Secure Portals */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Client & Direct Access
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onOpenPortal('enterprise_client')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Enterprise Client Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('educator_admin')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                  <span>School District Cohorts</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/2349150480873" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 text-emerald-400 font-medium"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp: +2349150480873</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+2349150480873" 
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 text-slate-300 font-mono"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Call: +2349150480873</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/p/1C2Qo6SXqs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1"
                >
                  <span>Facebook Community</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright and unboxed legal terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <span className="text-cyan-400 font-bold">Powered by:</span>
            <span className="text-white font-extrabold text-xs">©Rila Solutions</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Zero-Trust Security Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">K-12 Student Privacy Notice (FERPA)</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Service Level Agreement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
