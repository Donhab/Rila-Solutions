import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Lock, ExternalLink, GraduationCap, Server, Phone, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text wordmark in clean display face */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-base shadow-sm shadow-cyan-500/20">
              R
            </div>
            <span className="font-extrabold tracking-tight text-lg text-slate-100">
              Rila <span className="text-cyan-400 font-medium">Solutions</span>
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleLinkClick('services')}
            className="transition-colors hover:text-cyan-400 text-left cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleLinkClick('architecture')}
            className="transition-colors hover:text-cyan-400 text-left cursor-pointer"
          >
            Cybersecurity & Scale
          </button>
          <button
            onClick={() => handleLinkClick('educator-academy')}
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-400 text-left cursor-pointer"
          >
            <GraduationCap className="h-4 w-4 text-cyan-400" />
            Educator Academy
          </button>
          <button
            onClick={() => handleLinkClick('case-studies')}
            className="transition-colors hover:text-cyan-400 text-left cursor-pointer"
          >
            Case Studies
          </button>
          <button
            onClick={() => handleLinkClick('estimator')}
            className="transition-colors hover:text-cyan-400 text-left cursor-pointer"
          >
            Scope Estimator
          </button>
          <a
            href="https://www.facebook.com/share/p/1C2Qo6SXqs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            title="Facebook Community"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/2349150480873"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-800/80 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
            title="WhatsApp: +2349150480873"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono">+2349150480873</span>
          </a>

          <button
            onClick={() => onOpenPortal('enterprise_client')}
            className="group flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white cursor-pointer"
          >
            <Lock className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-105 transition-transform" />
            <span>Client Portal</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => handleLinkClick('consultation')}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:brightness-110 shadow-sm shadow-cyan-500/25 cursor-pointer whitespace-nowrap"
          >
            Schedule Consultation
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="https://wa.me/2349150480873"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-emerald-800 bg-emerald-950 text-emerald-400"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <button
            onClick={() => onOpenPortal('enterprise_client')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200"
          >
            <Lock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Portal</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleLinkClick('services')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleLinkClick('architecture')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Cybersecurity & Scale
            </button>
            <button
              onClick={() => handleLinkClick('educator-academy')}
              className="flex items-center gap-2 text-left py-2 hover:text-cyan-400"
            >
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              Educator Academy (Schools)
            </button>
            <button
              onClick={() => handleLinkClick('case-studies')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleLinkClick('estimator')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Scope Estimator
            </button>
            <a
              href="https://www.facebook.com/share/p/1C2Qo6SXqs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-left py-2 text-cyan-400 hover:text-cyan-300"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Page</span>
            </a>
          </div>

          {/* Quick Contact Block in Mobile Menu */}
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-xs text-slate-300 space-y-2">
            <div className="font-mono text-[11px] text-cyan-400 font-semibold uppercase">
              Call / SMS / WhatsApp:
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-white font-bold">+2349150480873</span>
              <div className="flex items-center gap-1.5">
                <a href="tel:+2349150480873" className="px-2 py-1 rounded bg-slate-800 text-cyan-400">Call</a>
                <a href="sms:+2349150480873" className="px-2 py-1 rounded bg-slate-800 text-cyan-400">SMS</a>
                <a href="https://wa.me/2349150480873" target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">WA</a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal('enterprise_client');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-2.5 text-xs font-semibold text-white"
            >
              <Lock className="h-3.5 w-3.5 text-cyan-400" />
              Access Client Portal
            </button>
            <button
              onClick={() => handleLinkClick('consultation')}
              className="w-full rounded-lg bg-cyan-500 py-2.5 text-xs font-bold text-slate-950"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
