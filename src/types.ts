export type PortalRole = 'enterprise_client' | 'educator_admin';

export interface Sprint {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'planned';
  startDate: string;
  endDate: string;
  completionRate: number;
  tasksCompleted: number;
  tasksTotal: number;
  deliverables: string[];
}

export interface ProjectTicket {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Security' | 'DevOps' | 'EdTech Training' | 'LMS Integration';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'in_review' | 'resolved';
  assignee: string;
  createdAt: string;
  commentsCount: number;
}

export interface SecurityAuditItem {
  id: string;
  framework: 'SOC 2 Type II' | 'ISO 27001' | 'FERPA / COPPA' | 'Zero-Trust IAM';
  status: 'passed' | 'monitoring' | 'verified';
  lastChecked: string;
  score: string;
  description: string;
}

export interface TrainingCohort {
  id: string;
  schoolName: string;
  tier: 'Primary' | 'Secondary' | 'District Wide';
  educatorCount: number;
  progressPercent: number;
  activeLMS: 'Google Classroom' | 'Canvas Cloud' | 'Microsoft 365 Teams' | 'Seesaw / Hybrid';
  currentModule: string;
  nextSession: string;
  leadTrainer: string;
}

export interface CurriculumModule {
  id: string;
  level: 'primary' | 'secondary' | 'administrative';
  title: string;
  duration: string;
  competencies: string[];
  description: string;
  toolsFocused: string[];
  deliverable: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  image: string;
  liveUrl?: string;
  badge?: string;
}

export interface ConsultationRequest {
  fullName: string;
  organization: string;
  workEmail: string;
  domain: 'enterprise_cloud' | 'software_dev' | 'school_training' | 'cybersecurity_audit';
  estimatedScale: string;
  timeline: string;
  notes: string;
}
