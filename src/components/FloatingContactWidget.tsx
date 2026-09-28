import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronUp, Sparkles } from 'lucide-react';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <aside 
      aria-label="Direct Contact and WhatsApp Support"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
    >
      {isOpen ? (
        <div className="relative rounded-2xl border border-emerald-500/40 bg-slate-900/95 backdrop-blur-md p-4 shadow-2xl shadow-emerald-950/50 w-72 sm:w-80 transition-all duration-300">
          {/* Close / Minimize button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Minimize contact widget"
            aria-label="Minimize contact widget"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 pr-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Live Support & Inquiries
            </span>
          </div>

          <h3 className="mt-1 text-sm font-bold text-white">
            Call or WhatsApp us @
          </h3>
          <p className="font-mono text-base font-extrabold text-emerald-400 tracking-tight">
            +2349150480873
          </p>

          <p className="mt-1 text-[11px] text-slate-300">
            Speak directly with our technical leadership & educator training advisors.
          </p>

          {/* Action buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/2349150480873"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              title="Chat on WhatsApp (+2349150480873)"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+2349150480873"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white px-3 py-2 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
              title="Call directly (+2349150480873)"
            >
              <Phone className="h-4 w-4 text-cyan-400" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Powered by Attribution */}
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-center text-slate-400">
            Powered by:<strong className="text-cyan-400 font-bold ml-1">©Rila Solutions</strong>
          </div>
        </div>
      ) : (
        /* Minimized Floating Pill Button */
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-emerald-500/60 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white shadow-xl shadow-emerald-950/60 hover:bg-emerald-950 hover:border-emerald-400 transition-all cursor-pointer"
          title="Open contact options: Call or WhatsApp us @ +2349150480873"
          aria-label="Open contact options: Call or WhatsApp us @ +2349150480873"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <MessageCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>Call or WhatsApp: +2349150480873</span>
        </button>
      )}
    </aside>
  );
};
