import React, { useState } from 'react';
import { PainterProfile, ServiceType } from '../../types';
import { useApp } from '../../context/AppContext';
import { SERVICES_LIST } from '../../data/initialData';
import { MP_CITIES_DATA } from '../../data/mpCities';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Phone, 
  Building2, 
  Loader2 
} from 'lucide-react';

interface BookingModalProps {
  painter: PainterProfile;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (bookingNumber: string, amountPaid: number, transactionRef?: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  painter,
  isOpen,
  onClose,
  onBookingSuccess,
}) => {
  const { lang, createBookingAndPay } = useApp();

  // Form states
  const [step, setStep] = useState<'details' | 'payment' | 'processing'>('details');
  const [bookingType, setBookingType] = useState<'site_inspection' | 'direct_painting'>('site_inspection');
  const [serviceType, setServiceType] = useState<ServiceType>(painter.specialties[0] || 'interior');
  const [propertyType, setPropertyType] = useState<string>('2 BHK');
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState<number>(950);
  const [scheduledDate, setScheduledDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [customerName, setCustomerName] = useState<string>('राहुल शर्मा (Rahul Sharma)');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 98111 22334');
  const [siteAddress, setSiteAddress] = useState<string>('Flat 304, Green Heights, Sector 62');
  const [city, setCity] = useState<string>(painter.city);
  const [notes, setNotes] = useState<string>('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState<string>('rahulsharma@okhdfcbank');
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvv, setCardCvv] = useState<string>('821');

  if (!isOpen) return null;

  // Pricing math
  const estimatedTotal = Math.round(carpetAreaSqFt * painter.baseRateSqFt);
  // Advance amount: For site inspection token is ₹99 (adjustable in bill), for direct painting 20% advance token
  const payableAmount = bookingType === 'site_inspection' 
    ? 99 
    : Math.round(estimatedTotal * 0.20);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteAddress.trim() || !customerName.trim() || !customerPhone.trim()) {
      return;
    }
    setStep('payment');
  };

  const handleFinalPaymentSubmit = () => {
    setStep('processing');

    setTimeout(() => {
      const isPaidOnline = paymentMethod !== 'cash';
      const result = createBookingAndPay(
        {
          customerId: 'cust-current',
          customerName,
          customerPhone,
          painterId: painter.id,
          painterName: painter.name,
          painterPhone: painter.phone,
          serviceType,
          propertyType,
          carpetAreaSqFt,
          scheduledDate,
          timeSlot,
          siteAddress,
          city,
          bookingType,
          totalEstimatedAmount: estimatedTotal,
          advanceAmountPaid: isPaidOnline ? payableAmount : 0,
          paymentStatus: isPaidOnline ? (payableAmount === estimatedTotal ? 'fully_paid' : 'advance_paid') : 'unpaid',
          paymentMethod,
          bookingStatus: 'confirmed',
          notes,
        },
        isPaidOnline ? {
          method: paymentMethod,
          upiApp,
          amount: payableAmount,
          purpose: bookingType === 'site_inspection' ? 'inspection_token' : 'job_advance',
        } : undefined
      );

      onBookingSuccess(
        result.booking.bookingNumber,
        result.transaction ? result.transaction.amount : 0,
        result.transaction?.transactionRef
      );
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                {lang === 'hi' ? 'ऑनलाइन बुकिंग व पेमेंट' : 'Online Booking & Payment'}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300">
                {step === 'details' ? (lang === 'hi' ? 'स्टेप 1: काम का विवरण' : 'Step 1: Job Details') : (lang === 'hi' ? 'स्टेप 2: सुरक्षित पेमेंट' : 'Step 2: Secure Payment')}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {painter.name}
            </h2>
            <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-3">
              <span>{painter.city} ({painter.area})</span>
              <span>·</span>
              <span>₹{painter.baseRateSqFt}/sq.ft {lang === 'hi' ? 'बेस रेट' : 'base rate'}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-6">
            
            {/* Choose Booking Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                {lang === 'hi' ? 'बुकिंग का प्रकार चुनें:' : 'Select Booking Mode:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => setBookingType('site_inspection')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    bookingType === 'site_inspection' 
                      ? 'border-amber-600 bg-amber-50/60' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      {lang === 'hi' ? 'साइट विजिट व सटीक नाप-जोख' : 'Home Visit & Measurement'}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      ₹99 टोकन
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5">
                    {lang === 'hi' 
                      ? 'पेंटर घर आकर दीवारें नापेगा, शेड कार्ड दिखाएगा। यह ₹99 फाइनल बिल में एडजस्ट हो जाएगा।' 
                      : 'Painter visits to measure walls & show shade cards. Fully adjustable in final bill.'}
                  </p>
                </div>

                <div 
                  onClick={() => setBookingType('direct_painting')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    bookingType === 'direct_painting' 
                      ? 'border-amber-600 bg-amber-50/60' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      {lang === 'hi' ? 'सीधी पेंटिंग बुकिंग' : 'Direct Painting Slot'}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      20% टोकन एडवांस
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5">
                    {lang === 'hi' 
                      ? 'पेंटर और उसकी टीम के दिन पहले से पक्के करें। समय पर काम शुरू होने की 100% गारंटी।' 
                      : 'Lock dates and dedicated painting crew upfront with money-back guarantee.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Service & Property */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'सर्विस का प्रकार' : 'Service Type'}
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.type} value={s.type}>
                      {lang === 'hi' ? s.titleHi : s.titleEn} (₹{s.startingRate}/sqft)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'प्रॉपर्टी व स्पेस' : 'Property & Size'}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                    if (e.target.value === '1 BHK') setCarpetAreaSqFt(600);
                    if (e.target.value === '2 BHK') setCarpetAreaSqFt(950);
                    if (e.target.value === '3 BHK') setCarpetAreaSqFt(1400);
                    if (e.target.value === '4 BHK') setCarpetAreaSqFt(2000);
                    if (e.target.value === 'Single Room') setCarpetAreaSqFt(250);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="Single Room">{lang === 'hi' ? '1 कमरा (Single Room ~ 250 sqft)' : '1 Single Room (~250 sqft)'}</option>
                  <option value="1 BHK">1 BHK Flat (~600 sqft)</option>
                  <option value="2 BHK">2 BHK Flat (~950 sqft)</option>
                  <option value="3 BHK">3 BHK Flat (~1400 sqft)</option>
                  <option value="4 BHK">4 BHK Villa / Flat (~2000 sqft)</option>
                  <option value="Exterior Bungalow">{lang === 'hi' ? 'बंगलो बाहरी दीवारें' : 'Exterior Bungalow'}</option>
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                  {lang === 'hi' ? 'पसंदीदा तारीख' : 'Preferred Date'}
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                  {lang === 'hi' ? 'समय स्लॉट' : 'Time Slot'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeSlot('morning')}
                    className={`py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                      timeSlot === 'morning' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    9 AM - 12 PM
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeSlot('afternoon')}
                    className={`py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                      timeSlot === 'afternoon' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    1 PM - 4 PM
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeSlot('evening')}
                    className={`py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                      timeSlot === 'evening' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    4 PM - 7 PM
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    <Phone className="w-3 h-3 inline mr-1 text-slate-500" />
                    {lang === 'hi' ? 'मोबाइल नंबर (WhatsApp)' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    <MapPin className="w-3 h-3 inline mr-1 text-amber-600" />
                    {lang === 'hi' ? 'एमपी शहर (City)' : 'City (MP)'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {MP_CITIES_DATA.map((c) => (
                      <option key={c.nameEn} value={c.nameEn}>
                        {c.nameHi} ({c.nameEn})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'hi' ? 'साइट / घर का पूरा पता व लैंडमार्क' : 'Exact Site Address & Landmark'}
                  </label>
                  <input
                    type="text"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    placeholder="मकान नंबर, कॉलोनी, नजदीकी लैंडमार्क"
                    required
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Price Preview Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">
                  {bookingType === 'site_inspection' 
                    ? (lang === 'hi' ? 'विजिट टोकन (बिल में वापस एडजस्टेबल)' : 'Visit Token (Adjustable in Bill)') 
                    : (lang === 'hi' ? 'अनुमानित कुल लागत: ₹' + estimatedTotal.toLocaleString('en-IN') : 'Est. Total: ₹' + estimatedTotal.toLocaleString('en-IN'))}
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  ₹{payableAmount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-600">({lang === 'hi' ? 'अभी देय' : 'Payable Now'})</span>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                {lang === 'hi' ? 'पेमेंट के लिए आगे बढ़ें →' : 'Continue to Payment →'}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            
            {/* Amount Summary */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 font-medium">
                  {lang === 'hi' ? 'बुकिंग सुरक्षा टोकन' : 'Booking Confirmation Token'}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{payableAmount.toLocaleString('en-IN')}
                </h3>
                <span className="text-xs text-slate-500">
                  {painter.name} · {scheduledDate} ({timeSlot})
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {lang === 'hi' ? '100% सुरक्षित पेमेंट' : '100% Safe Escrow'}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'hi' ? 'पेंटर के आने तक राशि सुरक्षित रहती है' : 'Held safely until inspection'}
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                {lang === 'hi' ? 'पेमेंट का तरीका चुनें:' : 'Select Payment Method:'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'upi' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  UPI / QR Code
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-indigo-600" />
                  Debit / Credit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'netbanking' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  Net Banking
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cash' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-slate-600" />
                  {lang === 'hi' ? 'साइट पर नकद' : 'Cash on Visit'}
                </button>
              </div>

              {/* Method Details */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">
                      {lang === 'hi' ? 'UPI ऐप चुनें:' : 'Choose UPI App:'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setUpiApp('gpay')}
                        className={`px-3 py-1 text-xs rounded border cursor-pointer font-medium ${
                          upiApp === 'gpay' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
                        }`}
                      >
                        Google Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiApp('phonepe')}
                        className={`px-3 py-1 text-xs rounded border cursor-pointer font-medium ${
                          upiApp === 'phonepe' ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-slate-700'
                        }`}
                      >
                        PhonePe
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiApp('paytm')}
                        className={`px-3 py-1 text-xs rounded border cursor-pointer font-medium ${
                          upiApp === 'paytm' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'
                        }`}
                      >
                        Paytm
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                    {/* Simulated Dynamic UPI QR Code */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                      <div className="w-32 h-32 mx-auto bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Custom visual QR matrix pattern */}
                        <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-white rounded">
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-amber-600 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-white"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium">
                        {lang === 'hi' ? 'किसी भी UPI ऐप से स्कैन करें' : 'Scan via Any UPI App'}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {lang === 'hi' ? 'या अपनी UPI ID दर्ज करें' : 'Or Enter Your VPA / UPI ID'}
                        </label>
                        <input
                          type="text"
                          value={upiIdInput}
                          onChange={(e) => setUpiIdInput(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                        />
                      </div>
                      <div className="text-xs text-slate-500 bg-white p-2.5 rounded border border-slate-200">
                        <span className="font-semibold text-slate-700">रंगसाथी एस्क्रो VPA:</span> rangsathi.pay@okhdfcbank
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'hi' ? 'कार्ड नंबर' : 'Card Number'}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    {lang === 'hi' ? 'अपना बैंक चुनें:' : 'Select Your Bank:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        className="p-2 border border-slate-200 rounded-lg bg-white text-left font-medium text-slate-800 hover:border-amber-600 transition-colors"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900 mb-1">
                    {lang === 'hi' ? 'पेंटर के आने पर नकद दें' : 'Pay in Cash Upon Inspection'}
                  </p>
                  <p>
                    {lang === 'hi' 
                      ? 'आप पेंटर के घर पहुंचने और नाप लेने के बाद सीधे नकद या मौके पर यूपीआई से भुगतान कर सकते हैं।' 
                      : 'You can pay directly in cash or UPI QR after the painter conducts the site measurement.'}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← {lang === 'hi' ? 'विवरण बदलें' : 'Back to Details'}
              </button>

              <button
                type="button"
                onClick={handleFinalPaymentSubmit}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {paymentMethod === 'cash' 
                    ? (lang === 'hi' ? 'बुकिंग कन्फर्म करें' : 'Confirm Cash Booking') 
                    : (lang === 'hi' ? `₹${payableAmount.toLocaleString('en-IN')} का भुगतान करें` : `Pay ₹${payableAmount.toLocaleString('en-IN')} Now`)}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'hi' ? 'पेमेंट व स्लॉट लॉक हो रहा है...' : 'Verifying Payment & Locking Slot...'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {lang === 'hi' 
                ? 'कृपया पेज रीफ्रेश न करें। बैंक और पेंटर के साथ आपकी तारीख सुरक्षित की जा रही है।' 
                : 'Please do not refresh. Securing slot with contractor and generating digital receipt.'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
