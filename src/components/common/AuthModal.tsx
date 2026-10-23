import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { 
  X, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Briefcase, 
  Loader2 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole }) => {
  const { lang, login, setRole } = useApp();

  const [authRole, setAuthRole] = useState<UserRole>(defaultRole || 'customer');
  const [authMethod, setAuthMethod] = useState<'otp' | 'google' | 'password'>('otp');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [name, setName] = useState('राहुल शर्मा (Rahul Sharma)');
  const [phone, setPhone] = useState('+91 98111 22334');
  const [email, setEmail] = useState('mrrahul6260@gmail.com');
  const [city, setCity] = useState('Delhi NCR');
  const [password, setPassword] = useState('••••••••');
  
  // OTP flow states
  const [otpStep, setOtpStep] = useState<'send_otp' | 'verify_otp'>('send_otp');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setEnteredOtp(code); // pre-filled for instant testing convenience
      setOtpStep('verify_otp');
      setIsLoading(false);
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = `usr-${phone.replace(/[^0-9]/g, '')}`;
    const userPayload = {
      id: userId,
      name: isSignUp ? name : (authRole === 'customer' ? 'राहुल शर्मा (Customer)' : 'रमेश कुमार (Thekedar)'),
      phone,
      email,
      role: authRole,
      city,
      isLoggedIn: true,
    };

    try {
      await setDoc(doc(db, 'users', userId), userPayload, { merge: true });
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    login(userPayload);
    setRole(authRole);
    setIsLoading(false);
    onClose();
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const userId = `usr-google-${Date.now()}`;
    const userPayload = {
      id: userId,
      name: 'Rahul Sharma',
      email: 'mrrahul6260@gmail.com',
      phone: '+91 98111 22334',
      role: authRole,
      city: 'Delhi NCR',
      isLoggedIn: true,
    };

    try {
      await setDoc(doc(db, 'users', userId), userPayload, { merge: true });
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    login(userPayload);
    setRole(authRole);
    setIsLoading(false);
    onClose();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: `usr-pwd-${Date.now()}`,
        name,
        email,
        phone,
        role: authRole,
        city,
        isLoggedIn: true,
      });
      setRole(authRole);
      setIsLoading(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'रंगसाथी सुरक्षित लॉगिन' : 'RangSathi Secure Sign In'}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {isSignUp 
                ? (lang === 'hi' ? 'नया खाता बनाएं (Sign Up)' : 'Create New Account') 
                : (lang === 'hi' ? 'लॉगिन करें (Sign In)' : 'Sign In to Your Account')}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          
          {/* Role Switcher: Customer vs Painter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-2">
              {lang === 'hi' ? 'आप किस रूप में लॉगिन करना चाहते हैं?' : 'Sign in as:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAuthRole('customer')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                  authRole === 'customer' 
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <User className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs">{lang === 'hi' ? 'ग्राहक' : 'Customer'}</div>
                  <div className="text-[10px] text-slate-500">{lang === 'hi' ? 'पेंटर बुक करें' : 'Book Painters'}</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAuthRole('painter')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                  authRole === 'painter' 
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs">{lang === 'hi' ? 'पेंटर / ठेकेदार' : 'Contractor'}</div>
                  <div className="text-[10px] text-slate-500">{lang === 'hi' ? 'नए काम पाएं' : 'Get Leads'}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Google 1-Click Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer active:scale-98"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{lang === 'hi' ? 'Google खाते से लॉगिन करें' : 'Continue with Google'}</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium uppercase">
                {lang === 'hi' ? 'या मोबाइल नंबर से' : 'Or with Mobile Number'}
              </span>
            </div>
          </div>

          {/* Phone OTP Auth Form */}
          {otpStep === 'send_otp' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'hi' ? 'आपका पूरा नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                  {lang === 'hi' ? 'मोबाइल नंबर (10 अंक)' : 'Mobile Phone Number'}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone.replace('+91 ', '')}
                    onChange={(e) => setPhone(`+91 ${e.target.value}`)}
                    required
                    placeholder="98111 22334"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-r-lg text-sm bg-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{lang === 'hi' ? 'OTP प्राप्त करें' : 'Get OTP Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-900">{phone} पर OTP भेजा गया</span>
                  <button 
                    type="button" 
                    onClick={() => setOtpStep('send_otp')} 
                    className="text-[11px] text-amber-700 underline cursor-pointer"
                  >
                    बदलें
                  </button>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  टेस्टिंग कोड: <strong className="font-mono text-slate-900">{generatedOtp}</strong>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? '6-अंकीय OTP दर्ज करें' : 'Enter 6-digit OTP'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-lg text-center tracking-widest font-mono font-bold bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'सत्यापित करें व लॉगिन करें' : 'Verify & Sign In'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle Sign Up vs Sign In */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
            >
              {isSignUp 
                ? (lang === 'hi' ? 'पहले से खाता है? लॉगिन करें' : 'Already have an account? Sign In') 
                : (lang === 'hi' ? 'नया खाता बनाना चाहते हैं? रजिस्टर करें' : 'New to RangSathi? Register here')}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
