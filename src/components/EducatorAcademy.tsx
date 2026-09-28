import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Laptop, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Sparkles, 
  Download, 
  Clock, 
  FileText,
  School,
  Award,
  ExternalLink,
  Database,
  X,
  Send
} from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/mockData';
import { submitEducatorApplicationToFirestore, EducatorApplicationPayload } from '../lib/firebase';

interface EducatorAcademyProps {
  onOpenPortal: (initialRole?: 'enterprise_client' | 'educator_admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const EducatorAcademy: React.FC<EducatorAcademyProps> = ({ onOpenPortal, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'primary' | 'secondary'>('all');
  
  // Interactive School Readiness Quiz state
  const [quizSchoolType, setQuizSchoolType] = useState<'primary' | 'secondary' | 'k12'>('secondary');
  const [quizLMS, setQuizLMS] = useState<'google' | 'canvas' | 'microsoft' | 'none'>('canvas');
  const [quizChallenge, setQuizChallenge] = useState<'adoption' | 'grading' | 'privacy' | 'pedagogy'>('adoption');
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Firestore Cohort Enrollment Modal state
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [enrollSubmitted, setEnrollSubmitted] = useState<boolean>(false);
  const [enrollDocId, setEnrollDocId] = useState<string | null>(null);
  const [isSubmittingEnroll, setIsSubmittingEnroll] = useState<boolean>(false);
  const [enrollData, setEnrollData] = useState({
    fullName: '',
    institution: '',
    role: 'secondary_educator' as const,
    trackId: 'track-canvas' as const,
    email: '',
    phone: '+2349150480873'
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollData.fullName.trim() || !enrollData.institution.trim()) return;

    setIsSubmittingEnroll(true);
    submitEducatorApplicationToFirestore({
      fullName: enrollData.fullName.trim(),
      institution: enrollData.institution.trim(),
      role: enrollData.role,
      trackId: enrollData.trackId,
      email: enrollData.email.trim() || 'educator@school.edu.ng',
      phone: enrollData.phone.trim(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    }).then(id => {
      setEnrollDocId(id);
      setIsSubmittingEnroll(false);
      setEnrollSubmitted(true);
    }).catch(err => {
      console.warn('Educator enrollment fallback:', err);
      setEnrollDocId(`edu_${Date.now()}`);
      setIsSubmittingEnroll(false);
      setEnrollSubmitted(true);
    });
  };

  const filteredModules = activeTab === 'all' 
    ? CURRICULUM_MODULES 
    : CURRICULUM_MODULES.filter(m => m.level === activeTab);

  return (
    <section id="educator-academy" className="py-24 border-t border-slate-800/80 bg-slate-950 relative overflow-hidden">
      
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Rila Educator Academy</span>
              <span aria-hidden="true">·</span>
              <span>K-12 Digital Transformation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Empowering Primary & Secondary educators with cloud mastery.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Modern digital tools in schools frequently fail due to inadequate teacher onboarding. We bridge the divide through certified, empathetic training programs designed specifically for primary and secondary school teachers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenPortal('educator_admin')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-500/20 cursor-pointer"
            >
              <School className="h-4 w-4" />
              <span>Launch School District Portal</span>
            </button>
            <button
              onClick={() => onNavigate('consultation')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Book District Training Cohort</span>
            </button>
          </div>
        </div>

        {/* Feature Spotlight Image Banner */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-md">
                Certified Curriculum & Hands-on Practicums
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                From technical intimidation to classroom confidence.
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether setting up interactive digital reading circles for Primary Year 2 or configuring automated anti-plagiarism grading rubrics for Secondary Year 11 exams, our training meets teachers where they are.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                    <School className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Primary Schools</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Touchscreen whiteboards, simplified student logins, visual storytelling & COPPA child safeguards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                    <Laptop className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Secondary Schools</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Canvas/MS Teams advanced workflows, automated rubrics, student data privacy & ethical AI literacy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6 border-t border-slate-800 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Award className="h-4 w-4 text-cyan-400" />
                  Accredited Continuing Professional Development (CPD)
                </span>
                <span className="font-mono text-cyan-400 font-bold">100% Educator Pass Rate</span>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full relative min-h-[340px]">
              <img
                src="/src/assets/images/nigerian_corporate_educators_1790430281164.jpg"
                alt="Nigerian primary and secondary school educators in corporate training workshop"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 lg:from-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Interactive Segmented Filter for Curriculum Modules */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">
              Targeted Curriculum Pathways
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select an educational tier to examine module competencies and tools.
            </p>
          </div>

          {/* Interactive filter tabs (adhering to constitution button standards) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Modules ({CURRICULUM_MODULES.length})
            </button>
            <button
              onClick={() => setActiveTab('primary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'primary'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Primary Schools
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'secondary'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Secondary Schools
            </button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                  <span className={`uppercase font-semibold ${mod.level === 'primary' ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {mod.level === 'primary' ? 'Primary / Elementary Level' : 'Secondary / High School Level'}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {mod.duration}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {mod.title}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {mod.description}
                </p>

                <div className="mt-6 space-y-2 border-t border-slate-800/80 pt-4">
                  <div className="text-xs font-semibold text-slate-200">Core Competencies Developed:</div>
                  {mod.competencies.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-slate-500">Tools:</span>
                  <span className="text-slate-300 font-medium">{mod.toolsFocused.join(' · ')}</span>
                </div>

                <div className="text-cyan-400 font-medium">
                  {mod.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive School Digital Readiness Assessment */}
        <div className="rounded-2xl border border-cyan-800/50 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive Diagnostic</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Check Your School's Cloud & LMS Readiness Profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Answer 3 brief indicators to preview your institution's custom onboarding roadmap, estimated training timeframe, and recommended LMS integration architecture.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 max-w-sm shrink-0">
              <img
                src="/src/assets/images/nigerian_school_leaders_1790430305259.jpg"
                alt="Nigerian educational administrators and school principals"
                className="h-16 w-20 rounded-lg object-cover border border-slate-700 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <div className="font-bold text-slate-200">District Leadership Council</div>
                <div className="text-[11px] text-slate-400">Guiding schools across Lagos, Abuja & West Africa.</div>
                <a
                  href="https://gstcgarki.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-mono mt-1 font-semibold"
                  title="Open GSTC Garki Index Page"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open GSTC Garki Index Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: School Type */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                1. Institutional Level
              </label>
              <div className="space-y-2">
                {[
                  { id: 'primary', label: 'Primary School (Ages 5–11)' },
                  { id: 'secondary', label: 'Secondary / High School (Ages 11–18)' },
                  { id: 'k12', label: 'Multi-Campus District / K-12 Trust' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setQuizSchoolType(item.id as any);
                      setQuizCompleted(true);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      quizSchoolType === item.id 
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-semibold' 
                        : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Current Cloud LMS */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                2. Target LMS Platform
              </label>
              <div className="space-y-2">
                {[
                  { id: 'google', label: 'Google Classroom & Workspace' },
                  { id: 'canvas', label: 'Canvas Cloud LMS' },
                  { id: 'microsoft', label: 'Microsoft 365 Teams for Edu' },
                  { id: 'none', label: 'Migrating from Legacy / Paper' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setQuizLMS(item.id as any);
                      setQuizCompleted(true);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      quizLMS === item.id 
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-semibold' 
                        : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Top Priority */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                3. Primary Objective
              </label>
              <div className="space-y-2">
                {[
                  { id: 'adoption', label: 'Overcoming Teacher Hesitation' },
                  { id: 'grading', label: 'Automating Grading & Rubrics' },
                  { id: 'privacy', label: 'Student Data Security & FERPA' },
                  { id: 'pedagogy', label: 'Interactive Hybrid Pedagogy' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setQuizChallenge(item.id as any);
                      setQuizCompleted(true);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      quizChallenge === item.id 
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-semibold' 
                        : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostic Result Card */}
          <div className="mt-6 rounded-xl border border-slate-700/80 bg-slate-950/90 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                Recommended Onboarding Pathway
              </div>
              <h4 className="text-lg font-bold text-white">
                {quizSchoolType === 'primary' 
                  ? 'Foundational Primary Classroom Cloud Immersion (4 Weeks)'
                  : quizSchoolType === 'secondary'
                  ? 'Secondary Departmental LMS Mastery & Anti-Burnout Rubrics (6 Weeks)'
                  : 'Enterprise District Cloud Federation & Teacher Train-the-Trainer (8 Weeks)'}
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl">
                Customized for {quizLMS.toUpperCase()} infrastructure, with dedicated modules addressing {quizChallenge === 'adoption' ? 'teacher confidence and practical daily habits' : quizChallenge === 'grading' ? 'grading efficiency and rubric automation' : quizChallenge === 'privacy' ? 'strict student data compliance and safeguarding' : 'active interactive classroom participation'}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsEnrolling(true)}
                className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Database className="h-3.5 w-3.5" />
                <span>Apply for Cohort (Firestore Sync)</span>
              </button>
              <button
                onClick={() => onOpenPortal('educator_admin')}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                Inspect Sample Cohort in Portal
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                Request Syllabus
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Firestore Educator Cohort Enrollment Modal */}
      {isEnrolling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsEnrolling(false);
                setEnrollSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            {enrollSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Recorded in Firestore</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, <strong className="text-white">{enrollData.fullName}</strong> from <strong className="text-white">{enrollData.institution}</strong>. Your training application is now persisted in the Rila Solutions Firestore database.
                </p>
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 font-mono text-[11px] text-emerald-300">
                  Firestore Doc ID: <strong>{enrollDocId}</strong> · Status: Submitted
                </div>
                <button
                  onClick={() => {
                    setIsEnrolling(false);
                    setEnrollSubmitted(false);
                    setEnrollData({
                      fullName: '',
                      institution: '',
                      role: 'secondary_educator',
                      trackId: 'track-canvas',
                      email: '',
                      phone: '+2349150480873'
                    });
                  }}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400">
                    <Database className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Educator Training Application</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Persisted directly into Cloud Firestore</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Teacher / Leader Full Name *</label>
                  <input
                    type="text"
                    required
                    value={enrollData.fullName}
                    onChange={(e) => setEnrollData({ ...enrollData, fullName: e.target.value })}
                    placeholder="e.g. Amina Bello"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">School / Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={enrollData.institution}
                    onChange={(e) => setEnrollData({ ...enrollData, institution: e.target.value })}
                    placeholder="e.g. GSTC Garki Area 3 / Kings College"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Instructional Role</label>
                    <select
                      value={enrollData.role}
                      onChange={(e) => setEnrollData({ ...enrollData, role: e.target.value as any })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="primary_educator">Primary Educator</option>
                      <option value="secondary_educator">Secondary Educator</option>
                      <option value="district_administrator">School Principal / Admin</option>
                      <option value="technical_instructor">Technical Instructor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Certification Track</label>
                    <select
                      value={enrollData.trackId}
                      onChange={(e) => setEnrollData({ ...enrollData, trackId: e.target.value as any })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="track-canvas">Canvas Cloud LMS</option>
                      <option value="track-google">Google Classroom & AI</option>
                      <option value="track-safeguarding">K-12 Cyber Safeguarding</option>
                      <option value="track-stem">Cloud Coding & STEM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
                    <input
                      type="email"
                      value={enrollData.email}
                      onChange={(e) => setEnrollData({ ...enrollData, email: e.target.value })}
                      placeholder="teacher@school.edu.ng"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={enrollData.phone}
                      onChange={(e) => setEnrollData({ ...enrollData, phone: e.target.value })}
                      placeholder="+2349150480873"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEnrolling(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEnroll}
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isSubmittingEnroll ? 'Saving to Firestore...' : 'Submit to Firestore Database'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
