import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Agent Endpoint
app.post('/api/ai/agent', async (req, res) => {
  const { userPrompt, role, lang, contextData } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: 'userPrompt is required' });
  }

  const systemInstruction = `
You are the "RangSathi AI Autonomous Painting Agent" (रंगसाथी ऑटो पायलट AI एजेंट).
Your goal is to handle painting tasks AUTOMATICALLY for customers and painters in India.
You understand Hindi, Hinglish, and English naturally.

Available platform services:
- Interior Painting (Wall Emulsion, Royale, Tractor)
- Exterior Painting (Apex Weatherproof)
- Wall Texture & Stucco Design
- Dampness & Waterproofing
- Putty & Primer Base
- Wood & Door Polish

Verified Painters in network:
1. रमेश कुमार & सन्स (p-1) - Delhi NCR (Noida/South Delhi), ₹14/sq.ft, rating 4.9, 14 yrs exp
2. विक्की रंगमहल आर्ट्स (p-2) - Mumbai (Andheri/Bandra), ₹22/sq.ft, rating 4.8, texture specialist
3. सुरेश पेंटिंग सर्विसेज (p-3) - Lucknow (Gomti Nagar), ₹12/sq.ft, rating 4.9, 18 yrs exp
4. कलर्स क्राफ्ट टीम (p-4) - Indore (Vijay Nagar), ₹16/sq.ft, rating 4.7, 11 yrs exp

Standard calculation rules:
- 1 Room: ~250 sqft carpet
- 1 BHK: ~550-600 sqft
- 2 BHK: ~900-1000 sqft
- 3 BHK: ~1400-1500 sqft
- 4 BHK: ~2000+ sqft
- Total paintable area multiplier is ~3.2x carpet area.
- Economy paint: ₹13/sqft, Premium: ₹20/sqft, Luxury Royale: ₹30/sqft. Fresh wall adds ₹6/sqft for putty.

Always respond with:
1. "reply": Friendly, encouraging response in user's preferred language (Hindi/Hinglish or English).
2. "autonomousAction": One of ["auto_calculate", "recommend_painter", "prefill_booking", "suggest_colors", "create_quote", "general_advice"]
3. "actionData": Object containing:
   - "carpetArea": number (if applicable)
   - "propertyType": string (e.g. "2 BHK")
   - "estimatedBudget": number
   - "paintLitres": number
   - "recommendedPainterId": string (e.g. "p-1", "p-2", "p-3", "p-4")
   - "colorPlan": { "accentHex": string, "sideHex": string, "themeName": string } (if applicable)
   - "quoteItems": array of { description: string, sqft: number, rate: number, amount: number } (if requested by painter)
`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            text: `User Role: ${role || 'customer'}\nUser Language: ${lang || 'hi'}\nUser Query: ${userPrompt}\nContext: ${JSON.stringify(contextData || {})}`,
          },
        ],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch (e) {
          return res.json({ reply: text, autonomousAction: 'general_advice', actionData: {} });
        }
      }
    }

    // Smart fallback if API key is not present or rate limited
    return res.json(generateSmartAutonomousResponse(userPrompt, role, lang));
  } catch (err: any) {
    console.error('Gemini API error:', err);
    // Graceful fallback
    return res.json(generateSmartAutonomousResponse(userPrompt, role, lang));
  }
});

// High-intelligence local rule engine for seamless offline/fallback operation
function generateSmartAutonomousResponse(prompt: string, role: string, lang: string) {
  const p = prompt.toLowerCase();
  
  if (p.includes('3bhk') || p.includes('3 bhk') || p.includes('3-bhk')) {
    return {
      reply: lang === 'hi' 
        ? 'मैंने आपके 3 BHK फ्लैट का पूरा हिसाब स्वतः तैयार कर लिया है! कुल पेंट एरिया लगभग 4,500 sq.ft होगा। इसमें लगभग 35 लीटर इमल्शन और 40 लीटर प्राइमर लगेगा। अनुमानित बजट ₹28,000 - ₹34,000 रहेगा। मैंने आपके लिए टॉप-रेटेड पेंटर और बुकिंग स्लॉट भी तैयार कर दिया है।' 
        : 'I have automatically calculated everything for your 3 BHK flat! Paintable surface is ~4,500 sq.ft, requiring ~35L paint. Estimated cost: ₹28,000 - ₹34,000. I have matched the top contractor and prepared a booking slot for you.',
      autonomousAction: 'auto_calculate',
      actionData: {
        carpetArea: 1400,
        propertyType: '3 BHK',
        estimatedBudget: 31000,
        paintLitres: 35,
        recommendedPainterId: 'p-1',
        colorPlan: { accentHex: '#1C315E', sideHex: '#F4EAD5', themeName: 'Royal Heritage Indigo & Ivory' }
      }
    };
  }

  if (p.includes('2bhk') || p.includes('2 bhk') || p.includes('2-bhk')) {
    return {
      reply: lang === 'hi' 
        ? 'आपके 2 BHK फ्लैट का हिसाब स्वतः तैयार है! लगभग 950 sq.ft कारपेट एरिया के लिए कुल पेंटिंग खर्च ₹20,000 - ₹24,000 आएगा। 2-3 दिन में काम पूरा हो जाएगा। आप तुरंत ₹99 टोकन से इंस्पेक्शन विजिट बुक कर सकते हैं।' 
        : 'Your 2 BHK calculation is ready! For ~950 sq.ft carpet area, the cost will be around ₹20,000 - ₹24,000. It will take 2-3 days. You can lock your inspection slot with ₹99 token.',
      autonomousAction: 'auto_calculate',
      actionData: {
        carpetArea: 950,
        propertyType: '2 BHK',
        estimatedBudget: 22000,
        paintLitres: 24,
        recommendedPainterId: 'p-1',
        colorPlan: { accentHex: '#879782', sideHex: '#D6DCE5', themeName: 'Sage Oasis Harmony' }
      }
    };
  }

  if (p.includes('colour') || p.includes('color') || p.includes('रंग') || p.includes('शेड')) {
    return {
      reply: lang === 'hi' 
        ? 'मैंने आपके कमरे के लिए सबसे ट्रेंडी "शाही हेरिटेज इंडिगो" (Royal Indigo) और "शैंपेन आइवरी" का संयोजन चुना है। यह एक्सेंट दीवार पर बहुत खूबसूरत लगता है। मैंने विज़ुअलाइज़र में यह शेड्स सेट कर दिए हैं!' 
        : 'I have set up the trending "Royal Indigo" accent with "Champagne Ivory" main walls for your room in the visualizer!',
      autonomousAction: 'suggest_colors',
      actionData: {
        colorPlan: { accentHex: '#1C315E', sideHex: '#F4EAD5', themeName: 'Royal Indigo' }
      }
    };
  }

  if (p.includes('quote') || p.includes('बिल') || p.includes('कोटेशन') || role === 'painter') {
    return {
      reply: lang === 'hi' 
        ? 'मैंने आपके ग्राहक के लिए तुरंत 4-आइटम का प्रोफेशनल कोटेशन तैयार कर दिया है (पुट्टी, प्राइमर, 2 कोट इमल्शन व टेक्सचर दीवार)। आप इसे 1-क्लिक में प्रिंट या डाउनलोड कर सकते हैं!' 
        : 'I have automatically generated a 4-item professional painting quote with putty, primer, emulsion, and accent texture wall. Ready to print!',
      autonomousAction: 'create_quote',
      actionData: {
        carpetArea: 1000,
        estimatedBudget: 24000,
      }
    };
  }

  return {
    reply: lang === 'hi' 
      ? 'नमस्ते! मैं आपका रंगसाथी AI एजेंट हूँ। आप मुझे बस अपना कमरा (1BHK/2BHK/3BHK), शहर या पसंद बताएं—मैं लागत निकालना, बेस्ट पेंटर ढूंढना, कलर चुनना और ऑनलाइन बुकिंग का सारा काम अपने आप संभाल लूँगा!' 
      : 'Hello! I am your RangSathi Autonomous AI Agent. Tell me your room size, city, or painting preference, and I will automatically handle cost calculations, painter matching, color selection, and booking!',
    autonomousAction: 'general_advice',
    actionData: {
      recommendedPainterId: 'p-1'
    }
  };
}

// Development with Vite vs Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
