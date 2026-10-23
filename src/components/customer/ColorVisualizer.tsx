import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLOR_PALETTES, ColorSwatch } from '../../data/initialData';
import { 
  Palette, 
  Sparkles, 
  Check, 
  RefreshCw, 
  ArrowRight, 
  Sliders, 
  Layers, 
  Share2, 
  Download 
} from 'lucide-react';

interface ColorVisualizerProps {
  onBookWithPalette: (accentHex: string, mainHex: string, shadeName: string) => void;
}

export type RoomCategory = 'living' | 'bedroom' | 'kids' | 'pooja' | 'exterior';
export type SurfaceTarget = 'accent_wall' | 'side_walls' | 'ceiling' | 'trims';

export interface RoomThemePreset {
  id: string;
  nameHi: string;
  nameEn: string;
  accent: ColorSwatch;
  side: ColorSwatch;
  ceilingHex: string;
  trimsHex: string;
  descriptionHi: string;
}

export const ColorVisualizer: React.FC<ColorVisualizerProps> = ({ onBookWithPalette }) => {
  const { lang } = useApp();

  const [selectedRoom, setSelectedRoom] = useState<RoomCategory>('living');
  const [activeSurface, setActiveSurface] = useState<SurfaceTarget>('accent_wall');

  // Multi-color state per room
  const [accentColor, setAccentColor] = useState<ColorSwatch>(COLOR_PALETTES[0]); // Royal Indigo
  const [sideWallColor, setSideWallColor] = useState<ColorSwatch>(COLOR_PALETTES[3]); // Champagne Ivory
  const [ceilingColor, setCeilingColor] = useState<string>('#FAF9F6'); // Off-white
  const [trimColor, setTrimColor] = useState<string>('#FFFFFF');
  const [finish, setFinish] = useState<'matte' | 'satin' | 'gloss'>('satin');

  // Room Theme Presets
  const THEME_PRESETS: RoomThemePreset[] = [
    {
      id: 'royal_heritage',
      nameHi: 'शाही हेरिटेज (Indigo & Ivory)',
      nameEn: 'Royal Heritage (Indigo & Ivory)',
      accent: COLOR_PALETTES[0], // Royal Indigo
      side: COLOR_PALETTES[3], // Champagne Ivory
      ceilingHex: '#FAF9F6',
      trimsHex: '#FFFFFF',
      descriptionHi: 'हॉल व ड्राइंग रूम के लिए समृद्ध व भव्य लुक',
    },
    {
      id: 'terracotta_earth',
      nameHi: 'मिट्टी टेराकोटा व क्रीम',
      nameEn: 'Jaipur Terracotta & Warm Sand',
      accent: COLOR_PALETTES[1], // Terracotta Earth
      side: COLOR_PALETTES[8], // Desert Sand Cream
      ceilingHex: '#FFFDF9',
      trimsHex: '#3E2723',
      descriptionHi: 'भारतीय घरों के लिए प्राकृतिक व वार्म अहसास',
    },
    {
      id: 'sage_oasis',
      nameHi: 'सेज़ ग्रीन व मिस्ट ग्रे (शांति व सुकून)',
      nameEn: 'Sage Oasis & Misty Fog',
      accent: COLOR_PALETTES[2], // Sage Harmony
      side: COLOR_PALETTES[5], // Misty Cloud Grey
      ceilingHex: '#FFFFFF',
      trimsHex: '#2E382E',
      descriptionHi: 'मास्टर बेडरूम के लिए सुकूनदायक और मॉडर्न',
    },
    {
      id: 'marigold_festive',
      nameHi: 'गेंदा पीला व शाही टील',
      nameEn: 'Festive Marigold & Teal',
      accent: COLOR_PALETTES[4], // Mustard Marigold
      side: COLOR_PALETTES[6], // Teal Peacock
      ceilingHex: '#FDFBF7',
      trimsHex: '#B45309',
      descriptionHi: 'पूजा रूम व डाइनिंग के लिए शुभ व आकर्षक',
    },
    {
      id: 'blush_rose',
      nameHi: 'गुलाबी वेलवेट व पाउडर ग्रे',
      nameEn: 'Blush Velvet & Powder Grey',
      accent: COLOR_PALETTES[7], // Blush Rose
      side: COLOR_PALETTES[5], // Misty Cloud
      ceilingHex: '#FFFFFF',
      trimsHex: '#F3E8E9',
      descriptionHi: 'बच्चों व गेस्ट रूम के लिए सॉफ्ट पेस्टल थीम',
    },
    {
      id: 'charcoal_minimal',
      nameHi: 'मॉडर्न चारकोल व वार्म व्हाइट',
      nameEn: 'Modern Charcoal & Off-White',
      accent: COLOR_PALETTES[9], // Deep Charcoal
      side: COLOR_PALETTES[3], // Champagne Ivory
      ceilingHex: '#F8FAFC',
      trimsHex: '#0F172A',
      descriptionHi: 'लक्ज़री टीवी यूनिट व डाइनिंग वॉल के लिए',
    },
  ];

  const handleApplyPreset = (preset: RoomThemePreset) => {
    setAccentColor(preset.accent);
    setSideWallColor(preset.side);
    setCeilingColor(preset.ceilingHex);
    setTrimColor(preset.trimsHex);
  };

  const handleColorPick = (swatch: ColorSwatch) => {
    if (activeSurface === 'accent_wall') {
      setAccentColor(swatch);
    } else if (activeSurface === 'side_walls') {
      setSideWallColor(swatch);
    } else if (activeSurface === 'ceiling') {
      setCeilingColor(swatch.hex);
    } else if (activeSurface === 'trims') {
      setTrimColor(swatch.hex);
    }
  };

  const handleReset = () => {
    handleApplyPreset(THEME_PRESETS[0]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-md mb-2 border border-amber-200">
          <Palette className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'कमरे के अनुसार मल्टी-कलर वॉल विज़ुअलाइज़र' : 'Multi-Surface Room Color Customizer'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
          {lang === 'hi' 
            ? 'कमरे की हर दीवार, छत और बॉर्डर का रंग अलग-अलग चुनकर देखें' 
            : 'Customize Every Wall, Ceiling & Trim with Designer Palettes'}
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          {lang === 'hi' 
            ? 'लिविंग रूम, बेडरूम, किड्स रूम, पूजा रूम या बाहरी दीवारें चुनें और विभिन्न रंगों का लाइव 2D संयोजन देखें।' 
            : 'Select multiple harmonized shades for accent wall, side walls, and ceiling. Export your palette card directly to your painter.'}
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 cols: Canvas & Surface Controls */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          
          {/* Room Selector Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'living', hi: 'लिविंग हॉल (Living Room)', en: 'Living Room' },
                { id: 'bedroom', hi: 'मास्टर बेडरूम (Bedroom)', en: 'Master Bedroom' },
                { id: 'kids', hi: 'किड्स / स्टडी रूम', en: 'Kids Room' },
                { id: 'pooja', hi: 'पूजा रूम / डाइनिंग', en: 'Pooja Room' },
                { id: 'exterior', hi: 'बाहरी दीवारें (Elevation)', en: 'Exterior Elevation' },
              ].map((rm) => (
                <button
                  key={rm.id}
                  type="button"
                  onClick={() => setSelectedRoom(rm.id as RoomCategory)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    selectedRoom === rm.id 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'hi' ? rm.hi : rm.en}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer ml-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>

          {/* Interactive Multi-Surface Canvas */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
            
            {/* 1. Living Room */}
            {selectedRoom === 'living' && (
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                {/* Ceiling Surface */}
                <polygon 
                  points="0,0 800,0 720,70 80,70" 
                  fill={ceilingColor} 
                  stroke={trimColor}
                  strokeWidth="3"
                />

                {/* Left Side Wall */}
                <polygon 
                  points="0,0 80,70 80,410 0,500" 
                  fill={sideWallColor.hex} 
                  opacity="0.95"
                />

                {/* Right Side Wall */}
                <polygon 
                  points="800,0 720,70 720,410 800,500" 
                  fill={sideWallColor.hex} 
                  opacity="0.88"
                />

                {/* Back Center Accent Wall */}
                <rect 
                  x="80" 
                  y="70" 
                  width="640" 
                  height="340" 
                  fill={accentColor.hex} 
                  className="transition-colors duration-300"
                />

                {/* Wall Baseboard Trim */}
                <rect x="80" y="402" width="640" height="8" fill={trimColor} />

                {/* Sheen Overlay */}
                {finish === 'satin' && (
                  <rect x="80" y="70" width="640" height="340" fill="url(#satinSheenGlobal)" opacity="0.25" pointerEvents="none" />
                )}
                {finish === 'gloss' && (
                  <rect x="80" y="70" width="640" height="340" fill="url(#glossReflectionGlobal)" opacity="0.38" pointerEvents="none" />
                )}

                {/* Wooden Flooring */}
                <polygon points="0,500 80,410 720,410 800,500" fill="#B5835A" />
                <line x1="80" y1="410" x2="0" y2="500" stroke="#9A6943" strokeWidth="1.5" />
                <line x1="240" y1="410" x2="180" y2="500" stroke="#9A6943" strokeWidth="1.5" />
                <line x1="400" y1="410" x2="380" y2="500" stroke="#9A6943" strokeWidth="1.5" />
                <line x1="560" y1="410" x2="580" y2="500" stroke="#9A6943" strokeWidth="1.5" />
                <line x1="720" y1="410" x2="800" y2="500" stroke="#9A6943" strokeWidth="1.5" />

                {/* Large Window on Left with Molded Trim */}
                <rect x="15" y="110" width="50" height="190" fill="#E2E8F0" stroke={trimColor} strokeWidth="4" />
                <line x1="40" y1="110" x2="40" y2="300" stroke={trimColor} strokeWidth="2" />
                <line x1="15" y1="205" x2="65" y2="205" stroke={trimColor} strokeWidth="2" />

                {/* Wall Artwork on Accent Wall */}
                <rect x="290" y="105" width="220" height="125" fill="#FFFFFF" rx="4" stroke={trimColor} strokeWidth="4" />
                <path d="M310,200 Q400,120 490,200" fill="none" stroke={sideWallColor.hex} strokeWidth="10" />
                <circle cx="400" cy="150" r="22" fill={accentColor.hex} opacity="0.8" />

                {/* Modern Sofa */}
                <rect x="230" y="325" width="340" height="105" rx="14" fill="#1E293B" />
                <rect x="250" y="305" width="300" height="40" rx="10" fill="#334155" />
                <rect x="210" y="335" width="35" height="85" rx="10" fill="#0F172A" />
                <rect x="555" y="335" width="35" height="85" rx="10" fill="#0F172A" />
                {/* Cushions */}
                <rect x="260" y="318" width="45" height="45" rx="6" fill={sideWallColor.hex} />
                <rect x="495" y="318" width="45" height="45" rx="6" fill={accentColor.hex} />

                {/* Coffee Table */}
                <ellipse cx="400" cy="445" rx="85" ry="22" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <line x1="345" y1="445" x2="345" y2="475" stroke="#334155" strokeWidth="4" />
                <line x1="455" y1="445" x2="455" y2="475" stroke="#334155" strokeWidth="4" />

                {/* Indoor Fiddle Plant */}
                <polygon points="675,395 705,395 700,445 680,445" fill="#582C0E" />
                <ellipse cx="690" cy="365" rx="20" ry="30" fill="#15803D" />
                <ellipse cx="675" cy="375" rx="15" ry="22" fill="#16A34A" />
                <ellipse cx="705" cy="375" rx="15" ry="22" fill="#22C55E" />
              </svg>
            )}

            {/* 2. Bedroom */}
            {selectedRoom === 'bedroom' && (
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <polygon points="0,0 800,0 720,60 80,60" fill={ceilingColor} stroke={trimColor} strokeWidth="2" />
                <polygon points="0,0 80,60 80,420 0,500" fill={sideWallColor.hex} opacity="0.92" />
                <polygon points="800,0 720,60 720,420 800,500" fill={sideWallColor.hex} opacity="0.86" />
                <rect x="80" y="60" width="640" height="360" fill={accentColor.hex} />
                <rect x="80" y="414" width="640" height="6" fill={trimColor} />

                <polygon points="0,500 80,420 720,420 800,500" fill="#CBB69D" />

                {/* Elegant Bed Headboard */}
                <rect x="240" y="220" width="320" height="160" rx="18" fill="#1E293B" stroke={trimColor} strokeWidth="3" />
                {/* Pillows */}
                <rect x="265" y="240" width="115" height="45" rx="8" fill="#FFFFFF" />
                <rect x="420" y="240" width="115" height="45" rx="8" fill="#FFFFFF" />
                {/* Duvet / Quilt */}
                <rect x="235" y="295" width="330" height="135" rx="14" fill={sideWallColor.hex} stroke="#CBD5E1" strokeWidth="2" />
                {/* Runner Blanket */}
                <rect x="235" y="380" width="330" height="45" rx="4" fill={accentColor.hex} />

                {/* Bedside lamps */}
                <line x1="180" y1="160" x2="180" y2="230" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="160,260 200,260 190,230 170,230" fill="#FEF08A" opacity="0.9" />

                <line x1="620" y1="160" x2="620" y2="230" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="600,260 640,260 630,230 610,230" fill="#FEF08A" opacity="0.9" />
              </svg>
            )}

            {/* 3. Kids / Study Room */}
            {selectedRoom === 'kids' && (
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <polygon points="0,0 800,0 720,60 80,60" fill={ceilingColor} />
                <polygon points="0,0 80,60 80,420 0,500" fill={sideWallColor.hex} opacity="0.9" />
                <polygon points="800,0 720,60 720,420 800,500" fill={sideWallColor.hex} opacity="0.85" />
                <rect x="80" y="60" width="640" height="360" fill={accentColor.hex} />
                <polygon points="0,500 80,420 720,420 800,500" fill="#E2E8F0" />

                {/* Playful Geometric Wall Decals */}
                <circle cx="200" cy="150" r="40" fill={sideWallColor.hex} opacity="0.6" />
                <circle cx="280" cy="180" r="25" fill="#FDE047" opacity="0.8" />
                <polygon points="550,110 590,180 510,180" fill={sideWallColor.hex} opacity="0.6" />
                <polygon points="620,130 650,180 590,180" fill="#F472B6" opacity="0.7" />

                {/* Kids Study Desk & Chair */}
                <rect x="300" y="320" width="200" height="90" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
                <rect x="360" y="350" width="80" height="90" rx="8" fill="#3B82F6" />
              </svg>
            )}

            {/* 4. Pooja Room / Dining */}
            {selectedRoom === 'pooja' && (
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <polygon points="0,0 800,0 720,60 80,60" fill={ceilingColor} stroke={trimColor} strokeWidth="3" />
                <polygon points="0,0 80,60 80,420 0,500" fill={sideWallColor.hex} opacity="0.92" />
                <polygon points="800,0 720,60 720,420 800,500" fill={sideWallColor.hex} opacity="0.88" />
                <rect x="80" y="60" width="640" height="360" fill={accentColor.hex} />
                <polygon points="0,500 80,420 720,420 800,500" fill="#E8D5C4" />

                {/* Traditional Mandir Arch Design */}
                <path d="M300,380 L300,190 Q400,100 500,190 L500,380 Z" fill="#FFFDF9" stroke={trimColor} strokeWidth="5" />
                <circle cx="400" cy="170" r="20" fill="#F59E0B" />
                <rect x="320" y="350" width="160" height="40" fill="#78350F" rx="4" />
                <circle cx="400" cy="340" r="12" fill="#D97706" />
              </svg>
            )}

            {/* 5. Exterior Elevation */}
            {selectedRoom === 'exterior' && (
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <rect x="0" y="0" width="800" height="260" fill="#E0F2FE" />
                <circle cx="120" cy="80" r="35" fill="#FDE047" />
                <rect x="0" y="400" width="800" height="100" fill="#86EFAC" />
                <polygon points="340,400 460,400 490,500 310,500" fill="#CBD5E1" />

                {/* Main House Walls */}
                <rect x="180" y="160" width="440" height="240" fill={sideWallColor.hex} stroke="#334155" strokeWidth="2" />
                
                {/* Accent Portico / Feature Wall */}
                <rect x="220" y="180" width="160" height="150" fill={accentColor.hex} rx="6" />

                {/* Trims on Parapet */}
                <rect x="160" y="145" width="480" height="20" fill={trimColor} rx="3" stroke="#334155" strokeWidth="2" />
                
                {/* Windows */}
                <rect x="420" y="200" width="80" height="70" fill="#93C5FD" stroke={trimColor} strokeWidth="4" />
                <rect x="520" y="200" width="80" height="70" fill="#93C5FD" stroke={trimColor} strokeWidth="4" />

                <rect x="365" y="290" width="70" height="110" fill="#78350F" rx="4" stroke={trimColor} strokeWidth="2" />
              </svg>
            )}

            {/* Global SVG Gradients */}
            <svg className="hidden">
              <defs>
                <linearGradient id="satinSheenGlobal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="glossReflectionGlobal" x1="0" y1="0" x2="0.8" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Real-time Multi-Color Legend Banner */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200/90 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: accentColor.hex }} />
                  <span className="font-semibold text-slate-800">
                    {lang === 'hi' ? 'एक्सेंट:' : 'Accent:'} {lang === 'hi' ? accentColor.nameHi : accentColor.nameEn}
                  </span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: sideWallColor.hex }} />
                  <span className="font-semibold text-slate-800">
                    {lang === 'hi' ? 'साइड दीवारें:' : 'Side Walls:'} {lang === 'hi' ? sideWallColor.nameHi : sideWallColor.nameEn}
                  </span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: ceilingColor }} />
                  <span className="font-semibold text-slate-800">
                    {lang === 'hi' ? 'सीलिंग:' : 'Ceiling:'} {ceilingColor}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                <span>{finish.toUpperCase()} Finish</span>
              </div>
            </div>

          </div>

          {/* Active Surface Selector (Which wall/surface is being modified) */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{lang === 'hi' ? 'रंग बदलने के लिए दीवार / सतह चुनें:' : 'Select Surface to Recolor:'}</span>
              <span className="text-amber-700 text-[11px] font-semibold">
                {activeSurface === 'accent_wall' && (lang === 'hi' ? 'एक्सेंट दीवार सक्रिय' : 'Accent Wall Active')}
                {activeSurface === 'side_walls' && (lang === 'hi' ? 'साइड की दीवारें सक्रिय' : 'Side Walls Active')}
                {activeSurface === 'ceiling' && (lang === 'hi' ? 'छत / सीलिंग सक्रिय' : 'Ceiling Active')}
                {activeSurface === 'trims' && (lang === 'hi' ? 'बॉर्डर / खिड़की मोल्डिंग सक्रिय' : 'Trims & Borders Active')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveSurface('accent_wall')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  activeSurface === 'accent_wall' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>{lang === 'hi' ? '1. एक्सेंट दीवार' : '1. Accent Wall'}</span>
                <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: accentColor.hex }} />
              </button>

              <button
                type="button"
                onClick={() => setActiveSurface('side_walls')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  activeSurface === 'side_walls' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>{lang === 'hi' ? '2. बाकी दीवारें' : '2. Side Walls'}</span>
                <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: sideWallColor.hex }} />
              </button>

              <button
                type="button"
                onClick={() => setActiveSurface('ceiling')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  activeSurface === 'ceiling' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>{lang === 'hi' ? '3. छत / सीलिंग' : '3. Ceiling'}</span>
                <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: ceilingColor }} />
              </button>

              <button
                type="button"
                onClick={() => setActiveSurface('trims')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  activeSurface === 'trims' ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs' : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>{lang === 'hi' ? '4. बॉर्डर व ट्रिम' : '4. Trims'}</span>
                <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: trimColor }} />
              </button>
            </div>
          </div>

        </div>

        {/* Right 4 cols: Swatches & Curated Presets */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Curated Multi-Color Themes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'hi' ? 'रेडीमेड डिज़ाइनर कलर थीम्स' : 'Curated Multi-Color Themes'}</span>
              </h3>
            </div>

            <div className="space-y-2">
              {THEME_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {lang === 'hi' ? preset.nameHi : preset.nameEn}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {preset.descriptionHi}
                    </div>
                  </div>
                  {/* Swatch dots preview */}
                  <div className="flex items-center -space-x-1 shrink-0">
                    <span className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.accent.hex }} />
                    <span className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.side.hex }} />
                    <span className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.trimsHex }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Shade Swatches */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'hi' ? 'कलर शेड्स कैटलॉग' : 'Shade Card Catalog'}
              </h3>
              <span className="text-[11px] font-semibold text-amber-700">
                10 Colors
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {COLOR_PALETTES.map((swatch) => {
                const isSelected = 
                  (activeSurface === 'accent_wall' && accentColor.code === swatch.code) ||
                  (activeSurface === 'side_walls' && sideWallColor.code === swatch.code) ||
                  (activeSurface === 'ceiling' && ceilingColor === swatch.hex) ||
                  (activeSurface === 'trims' && trimColor === swatch.hex);

                return (
                  <button
                    key={swatch.code}
                    onClick={() => handleColorPick(swatch)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected ? 'ring-2 ring-amber-600 border-amber-600 bg-amber-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span 
                        className="w-6 h-6 rounded-md border border-slate-300 shadow-inner block"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 line-clamp-1">
                        {lang === 'hi' ? swatch.nameHi : swatch.nameEn}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono">
                        {swatch.code}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Booking Action */}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => onBookWithPalette(
                  accentColor.hex, 
                  sideWallColor.hex, 
                  `${accentColor.nameHi} + ${sideWallColor.nameHi} (Ceiling: ${ceilingColor})`
                )}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'hi' ? 'इस पूरे कलर प्लान के साथ पेंटर बुक करें' : 'Book Painter with this Room Palette'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

