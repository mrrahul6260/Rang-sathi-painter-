import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ShieldCheck, ArrowRightLeft, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPostJobClick: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onPostJobClick,
  onOpenLogin 
}) => {
  const { role, setRole, lang, setLang, bookings, currentUser, logout } = useApp();

  const handleRoleToggle = () => {
    const nextRole: UserRole = role === 'customer' ? 'painter' : 'customer';
    setRole(nextRole);
    if (nextRole === 'painter') {
      setActiveTab('painter_leads');
    } else {
      setActiveTab('painters');
    }
  };

  const handleLangToggle = () => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Role Notice Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {lang === 'hi' 
              ? 'रंगसाथी - मध्य प्रदेश (MP) के सभी 55 जिलों व शहरों में वेरिफाइड पेंटर्स व ऑनलाइन बुकिंग' 
              : 'RangSathi - Live across all 55 MP Districts & Cities · 100% Verified Painters'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLangToggle}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span className="font-semibold">{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>
          <button
            onClick={handleRoleToggle}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>
              {role === 'customer' 
                ? (lang === 'hi' ? 'पेंटर मोड में जाएं →' : 'Switch to Painter Mode →') 
                : (lang === 'hi' ? 'ग्राहक मोड में जाएं →' : 'Switch to Customer Mode →')}
            </span>
          </button>
        </div>
      </div>

      {/* Top Bar Contract (3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab(role === 'customer' ? 'painters' : 'painter_leads')}
            className="text-left cursor-pointer group"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
              RangSathi
            </span>
            <span className="ml-1.5 text-xs font-semibold text-amber-600">
              {lang === 'hi' ? 'रंगसाथी' : 'Painter Connect'}
            </span>
          </button>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
            {role === 'customer' 
              ? (lang === 'hi' ? 'ग्राहक' : 'Customer') 
              : (lang === 'hi' ? 'पेंटर / ठेकेदार' : 'Contractor')}
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {role === 'customer' ? (
            <>
              <button
                onClick={() => setActiveTab('painters')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'painters' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'पेंटर खोजें' : 'Find Painters'}
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'calculator' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'लागत कैलकुलेटर' : 'Cost Calculator'}
              </button>
              <button
                onClick={() => setActiveTab('visualizer')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'visualizer' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'कलर विज़ुअलाइज़र' : 'Color Visualizer'}
              </button>
              <button
                onClick={() => setActiveTab('customer_bookings')}
                className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'customer_bookings' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                <span>{lang === 'hi' ? 'मेरी बुकिंग व पेमेंट' : 'Bookings & Payments'}</span>
                {bookings.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                    {bookings.length}
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('painter_leads')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'painter_leads' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'नए काम (Job Leads)' : 'Customer Leads'}
              </button>
              <button
                onClick={() => setActiveTab('quote_generator')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'quote_generator' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'कोटेशन व बिल मेकर' : 'Quote & Invoice Maker'}
              </button>
              <button
                onClick={() => setActiveTab('work_tracker')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'work_tracker' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'काम का हिसाब व खाता' : 'Project Ledger'}
              </button>
              <button
                onClick={() => setActiveTab('painter_profile')}
                className={`transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'painter_profile' ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5' : 'hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'मेरी प्रोफाइल' : 'My Profile'}
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action + User Profile / Login */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-left"
                title="Account Settings"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-xs">
                  <div className="font-bold text-slate-900 line-clamp-1">{currentUser.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{currentUser.phone}</div>
                </div>
              </button>

              <button
                onClick={logout}
                className="text-[11px] text-slate-500 hover:text-red-600 px-2 py-1 rounded cursor-pointer"
                title="Sign Out"
              >
                {lang === 'hi' ? 'लॉगआउट' : 'Logout'}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 border border-slate-300 hover:border-slate-400 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {lang === 'hi' ? 'लॉगिन / साइन इन' : 'Sign In'}
            </button>
          )}

          {role === 'customer' ? (
            <button
              onClick={onPostJobClick}
              className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
            >
              {lang === 'hi' ? '+ नया काम पोस्ट करें' : '+ Post Job Request'}
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('quote_generator')}
              className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
            >
              {lang === 'hi' ? '+ नया कोटेशन बनाएं' : '+ Create Quote'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-600 overflow-x-auto">
        {role === 'customer' ? (
          <>
            <button 
              onClick={() => setActiveTab('painters')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'painters' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'पेंटर्स' : 'Painters'}
            </button>
            <button 
              onClick={() => setActiveTab('calculator')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'calculator' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'कैलकुलेटर' : 'Calculator'}
            </button>
            <button 
              onClick={() => setActiveTab('visualizer')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'visualizer' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'विज़ुअलाइज़र' : 'Visualizer'}
            </button>
            <button 
              onClick={() => setActiveTab('customer_bookings')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'customer_bookings' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'मेरी बुकिंग' : 'Bookings'}
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setActiveTab('painter_leads')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'painter_leads' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'ग्राहक के काम' : 'Leads'}
            </button>
            <button 
              onClick={() => setActiveTab('quote_generator')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'quote_generator' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'कोटेशन' : 'Quotes'}
            </button>
            <button 
              onClick={() => setActiveTab('work_tracker')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'work_tracker' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'खाता / हिसाब' : 'Ledger'}
            </button>
            <button 
              onClick={() => setActiveTab('painter_profile')} 
              className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'painter_profile' ? 'bg-amber-100 text-amber-900 font-semibold' : ''}`}
            >
              {lang === 'hi' ? 'प्रोफाइल' : 'Profile'}
            </button>
          </>
        )}
      </div>
    </header>
  );
};
