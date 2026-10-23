/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { PainterDirectory } from './components/customer/PainterDirectory';
import { PaintCalculator } from './components/customer/PaintCalculator';
import { ColorVisualizer } from './components/customer/ColorVisualizer';
import { CustomerBookings } from './components/customer/CustomerBookings';
import { BookingModal } from './components/customer/BookingModal';
import { PaymentSuccessModal } from './components/customer/PaymentSuccessModal';
import { PostJobModal } from './components/customer/PostJobModal';
import { ReviewSectionModal, PainterReviewsDrawer } from './components/customer/ReviewSection';
import { PainterLeads } from './components/painter/PainterLeads';
import { SendQuoteModal } from './components/painter/SendQuoteModal';
import { QuoteGenerator } from './components/painter/QuoteGenerator';
import { WorkTracker } from './components/painter/WorkTracker';
import { PainterProfileEditor } from './components/painter/PainterProfileEditor';
import { ChatModal } from './components/common/ChatModal';
import { AutonomousAIAgent } from './components/common/AutonomousAIAgent';
import { AuthModal } from './components/common/AuthModal';
import { PainterProfile, JobLead } from './types';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  CreditCard, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall 
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { role, lang, painters, jobLeads } = useApp();

  const [activeTab, setActiveTab] = useState<string>(role === 'customer' ? 'painters' : 'painter_leads');

  // Modal states
  const [selectedPainterForBooking, setSelectedPainterForBooking] = useState<PainterProfile | null>(null);
  const [selectedLeadForQuote, setSelectedLeadForQuote] = useState<JobLead | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ name: string; phone: string } | null>(null);

  // Review modal and drawer states
  const [reviewModalPainter, setReviewModalPainter] = useState<PainterProfile | null>(null);
  const [reviewModalBookingId, setReviewModalBookingId] = useState<string | undefined>(undefined);
  const [reviewsDrawerPainter, setReviewsDrawerPainter] = useState<PainterProfile | null>(null);

  // Payment success state
  const [successInfo, setSuccessInfo] = useState<{
    isOpen: boolean;
    bookingNumber: string;
    amountPaid: number;
    transactionRef?: string;
  }>({
    isOpen: false,
    bookingNumber: '',
    amountPaid: 0,
  });

  const handleBookPainter = (painter: PainterProfile) => {
    setSelectedPainterForBooking(painter);
  };

  const handleBookingSuccess = (bookingNumber: string, amountPaid: number, transactionRef?: string) => {
    setSuccessInfo({
      isOpen: true,
      bookingNumber,
      amountPaid,
      transactionRef,
    });
  };

  const handleCalculatorProceed = (sqft: number, budget: number, serviceName: string) => {
    if (painters.length > 0) {
      setSelectedPainterForBooking(painters[0]);
    }
  };

  const handleVisualizerProceed = (accentHex: string, mainHex: string, shadeName: string) => {
    if (painters.length > 0) {
      setSelectedPainterForBooking(painters[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPostJobClick={() => setIsPostJobModalOpen(true)}
        onOpenLogin={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Customer View */}
        {role === 'customer' && (
          <div>
            {activeTab === 'painters' && (
              <PainterDirectory
                onBookPainter={handleBookPainter}
                onChatWithPainter={(p) => setChatRecipient({ name: p.name, phone: p.phone })}
                onPostJobClick={() => setIsPostJobModalOpen(true)}
                onOpenCalculator={() => setActiveTab('calculator')}
                onOpenReviews={(p) => setReviewsDrawerPainter(p)}
                onWriteReview={(p) => {
                  setReviewModalPainter(p);
                  setReviewModalBookingId(undefined);
                }}
              />
            )}

            {activeTab === 'calculator' && (
              <PaintCalculator
                onProceedToBooking={handleCalculatorProceed}
                onPostRequirement={() => setIsPostJobModalOpen(true)}
              />
            )}

            {activeTab === 'visualizer' && (
              <ColorVisualizer
                onBookWithPalette={handleVisualizerProceed}
              />
            )}

            {activeTab === 'customer_bookings' && (
              <CustomerBookings
                onChatWithPainter={(name, phone) => setChatRecipient({ name, phone })}
                onPostJobClick={() => setIsPostJobModalOpen(true)}
                onOpenWriteReview={(p, bookingId) => {
                  setReviewModalPainter(p);
                  setReviewModalBookingId(bookingId);
                }}
                onOpenReviewsDrawer={(p) => setReviewsDrawerPainter(p)}
              />
            )}
          </div>
        )}

        {/* Painter / Contractor View */}
        {role === 'painter' && (
          <div>
            {activeTab === 'painter_leads' && (
              <PainterLeads
                onOpenSendQuote={(lead) => setSelectedLeadForQuote(lead)}
                onChatWithCustomer={(name, phone) => setChatRecipient({ name, phone })}
              />
            )}

            {activeTab === 'quote_generator' && (
              <QuoteGenerator />
            )}

            {activeTab === 'work_tracker' && (
              <WorkTracker />
            )}

            {activeTab === 'painter_profile' && (
              <PainterProfileEditor />
            )}
          </div>
        )}

      </main>

      {/* Booking & Online Payment Modal */}
      {selectedPainterForBooking && (
        <BookingModal
          painter={selectedPainterForBooking}
          isOpen={true}
          onClose={() => setSelectedPainterForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Payment Success & Receipt Modal */}
      <PaymentSuccessModal
        isOpen={successInfo.isOpen}
        onClose={() => setSuccessInfo(prev => ({ ...prev, isOpen: false }))}
        bookingNumber={successInfo.bookingNumber}
        amountPaid={successInfo.amountPaid}
        transactionRef={successInfo.transactionRef}
        onViewBookings={() => {
          setSuccessInfo(prev => ({ ...prev, isOpen: false }));
          setActiveTab('customer_bookings');
        }}
      />

      {/* Post Job Lead Modal */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onSuccess={() => {
          if (role === 'painter') {
            setActiveTab('painter_leads');
          } else {
            setActiveTab('customer_bookings');
          }
        }}
      />

      {/* Customer Review Posting Modal */}
      {reviewModalPainter && (
        <ReviewSectionModal
          painter={reviewModalPainter}
          bookingId={reviewModalBookingId}
          isOpen={true}
          onClose={() => {
            setReviewModalPainter(null);
            setReviewModalBookingId(undefined);
          }}
          onSuccess={() => {
            // refreshed seamlessly via AppContext
          }}
        />
      )}

      {/* Painter Reviews Showcase Drawer */}
      {reviewsDrawerPainter && (
        <PainterReviewsDrawer
          painter={reviewsDrawerPainter}
          isOpen={true}
          onClose={() => setReviewsDrawerPainter(null)}
          onOpenWriteReview={() => {
            const p = reviewsDrawerPainter;
            setReviewsDrawerPainter(null);
            setReviewModalPainter(p);
          }}
        />
      )}

      {/* Send Quote Modal (for Painter) */}
      {selectedLeadForQuote && (
        <SendQuoteModal
          lead={selectedLeadForQuote}
          isOpen={true}
          onClose={() => setSelectedLeadForQuote(null)}
          onSuccess={() => {
            alert(lang === 'hi' ? 'कोटेशन ग्राहक को भेज दिया गया है!' : 'Quote successfully submitted to customer!');
          }}
        />
      )}

      {/* Instant Messenger Modal */}
      {chatRecipient && (
        <ChatModal
          recipientName={chatRecipient.name}
          recipientPhone={chatRecipient.phone}
          isOpen={true}
          onClose={() => setChatRecipient(null)}
        />
      )}

      {/* User Login & Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultRole={role}
      />

      {/* Autonomous AI Agent for Painting & Auto-Management */}
      <AutonomousAIAgent
        onTriggerAction={(action, data) => {
          if (action === 'open_calculator') {
            setActiveTab('calculator');
          } else if (action === 'open_visualizer') {
            setActiveTab('visualizer');
          } else if (action === 'auto_book') {
            const painter = painters.find(p => p.id === data?.recommendedPainterId) || painters[0];
            setSelectedPainterForBooking(painter);
          } else if (action === 'open_quote_generator') {
            setActiveTab('quote_generator');
          }
        }}
      />

      {/* Quiet Professional Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-900 text-sm">RangSathi (रंगसाथी)</span>
            <span className="ml-2">·</span>
            <span className="ml-2">
              {lang === 'hi' 
                ? 'मध्य प्रदेश (MP) का विश्वसनीय पेंटर व ग्राहक ऑनलाइन नेटवर्क' 
                : 'Madhya Pradesh’s Trusted Home Painting & Contractor Connect'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500">
            <span>55 Districts Across MP</span>
            <span>·</span>
            <span>100% Escrow Advance Protection</span>
            <span>·</span>
            <span>Verified Asian & Berger Painters</span>
            <span>·</span>
            <span>© 2026 RangSathi MP</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
