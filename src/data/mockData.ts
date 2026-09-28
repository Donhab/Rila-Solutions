import { Sprint, ProjectTicket, SecurityAuditItem, TrainingCohort, CurriculumModule, CaseStudy } from '../types';

export const ENTERPRISE_SPRINTS: Sprint[] = [
  {
    id: 'sprint-14',
    name: 'Sprint 14: Zero-Trust IAM & Multi-Region Failover',
    status: 'in_progress',
    startDate: '2026-09-15',
    endDate: '2026-09-29',
    completionRate: 78,
    tasksCompleted: 21,
    tasksTotal: 27,
    deliverables: [
      'AWS us-east-1 to eu-west-1 cross-region DynamoDB replication verified',
      'Mutual TLS (mTLS) enforcement across Envoy service mesh',
      'Automated secret rotation policy in HashiCorp Vault'
    ]
  },
  {
    id: 'sprint-13',
    name: 'Sprint 13: Microservices Decoupling & Kafka Ingestion',
    status: 'completed',
    startDate: '2026-09-01',
    endDate: '2026-09-14',
    completionRate: 100,
    tasksCompleted: 32,
    tasksTotal: 32,
    deliverables: [
      'Legacy monolith split into 4 independent domain services',
      'Event streaming bus handles 140,000 msg/sec with sub-12ms p99',
      'Kubernetes horizontal pod autoscaler baseline calibrated'
    ]
  },
  {
    id: 'sprint-15',
    name: 'Sprint 15: SOC 2 Type II Final Attestation & Penetration Hardening',
    status: 'planned',
    startDate: '2026-10-01',
    endDate: '2026-10-14',
    completionRate: 0,
    tasksCompleted: 0,
    tasksTotal: 19,
    deliverables: [
      'Third-party external red-team vulnerability review',
      'Immutable SIEM audit log forwarding to cold S3 tier',
      'Disaster recovery chaos testing rehearsal'
    ]
  }
];

export const INITIAL_TICKETS: ProjectTicket[] = [
  {
    id: 'RLA-402',
    title: 'Verify Redis cluster shard eviction under synthetic spike load',
    category: 'Infrastructure',
    priority: 'high',
    status: 'in_progress',
    assignee: 'Engr. Yahaya Abdullahi (Principal Cloud Architect)',
    createdAt: '2026-09-24',
    commentsCount: 6
  },
  {
    id: 'RLA-403',
    title: 'Enforce SCIM directory sync for 1,200 secondary staff Google accounts',
    category: 'EdTech Training',
    priority: 'medium',
    status: 'in_review',
    assignee: 'Chidinma Okonkwo, M.Ed (Lead EdTech Specialist)',
    createdAt: '2026-09-23',
    commentsCount: 4
  },
  {
    id: 'RLA-405',
    title: 'Certify zero unencrypted payload ingress on API gateway endpoints',
    category: 'Security',
    priority: 'critical',
    status: 'resolved',
    assignee: 'Dr. Emeka Nnamdi (Cybersecurity Lead)',
    createdAt: '2026-09-21',
    commentsCount: 9
  },
  {
    id: 'RLA-408',
    title: 'Publish interactive rubric template for Primary Year 3-6 teachers',
    category: 'LMS Integration',
    priority: 'low',
    status: 'open',
    assignee: 'Folake Balogun (Pedagogical Systems Coach)',
    createdAt: '2026-09-25',
    commentsCount: 2
  }
];

export const SECURITY_AUDITS: SecurityAuditItem[] = [
  {
    id: 'sec-1',
    framework: 'SOC 2 Type II',
    status: 'verified',
    lastChecked: '2026-09-24',
    score: '100% Compliant',
    description: 'Continuous evidence collection across access control, encryption in transit, and immutable audit logs.'
  },
  {
    id: 'sec-2',
    framework: 'ISO 27001',
    status: 'passed',
    lastChecked: '2026-09-22',
    score: 'ISMS Certified',
    description: 'Information security management framework fully compliant with zero non-conformity findings.'
  },
  {
    id: 'sec-3',
    framework: 'FERPA / COPPA',
    status: 'verified',
    lastChecked: '2026-09-25',
    score: 'Grade K-12 Verified',
    description: 'Strict student privacy fences: zero PII sharing, localized student tenant segregation, and auditable parent consent.'
  },
  {
    id: 'sec-4',
    framework: 'Zero-Trust IAM',
    status: 'monitoring',
    lastChecked: '2026-09-26',
    score: '99.98% Strict',
    description: 'Context-aware authentication, continuous posture validation, and automated privilege expiration.'
  }
];

export const TRAINING_COHORTS: TrainingCohort[] = [
  {
    id: 'cohort-north-sec',
    schoolName: 'Corona Secondary & STEM Academy, Lagos',
    tier: 'Secondary',
    educatorCount: 68,
    progressPercent: 91,
    activeLMS: 'Canvas Cloud',
    currentModule: 'Automated Rubrics & Plagiarism-Safe Cloud Submissions',
    nextSession: 'Thursday, 14:00 WAT (Live Cloud Lab)',
    leadTrainer: 'Chidinma Okonkwo, M.Ed'
  },
  {
    id: 'cohort-elm-prim',
    schoolName: 'Grange Primary & Junior Academy, Ikeja',
    tier: 'Primary',
    educatorCount: 42,
    progressPercent: 88,
    activeLMS: 'Google Classroom',
    currentModule: 'Interactive Visual Whiteboards & Child-Safe Cloud Identity',
    nextSession: 'Tuesday, 09:30 WAT (Pedagogy Workshop)',
    leadTrainer: 'Folake Balogun'
  },
  {
    id: 'cohort-dist-admin',
    schoolName: 'Metropolitan Educational Consortium (18 Campuses)',
    tier: 'District Wide',
    educatorCount: 380,
    progressPercent: 74,
    activeLMS: 'Microsoft 365 Teams',
    currentModule: 'Centralized Role-Based Access & Safe Cloud Data Retention',
    nextSession: 'Friday, 11:00 WAT (Executive Briefing)',
    leadTrainer: 'Engr. Yahaya Abdullahi'
  }
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'prim-1',
    level: 'primary',
    title: 'Foundations of Cloud Classroom Literacy for Early Years',
    duration: '2 Weeks (12 Interactive Hours)',
    competencies: [
      'Touch-friendly collaborative cloud whiteboards',
      'Simplified QR-code student authentication for ages 5-9',
      'Safeguarding children data privacy and photo permissions',
      'Live parental visibility portals without administrative friction'
    ],
    description: 'Tailored specifically for elementary and primary educators. Eliminates technical hesitation and gives teachers confident mastery over daily digital reading circles, creative tablet workflows, and frictionless assignment collection.',
    toolsFocused: ['Google Workspace for Education', 'Seesaw Cloud', 'Interactive Display OS'],
    deliverable: 'Certified Primary Digital Classroom Ready'
  },
  {
    id: 'prim-2',
    level: 'primary',
    title: 'Gamified STEM & Collaborative Inquiry via Cloud Tools',
    duration: '2 Weeks (10 Interactive Hours)',
    competencies: [
      'Real-time collaborative math & science simulations',
      'Child-safe cloud portfolio creation for pupil showcase',
      'Voice-to-text assistive learning adaptations for early readers'
    ],
    description: 'Empowers primary instructors to turn passive screen time into inquiry-based, active student exploration with zero complex IT burden.',
    toolsFocused: ['Google Classroom', 'Scratch Cloud Hub', 'Padlet Education'],
    deliverable: 'Primary Interactive Tech Practitioner'
  },
  {
    id: 'sec-1',
    level: 'secondary',
    title: 'Mastery of Secondary Cloud LMS Workflows (Canvas & MS Teams)',
    duration: '3 Weeks (18 Hands-on Hours)',
    competencies: [
      'Automated grading matrices and objective-linked rubrics',
      'Secure exam lockdown browsers and anti-tamper submission logs',
      'Asynchronous video lecture cloud hosting with bookmark checkpoints',
      'Student performance analytics & early intervention alert triggers'
    ],
    description: 'Equips middle and high school teachers to run high-throughput academic courses with minimal grading burnout. Focuses on deep LMS workflow optimization, peer review automation, and syllabus modularity.',
    toolsFocused: ['Canvas Cloud LMS', 'Microsoft Teams for Education', 'Turnitin Cloud'],
    deliverable: 'Certified Secondary LMS Master Instructor'
  },
  {
    id: 'sec-2',
    level: 'secondary',
    title: 'Cyber Hygiene, AI Ethics & Digital Citizenship in High Schools',
    duration: '2 Weeks (12 Interactive Hours)',
    competencies: [
      'Teaching responsible AI literacy and ethical research citation',
      'Phishing awareness, password hygiene, and 2FA for teenage students',
      'Cloud storage segregation preventing accidental grade or personal leaks',
      'Disaster recovery & offline classroom backup strategies'
    ],
    description: 'Critical cyber hygiene and ethical computing framework designed for secondary school faculties, protecting both educator credentials and student identities from modern digital exploits.',
    toolsFocused: ['Bitwarden for Schools', 'Google Admin Console', 'K-12 Cloud Shield'],
    deliverable: 'K-12 Digital Safeguarding & Cyber Hygiene Lead'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-gstc',
    client: 'Government Science and Technical College (GSTC Garki, Area 3 Abuja)',
    industry: 'Public Secondary & Technical EdTech',
    title: 'Modern Digital Campus Portal & Student Academic Information System',
    metric: '100% Live in Production',
    metricLabel: 'Deployed at gstcgarki.vercel.app',
    challenge: 'The institution needed a dedicated, modern digital campus presence to display academic departments, technical and vocational programs, student admissions notices, staff directories, and administrative news with sub-second page performance across mobile and desktop devices.',
    solution: 'Designed and deployed a responsive, high-performance web platform featuring clear technical department showcases, academic calendars, interactive portal access, and institutional announcements built with modern cloud-optimized web technologies.',
    outcomes: [
      'Production website live 24/7 at gstcgarki.vercel.app',
      'Accessible to thousands of secondary & technical students, guardians, and faculty across the FCT',
      'Sub-second load times with mobile-first responsive architecture and secure SSL delivery'
    ],
    image: '/src/assets/images/nigerian_corporate_educators_1790430281164.jpg',
    liveUrl: 'https://gstcgarki.vercel.app/',
    badge: 'Live Client Deployment'
  },
  {
    id: 'case-1',
    client: 'Meridian Global Securities & Banking Core',
    industry: 'Financial Cloud & Enterprise Core',
    title: 'Multi-Region Zero-Trust Cloud Migration with Zero Downtime',
    metric: '99.999% Availability',
    metricLabel: 'Under 140M Daily Transactions',
    challenge: 'Legacy transactional core suffered from regional latency spikes and rigid maintenance windows causing compliance liabilities.',
    solution: 'Engineered an active-active multi-region Kubernetes mesh across AWS and Azure with sub-millisecond distributed state synchronization and automated mTLS.',
    outcomes: [
      'P99 API latency slashed from 340ms to 48ms',
      'Zero unplanned downtime across 18 consecutive months',
      'Annual infrastructure operational expenditure trimmed by 38%'
    ],
    image: '/src/assets/images/hero_cloud_datacenter_1790425680373.jpg'
  },
  {
    id: 'case-2',
    client: 'Lagos & Abuja Educational Trust (140+ Schools)',
    industry: 'K-12 EdTech & Cloud Transformation',
    title: 'District-Wide Digital Literacy & Cloud LMS Deployment for 3,200 Teachers',
    metric: '98.4% Teacher Adoption',
    metricLabel: 'Across 42,000 Primary & Secondary Pupils',
    challenge: 'Fragmented legacy software, inconsistent teacher digital confidence, and dangerous student data security gaps across 140 campuses.',
    solution: 'Designed and deployed unified cloud LMS infrastructure (Canvas & Google Workspace) paired with Rila Academy immersive corporate training cohorts for every primary and secondary faculty member.',
    outcomes: [
      '3,200+ primary and secondary teachers certified in 90 days',
      'Full COPPA, FERPA and NDPR compliance audit passed with zero infractions',
      'Parental satisfaction with digital coursework access climbed to 96%'
    ],
    image: '/src/assets/images/nigerian_school_leaders_1790430305259.jpg'
  },
  {
    id: 'case-3',
    client: 'Vanguard Biometrics & Enterprise Logistics',
    industry: 'Enterprise Software & Microservices',
    title: 'High-Concurrency Distributed Inventory & Telemetry Engine',
    metric: '4.8M Events / Sec',
    metricLabel: 'Event-Driven Go & Rust Microservices',
    challenge: 'Global supply chain IoT telemetry overwhelmed traditional relational databases during international logistics peak periods.',
    solution: 'Architected event-driven microservices utilizing Kafka, ClickHouse, and high-performance Go workers containerized on hardened Kubernetes in Victoria Island and global hubs.',
    outcomes: [
      'Scalable to 10x throughput without human infrastructure provisioning',
      'SOC 2 Type II attestation obtained ahead of contractual deadlines',
      'Mean time to resolution (MTTR) for incidents dropped from 4 hours to 9 minutes'
    ],
    image: '/src/assets/images/nigerian_enterprise_engineers_1790430293207.jpg'
  }
];
