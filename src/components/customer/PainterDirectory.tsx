import React, { useState } from 'react';
import { PainterProfile, ServiceType } from '../../types';
import { useApp } from '../../context/AppContext';
import { SERVICES_LIST } from '../../data/initialData';
import { MP_CITIES_DATA, MP_DIVISIONS, TOP_MP_HUBS } from '../../data/mpCities';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Wrench, 
  Award, 
  Users,
  Compass,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface PainterDirectoryProps {
  onBookPainter: (painter: PainterProfile) => void;
  onChatWithPainter: (painter: PainterProfile) => void;
  onPostJobClick: () => void;
  onOpenCalculator: () => void;
  onOpenReviews: (painter: PainterProfile) => void;
  onWriteReview: (painter: PainterProfile) => void;
}

export const PainterDirectory: React.FC<PainterDirectoryProps> = ({
  onBookPainter,
  onChatWithPainter,
  onPostJobClick,
  onOpenCalculator,
  onOpenReviews,
  onWriteReview,
}) => {
  const { lang, painters, reviews } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'rate_low' | 'experience'>('rating');

  // Filter painters based on query, city, division, and service
  const filteredPainters = painters
    .filter((painter) => {
      const cityInfo = MP_CITIES_DATA.find((c) => c.nameEn.toLowerCase() === painter.city.toLowerCase());

      const matchesSearch = 
        painter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        painter.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        painter.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cityInfo?.nameHi && cityInfo.nameHi.includes(searchQuery));
      
      const matchesCity = selectedCity === 'all' || painter.city.toLowerCase() === selectedCity.toLowerCase();

      const matchesDivision = 
        selectedDivision === 'all' || 
        (cityInfo && (cityInfo.divisionEn.toLowerCase().includes(selectedDivision) || 
                      (selectedDivision === 'malwa' && cityInfo.divisionEn === 'Malwa') ||
                      (selectedDivision === 'bhopal' && cityInfo.divisionEn === 'Bhopal Division') ||
                      (selectedDivision === 'mahakoshal' && cityInfo.divisionEn === 'Mahakoshal') ||
                      (selectedDivision === 'gwalior_chambal' && cityInfo.divisionEn === 'Gwalior-Chambal') ||
                      (selectedDivision === 'vindhya' && cityInfo.divisionEn === 'Vindhya') ||
                      (selectedDivision === 'bundelkhand' && cityInfo.divisionEn === 'Bundelkhand') ||
                      (selectedDivision === 'nimar' && cityInfo.divisionEn === 'Nimar')));

      const matchesService = selectedService === 'all' || painter.specialties.includes(selectedService as ServiceType);

      return matchesSearch && matchesCity && matchesDivision && matchesService;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rate_low') return a.baseRateSqFt - b.baseRateSqFt;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });

  const selectedCityObj = MP_CITIES_DATA.find(c => c.nameEn.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div className="space-y-8">
      
      {/* Hero Banner with Clear MP-Wide Value Proposition */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md mb-4 border border-amber-400/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {lang === 'hi' 
                ? 'मध्य प्रदेश (MP) के सभी 55 जिलों व शहरों में 100% वेरिफाइड पेंटर्स' 
                : 'Live Across All 55 MP Districts & Cities · 100% Verified'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 text-balance">
            {lang === 'hi' 
              ? 'मध्य प्रदेश के सर्वश्रेष्ठ पेंटर व ठेकेदार अपने शहर में चुनें' 
              : 'Find & Book Expert House Painters Across Madhya Pradesh'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            {lang === 'hi' 
              ? 'इंदौर, भोपाल, जबलपुर, ग्वालियर, उज्जैन, सागर, रीवा, सतना से लेकर सभी एमपी शहरों तक। पारदर्शी रेट (₹11–14/sq.ft), ऑनलाइन बुकिंग, कस्टमर रिव्यूज और एडवांस एस्क्रो सुरक्षा।' 
              : 'Serving Indore, Bhopal, Jabalpur, Gwalior, Ujjain, Rewa, Sagar & 50+ MP cities. Transparent rates, genuine customer reviews, and escrow security.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onPostJobClick}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {lang === 'hi' ? 'नया काम पोस्ट करें (मुफ्त कोटेशन)' : 'Post Job Requirement'}
            </button>
            <button
              onClick={onOpenCalculator}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-lg border border-white/20 transition-all cursor-pointer"
            >
              {lang === 'hi' ? 'लागत कैलकुलेटर' : 'Paint Cost Calculator'}
            </button>
          </div>
        </div>

        {/* Abstract Architectural SVG Element */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-96 h-96">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-500 fill-current">
            <path d="M40,120 L100,60 L160,120 L140,120 L140,170 L60,170 L60,120 Z" />
            <rect x="85" y="130" width="30" height="40" fill="#000" />
            <circle cx="100" cy="40" r="15" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      {/* MP Cities Quick Selection Hub Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'hi' ? 'मध्य प्रदेश के प्रमुख शहर (MP City Hubs):' : 'Madhya Pradesh City Hubs:'}</span>
          </div>
          <span className="text-[11px] text-slate-500">
            55 {lang === 'hi' ? 'जिले उपलब्ध' : 'Districts Covered'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedCity('all');
              setSelectedDivision('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCity === 'all' && selectedDivision === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'hi' ? '⭐ सभी एमपी शहर (All MP)' : '⭐ All MP Cities'}
          </button>

          {TOP_MP_HUBS.map((hub) => {
            const isSelected = selectedCity.toLowerCase() === hub.toLowerCase();
            const cityObj = MP_CITIES_DATA.find((c) => c.nameEn === hub);
            return (
              <button
                key={hub}
                onClick={() => {
                  setSelectedCity(isSelected ? 'all' : hub);
                  setSelectedDivision('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang === 'hi' && cityObj ? cityObj.nameHi : hub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid (Quick filter by service) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'hi' ? 'पेंटिंग सेवाएं व शुरुआती दरें' : 'Painting Services & Starting Rates'}
          </h2>
          <span className="text-xs text-slate-500">
            {SERVICES_LIST.length} {lang === 'hi' ? 'कैटेगरी' : 'categories'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SERVICES_LIST.map((srv) => {
            const isSelected = selectedService === srv.type;
            return (
              <button
                key={srv.type}
                onClick={() => setSelectedService(isSelected ? 'all' : srv.type)}
                className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-600' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 line-clamp-1">
                  {lang === 'hi' ? srv.titleHi : srv.titleEn}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {lang === 'hi' ? srv.descHi : srv.descEn}
                </div>
                <div className="mt-2 text-xs font-semibold text-amber-700 tabular-nums">
                  ₹{srv.startingRate}/sq.ft
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar with Full 55 MP Districts & Region Selectors */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'पेंटर नाम, इलाका या शहर खोजें...' : 'Search painter, area, or city...'}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* All 55 MP Cities Dropdown */}
          <div className="md:col-span-3">
            <div className="flex items-center text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-600 mr-1.5 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="all">
                  {lang === 'hi' ? '🏙️ सभी 55 एमपी जिले (All MP Cities)' : '🏙️ All 55 MP Districts'}
                </option>
                {MP_CITIES_DATA.map((city) => (
                  <option key={city.nameEn} value={city.nameEn}>
                    {city.nameHi} ({city.nameEn}) - {city.divisionHi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MP Regional Division Filter */}
          <div className="md:col-span-3">
            <div className="flex items-center text-xs">
              <Compass className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                {MP_DIVISIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {lang === 'hi' ? div.nameHi : div.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2 flex items-center justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="rating">{lang === 'hi' ? 'टॉप रेटिंग (Rating)' : 'Top Rated'}</option>
              <option value="rate_low">{lang === 'hi' ? 'कम दर (Lowest)' : 'Lowest Rate'}</option>
              <option value="experience">{lang === 'hi' ? 'अनुभव (Exp)' : 'Experienced'}</option>
            </select>
          </div>

        </div>

        {/* Selected Filter Tags Reset */}
        {(selectedService !== 'all' || selectedCity !== 'all' || selectedDivision !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              {filteredPainters.length} {lang === 'hi' ? 'पेंटर्स उपलब्ध' : 'painters found'}
              {selectedCity !== 'all' && ` in ${selectedCity}`}
            </span>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedDivision('all');
                setSelectedService('all');
                setSearchQuery('');
              }}
              className="text-amber-600 hover:underline font-medium cursor-pointer ml-auto"
            >
              {lang === 'hi' ? 'फ़िल्टर हटाएं (Reset)' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Painters List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPainters.map((painter) => {
          const painterReviews = reviews.filter((r) => r.painterId === painter.id);
          const latestReview = painterReviews[painterReviews.length - 1];

          return (
            <div
              key={painter.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Info & Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {painter.name}
                      </h3>
                      {painter.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          {lang === 'hi' ? 'वेरिफाइड' : 'Verified'}
                        </span>
                      )}
                    </div>
                    
                    {/* Clean unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {painter.area}, {painter.city} (MP)
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-slate-400" />
                        {painter.experienceYears} {lang === 'hi' ? 'साल अनुभव' : 'yrs exp'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {painter.teamSize} {lang === 'hi' ? 'कारीगर टीम' : 'crew'}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Rate */}
                  <div className="text-right shrink-0">
                    <button
                      onClick={() => onOpenReviews(painter)}
                      className="flex items-center gap-1 text-sm font-bold text-slate-900 justify-end hover:text-amber-600 transition-colors cursor-pointer group"
                      title={lang === 'hi' ? 'समीक्षाएं व रेटिंग देखें' : 'View Reviews & Ratings'}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{painter.rating}</span>
                      <span className="text-xs text-slate-400 font-normal group-hover:underline">({painter.reviewCount})</span>
                    </button>
                    <div className="text-sm font-extrabold text-amber-700 mt-1 tabular-nums">
                      ₹{painter.baseRateSqFt}
                      <span className="text-[11px] font-normal text-slate-500"> /sq.ft</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {painter.bio}
                </p>

                {/* Latest Verified Customer Review Quote Snippet */}
                {latestReview && (
                  <div 
                    onClick={() => onOpenReviews(painter)}
                    className="mb-3.5 p-2.5 bg-amber-50/70 hover:bg-amber-100/60 transition-colors rounded-xl border border-amber-200/60 cursor-pointer group"
                    title={lang === 'hi' ? 'सभी समीक्षाएं पढ़ें' : 'Read all reviews'}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1 text-amber-800 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{latestReview.rating}/5.0</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600 font-normal">{latestReview.customerName}</span>
                      </div>
                      <span className="text-[10px] text-amber-700 group-hover:underline font-medium">
                        {lang === 'hi' ? 'सभी देखें →' : 'View all →'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 italic line-clamp-2">
                      "{latestReview.comment}"
                    </p>
                  </div>
                )}

                {/* Specialties */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    {lang === 'hi' ? 'विशेषज्ञता:' : 'Specialties:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {painter.specialties.map((spec) => {
                      const match = SERVICES_LIST.find((s) => s.type === spec);
                      return (
                        <span
                          key={spec}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                        >
                          {match ? (lang === 'hi' ? match.titleHi : match.titleEn) : spec}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Portfolio Preview Mini Strip */}
                {painter.portfolio.length > 0 && (
                  <div className="mb-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                      {lang === 'hi' ? 'हालिया प्रोजेक्ट वर्क:' : 'Recent Project Highlights:'}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {painter.portfolio.map((item, idx) => (
                        <div 
                          key={idx}
                          className="p-2 rounded-lg bg-white border border-slate-200 text-left"
                        >
                          <div 
                            className="h-2 w-full rounded mb-1"
                            style={{ backgroundColor: item.colorAccent }}
                          />
                          <div className="text-[11px] font-semibold text-slate-800 line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-500 line-clamp-1">
                            {item.roomType}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment / Tools */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Wrench className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">
                    <strong>{lang === 'hi' ? 'टूल्स:' : 'Tools:'}</strong> {painter.toolsOwned.join(', ')}
                  </span>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onOpenReviews(painter)}
                  className="py-2 px-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title={lang === 'hi' ? 'समीक्षाएं देखें' : 'View Reviews'}
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>{lang === 'hi' ? `रिव्यू (${painter.reviewCount})` : `Reviews (${painter.reviewCount})`}</span>
                </button>

                <button
                  onClick={() => onChatWithPainter(painter)}
                  className="py-2 px-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Chat or Message"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'hi' ? 'बातचीत' : 'Chat'}</span>
                </button>

                <a
                  href={`tel:${painter.phone}`}
                  className="py-2 px-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  title="Direct Phone Call"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'कॉल' : 'Call'}</span>
                </a>

                <button
                  onClick={() => onBookPainter(painter)}
                  className="flex-1 min-w-[140px] py-2 px-3 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'ऑनलाइन बुक व पेमेंट करें' : 'Book & Pay Online'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredPainters.length === 0 && (
        <div className="bg-white p-10 text-center rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'hi' 
                ? `${selectedCityObj?.nameHi || selectedCity} में रीजनल पेंटर टीम सक्रिय है!` 
                : `Regional Painting Team is Active in ${selectedCity}!`}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              {lang === 'hi' 
                ? `हमारे पास ${selectedCityObj?.nameHi || selectedCity} और आसपास के इलाकों में काम करने वाले प्रमाणित ठेकेदार उपलब्ध हैं। बस अपना काम पोस्ट करें, 2 घंटे में कोटेशन प्राप्त करें।` 
                : `We have verified mobile contractor crews ready for ${selectedCity}. Post your job requirement to receive verified quotes within 2 hours.`}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onPostJobClick}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
            >
              {lang === 'hi' ? `+ ${selectedCityObj?.nameHi || selectedCity} में काम पोस्ट करें` : `+ Post Job in ${selectedCity}`}
            </button>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedDivision('all');
                setSelectedService('all');
              }}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              {lang === 'hi' ? 'सभी एमपी पेंटर्स देखें' : 'View All MP Painters'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
