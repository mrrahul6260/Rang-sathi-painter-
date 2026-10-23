import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobLead } from '../../types';
import { SERVICES_LIST } from '../../data/initialData';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Phone, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';

interface PainterLeadsProps {
  onOpenSendQuote: (lead: JobLead) => void;
  onChatWithCustomer: (name: string, phone: string) => void;
}

export const PainterLeads: React.FC<PainterLeadsProps> = ({
  onOpenSendQuote,
  onChatWithCustomer,
}) => {
  const { lang, jobLeads, activePainter } = useApp();

  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('all');

  const filteredLeads = jobLeads.filter((lead) => {
    const matchesService = selectedService === 'all' || lead.serviceType === selectedService;
    const matchesTimeline = selectedTimeline === 'all' || lead.timeline === selectedTimeline;
    return matchesService && matchesTimeline;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Painter Welcome Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
            {lang === 'hi' ? 'पेंटर व ठेकेदार कार्यक्षेत्र' : 'Contractor Workspace'}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {activePainter.name}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
            <span>{activePainter.city} ({activePainter.area})</span>
            <span>·</span>
            <span>{activePainter.teamSize} {lang === 'hi' ? 'कारीगर' : 'crew'}</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">{lang === 'hi' ? 'वेरिफाइड कॉन्ट्रैक्टर' : 'Verified Contractor'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-center">
            <div className="text-xs text-slate-400">{lang === 'hi' ? 'उपलब्ध काम' : 'Available Leads'}</div>
            <div className="text-lg font-bold text-amber-400 tabular-nums">{filteredLeads.length}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">{lang === 'hi' ? 'सर्विस:' : 'Service:'}</span>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-2 py-1 border border-slate-300 rounded bg-white text-xs"
          >
            <option value="all">{lang === 'hi' ? 'सभी प्रकार के काम' : 'All Services'}</option>
            {SERVICES_LIST.map((s) => (
              <option key={s.type} value={s.type}>
                {lang === 'hi' ? s.titleHi : s.titleEn}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">{lang === 'hi' ? 'समय:' : 'Timeline:'}</span>
          <select
            value={selectedTimeline}
            onChange={(e) => setSelectedTimeline(e.target.value)}
            className="px-2 py-1 border border-slate-300 rounded bg-white text-xs"
          >
            <option value="all">{lang === 'hi' ? 'सभी' : 'All'}</option>
            <option value="immediate">{lang === 'hi' ? 'तुरंत शुरू होने वाले' : 'Immediate'}</option>
            <option value="within_week">{lang === 'hi' ? 'इस सप्ताह' : 'Within this week'}</option>
            <option value="planning">{lang === 'hi' ? 'प्लानिंग' : 'Planning'}</option>
          </select>
        </div>
      </div>

      {/* Leads Cards Grid */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => {
          const serviceMatch = SERVICES_LIST.find((s) => s.type === lead.serviceType);

          return (
            <div
              key={lead.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {serviceMatch ? (lang === 'hi' ? serviceMatch.titleHi : serviceMatch.titleEn) : lead.serviceType}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{lead.createdAt}</span>
                    {lead.timeline === 'immediate' && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                        {lang === 'hi' ? 'तुरंत काम चाहिए' : 'Urgent Start'}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 mt-1.5">
                    {lead.customerName}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {lead.area}, {lead.city}
                    </span>
                    <span>·</span>
                    <span>
                      {lead.propertyType.toUpperCase()} ({lead.carpetAreaSqFt} sq.ft)
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div className="sm:text-right shrink-0">
                  <div className="text-xs text-slate-500">{lang === 'hi' ? 'ग्राहक का बजट' : 'Customer Budget'}</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">
                    ₹{lead.budgetEstimate.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {lead.quotesCount} {lang === 'hi' ? 'कोटेशन भेजे गए' : 'quotes sent'}
                  </div>
                </div>
              </div>

              {/* Requirement Description */}
              <p className="text-xs text-slate-700 leading-relaxed my-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                "{lead.description}"
              </p>

              {/* Brand and Quality info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                <span>
                  <strong>{lang === 'hi' ? 'पसंदीदा पेंट:' : 'Paint Brand:'}</strong> {lead.preferredPaintBrand}
                </span>
                <span>·</span>
                <span>
                  <strong>{lang === 'hi' ? 'क्वालिटी:' : 'Quality:'}</strong> {lead.paintQuality.toUpperCase()}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChatWithCustomer(lead.customerName, lead.customerPhone)}
                    className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lang === 'hi' ? 'चैट करें' : 'Chat'}</span>
                  </button>

                  <a
                    href={`tel:${lead.customerPhone}`}
                    className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenSendQuote(lead)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'दर और कोटेशन भेजें' : 'Send Quote & Bid'}</span>
                </button>
              </div>

            </div>
          );
        })}

        {filteredLeads.length === 0 && (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            {lang === 'hi' ? 'इस फ़िल्टर में कोई काम उपलब्ध नहीं है।' : 'No leads match the selected filter.'}
          </div>
        )}
      </div>

    </div>
  );
};
