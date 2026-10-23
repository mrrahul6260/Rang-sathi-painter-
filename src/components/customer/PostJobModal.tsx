import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceType } from '../../types';
import { SERVICES_LIST } from '../../data/initialData';
import { MP_CITIES_DATA, getMPCityAreas } from '../../data/mpCities';
import { X, Send, Sparkles, MapPin } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCity?: string;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialCity = 'Indore'
}) => {
  const { lang, addJobLead } = useApp();

  const [customerName, setCustomerName] = useState('रोहन गुप्ता (Rohan Gupta)');
  const [customerPhone, setCustomerPhone] = useState('+91 98260 44556');
  const [city, setCity] = useState(initialCity);
  const [area, setArea] = useState('Vijay Nagar (Scheme 54)');
  const [serviceType, setServiceType] = useState<ServiceType>('interior');
  const [propertyType, setPropertyType] = useState<any>('2bhk');
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState(1100);
  const [preferredPaintBrand, setPreferredPaintBrand] = useState('Asian Paints Royale / Berger');
  const [paintQuality, setPaintQuality] = useState<'economy' | 'premium' | 'luxury'>('luxury');
  const [timeline, setTimeline] = useState<'immediate' | 'within_week' | 'planning'>('immediate');
  const [budgetEstimate, setBudgetEstimate] = useState(24000);
  const [description, setDescription] = useState('2 बेडरूम + हॉल की रीपेंटिंग करानी है। पुट्टी टचअप और 2 कोट वॉशेबल पेंट चाहिए। समय पर काम पूरा होना जरूरी है।');

  if (!isOpen) return null;

  const popularAreas = getMPCityAreas(city);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJobLead({
      customerName,
      customerPhone,
      city,
      area,
      serviceType,
      propertyType,
      carpetAreaSqFt,
      preferredPaintBrand,
      paintQuality,
      timeline,
      budgetEstimate,
      description,
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'मध्य प्रदेश में मुफ्त कोटेशन' : 'Post MP Painting Job'}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {lang === 'hi' ? 'पेंटिंग काम की जानकारी पोस्ट करें' : 'Post Your Painting Requirement'}
            </h2>
            <div className="text-xs text-slate-300">
              {lang === 'hi' ? 'एमपी के वेरिफाइड ठेकेदारों से सीधे फोन व व्हाट्सएप पर रेट पाएं' : 'Get direct competitive bids from verified MP contractors'}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'मोबाइल नंबर (WhatsApp)' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          {/* MP City & Area Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'hi' ? 'मध्य प्रदेश का जिला / शहर (MP City)' : 'MP District / City'}</span>
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  const areas = getMPCityAreas(e.target.value);
                  if (areas.length > 0) setArea(areas[0]);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                {MP_CITIES_DATA.map((c) => (
                  <option key={c.nameEn} value={c.nameEn}>
                    {c.nameHi} ({c.nameEn}) - {c.divisionHi}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'कॉलोनी / इलाका (Locality / Area)' : 'Locality / Area'}
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="उदा. स्कीम 54, अरेरा कॉलोनी, राइट टाउन..."
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          {/* Quick area chips */}
          {popularAreas.length > 0 && (
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">
                {lang === 'hi' ? `${city} के प्रमुख इलाके (क्लिक करें):` : `Popular ${city} areas:`}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularAreas.slice(0, 5).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setArea(a)}
                    className="text-[10px] bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    + {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'सर्विस का प्रकार' : 'Service Type'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                {lang === 'hi' ? 'प्रॉपर्टी का प्रकार' : 'Property Type'}
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="1bhk">1 BHK Flat</option>
                <option value="2bhk">2 BHK Flat / House</option>
                <option value="3bhk">3 BHK Flat / Duplex</option>
                <option value="4bhk">4 BHK Villa</option>
                <option value="single_room">1 Single Room</option>
                <option value="exterior_bungalow">Exterior Bungalow / Kothi</option>
                <option value="commercial">Shop / Commercial Office</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'अनुमानित एरिया (Sq.Ft)' : 'Area (Sq.Ft)'}
              </label>
              <input
                type="number"
                value={carpetAreaSqFt}
                onChange={(e) => setCarpetAreaSqFt(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'काम कब शुरू करना है?' : 'When to Start?'}
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="immediate">{lang === 'hi' ? 'तुरंत (1-2 दिन)' : 'Immediate'}</option>
                <option value="within_week">{lang === 'hi' ? 'इस हफ्ते' : 'Within 7 days'}</option>
                <option value="planning">{lang === 'hi' ? 'अगले महीने' : 'Next month'}</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'hi' ? 'बजट (₹)' : 'Est. Budget (₹)'}
              </label>
              <input
                type="number"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'काम का विवरण व विशेष निर्देश' : 'Job Details & Notes'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="दीवारों की स्थिति, पुट्टी का काम, सीलन या कोई विशेष रंग पसंद हो तो बताएं..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold hover:text-slate-900 cursor-pointer"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'hi' ? 'काम पोस्ट करें' : 'Submit Requirement'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
