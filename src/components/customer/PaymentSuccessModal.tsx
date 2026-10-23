import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Download, Printer, Phone, Calendar, MapPin, X } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingNumber: string;
  amountPaid: number;
  transactionRef?: string;
  onViewBookings: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  bookingNumber,
  amountPaid,
  transactionRef,
  onViewBookings,
}) => {
  const { lang, bookings } = useApp();

  if (!isOpen) return null;

  const currentBooking = bookings.find((b) => b.bookingNumber === bookingNumber) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success Banner */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-emerald-100 hover:text-white rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-xl font-bold">
            {lang === 'hi' ? 'बुकिंग व पेमेंट सफल!' : 'Booking & Payment Successful!'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {lang === 'hi' 
              ? 'पेंटर को नोटिफिकेशन भेज दिया गया है।' 
              : 'Contractor has been notified and dates are reserved.'}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-4 print:p-0">
          
          {/* Booking & Tx ID Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">
                {lang === 'hi' ? 'बुकिंग संख्या (Booking No.)' : 'Booking Reference'}
              </span>
              <span className="font-bold text-slate-900 font-mono text-sm">
                {bookingNumber}
              </span>
            </div>

            {transactionRef && (
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">
                  {lang === 'hi' ? 'लेन-देन संदर्भ (Txn Ref)' : 'Transaction Ref'}
                </span>
                <span className="font-mono text-slate-800">
                  {transactionRef}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">
                {lang === 'hi' ? 'भुगतान की गई राशि' : 'Amount Paid Online'}
              </span>
              <span className="font-bold text-emerald-700 text-base tabular-nums">
                ₹{amountPaid.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">
                {lang === 'hi' ? 'पेमेंट स्थिति' : 'Payment Status'}
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                {amountPaid > 0 ? (lang === 'hi' ? 'स्वीकृत (Success)' : 'Verified Success') : (lang === 'hi' ? 'साइट पर नकद (Cash Due)' : 'Pay on Visit')}
              </span>
            </div>
          </div>

          {/* Details Pill */}
          {currentBooking && (
            <div className="space-y-2 text-xs text-slate-600 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{lang === 'hi' ? 'शेड्यूल तारीख:' : 'Scheduled Date:'}</strong> {currentBooking.scheduledDate} ({currentBooking.timeSlot})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{lang === 'hi' ? 'साइट:' : 'Site:'}</strong> {currentBooking.siteAddress}, {currentBooking.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{lang === 'hi' ? 'पेंटर:' : 'Painter:'}</strong> {currentBooking.painterName} ({currentBooking.painterPhone})
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'रसीद प्रिंट / डाउनलोड' : 'Print / Download Receipt'}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onViewBookings();
              }}
              className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{lang === 'hi' ? 'मेरी बुकिंग देखें' : 'View in Bookings'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
