import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { X, Send, Phone, UserCheck } from 'lucide-react';

interface ChatModalProps {
  recipientName: string;
  recipientPhone: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  recipientName,
  recipientPhone,
  isOpen,
  onClose,
}) => {
  const { lang, role } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: role === 'customer' ? 'painter' : 'customer',
      text: role === 'customer' 
        ? 'नमस्ते जी! रंगसाथी पर आपका स्वागत है। आपके घर की दीवारें नापने और शेड कार्ड दिखाने के लिए मैं उपलब्ध हूँ।' 
        : 'नमस्ते भइया, मुझे अपने 2BHK फ्लैट में डिस्टेंपर हटाकर नया इमल्शन पेंट कराना है। क्या आप कल आ सकते हैं?',
      timestamp: '10:14 AM',
    },
  ]);

  if (!isOpen) return null;

  const quickChips = role === 'customer' 
    ? [
        'क्या आप कल सुबह 10 बजे आ सकते हैं?',
        'शेड कार्ड और एशियन पेंट्स कैटलॉग साथ लाएंगे?',
        'क्या पुट्टी और प्राइमर का काम भी आप करेंगे?',
        'फाइनल रेट में कुछ डिस्काउंट हो सकता है?',
      ]
    : [
        'हाँ जी, हमारी टीम कल सुबह 9:30 बजे पहुँच जाएगी।',
        'हम सभी शेड कार्ड और मशीन साथ लाएंगे।',
        '20% टोकन जमा होने पर तारीख लॉक हो जाएगी।',
      ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: role === 'customer' ? 'customer' : 'painter',
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulate auto-reply after 1.2s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: role === 'customer' ? 'painter' : 'customer',
        text: role === 'customer' 
          ? 'जी बिल्कुल! मैंने नोट कर लिया है। आप ऑनलाइन ₹99 विजिट टोकन या स्लॉट बुक कर सकते हैं, मैं समय पर आऊंगा।' 
          : 'धन्यवाद! मैं अभी ऑनलाइन बुकिंग चेक कर रहा हूँ।',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col h-[520px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm">
              {recipientName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">
                {recipientName}
              </h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{recipientPhone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${recipientPhone}`}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Call"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((msg) => {
            const isMe = (role === 'customer' && msg.sender === 'customer') || (role === 'painter' && msg.sender === 'painter');

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                    isMe
                      ? 'bg-amber-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Chips */}
        <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-slate-200 rounded-full text-slate-600 whitespace-nowrap cursor-pointer transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'hi' ? 'संदेश टाइप करें...' : 'Type a message...'}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
          <button
            type="submit"
            className="p-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-lg cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
