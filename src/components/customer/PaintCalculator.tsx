import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PaintCalculatorProps {
  onProceedToBooking: (sqft: number, budget: number, serviceName: string) => void;
  onPostRequirement: (sqft: number, budget: number) => void;
}

export const PaintCalculator: React.FC<PaintCalculatorProps> = ({
  onProceedToBooking,
  onPostRequirement,
}) => {
  const { lang, painters } = useApp();

  const [spacePreset, setSpacePreset] = useState<'1bhk' | '2bhk' | '3bhk' | '4bhk' | 'single_room' | 'custom'>('2bhk');
  const [carpetArea, setCarpetArea] = useState<number>(950);
  const [wallCondition, setWallCondition] = useState<'repaint' | 'fresh_plaster'>('repaint');
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [paintTier, setPaintTier] = useState<'economy' | 'premium' | 'luxury'>('premium');
  const [accentWallCount, setAccentWallCount] = useState<number>(1);

  // Multipliers
  // Total paintable wall area is roughly carpet area * 3.2 (with ceiling) or 2.5 (without ceiling)
  const multiplier = includeCeiling ? 3.3 : 2.5;
  const paintableAreaSqFt = Math.round(carpetArea * multiplier);

  // Rates
  let baseRatePerSqFt = 18;
  if (paintTier === 'economy') baseRatePerSqFt = 13;
  if (paintTier === 'premium') baseRatePerSqFt = 20;
  if (paintTier === 'luxury') baseRatePerSqFt = 30;

  if (wallCondition === 'fresh_plaster') {
    baseRatePerSqFt += 6; // Extra for 2 coats wall putty & sanding
  }

  // Accent wall adds extra
  const accentWallCost = accentWallCount * 3500;

  // Total Math
  const totalPaintingCost = Math.round(paintableAreaSqFt * baseRatePerSqFt + accentWallCost);
  const materialCost = Math.round(totalPaintingCost * 0.58);
  const labourCost = totalPaintingCost - materialCost;

  // Material quantities estimation
  // 1 litre of emulsion covers approx 130 sq.ft in 2 coats
  const paintLitres = Math.ceil(paintableAreaSqFt / 130);
  // 1 litre primer covers approx 110 sq.ft
  const primerLitres = Math.ceil(paintableAreaSqFt / 110);
  // 1 bag (40kg) putty covers approx 500 sq.ft in 2 coats
  const puttyBags = wallCondition === 'fresh_plaster' ? Math.ceil(paintableAreaSqFt / 500) : 1;

  // Days required with 2-3 painters
  const estimatedDays = Math.max(2, Math.ceil(paintableAreaSqFt / 800));

  const handlePresetChange = (preset: typeof spacePreset) => {
    setSpacePreset(preset);
    if (preset === 'single_room') setCarpetArea(220);
    if (preset === '1bhk') setCarpetArea(550);
    if (preset === '2bhk') setCarpetArea(950);
    if (preset === '3bhk') setCarpetArea(1400);
    if (preset === '4bhk') setCarpetArea(2100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-md mb-2 border border-amber-200">
          <Calculator className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'सटीक घर पेंटिंग लागत कैलकुलेटर' : 'Accurate Home Paint Cost Calculator'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'अपने कमरों के हिसाब से खर्च और सामान जानें' : 'Estimate Material & Labour Cost in Seconds'}
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          {lang === 'hi' 
            ? 'कारपेट एरिया, पुट्टी, प्राइमर और प्रीमियम पेंट के अनुसार बिना किसी छुपाए शुल्क के वास्तविक अनुमान।' 
            : 'Calculated using real-world contractor labor rates, coverage math, and authentic paint brand pricing.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              {lang === 'hi' ? '1. घर का प्रकार चुनें:' : '1. Select Property Type:'}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'single_room', label: '1 Room' },
                { id: '1bhk', label: '1 BHK' },
                { id: '2bhk', label: '2 BHK' },
                { id: '3bhk', label: '3 BHK' },
                { id: '4bhk', label: '4 BHK' },
                { id: 'custom', label: 'Custom' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetChange(p.id as any)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                    spacePreset === p.id 
                      ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Carpet Area Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {lang === 'hi' ? 'कारपेट एरिया (Carpet Area):' : 'Carpet Area:'}
              </label>
              <span className="text-sm font-extrabold text-amber-700 tabular-nums">
                {carpetArea} sq.ft
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={3500}
              step={25}
              value={carpetArea}
              onChange={(e) => {
                setCarpetArea(Number(e.target.value));
                setSpacePreset('custom');
              }}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>100 sq.ft</span>
              <span>1,500 sq.ft</span>
              <span>3,500 sq.ft</span>
            </div>
          </div>

          {/* Wall Condition (Fresh plaster vs Repainting) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              {lang === 'hi' ? '2. दीवार की मौजूदा स्थिति:' : '2. Wall Condition:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setWallCondition('repaint')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  wallCondition === 'repaint'
                    ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">
                  {lang === 'hi' ? 'री-पेंटिंग (पहले से पेंट है)' : 'Repainting (Already Painted)'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {lang === 'hi' ? 'हल्की घिसाई + प्राइमर टचअप + 2 कोट पेंट' : 'Surface sanding + touchup + 2 coats paint'}
                </div>
              </div>

              <div
                onClick={() => setWallCondition('fresh_plaster')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  wallCondition === 'fresh_plaster'
                    ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">
                  {lang === 'hi' ? 'नया प्लास्टर (Fresh Wall)' : 'Fresh Plastered Walls'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {lang === 'hi' ? '2 कोट पुट्टी + 1 कोट प्राइमर + 2 कोट पेंट' : '2 coats putty + 1 coat primer + 2 coats'}
                </div>
              </div>
            </div>
          </div>

          {/* Paint Tier Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              {lang === 'hi' ? '3. पेंट क्वालिटी व फिनिश:' : '3. Paint Grade:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  id: 'economy',
                  title: 'इकोनॉमी',
                  brand: 'Tractor / Distemper',
                  rate: '₹13/sqft',
                },
                {
                  id: 'premium',
                  title: 'प्रीमियम',
                  brand: 'Apcolite / Super',
                  rate: '₹20/sqft',
                },
                {
                  id: 'luxury',
                  title: 'रॉयल लग्जरी',
                  brand: 'Royale Luxury Velvet',
                  rate: '₹30/sqft',
                },
              ].map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setPaintTier(tier.id as any)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    paintTier === tier.id
                      ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{tier.title}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{tier.brand}</div>
                  <div className="text-xs font-semibold text-amber-700 mt-1">{tier.rate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ceiling & Accent wall toggle */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>{lang === 'hi' ? 'छत (Ceiling) पेंटिंग भी शामिल करें' : 'Include Ceiling Painting'}</span>
            </label>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600">{lang === 'hi' ? 'डिज़ाइनर टेक्सचर दीवारें:' : 'Accent Texture Walls:'}</span>
              <select
                value={accentWallCount}
                onChange={(e) => setAccentWallCount(Number(e.target.value))}
                className="px-2 py-1 text-xs border border-slate-300 rounded bg-white"
              >
                <option value={0}>0 (कोई नहीं)</option>
                <option value={1}>1 Accent Wall (+₹3,500)</option>
                <option value={2}>2 Accent Walls (+₹7,000)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Estimation Column */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              {lang === 'hi' ? 'कुल अनुमानित खर्च (Estimate)' : 'Total Estimated Budget'}
            </span>
            <div className="text-3xl font-extrabold mt-1 text-white tabular-nums">
              ₹{totalPaintingCost.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {paintableAreaSqFt.toLocaleString('en-IN')} sq.ft {lang === 'hi' ? 'पेंट होने वाली दीवारें' : 'paintable surface area'}
            </div>

            {/* Cost Breakup */}
            <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>{lang === 'hi' ? 'पेंट व मटेरियल खर्च (Asian/Berger):' : 'Material & Paint Cost:'}</span>
                <span className="font-semibold text-white tabular-nums">₹{materialCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{lang === 'hi' ? 'कारीगर लेबर व घिसाई मजदूरी:' : 'Labour & Surface Prep:'}</span>
                <span className="font-semibold text-white tabular-nums">₹{labourCost.toLocaleString('en-IN')}</span>
              </div>
              {accentWallCount > 0 && (
                <div className="flex justify-between items-center text-amber-300">
                  <span>{lang === 'hi' ? `रॉयल टेक्सचर डिज़ाइन (${accentWallCount} दीवार):` : `Accent Texture (${accentWallCount} wall):`}</span>
                  <span className="font-semibold tabular-nums">₹{accentWallCost.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Estimated Duration */}
            <div className="mt-5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">{lang === 'hi' ? 'अनुमानित समय:' : 'Estimated Time:'}</span>
              <span className="font-bold text-amber-400">
                {estimatedDays} {lang === 'hi' ? 'दिन (2-3 कारीगर)' : 'Days (2-3 crew)'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => onProceedToBooking(carpetArea, totalPaintingCost, paintTier)}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'hi' ? 'इस एस्टीमेट पर पेंटर बुक करें' : 'Book Verified Painter with this Estimate'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onPostRequirement(carpetArea, totalPaintingCost)}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg border border-white/20 transition-all text-center cursor-pointer"
              >
                {lang === 'hi' ? 'स्थानीय पेंटर्स से कोटेशन मांगें' : 'Request Multiple Quotes for this Area'}
              </button>
            </div>
          </div>

          {/* Required Materials Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {lang === 'hi' ? 'आवश्यक सामग्री का अनुमान (Material Required):' : 'Estimated Materials Quantity:'}
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600">{lang === 'hi' ? 'पेंट (Emulsion Paint):' : 'Emulsion Paint:'}</span>
                <span className="font-bold text-slate-900 tabular-nums">~{paintLitres} Litres</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600">{lang === 'hi' ? 'प्राइमर (Acrylic Primer):' : 'Primer:'}</span>
                <span className="font-bold text-slate-900 tabular-nums">~{primerLitres} Litres</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{lang === 'hi' ? 'वॉल पुट्टी (40kg Bag):' : 'Wall Putty (40kg Bags):'}</span>
                <span className="font-bold text-slate-900 tabular-nums">{puttyBags} {lang === 'hi' ? 'बोरी' : 'Bags'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
