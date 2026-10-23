import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PainterProfile } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileText, 
  Printer, 
  MessageSquare, 
  Sparkles, 
  AlertCircle,
  Star
} from 'lucide-react';
import { PaymentSuccessModal } from './PaymentSuccessModal';

interface CustomerBookingsProps {
  onChatWithPainter: (painterName: string, painterPhone: string) => void;
  onPostJobClick: () => void;
  onOpenWriteReview?: (painter: PainterProfile, bookingId?: string) => void;
  onOpenReviewsDrawer?: (painter: PainterProfile) => void;
}

export const CustomerBookings: React.FC<CustomerBookingsProps> = ({
  onChatWithPainter,
  onPostJobClick,
  onOpenWriteReview,
  onOpenReviewsDrawer,
}) => {
  const { lang, bookings, quotes, painters, reviews, updateBookingStatus } = useApp();

  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<string | null>(null);

  const receiptBooking = bookings.find((b) => b.bookingNumber === selectedReceiptBooking);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'मेरी पेंटिंग बुकिंग व पेमेंट स्थिति' : 'My Bookings & Payment History'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {lang === 'hi' 
            ? 'आपकी सभी ऑनलाइन बुकिंग्स, भुगतान रसीदें, पेंटर रेटिंग्स और प्राप्त कोटेशन।' 
            : 'Track confirmed appointments, digital payment receipts, painter ratings, and quotes.'}
        </p>
      </div>

      {/* Confirmed Online Bookings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {lang === 'hi' ? 'कन्फर्म बुकिंग्स व शेड्यूल्ड विजिट' : 'Confirmed Bookings & Site Visits'}
          </h2>
          <span className="text-xs text-slate-500">
            {bookings.length} {lang === 'hi' ? 'बुकिंग उपलब्ध' : 'bookings'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">
              {lang === 'hi' ? 'अभी तक कोई बुकिंग नहीं हुई है।' : 'No active bookings found.'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'hi' ? 'पेंटर डायरेक्टरी से किसी भी पेंटर को ऑनलाइन बुक करें।' : 'Explore painters to schedule your first paint job or inspection.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const matchedPainter = painters.find((p) => p.id === booking.painterId || p.name === booking.painterName) || painters[0];
              const userReview = reviews.find((r) => r.bookingId === booking.id || r.painterId === matchedPainter?.id);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          #{booking.bookingNumber}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1 ${
                          booking.bookingStatus === 'completed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {booking.bookingStatus === 'completed' 
                            ? (lang === 'hi' ? 'काम पूरा हुआ' : 'Job Completed') 
                            : (lang === 'hi' ? 'कन्फर्म' : 'Confirmed')}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500">
                          {booking.bookingType === 'site_inspection' 
                            ? (lang === 'hi' ? 'साइट इंस्पेक्शन' : 'Site Inspection') 
                            : (lang === 'hi' ? 'फुल पेंटिंग स्लॉट' : 'Direct Paint Slot')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5">
                        {booking.painterName}
                      </h3>
                    </div>

                    {/* Payment Tag */}
                    <div className="sm:text-right">
                      <div className="text-xs font-medium text-slate-500">
                        {lang === 'hi' ? 'भुगतान स्थिति' : 'Payment Status'}
                      </div>
                      <div className="text-sm font-bold text-emerald-700 tabular-nums">
                        ₹{booking.advanceAmountPaid.toLocaleString('en-IN')} {lang === 'hi' ? 'जमा' : 'Paid'}
                        {booking.totalEstimatedAmount > booking.advanceAmountPaid && (
                          <span className="text-xs text-slate-400 font-normal"> / ₹{booking.totalEstimatedAmount.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      {booking.paymentTransactionId && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Ref: {booking.paymentTransactionId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        <strong>{lang === 'hi' ? 'तारीख:' : 'Date:'}</strong> {booking.scheduledDate} ({booking.timeSlot})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="line-clamp-1">
                        <strong>{lang === 'hi' ? 'साइट पता:' : 'Site Address:'}</strong> {booking.siteAddress}, {booking.city}
                      </span>
                    </div>
                  </div>

                  {/* Existing Review Badge if available */}
                  {userReview ? (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 mb-3 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{lang === 'hi' ? `आपकी समीक्षा: ${userReview.rating}/5.0` : `Your Rating: ${userReview.rating}/5.0`}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{userReview.createdAt}</span>
                      </div>
                      <p className="text-slate-700 italic">"{userReview.comment}"</p>
                    </div>
                  ) : null}

                  {/* Notes if any */}
                  {booking.notes && !userReview && (
                    <div className="p-2.5 rounded-lg bg-slate-50 text-xs text-slate-600 mb-3 border border-slate-100">
                      <span className="font-semibold text-slate-700">{lang === 'hi' ? 'निर्देश:' : 'Note:'}</span> {booking.notes}
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onChatWithPainter(booking.painterName, booking.painterPhone)}
                        className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lang === 'hi' ? 'पेंटर से चैट' : 'Chat'}</span>
                      </button>

                      <a
                        href={`tel:${booking.painterPhone}`}
                        className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                      </a>

                      {/* Review Button if not yet reviewed */}
                      {matchedPainter && onOpenWriteReview && (
                        <button
                          onClick={() => onOpenWriteReview(matchedPainter, booking.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            userReview 
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${userReview ? 'fill-amber-400 text-amber-500' : 'fill-white text-white'}`} />
                          <span>{userReview ? (lang === 'hi' ? 'रिव्यू अपडेट करें' : 'Edit Review') : (lang === 'hi' ? 'रेटिंग व रिव्यू दें' : 'Rate & Review')}</span>
                        </button>
                      )}

                      {/* Mark Completed button if still confirmed */}
                      {booking.bookingStatus !== 'completed' && (
                        <button
                          onClick={() => {
                            updateBookingStatus(booking.id, 'completed');
                            if (matchedPainter && onOpenWriteReview) {
                              onOpenWriteReview(matchedPainter, booking.id);
                            }
                          }}
                          className="px-3 py-1.5 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          ✓ {lang === 'hi' ? 'काम पूरा मार्क करें' : 'Mark Job Done'}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedReceiptBooking(booking.bookingNumber)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'पेमेंट रसीद' : 'Receipt'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Incoming Painter Quotes Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'पेंटर्स द्वारा भेजे गए कोटेशन (Quotes Received)' : 'Quotes from Local Contractors'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'hi' ? 'आपके द्वारा पोस्ट किए गए काम पर एमपी के ठेकेदारों के ऑफर' : 'Offers received on your posted requirements across MP'}
            </p>
          </div>
          <button
            onClick={onPostJobClick}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 cursor-pointer"
          >
            + {lang === 'hi' ? 'नया काम पोस्ट करें' : 'Post another job'}
          </button>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-slate-50 p-6 text-center rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
            {lang === 'hi' ? 'अभी कोई नया कोटेशन नहीं आया है।' : 'No quotes received yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{quote.painterName}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{quote.submittedAt}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {quote.notes}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                    <span><strong>{lang === 'hi' ? 'दर:' : 'Rate:'}</strong> ₹{quote.ratePerSqFt}/sq.ft</span>
                    <span>·</span>
                    <span><strong>{lang === 'hi' ? 'अनुमानित दिन:' : 'Days:'}</strong> {quote.estimatedDays} दिन</span>
                    <span>·</span>
                    <span>{quote.materialIncluded ? (lang === 'hi' ? 'मटेरियल सहित' : 'Material incl.') : (lang === 'hi' ? 'केवल लेबर' : 'Labour only')}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 flex flex-col sm:items-end justify-between gap-2">
                  <div className="text-base font-extrabold text-slate-900 tabular-nums">
                    ₹{quote.totalCost.toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onChatWithPainter(quote.painterName, quote.painterPhone)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      {lang === 'hi' ? 'बातचीत करें' : 'Chat / Negotiate'}
                    </button>
                    <button
                      onClick={() => alert(lang === 'hi' ? 'कोटेशन स्वीकार किया गया! कृपया ऊपर दिए गए बुकिंग विकल्प से तारीख तय करें।' : 'Quote Accepted! Please select date from Booking.')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      {lang === 'hi' ? 'स्वीकार करें' : 'Accept Quote'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Receipt Modal */}
      {selectedReceiptBooking && receiptBooking && (
        <PaymentSuccessModal
          isOpen={true}
          onClose={() => setSelectedReceiptBooking(null)}
          bookingNumber={receiptBooking.bookingNumber}
          amountPaid={receiptBooking.advanceAmountPaid}
          transactionRef={receiptBooking.paymentTransactionId}
          onViewBookings={() => setSelectedReceiptBooking(null)}
        />
      )}

    </div>
  );
};
