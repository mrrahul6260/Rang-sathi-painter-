import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  UserAccount,
  PainterProfile, 
  JobLead, 
  BookingRequest, 
  PaymentTransaction, 
  Quote, 
  ActiveProject,
  CustomerReview 
} from '../types';
import { 
  INITIAL_PAINTERS, 
  INITIAL_JOB_LEADS, 
  INITIAL_BOOKINGS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_PROJECTS,
  INITIAL_REVIEWS 
} from '../data/initialData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  currentUser: UserAccount | null;
  login: (account: Partial<UserAccount>) => void;
  logout: () => void;
  painters: PainterProfile[];
  jobLeads: JobLead[];
  bookings: BookingRequest[];
  transactions: PaymentTransaction[];
  projects: ActiveProject[];
  quotes: Quote[];
  reviews: CustomerReview[];
  activePainter: PainterProfile;
  
  // Actions
  addJobLead: (lead: Omit<JobLead, 'id' | 'createdAt' | 'status' | 'quotesCount'>) => JobLead;
  sendQuote: (quote: Omit<Quote, 'id' | 'submittedAt' | 'status'>) => void;
  addReview: (review: Omit<CustomerReview, 'id' | 'createdAt'>) => void;
  createBookingAndPay: (
    bookingData: Omit<BookingRequest, 'id' | 'bookingNumber' | 'createdAt'>,
    paymentData?: {
      method: 'upi' | 'card' | 'netbanking' | 'cash';
      upiApp?: 'gpay' | 'phonepe' | 'paytm' | 'other';
      amount: number;
      purpose: 'inspection_token' | 'job_advance' | 'milestone_payment' | 'final_settlement';
    }
  ) => { booking: BookingRequest; transaction?: PaymentTransaction };
  updateBookingStatus: (bookingId: string, status: BookingRequest['bookingStatus']) => void;
  updateProjectProgress: (projectId: string, progress: number, status: ActiveProject['status']) => void;
  addProject: (project: Omit<ActiveProject, 'id'>) => void;
  updatePainterProfile: (updated: Partial<PainterProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'rangsathi_role',
  LANG: 'rangsathi_lang',
  USER: 'rangsathi_user',
  PAINTERS: 'rangsathi_painters',
  LEADS: 'rangsathi_leads',
  BOOKINGS: 'rangsathi_bookings',
  TRANSACTIONS: 'rangsathi_transactions',
  PROJECTS: 'rangsathi_projects',
  QUOTES: 'rangsathi_quotes',
  REVIEWS: 'rangsathi_reviews',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'customer';
  });

  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'hi';
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) return JSON.parse(saved);
    // Default initial user for instant seamless experience
    return {
      id: 'usr-default',
      name: 'राहुल शर्मा (Rahul Sharma)',
      phone: '+91 98111 22334',
      email: 'mrrahul6260@gmail.com',
      role: 'customer',
      city: 'Delhi NCR',
      isLoggedIn: true,
    };
  });

  const [painters, setPainters] = useState<PainterProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAINTERS);
    return saved ? JSON.parse(saved) : INITIAL_PAINTERS;
  });

  const [jobLeads, setJobLeads] = useState<JobLead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : INITIAL_JOB_LEADS;
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [projects, setProjects] = useState<ActiveProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return saved ? JSON.parse(saved) : [
      {
        id: 'q-1',
        jobId: 'lead-101',
        painterId: 'p-1',
        painterName: 'रमेश कुमार & सन्स (Ramesh Kumar & Sons)',
        painterPhone: '+91 98102 34812',
        ratePerSqFt: 18,
        materialIncluded: true,
        labourCost: 12000,
        materialCost: 16000,
        totalCost: 28000,
        estimatedDays: 5,
        proposedStartDate: '2026-10-27',
        notes: 'Asian Paints Royale Luxury Emulsion (2 Coats) + 1 Coat Acrylic Primer + Surface Sanding included.',
        submittedAt: 'आज दोपहर 12:40',
        status: 'pending',
      }
    ];
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Current active painter profile when in 'painter' role
  const activePainter = painters[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  }, [lang]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  const login = (account: Partial<UserAccount>) => {
    const user: UserAccount = {
      id: account.id || `usr-${Date.now()}`,
      name: account.name || 'User',
      phone: account.phone || '+91 98111 22334',
      email: account.email || 'user@example.com',
      role: account.role || role,
      city: account.city || 'Delhi NCR',
      isLoggedIn: true,
      avatar: account.avatar,
    };
    setCurrentUser(user);
    if (user.role) {
      setRoleState(user.role);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAINTERS, JSON.stringify(painters));
  }, [painters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(jobLeads));
  }, [jobLeads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  const setRole = (newRole: UserRole) => setRoleState(newRole);
  const setLang = (newLang: Language) => setLangState(newLang);

  const addJobLead = (leadData: Omit<JobLead, 'id' | 'createdAt' | 'status' | 'quotesCount'>): JobLead => {
    const newLead: JobLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: 'अभी-अभी (Just now)',
      status: 'open',
      quotesCount: 0,
    };
    setJobLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const sendQuote = (quoteData: Omit<Quote, 'id' | 'submittedAt' | 'status'>) => {
    const newQuote: Quote = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      submittedAt: 'अभी-अभी (Just now)',
      status: 'pending',
    };
    setQuotes(prev => [newQuote, ...prev]);
    // increment quote count on the lead
    setJobLeads(prev => prev.map(lead => {
      if (lead.id === quoteData.jobId) {
        return { ...lead, status: 'quotes_received', quotesCount: lead.quotesCount + 1 };
      }
      return lead;
    }));
  };

  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'createdAt'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: 'अभी-अभी (Just now)',
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Calculate new painter rating & reviewCount
    const painterReviews = updatedReviews.filter(r => r.painterId === reviewData.painterId);
    const avgRating = Number((painterReviews.reduce((sum, r) => sum + r.rating, 0) / painterReviews.length).toFixed(1));

    setPainters(prev => prev.map(p => {
      if (p.id === reviewData.painterId) {
        return {
          ...p,
          rating: avgRating,
          reviewCount: p.reviewCount + 1,
        };
      }
      return p;
    }));

    // If associated with a booking, mark it as completed
    if (reviewData.bookingId) {
      setBookings(prev => prev.map(b => b.id === reviewData.bookingId ? { ...b, bookingStatus: 'completed' } : b));
    }

    // Also async sync to Firestore /reviews
    try {
      import('../lib/firebase').then(({ db }) => {
        import('firebase/firestore').then(({ doc, setDoc }) => {
          setDoc(doc(db, 'reviews', newReview.id), newReview, { merge: true }).catch(() => {});
        });
      });
    } catch (e) {
      // safe fallback
    }
  };

  const createBookingAndPay = (
    bookingData: Omit<BookingRequest, 'id' | 'bookingNumber' | 'createdAt'>,
    paymentData?: {
      method: 'upi' | 'card' | 'netbanking' | 'cash';
      upiApp?: 'gpay' | 'phonepe' | 'paytm' | 'other';
      amount: number;
      purpose: 'inspection_token' | 'job_advance' | 'milestone_payment' | 'final_settlement';
    }
  ) => {
    const bookingNumber = `RNG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingId = `bk-${Date.now()}`;
    const txRef = `UPI-RNG-${Math.floor(1000000 + Math.random() * 9000000)}`;

    let newTx: PaymentTransaction | undefined;

    if (paymentData && paymentData.amount > 0) {
      newTx = {
        id: `tx-${Date.now()}`,
        bookingId,
        customerName: bookingData.customerName,
        painterName: bookingData.painterName,
        amount: paymentData.amount,
        method: paymentData.method,
        upiApp: paymentData.upiApp,
        transactionRef: txRef,
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'success',
        purpose: paymentData.purpose,
      };
      setTransactions(prev => [newTx!, ...prev]);
    }

    const newBooking: BookingRequest = {
      ...bookingData,
      id: bookingId,
      bookingNumber,
      createdAt: new Date().toISOString(),
      paymentStatus: newTx ? (paymentData?.amount === bookingData.totalEstimatedAmount ? 'fully_paid' : 'advance_paid') : 'unpaid',
      paymentTransactionId: newTx ? txRef : undefined,
      bookingStatus: 'confirmed',
    };

    setBookings(prev => [newBooking, ...prev]);

    // Also auto-create or connect an ActiveProject for the painter
    const newProj: ActiveProject = {
      id: `proj-${Date.now()}`,
      clientName: `${bookingData.customerName} (${bookingData.propertyType})`,
      phone: bookingData.customerPhone,
      address: bookingData.siteAddress,
      serviceType: bookingData.serviceType,
      totalAmount: bookingData.totalEstimatedAmount,
      advancePaid: bookingData.advanceAmountPaid,
      status: 'surface_prep',
      progressPercent: 15,
      startDate: bookingData.scheduledDate,
      targetEndDate: new Date(new Date(bookingData.scheduledDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: `ऑनलाइन बुकिंग #${bookingNumber}. टोकन/एडवांस ₹${bookingData.advanceAmountPaid} प्राप्त हुआ।`,
    };
    setProjects(prev => [newProj, ...prev]);

    return { booking: newBooking, transaction: newTx };
  };

  const updateBookingStatus = (bookingId: string, status: BookingRequest['bookingStatus']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, bookingStatus: status } : b));
  };

  const updateProjectProgress = (projectId: string, progress: number, status: ActiveProject['status']) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, progressPercent: progress, status } : p));
  };

  const addProject = (projectData: Omit<ActiveProject, 'id'>) => {
    const newProject: ActiveProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updatePainterProfile = (updated: Partial<PainterProfile>) => {
    setPainters(prev => prev.map((p, idx) => idx === 0 ? { ...p, ...updated } : p));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        currentUser,
        login,
        logout,
        painters,
        jobLeads,
        bookings,
        transactions,
        projects,
        quotes,
        reviews,
        activePainter,
        addJobLead,
        sendQuote,
        addReview,
        createBookingAndPay,
        updateBookingStatus,
        updateProjectProgress,
        addProject,
        updatePainterProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
