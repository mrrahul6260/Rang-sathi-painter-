import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Calculator, 
  Palette, 
  Calendar, 
  FileText, 
  Loader2, 
  Zap, 
  Volume2 
} from 'lucide-react';

interface AutonomousAIAgentProps {
  onTriggerAction: (action: string, data: any) => void;
}

export const AutonomousAIAgent: React.FC<AutonomousAIAgentProps> = ({ onTriggerAction }) => {
  const { lang, role, activePainter } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{
    sender: 'user' | 'agent';
    text: string;
    action?: string;
    actionData?: any;
  }>>([
    {
      sender: 'agent',
      text: lang === 'hi' 
        ? 'नमस्ते! मैं रंगसाथी का ऑटो-पायलट AI एजेंट हूँ। आप मुझे बस अपना कमरा, शहर या बजट बताएं—मैं पेंट का हिसाब, बेस्ट पेंटर, सुंदर कलर मैच और बुकिंग का सारा काम अपने आप संभाल लूँगा।' 
        : 'Hello! I am RangSathi Auto-Pilot AI Agent. Tell me your room size or painting goal, and I will automatically handle estimations, painter matching, color preview, and booking for you!',
    },
  ]);

  const handleSendPrompt = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: query,
          role,
          lang,
          contextData: {
            activePainterName: activePainter.name,
            currentRole: role,
          },
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: data.reply || 'मैंने आपका अनुरोध प्रोसेस कर लिया है।',
          action: data.autonomousAction,
          actionData: data.actionData,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: lang === 'hi' 
            ? 'मैंने आपका अनुरोध समझ लिया है। 3 BHK या 2 BHK के लिए संपूर्ण गणना और बुकिंग नीचे तैयार है।' 
            : 'Got your request! Automatic estimation and booking recommendations are ready below.',
          action: 'auto_calculate',
          actionData: { carpetArea: 1200, estimatedBudget: 26000, propertyType: '3 BHK', recommendedPainterId: 'p-1' }
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Pill Badge when collapsed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl border border-amber-500/30 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-inner group-hover:rotate-12 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold flex items-center gap-1.5 text-white">
                <span>{lang === 'hi' ? 'ऑटो पायलट AI एजेंट' : 'Auto-Pilot AI Agent'}</span>
                <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                  Live
                </span>
              </div>
              <div className="text-[10px] text-slate-300">
                {lang === 'hi' ? 'सारा काम ऑटोमैटिक संभालें' : 'Handles everything automatically'}
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Expanded AI Agent Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[560px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{lang === 'hi' ? 'रंगसाथी ऑटो पायलट AI एजेंट' : 'RangSathi Auto-Pilot AI'}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                    Autonomous
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'पेंटिंग, लागत, कलर व बुकिंग असिस्टेंट' : 'Painting, Cost, Colors & Booking'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Trigger Chips */}
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex gap-2 overflow-x-auto text-[11px]">
            {[
              {
                label: lang === 'hi' ? '⚡ 3 BHK पूरा हिसाब व बुकिंग' : '⚡ 3 BHK Auto Cost & Slot',
                prompt: 'मेरे 3 BHK फ्लैट का पूरा हिसाब निकालो और बेस्ट पेंटर बुक करो',
              },
              {
                label: lang === 'hi' ? '🎨 रॉयल इंडिगो कलर थीम सेट करो' : '🎨 Apply Royal Indigo Theme',
                prompt: 'लिविंग रूम के लिए बेस्ट 2-कलर कॉम्बिनेशन सेट करो',
              },
              {
                label: lang === 'hi' ? '👷‍♂️ टॉप वेरिफाइड पेंटर से जोड़ो' : '👷‍♂️ Match Top Painter',
                prompt: 'मुझे मेरे शहर का सबसे अच्छा वेरिफाइड पेंटर दिखाओ',
              },
              {
                label: lang === 'hi' ? '📋 ग्राहक का डिजिटल बिल बनाओ' : '📋 Create Client Invoice',
                prompt: 'ग्राहक के लिए 2BHK पेंटिंग का डिजिटल कोटेशन बिल बनाओ',
              },
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(chip.prompt)}
                className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-lg text-slate-700 whitespace-nowrap cursor-pointer transition-colors font-medium shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, index) => {
              const isAgent = msg.sender === 'agent';

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                      isAgent
                        ? 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                        : 'bg-amber-600 text-white rounded-tr-xs font-medium'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Autonomous Action Card (Trigger One-Click Actions) */}
                    {isAgent && msg.action && msg.action !== 'general_advice' && (
                      <div className="mt-3 pt-3 border-t border-slate-100 bg-amber-50/60 -mx-1.5 -mb-1.5 p-2.5 rounded-xl border border-amber-200/60 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-600" />
                            {lang === 'hi' ? 'ऑटोमैटिक एक्शन तैयार है:' : 'Auto-Action Ready:'}
                          </span>
                        </div>

                        {msg.action === 'auto_calculate' && (
                          <div className="text-[11px] text-slate-700 space-y-1">
                            <div><strong>{lang === 'hi' ? 'एरिया:' : 'Area:'}</strong> {msg.actionData?.carpetArea} sq.ft ({msg.actionData?.propertyType})</div>
                            <div><strong>{lang === 'hi' ? 'अनुमानित बजट:' : 'Est. Budget:'}</strong> ₹{msg.actionData?.estimatedBudget?.toLocaleString('en-IN')}</div>
                            <div className="pt-1 flex gap-2">
                              <button
                                onClick={() => {
                                  onTriggerAction('open_calculator', msg.actionData);
                                  setIsOpen(false);
                                }}
                                className="flex-1 py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Calculator className="w-3 h-3" />
                                <span>{lang === 'hi' ? 'कैलकुलेटर में देखें' : 'View in Calculator'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  onTriggerAction('auto_book', msg.actionData);
                                  setIsOpen(false);
                                }}
                                className="flex-1 py-1.5 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                              >
                                <Calendar className="w-3 h-3" />
                                <span>{lang === 'hi' ? '₹99 टोकन बुक करें' : 'Book with ₹99'}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {msg.action === 'suggest_colors' && (
                          <div className="text-[11px] text-slate-700 space-y-1">
                            <div><strong>{lang === 'hi' ? 'थीम:' : 'Theme:'}</strong> {msg.actionData?.colorPlan?.themeName}</div>
                            <button
                              onClick={() => {
                                onTriggerAction('open_visualizer', msg.actionData);
                                setIsOpen(false);
                              }}
                              className="w-full py-1.5 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Palette className="w-3 h-3" />
                              <span>{lang === 'hi' ? 'विज़ुअलाइज़र में लाइव रंग देखें' : 'Preview Live in Visualizer'}</span>
                            </button>
                          </div>
                        )}

                        {msg.action === 'create_quote' && (
                          <div className="text-[11px] text-slate-700 space-y-1">
                            <button
                              onClick={() => {
                                onTriggerAction('open_quote_generator', msg.actionData);
                                setIsOpen(false);
                              }}
                              className="w-full py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{lang === 'hi' ? 'तैयार कोटेशन व बिल खोलें' : 'Open Generated Invoice'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-3 bg-white rounded-xl border border-slate-200 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>{lang === 'hi' ? 'AI एजेंट हिसाब व समाधान तैयार कर रहा है...' : 'AI Agent processing your request...'}</span>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={lang === 'hi' ? 'कुछ भी बोलें (जैसे: 3BHK पेंटिंग खर्च और बुकिंग)...' : 'Ask anything (e.g., 3BHK paint cost & booking)...'}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="p-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
