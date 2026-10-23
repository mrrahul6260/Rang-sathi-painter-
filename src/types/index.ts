export type UserRole = 'customer' | 'painter';
export type Language = 'hi' | 'en';

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar?: string;
  city: string;
  isLoggedIn: boolean;
}

export type ServiceType = 
  | 'interior'
  | 'exterior'
  | 'texture'
  | 'waterproofing'
  | 'wood_polish'
  | 'putty_primer';

export interface PainterProfile {
  id: string;
  name: string;
  phone: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  city: string;
  area: string;
  baseRateSqFt: number; // in INR
  teamSize: number;
  isVerified: boolean;
  specialties: ServiceType[];
  bio: string;
  completedJobsCount: number;
  toolsOwned: string[];
  portfolio: {
    title: string;
    description: string;
    colorAccent: string;
    roomType: string;
    beforeAfter?: boolean;
  }[];
}

export interface JobLead {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  area: string;
  serviceType: ServiceType;
  propertyType: '1bhk' | '2bhk' | '3bhk' | '4bhk' | 'single_room' | 'commercial' | 'exterior_bungalow';
  carpetAreaSqFt: number;
  preferredPaintBrand: string;
  paintQuality: 'economy' | 'premium' | 'luxury';
  timeline: 'immediate' | 'within_week' | 'planning';
  budgetEstimate: number;
  description: string;
  createdAt: string;
  status: 'open' | 'quotes_received' | 'assigned' | 'completed';
  quotesCount: number;
}

export interface Quote {
  id: string;
  jobId: string;
  painterId: string;
  painterName: string;
  painterPhone: string;
  ratePerSqFt: number;
  materialIncluded: boolean;
  labourCost: number;
  materialCost: number;
  totalCost: number;
  estimatedDays: number;
  proposedStartDate: string;
  notes: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface BookingRequest {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  painterId: string;
  painterName: string;
  painterPhone: string;
  serviceType: ServiceType;
  propertyType: string;
  carpetAreaSqFt: number;
  scheduledDate: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  siteAddress: string;
  city: string;
  bookingType: 'site_inspection' | 'direct_painting';
  totalEstimatedAmount: number;
  advanceAmountPaid: number;
  paymentStatus: 'unpaid' | 'advance_paid' | 'fully_paid';
  paymentMethod?: 'upi' | 'card' | 'netbanking' | 'cash';
  paymentTransactionId?: string;
  bookingStatus: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  customerName: string;
  painterName: string;
  amount: number;
  method: 'upi' | 'card' | 'netbanking' | 'cash';
  upiApp?: 'gpay' | 'phonepe' | 'paytm' | 'other';
  transactionRef: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  purpose: 'inspection_token' | 'job_advance' | 'milestone_payment' | 'final_settlement';
}

export interface ActiveProject {
  id: string;
  clientName: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  totalAmount: number;
  advancePaid: number;
  status: 'planning' | 'surface_prep' | 'putty_primer' | 'final_coat' | 'completed';
  progressPercent: number;
  startDate: string;
  targetEndDate: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'painter';
  text: string;
  timestamp: string;
}

export interface CustomerReview {
  id: string;
  painterId: string;
  bookingId?: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  serviceType: ServiceType;
  createdAt: string;
  propertyType?: string;
}


