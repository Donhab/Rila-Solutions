import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  FileText, 
  Plus, 
  School, 
  Server, 
  User, 
  AlertCircle,
  ExternalLink,
  Layers,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  Database
} from 'lucide-react';
import { ENTERPRISE_SPRINTS, INITIAL_TICKETS, SECURITY_AUDITS, TRAINING_COHORTS, CURRICULUM_MODULES } from '../data/mockData';
import { Sprint, ProjectTicket, PortalRole } from '../types';
import { submitPortalTicketToFirestore, subscribeToPortalTickets } from '../lib/firebase';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: PortalRole;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose, initialRole = 'enterprise_client' }) => {
  const [role, setRole] = useState<PortalRole>(initialRole);
  const [activeTab, setActiveTab] = useState<'sprints' | 'tickets' | 'compliance' | 'academy' | 'artifacts'>('sprints');

  // Interactive ticket state
  const [tickets, setTickets] = useState<ProjectTicket[]>(INITIAL_TICKETS);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);
  const [newTicketTitle, setNewTicketTitle] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<'Infrastructure' | 'Security' | 'DevOps' | 'EdTech Training' | 'LMS Integration'>('Infrastructure');
  const [newTicketPriority, setNewTicketPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [ticketFilter, setTicketFilter] = useState<string>('all');

  // Interactive sprint deliverables state
  const [checkedDeliverables, setCheckedDeliverables] = useState<{ [key: string]: boolean }>({
    'AWS us-east-1 to eu-west-1 cross-region DynamoDB replication verified': true,
    'Mutual TLS (mTLS) enforcement across Envoy service mesh': true,
    'Automated secret rotation policy in HashiCorp Vault': false
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Subscribe to real-time Firestore tickets
  useEffect(() => {
    const unsub = subscribeToPortalTickets((remoteTickets) => {
      if (remoteTickets && remoteTickets.length > 0) {
        const mapped: ProjectTicket[] = remoteTickets.map(rt => ({
          id: rt.id.startsWith('tkt_') ? `RLA-${rt.id.substring(4, 9).toUpperCase()}` : rt.id,
          title: rt.title,
          category: (rt.category === 'lms-sync' ? 'LMS Integration' : rt.category === 'cybersecurity' ? 'Security' : 'Infrastructure') as any,
          priority: rt.severity === 'critical' ? 'critical' : rt.severity === 'high' ? 'high' : 'medium',
          status: rt.status === 'resolved' ? 'resolved' : rt.status === 'investigating' ? 'in_progress' : 'open',
          assignee: 'Engr. Yahaya Abdullahi (Principal Architect)',
          createdAt: new Date(rt.createdAt).toLocaleDateString(),
          commentsCount: 1
        }));

        setTickets(prev => {
          const existingIds = new Set(mapped.map(m => m.id));
          const localOnly = prev.filter(p => !existingIds.has(p.id));
          return [...mapped, ...localOnly];
        });
      }
    });

    return () => unsub();
  }, []);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleDeliverable = (delivText: string) => {
    setCheckedDeliverables(prev => ({
      ...prev,
      [delivText]: !prev[delivText]
    }));
    showNotification('Deliverable milestone status updated and logged in project audit.');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const newTicket: ProjectTicket = {
      id: `RLA-${Math.floor(410 + Math.random() * 80)}`,
      title: newTicketTitle.trim(),
      category: newTicketCategory,
      priority: newTicketPriority,
      status: 'open',
      assignee: role === 'enterprise_client' ? 'Engr. Yahaya Abdullahi (Principal Architect)' : 'Chidinma Okonkwo, M.Ed (Lead EdTech Coach)',
      createdAt: 'Just now',
      commentsCount: 1
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle('');
    setIsSubmittingTicket(false);

    // Persist to reliable Firestore Database
    const categoryMap: Record<string, 'architecture' | 'cybersecurity' | 'lms-sync' | 'infrastructure' | 'billing'> = {
      'Infrastructure': 'infrastructure',
      'Security': 'cybersecurity',
      'DevOps': 'architecture',
      'EdTech Training': 'lms-sync',
      'LMS Integration': 'lms-sync'
    };

    const severityMap: Record<string, 'critical' | 'high' | 'standard'> = {
      'critical': 'critical',
      'high': 'high',
      'medium': 'standard',
      'low': 'standard'
    };

    submitPortalTicketToFirestore({
      title: newTicket.title,
      category: categoryMap[newTicketCategory] || 'infrastructure',
      severity: severityMap[newTicketPriority] || 'standard',
      description: `Client portal incident created for ${newTicketCategory}. Assigned to ${newTicket.assignee}.`,
      authorName: role === 'enterprise_client' ? 'Client Engineering Lead' : 'School District Administrator',
      authorRole: role,
      status: 'open',
      createdAt: new Date().toISOString()
    }).then(docId => {
      showNotification(`Ticket ${newTicket.id} synchronized to Firestore Database (Doc ID: ${docId}).`);
    }).catch(err => {
      console.warn('Firestore ticket sync:', err);
      showNotification(`Ticket ${newTicket.id} created and queued.`);
    });
  };

  const filteredTickets = ticketFilter === 'all' 
    ? tickets 
    : tickets.filter(t => t.priority === ticketFilter || t.status === ticketFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
      
      {/* Toast notification */}
      {notification && (
        <div className="absolute top-6 z-60 rounded-lg bg-emerald-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-lg animate-in slide-in-from-top-2">
          {notification}
        </div>
      )}

      {/* Main Portal Window */}
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Rila Client Portal</span>
                <span>/</span>
                <span className="text-white font-semibold">
                  {role === 'enterprise_client' ? 'Apex Financial Systems (Cloud Core)' : 'Oakridge Unified School District (K-12 LMS)'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                End-to-End Encrypted Session · TLS 1.3 · Mutual Identity Verified
              </div>
            </div>
          </div>

          {/* Account Role Switcher + Close */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <span className="px-2 text-slate-500 font-mono text-[10px] uppercase">Active Tenant:</span>
              <button
                onClick={() => {
                  setRole('enterprise_client');
                  setActiveTab('sprints');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  role === 'enterprise_client' 
                    ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise Client
              </button>
              <button
                onClick={() => {
                  setRole('educator_admin');
                  setActiveTab('academy');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  role === 'educator_admin' 
                    ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                School District
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Close portal window"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Portal Workspace Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/40 p-4 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto">
            <div className="space-y-1 w-full flex md:flex-col gap-1">
              
              <button
                onClick={() => setActiveTab('sprints')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'sprints'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4" />
                  <span>Sprints & Roadmap</span>
                </div>
                <span className="hidden md:inline font-mono text-[11px] text-cyan-400">78%</span>
              </button>

              <button
                onClick={() => setActiveTab('tickets')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'tickets'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="h-4 w-4" />
                  <span>Tickets & Collaboration</span>
                </div>
                <span className="hidden md:inline font-mono text-[11px] text-slate-400">{tickets.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('compliance')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'compliance'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Security & Audits</span>
                </div>
                <span className="hidden md:inline font-mono text-[11px] text-emerald-400">SOC2</span>
              </button>

              <button
                onClick={() => setActiveTab('academy')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'academy'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <School className="h-4 w-4" />
                  <span>Educator Training Hub</span>
                </div>
                <span className="hidden md:inline font-mono text-[11px] text-cyan-400">3 Cohorts</span>
              </button>

              <button
                onClick={() => setActiveTab('artifacts')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'artifacts'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4" />
                  <span>Artifact Vault</span>
                </div>
                <span className="hidden md:inline font-mono text-[11px] text-slate-400">8 Files</span>
              </button>

            </div>

            {/* Account Info Footer */}
            <div className="hidden md:block pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src="/src/assets/images/nigerian_lead_architect_1790430316321.jpg"
                  alt="Engr. Yahaya Abdullahi, Principal Cloud Solutions Architect"
                  className="h-9 w-9 rounded-full object-cover border border-cyan-500/40 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-slate-200 font-semibold text-xs leading-tight">
                    Engr. Yahaya Abdullahi
                  </div>
                  <div className="text-cyan-400 text-[10px] font-mono">
                    Principal Cloud Architect
                  </div>
                </div>
              </div>
              <div className="text-slate-400 text-[10px] flex items-center justify-between border-t border-slate-800/80 pt-1.5 font-mono">
                <span>SLA Tier: 24/7 Priority</span>
                <span className="text-emerald-400">● Active</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
            
            {/* VIEW 1: SPRINTS & ROADMAP */}
            {activeTab === 'sprints' && (
              <div className="space-y-8">
                
                {/* Active Sprint Banner */}
                <div className="rounded-xl border border-cyan-800/60 bg-gradient-to-r from-slate-900 to-cyan-950/30 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                        Active In-Flight Sprint
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {ENTERPRISE_SPRINTS[0].name}
                      </h3>
                      <div className="mt-1 text-xs text-slate-400">
                        Sprint window: {ENTERPRISE_SPRINTS[0].startDate} to {ENTERPRISE_SPRINTS[0].endDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Velocity</div>
                        <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                          {ENTERPRISE_SPRINTS[0].tasksCompleted} / {ENTERPRISE_SPRINTS[0].tasksTotal} Tasks
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Completion</div>
                        <div className="text-lg font-bold font-mono text-white tabular-nums">
                          {ENTERPRISE_SPRINTS[0].completionRate}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-6 w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${ENTERPRISE_SPRINTS[0].completionRate}%` }}
                    />
                  </div>

                  {/* Deliverables Checklist with interactive toggling */}
                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                      Sprint Key Deliverables & Milestones:
                    </div>
                    {ENTERPRISE_SPRINTS[0].deliverables.map((deliv, idx) => {
                      const isChecked = !!checkedDeliverables[deliv];
                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggleDeliverable(deliv)}
                          className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-900 transition-colors"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-cyan-400 shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-600 shrink-0" />
                          )}
                          <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}>
                            {deliv}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sprints History Table */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
                    Release Cadence & Milestone Archive
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono">
                        <tr>
                          <th className="py-3 px-4">Sprint</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Duration</th>
                          <th className="py-3 px-4 text-right">Completion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {ENTERPRISE_SPRINTS.map((sp) => (
                          <tr key={sp.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {sp.name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              {sp.status === 'completed' && <span className="text-emerald-400">● Completed</span>}
                              {sp.status === 'in_progress' && <span className="text-cyan-400">● In Progress</span>}
                              {sp.status === 'planned' && <span className="text-slate-400">○ Scheduled</span>}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 font-mono">
                              {sp.startDate} - {sp.endDate}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200 tabular-nums">
                              {sp.completionRate}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: TICKETS & COLLABORATION */}
            {activeTab === 'tickets' && (
              <div className="space-y-6">
                
                {/* Tickets Controls & New Ticket Trigger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-white">
                        Direct Architect & Engineering Collaboration
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono text-emerald-400">
                        <Database className="h-3 w-3" />
                        <span>Firestore Live Sync</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Real-time synchronized across distributed nodes on provisioned Google Cloud Firestore database.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Priority Filter */}
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                      <Filter className="h-3.5 w-3.5 text-slate-500 ml-1.5" />
                      <button
                        onClick={() => setTicketFilter('all')}
                        className={`px-2 py-1 rounded cursor-pointer ${ticketFilter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setTicketFilter('critical')}
                        className={`px-2 py-1 rounded cursor-pointer ${ticketFilter === 'critical' ? 'bg-rose-900/60 text-rose-300 font-semibold' : 'text-slate-400'}`}
                      >
                        Critical
                      </button>
                      <button
                        onClick={() => setTicketFilter('high')}
                        className={`px-2 py-1 rounded cursor-pointer ${ticketFilter === 'high' ? 'bg-amber-900/60 text-amber-300 font-semibold' : 'text-slate-400'}`}
                      >
                        High
                      </button>
                    </div>

                    <button
                      onClick={() => setIsSubmittingTicket(!isSubmittingTicket)}
                      className="rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create New Ticket</span>
                    </button>
                  </div>
                </div>

                {/* New Ticket Form (Expandable) */}
                {isSubmittingTicket && (
                  <form onSubmit={handleCreateTicket} className="rounded-xl border border-cyan-800/80 bg-slate-900 p-5 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      Submit New Architecture / Technical Request
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Request Summary / Technical Objective *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTicketTitle}
                        onChange={(e) => setNewTicketTitle(e.target.value)}
                        placeholder="e.g., Run load test against regional payment webhook proxy"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Category
                        </label>
                        <select
                          value={newTicketCategory}
                          onChange={(e) => setNewTicketCategory(e.target.value as any)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Security">Security</option>
                          <option value="DevOps">DevOps</option>
                          <option value="EdTech Training">EdTech Training</option>
                          <option value="LMS Integration">LMS Integration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Priority Level
                        </label>
                        <select
                          value={newTicketPriority}
                          onChange={(e) => setNewTicketPriority(e.target.value as any)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="low">Low (Standard Backlog)</option>
                          <option value="medium">Medium (Next Sprint)</option>
                          <option value="high">High (Current Sprint Priority)</option>
                          <option value="critical">Critical (Immediate SLA Triage)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSubmittingTicket(false)}
                        className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        Dispatch Ticket
                      </button>
                    </div>
                  </form>
                )}

                {/* Tickets High-Density Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono">
                      <tr>
                        <th className="py-3 px-4">Ticket ID</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Priority</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Assignee</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredTickets.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-900/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                            {t.id}
                          </td>
                          <td className="py-3 px-4 font-medium text-white max-w-xs truncate">
                            {t.title}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">
                            {t.priority === 'critical' && <span className="text-rose-400 font-bold">Critical</span>}
                            {t.priority === 'high' && <span className="text-amber-400 font-semibold">High</span>}
                            {t.priority === 'medium' && <span className="text-cyan-400">Medium</span>}
                            {t.priority === 'low' && <span className="text-slate-400">Low</span>}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {t.category}
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            {t.assignee}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              t.status === 'resolved' 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                                : t.status === 'in_progress'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {t.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* VIEW 3: COMPLIANCE & SECURITY */}
            {activeTab === 'compliance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Zero-Trust Regulatory Evidence & Continuous Audits
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live telemetry verifying encryption policies, RBAC access boundaries, and educational safeguarding compliance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SECURITY_AUDITS.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-white">{item.framework}</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-cyan-400 font-mono">
                        {item.score}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Last continuous probe: {item.lastChecked}</span>
                        <button 
                          onClick={() => showNotification(`Exporting cryptographically signed ${item.framework} compliance digest...`)}
                          className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        >
                          Export Proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">Continuous Penetration Test Report (Q3 2026)</h4>
                    <p className="text-xs text-slate-400 mt-1">Zero high or critical severity vulnerabilities discovered across ingress controllers and database layers.</p>
                  </div>
                  <button 
                    onClick={() => showNotification('Downloading audited SOC2 & PenTest report package (PDF)...')}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Audit Dossier</span>
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 4: EDUCATOR TRAINING HUB */}
            {activeTab === 'academy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    K-12 School Training Hub & Cohort Analytics
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live tracking of Primary and Secondary teacher progress in cloud LMS adoption, workshop attendance, and certification rubrics.
                  </p>
                </div>

                {/* Cohorts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TRAINING_COHORTS.map((c) => (
                    <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className={`font-semibold ${c.tier === 'Primary' ? 'text-amber-400' : 'text-cyan-400'}`}>
                            {c.tier} Tier
                          </span>
                          <span className="text-slate-400">{c.educatorCount} Staff</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{c.schoolName}</h4>
                        <div className="mt-2 text-xs text-slate-400">
                          Platform: <strong className="text-slate-200">{c.activeLMS}</strong>
                        </div>
                        <div className="mt-1 text-xs text-slate-400 line-clamp-2">
                          Current: {c.currentModule}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-slate-400">Adoption Progress</span>
                          <span className="text-cyan-400 font-bold">{c.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-500 rounded-full" 
                            style={{ width: `${c.progressPercent}%` }}
                          />
                        </div>
                        <div className="mt-3 text-[11px] text-slate-400">
                          Next Lab: <span className="text-slate-200">{c.nextSession}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Session Booker / Live Join */}
                <div className="rounded-xl border border-cyan-800/60 bg-gradient-to-r from-slate-900 to-cyan-950/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                      Live Virtual Classroom Lab
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">
                      Secondary School Teacher Masterclass: Automated Rubrics in Canvas
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Interactive coaching session with Chidinma Okonkwo, M.Ed. Hands-on rubric setup for 45 secondary STEM educators.
                    </p>
                  </div>
                  <button
                    onClick={() => showNotification('Opening secure virtual workshop room session...')}
                    className="rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Join Live Workshop Session
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 5: ARTIFACT VAULT */}
            {activeTab === 'artifacts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Deliverables & Technical Artifacts
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cryptographically hashed infrastructure blueprints, API contracts, and educator curriculum rubrics ready for deployment.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono">
                      <tr>
                        <th className="py-3 px-4">Artifact Name</th>
                        <th className="py-3 px-4">Format</th>
                        <th className="py-3 px-4">Classification</th>
                        <th className="py-3 px-4">Version</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {[
                        { name: 'Multi-Region Kubernetes Terraform Manifests', format: 'HCL / GitOps', type: 'Infrastructure', ver: 'v2.4.1' },
                        { name: 'Zero-Trust Envoy mTLS Certificate Authority Policy', format: 'YAML / SPIFFE', type: 'Security', ver: 'v1.8.0' },
                        { name: 'OpenAPI 3.1 Distributed Core Banking Gateway Spec', format: 'JSON / Swagger', type: 'Software', ver: 'v3.1.2' },
                        { name: 'Primary School Digital Literacy Syllabus & Lesson Templates', format: 'PDF & Canvas Package', type: 'Education', ver: 'v4.0' },
                        { name: 'Secondary School Rubric Matrix for Anti-Burnout Grading', format: 'IMS-CC Package', type: 'Education', ver: 'v2.1' },
                        { name: 'FERPA & COPPA Student Data Isolation Audit Binder', format: 'Signed PDF', type: 'Compliance', ver: '2026-Q3' }
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                            <FileText className="h-4 w-4 text-cyan-400 shrink-0" />
                            <span>{item.name}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {item.format}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {item.type}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-cyan-400 font-bold">
                            {item.ver}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => showNotification(`Downloading validated artifact package: ${item.name}...`)}
                              className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                            >
                              Download →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
