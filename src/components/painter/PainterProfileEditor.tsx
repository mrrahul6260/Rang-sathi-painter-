import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceType } from '../../types';
import { SERVICES_LIST } from '../../data/initialData';
import { MP_CITIES_DATA } from '../../data/mpCities';
import { ShieldCheck, Save, CheckCircle2, Wrench, Award, Users } from 'lucide-react';

export const PainterProfileEditor: React.FC = () => {
  const { lang, activePainter, updatePainterProfile } = useApp();

  const [name, setName] = useState(activePainter.name);
  const [phone, setPhone] = useState(activePainter.phone);
  const [city, setCity] = useState(activePainter.city);
  const [area, setArea] = useState(activePainter.area);
  const [baseRateSqFt, setBaseRateSqFt] = useState(activePainter.baseRateSqFt);
  const [teamSize, setTeamSize] = useState(activePainter.teamSize);
  const [experienceYears, setExperienceYears] = useState(activePainter.experienceYears);
  const [bio, setBio] = useState(activePainter.bio);
  const [specialties, setSpecialties] = useState<ServiceType[]>(activePainter.specialties);
  const [toolsString, setToolsString] = useState(activePainter.toolsOwned.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSpecialty = (type: ServiceType) => {
    setSpecialties((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePainterProfile({
      name,
      phone,
      city,
      area,
      baseRateSqFt,
      teamSize,
      experienceYears,
      bio,
      specialties,
      toolsOwned: toolsString.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'मेरी व्यावसायिक प्रोफाइल व दरें' : 'My Painter Profile & Rates'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'hi' 
              ? 'यह जानकारी ग्राहक जब पेंटर खोजेंगे तो उन्हें सीधे दिखाई देगी।' 
              : 'Keep your rates, tools, and past experience up-to-date to get more bookings.'}
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {lang === 'hi' ? 'सफलतापूर्वक सेव हुआ!' : 'Changes Saved!'}
          </span>
        )}
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'व्यवसाय / पेंटर का नाम' : 'Business / Painter Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'मोबाइल नंबर (WhatsApp)' : 'Phone Number'}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'मध्य प्रदेश शहर / जिला (MP City)' : 'MP District / City'}
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              {lang === 'hi' ? 'कार्यक्षेत्र / कॉलोनियां' : 'Service Areas'}
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'बेस रेट (₹ / sq.ft)' : 'Base Rate (₹/sqft)'}
            </label>
            <input
              type="number"
              value={baseRateSqFt}
              onChange={(e) => setBaseRateSqFt(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono font-bold text-amber-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'अनुभव (वर्ष)' : 'Experience (Years)'}
            </label>
            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'hi' ? 'टीम साइज (कारीगर संख्या)' : 'Crew Size'}
            </label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono"
            />
          </div>
        </div>

        {/* Specialties Checkboxes */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            {lang === 'hi' ? 'आपकी सेवाएं (विशेषज्ञता):' : 'Offered Painting Specialties:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SERVICES_LIST.map((srv) => {
              const checked = specialties.includes(srv.type);
              return (
                <div
                  key={srv.type}
                  onClick={() => toggleSpecialty(srv.type)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    checked ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{lang === 'hi' ? srv.titleHi : srv.titleEn}</span>
                  {checked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            {lang === 'hi' ? 'उपलब्ध टूल्स व मशीनें (कॉमा से अलग करें)' : 'Owned Painting Equipment & Tools'}
          </label>
          <input
            type="text"
            value={toolsString}
            onChange={(e) => setToolsString(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            {lang === 'hi' ? 'परिचय व काम का वादा (Bio / Guarantee)' : 'Bio & Customer Guarantee'}
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'प्रोफाइल अपडेट करें' : 'Save Changes'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
