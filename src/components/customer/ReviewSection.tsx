import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PainterProfile, ServiceType, CustomerReview } from '../../types';
import { SERVICES_LIST } from '../../data/initialData';
import { 
  Star, 
  X, 
  CheckCircle2, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  Sparkles, 
  Award, 
  ShieldCheck 
} from 'lucide-react';

interface ReviewModalProps {
  painter: PainterProfile;
  bookingId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ReviewSectionModal: React.FC<ReviewModalProps> = ({
  painter,
  bookingId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { lang, currentUser, addReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [serviceType, setServiceType] = useState<ServiceType>(painter.specialties[0] || 'interior');
  const [propertyType, setPropertyType] = useState<string>('3 BHK');
  const [comment, setComment] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>(currentUser?.name || 'राहुल शर्मा (Rahul Sharma)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const starLabels = [
    { star: 1, labelHi: 'असंतोषजनक (Poor)', labelEn: 'Poor' },
    { star: 2, labelHi: 'कामचलाऊ (Fair)', labelEn: 'Fair' },
    { star: 3, labelHi: 'संतोषजनक (Good)', labelEn: 'Good' },
    { star: 4, labelHi: 'बहुत बढ़िया (Very Good)', labelEn: 'Very Good' },
    { star: 5, labelHi: 'शानदार व साफ़-सुथरा (Excellent!)', labelEn: 'Excellent!' },
  ];

  const quickReviewChips = [
    'समय पर काम पूरा किया',
    'फर्श पर कोई दाग नहीं छोड़ा',
    'पुट्टी व सैंडिंग बहुत चिकनी थी',
    'कोई छुपा हुआ चार्ज नहीं लिया',
    'कलर शेड बिल्कुल वैसा ही आया',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        painterId: painter.id,
        bookingId,
        customerName,
        rating,
        comment,
        serviceType,
        propertyType,
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        setSubmittedSuccess(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'काम पूरा होने के बाद रिव्यू' : 'Post Customer Review'}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              {painter.name}
            </h2>
            <div className="text-xs text-slate-300">
              {painter.city} ({painter.area})
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'hi' ? 'रिव्यू सफलतापूर्वक दर्ज हुआ!' : 'Review Submitted Successfully!'}
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {lang === 'hi' 
                ? 'आपकी रेटिंग पेंटर की प्रोफाइल और डायरेक्टरी में अपडेट कर दी गई है।' 
                : 'Your rating and feedback have been added to the painter’s public profile.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Star Rating Selector */}
            <div className="text-center pb-3 border-b border-slate-100">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {lang === 'hi' ? 'पेंटर के काम को स्टार रेटिंग दें:' : 'Rate the Work Quality:'}
              </label>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-115 active:scale-95"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          isFilled 
                            ? 'fill-amber-400 text-amber-400 drop-shadow-xs' 
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-semibold text-amber-800 mt-2">
                {lang === 'hi' ? starLabels[rating - 1].labelHi : starLabels[rating - 1].labelEn}
              </div>
            </div>

            {/* Service & Property Type */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'किस सर्विस का काम हुआ था?' : 'Service Done'}
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.type} value={s.type}>
                      {lang === 'hi' ? s.titleHi : s.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'प्रॉपर्टी (घर / फ्लैट)' : 'Property Type'}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK Villa</option>
                  <option value="Single Room">1 Room</option>
                  <option value="Exterior Bungalow">Exterior Bungalow</option>
                </select>
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'आपका नाम (समीक्षक)' : 'Your Name'}
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-medium"
              />
            </div>

            {/* Quick chips to paste */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">
                {lang === 'hi' ? 'त्वरित रिव्यू सुझाव (क्लिक करें):' : 'Quick Suggestions:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickReviewChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setComment((prev) => prev ? `${prev}, ${chip}` : chip)}
                    className="text-[10px] bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Feedback Textarea */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'अपना विस्तृत रिव्यू व अनुभव लिखें' : 'Detailed Review & Experience'}
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={lang === 'hi' ? 'पेंटर का काम, समय की पाबंदी, फिनिशिंग और सफाई कैसी रही...' : 'Describe the work quality, punctuality, and cleanup...'}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'रिव्यू पोस्ट करें' : 'Post Review'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

// Reusable Painter Reviews Showcase Drawer / Modal
interface ReviewsShowcaseProps {
  painter: PainterProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenWriteReview: () => void;
}

export const PainterReviewsDrawer: React.FC<ReviewsShowcaseProps> = ({
  painter,
  isOpen,
  onClose,
  onOpenWriteReview,
}) => {
  const { lang, reviews } = useApp();

  if (!isOpen) return null;

  const painterReviews = reviews.filter((r) => r.painterId === painter.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {lang === 'hi' ? 'ग्राहक रेटिंग व सत्यापित समीक्षाएं' : 'Verified Customer Reviews'}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Real Clients
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {painter.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
              <span className="flex items-center text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                {painter.rating} / 5.0
              </span>
              <span>·</span>
              <span>{painter.reviewCount} {lang === 'hi' ? 'कुल समीक्षाएं' : 'total reviews'}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs max-h-[500px] overflow-y-auto">
          
          {/* Write Review Call to Action Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {lang === 'hi' ? 'क्या आपने इनसे काम कराया है?' : 'Did you hire this contractor?'}
              </div>
              <div className="text-[11px] text-slate-600">
                {lang === 'hi' ? 'अपना अनुभव और रेटिंग साझा करें' : 'Share your rating & help other homeowners'}
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenWriteReview();
              }}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap shadow-xs"
            >
              {lang === 'hi' ? '+ रिव्यू लिखें' : '+ Write Review'}
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {painterReviews.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>{lang === 'hi' ? 'इस पेंटर के लिए अभी तक कोई रिव्यू नहीं है।' : 'No reviews written yet. Be the first!'}</p>
              </div>
            ) : (
              painterReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {rev.customerName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {rev.propertyType && `${rev.propertyType} · `}
                        {rev.serviceType} · {rev.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
