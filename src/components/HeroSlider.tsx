import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight, 
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  Server, 
  Users,
  Globe,
  ExternalLink
} from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  actionText: string;
  actionTarget: 'services' | 'educator-academy' | 'architecture' | 'portal';
  accentColor: string;
  liveUrl?: string;
  liveUrlLabel?: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    image: '/src/assets/images/hero_cloud_datacenter_1790425680373.jpg',
    tag: 'Cloud Infrastructure & High-Availability DevOps',
    title: 'Multi-Region Zero-Trust Cloud & Kubernetes Control Planes',
    description: 'Active-active multi-cloud topologies across AWS and Azure with sub-second health probes and 99.999% SLA uptime.',
    actionText: 'Explore Cloud Infrastructure',
    actionTarget: 'services',
    accentColor: 'text-cyan-400 border-cyan-500/50'
  },
  {
    id: 'slide-2',
    image: '/src/assets/images/nigerian_enterprise_engineers_1790430293207.jpg',
    tag: 'Enterprise Software & Microservices Core',
    title: 'High-Concurrency Event-Driven Architecture in Lagos & Global Hubs',
    description: 'Decoupled Go, Rust, and TypeScript microservices processing over 4.8M daily transactions with sub-20ms p99 latency.',
    actionText: 'View Software Capabilities',
    actionTarget: 'services',
    accentColor: 'text-blue-400 border-blue-500/50'
  },
  {
    id: 'slide-3',
    image: '/src/assets/images/nigerian_corporate_educators_1790430281164.jpg',
    tag: 'Live Deployment · GSTC Garki Campus Portal',
    title: 'GSTC Garki School Management Portal (gstcgarki.vercel.app)',
    description: 'Cloud school management system with real-time Firestore synchronization, student records, vocational curriculum, and teacher collaboration deployed live for Government Science & Technical College, Garki Area 3 Abuja.',
    actionText: 'Explore School Curriculum',
    actionTarget: 'educator-academy',
    accentColor: 'text-emerald-400 border-emerald-500/50',
    liveUrl: 'https://gstcgarki.vercel.app/',
    liveUrlLabel: 'Open GSTC Garki Index Page'
  },
  {
    id: 'slide-4',
    image: '/src/assets/images/nigerian_school_leaders_1790430305259.jpg',
    tag: 'District Leadership & Institutional Governance',
    title: 'Executive Educational Council & Child Data Safeguarding',
    description: 'Partnering with school principals, trustees, and ministries across Lagos, Abuja, and West Africa for safe, compliant cloud transformation.',
    actionText: 'Inspect Leadership Cohorts',
    actionTarget: 'educator-academy',
    accentColor: 'text-emerald-400 border-emerald-500/50'
  },
  {
    id: 'slide-5',
    image: '/src/assets/images/cybersecurity_shield_vault_1790425714057.jpg',
    tag: 'Zero-Trust Cybersecurity & Regulatory Compliance',
    title: 'Hardware-Backed KMS Encryption & Automated SOC 2 Audits',
    description: 'Strict FERPA, COPPA, and NDPR student privacy fences with continuous automated vulnerability scanning and immutable SIEM logs.',
    actionText: 'Review Security Blueprint',
    actionTarget: 'architecture',
    accentColor: 'text-cyan-300 border-cyan-400/50'
  }
];

interface HeroSliderProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenPortal, onNavigate }) => {
  const [current, setCurrent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = SLIDES.length;

  // Next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  // Prev slide
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide every 5 seconds (5000ms)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total, current]);

  const handleAction = (slide: Slide) => {
    if (slide.actionTarget === 'portal') {
      onOpenPortal('enterprise_client');
    } else {
      onNavigate(slide.actionTarget);
    }
  };

  return (
    <div 
      className="relative mt-0 sm:mt-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Rila Solutions Interactive Showcase Carousel"
    >
      {/* Slides Container */}
      <div className="relative h-[420px] sm:h-[520px] w-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-box')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-box h-full w-full flex items-center justify-center bg-slate-950 text-slate-400 p-8 text-center';
                    fallback.innerHTML = `<div class="font-bold text-xl text-cyan-400">${slide.title}</div>`;
                    parent.appendChild(fallback);
                  }
                }}
              />

              {/* Dynamic Gradient Scrims for pristine readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 z-20">
                <div className="max-w-3xl space-y-3">
                  
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 rounded-md border border-slate-700/80 bg-slate-900/90 backdrop-blur-md px-3 py-1 text-xs font-mono font-semibold tracking-wide text-cyan-400 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight sm:leading-none [text-wrap:balance]">
                    {slide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {slide.liveUrl ? (
                      <>
                        <a
                          href={slide.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/25 cursor-pointer group/btn"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span>{slide.liveUrlLabel || 'Open GSTC Garki Index Page'}</span>
                          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>

                        <button
                          onClick={() => handleAction(slide)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                        >
                          <span>{slide.actionText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAction(slide)}
                        className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                      >
                        <span>{slide.actionText}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onOpenPortal('enterprise_client')}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Live Client Portal</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Countdown Bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          title={isPlaying ? 'Pause slideshow (slides every 5s)' : 'Play slideshow'}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>

        {/* Prev Arrow */}
        <button
          onClick={prevSlide}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          title="Previous slide"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          title="Next slide"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Progress Indicator Dots / Timeline Bar at Bottom */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group relative py-1 cursor-pointer"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current 
                  ? 'w-7 bg-cyan-400 shadow-sm shadow-cyan-400/50' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          </button>
        ))}

        <div className="pl-2 border-l border-slate-800 text-[10px] font-mono text-slate-400 tabular-nums">
          <span className="text-white font-bold">{current + 1}</span> / {total}
        </div>
      </div>

      {/* 5-Second Animated Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
          <div 
            key={current} 
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 transition-all duration-[5000ms] ease-linear w-full origin-left animate-[progress_5s_linear]"
            style={{
              animation: 'progressFill 5s linear'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
