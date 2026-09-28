import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocFromServer,
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  updateDoc 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore targeting the provisioned database ID
export const db = getFirestore(
  firebaseApp, 
  firebaseConfig.firestoreDatabaseId || '(default)'
);

// Connection state test as per Firebase Skill guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error && typeof error.message === 'string' && error.message.includes('the client is offline')) {
      console.warn('Firestore offline or awaiting network connection.');
      return false;
    }
    // If permission-denied or doc not found, it still proves server connection is live!
    return true;
  }
}

// 1. Submit Enterprise Consultation Inquiry
export interface ConsultationPayload {
  fullName: string;
  workEmail: string;
  organization: string;
  serviceTrack: 'cloud-architecture' | 'zero-trust-cybersecurity' | 'educator-academy' | 'hybrid-migration';
  message: string;
  prefilledScope?: string;
  phone?: string;
  status: 'received' | 'in_review' | 'scheduled' | 'completed';
  createdAt: string;
}

export async function submitConsultationToFirestore(payload: ConsultationPayload): Promise<string> {
  const docId = `cons_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const ref = doc(db, 'consultations', docId);
  await setDoc(ref, payload);
  return docId;
}

// 2. Submit Educator Training Application
export interface EducatorApplicationPayload {
  fullName: string;
  institution: string;
  role: 'primary_educator' | 'secondary_educator' | 'district_administrator' | 'technical_instructor';
  trackId: 'track-canvas' | 'track-google' | 'track-safeguarding' | 'track-stem';
  email: string;
  phone?: string;
  status: 'submitted' | 'enrolled' | 'certified';
  createdAt: string;
}

export async function submitEducatorApplicationToFirestore(payload: EducatorApplicationPayload): Promise<string> {
  const docId = `edu_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const ref = doc(db, 'educator_applications', docId);
  await setDoc(ref, payload);
  return docId;
}

// 3. Portal Support & Architecture Tickets
export interface PortalTicketPayload {
  title: string;
  category: 'architecture' | 'cybersecurity' | 'lms-sync' | 'infrastructure' | 'billing';
  severity: 'critical' | 'high' | 'standard';
  description: string;
  authorName?: string;
  authorRole?: 'enterprise_client' | 'educator_admin';
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
}

export async function submitPortalTicketToFirestore(payload: PortalTicketPayload): Promise<string> {
  const docId = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const ref = doc(db, 'portal_tickets', docId);
  await setDoc(ref, payload);
  return docId;
}

// Real-time listener for Portal Tickets
export function subscribeToPortalTickets(callback: (tickets: (PortalTicketPayload & { id: string })[]) => void) {
  const q = query(collection(db, 'portal_tickets'), orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(q, (snapshot) => {
    const tickets = snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as PortalTicketPayload)
    }));
    callback(tickets);
  }, (err) => {
    console.warn('Real-time ticket listener update error:', err);
  });
}

// Update Portal Ticket Status
export async function updateTicketStatusInFirestore(ticketId: string, status: 'open' | 'investigating' | 'resolved') {
  const ref = doc(db, 'portal_tickets', ticketId);
  await updateDoc(ref, { status });
}
