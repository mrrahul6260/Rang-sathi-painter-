import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobLead } from '../../types';
import { X, Send, Calculator } from 'lucide-react';

interface SendQuoteModalProps {
  lead: JobLead;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SendQuoteModal: React.FC<SendQuoteModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { lang, activePainter, sendQuote } = useApp();

  const [ratePerSqFt, setRatePerSqFt] = useState<number>(activePainter.baseRateSqFt);
  const [materialIncluded, setMaterialIncluded] = useState<boolean>(true);
  const [estimatedDays, setEstimatedDays] = useState<number>(4);
  const [proposedStartDate, setProposedStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState<string>(
    '2 कोट एशियन पेंट्स इमल्शन + 1 कोट प्राइमर। फर्श और खिड़कियों की प्लास्टिक मास्किंग व पूरी सफाई शामिल है।'
  );

  if (!isOpen) return null;

  // Total math
  const totalArea = lead.carpetAreaSqFt;
  const totalCost = Math.round(totalArea * ratePerSqFt);
  const materialCost = materialIncluded ? Math.round(totalCost * 0.55) : 0;
  const labourCost = totalCost - materialCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuote({
      jobId: lead.id,
      painterId: activePainter.id,
      painterName: activePainter.name,
      painterPhone: activePainter.phone,
      ratePerSqFt,
      materialIncluded,
      labourCost,
      materialCost,
      totalCost,
      estimatedDays,
      proposedStartDate,
      notes,
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {lang === 'hi' ? 'कोटेशन भेजें' : 'Send Painting Quote'}
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              {lead.customerName} ({lead.area})
            </h2>
            <div className="text-xs text-slate-300">
              {lead.carpetAreaSqFt} sq.ft · {lead.propertyType.toUpperCase()}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'आपकी दर (₹ / sq.ft)' : 'Your Rate (₹/sq.ft)'}
              </label>
              <input
                type="number"
                value={ratePerSqFt}
                onChange={(e) => setRatePerSqFt(Number(e.target.value))}
                min={5}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'मटेरियल विकल्प' : 'Material Inclusions'}
              </label>
              <select
                value={materialIncluded ? 'with_mat' : 'labour_only'}
                onChange={(e) => setMaterialIncluded(e.target.value === 'with_mat')}
                className="w-full px-2 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="with_mat">{lang === 'hi' ? 'मटेरियल + लेबर दोनों' : 'With Paint & Material'}</option>
                <option value="labour_only">{lang === 'hi' ? 'केवल लेबर (Labour only)' : 'Labour Only'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'अनुमानित दिन' : 'Estimated Days'}
              </label>
              <input
                type="number"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(Number(e.target.value))}
                min={1}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'काम शुरू करने की तारीख' : 'Proposed Start Date'}
              </label>
              <input
                type="date"
                value={proposedStartDate}
                onChange={(e) => setProposedStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'कोटेशन विवरण व शर्तें' : 'Terms & Specifications'}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            />
          </div>

          {/* Real-time Math Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>{lang === 'hi' ? 'लेबर मजदूरी:' : 'Labour Amount:'}</span>
              <span className="font-mono font-medium">₹{labourCost.toLocaleString('en-IN')}</span>
            </div>
            {materialIncluded && (
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'hi' ? 'पेंट व पुट्टी मटेरियल:' : 'Material & Supplies:'}</span>
                <span className="font-mono font-medium">₹{materialCost.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>{lang === 'hi' ? 'कुल कोटेशन राशि:' : 'Total Bid Amount:'}</span>
              <span className="text-base text-amber-700 font-extrabold tabular-nums">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900 text-sm cursor-pointer"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'hi' ? 'कोटेशन भेजें' : 'Submit Quote'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
