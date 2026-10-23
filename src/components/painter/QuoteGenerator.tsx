import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  sqft: number;
  rate: number;
  amount: number;
}

export const QuoteGenerator: React.FC<QuoteGeneratorProps> = () => {
  const { lang, activePainter } = useApp();

  const [invoiceNumber, setInvoiceNumber] = useState('EST-2026-8812');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [clientName, setClientName] = useState('श्री आनंद मेहता (Anand Mehta)');
  const [clientPhone, setClientPhone] = useState('+91 98201 55667');
  const [clientAddress, setClientAddress] = useState('Flat 502, Orchid Heights, Sector 78, Noida');
  const [propertyType, setPropertyType] = useState('3 BHK Luxury Flat');

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      description: 'वॉल पुट्टी 2-कोट व सैंडिंग (Polymer Wall Putty 2 coats + Machine Sanding)',
      sqft: 1800,
      rate: 7,
      amount: 12600,
    },
    {
      id: 'item-2',
      description: 'एक्रिलिक प्राइमर 1-कोट बेस (Asian Paints Acrylic Wall Primer)',
      sqft: 1800,
      rate: 4,
      amount: 7200,
    },
    {
      id: 'item-3',
      description: 'रॉयल लग्जरी इमल्शन 2-कोट (Royale Luxury Matt Emulsion with Teflon)',
      sqft: 1800,
      rate: 16,
      amount: 28800,
    },
    {
      id: 'item-4',
      description: 'मास्टर बेडरूम रॉयल टेक्सचर दीवार (Metallic Stucco Design Accent Wall)',
      sqft: 140,
      rate: 45,
      amount: 6300,
    },
  ]);

  const [discountAmount, setDiscountAmount] = useState<number>(1900);
  const [advancePaid, setAdvancePaid] = useState<number>(10000);
  const [terms, setTerms] = useState<string>(
    '1. 20% टोकन बुकिंग पर, 50% प्राइमर काम पूरा होने पर, 30% अंतिम फिनिशिंग पर।\n2. काम के दौरान फर्श व फर्नीचर की मास्किंग हमारी टीम करेगी।'
  );

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const totalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const balanceDue = Math.max(0, totalAfterDiscount - advancePaid);

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: 'नई पेंटिंग / रिपेयर सर्विस (Painting Service)',
      sqft: 200,
      rate: 15,
      amount: 3000,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'sqft' || field === 'rate') {
            updated.amount = Math.round(Number(updated.sqft || 0) * Number(updated.rate || 0));
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'डिजिटल कोटेशन व बिल मेकर' : 'Digital Quotation & Invoice Maker'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'hi' 
              ? 'ग्राहकों के लिए प्रोफेशनल एस्टीमेट बनाएं, प्रिंट करें या व्हाट्सएप पर भेजें।' 
              : 'Create branded itemized quotes & invoices with transparent sq.ft rates.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'प्रिंट / सेव PDF' : 'Print / Save PDF'}</span>
          </button>
        </div>
      </div>

      {/* Invoice Document Paper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              {lang === 'hi' ? 'पेंटिंग कोटेशन / बिल' : 'OFFICIAL PAINTING ESTIMATE'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activePainter.name}
            </h2>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              <p>{activePainter.city} ({activePainter.area})</p>
              <p>Phone: {activePainter.phone}</p>
              <p className="text-emerald-700 font-semibold">{lang === 'hi' ? 'एशियन पेंट्स व बर्जर प्रमाणित कॉन्ट्रैक्टर' : 'Authorized Painting Contractor'}</p>
            </div>
          </div>

          <div className="sm:text-right text-xs text-slate-600 space-y-1">
            <div>
              <span className="text-slate-400 font-medium">Estimate No: </span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="font-bold text-slate-900 font-mono text-right border-b border-slate-300 px-1 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-slate-400 font-medium">Date: </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-slate-700 font-mono text-right border-b border-slate-300 px-1 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Client Details Section */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {lang === 'hi' ? 'ग्राहक का नाम व फोन:' : 'Client Details:'}
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-300 pb-0.5 focus:outline-none mb-1 text-sm"
            />
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full text-slate-600 bg-transparent border-b border-slate-300 pb-0.5 focus:outline-none font-mono"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {lang === 'hi' ? 'साइट का पता व प्रॉपर्टी:' : 'Site Address & Property:'}
            </span>
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full font-semibold text-slate-800 bg-transparent border-b border-slate-300 pb-0.5 focus:outline-none mb-1"
            />
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full text-slate-600 bg-transparent border-b border-slate-300 pb-0.5 focus:outline-none"
            />
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-300 text-slate-700 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-2">#</th>
                <th className="py-2.5 px-2">{lang === 'hi' ? 'विवरण (काम व मटेरियल)' : 'Item Description'}</th>
                <th className="py-2.5 px-2 text-right">{lang === 'hi' ? 'क्षेत्रफल (Sq.Ft)' : 'Area (Sq.Ft)'}</th>
                <th className="py-2.5 px-2 text-right">{lang === 'hi' ? 'दर (₹/sqft)' : 'Rate (₹)'}</th>
                <th className="py-2.5 px-2 text-right">{lang === 'hi' ? 'रकम (₹)' : 'Total (₹)'}</th>
                <th className="py-2.5 px-2 text-center print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-2 px-2 text-slate-400 font-mono">{index + 1}</td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none text-slate-800 font-medium"
                    />
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    <input
                      type="number"
                      value={item.sqft}
                      onChange={(e) => handleUpdateItem(item.id, 'sqft', Number(e.target.value))}
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none text-slate-800"
                    />
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleUpdateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-16 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none text-slate-800"
                    />
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-slate-900 tabular-nums">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-2 text-center print:hidden">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="print:hidden">
          <button
            onClick={handleAddItem}
            className="px-3 py-1.5 border border-dashed border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 text-amber-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? '+ नया आइटम जोड़ें' : '+ Add Line Item'}</span>
          </button>
        </div>

        {/* Totals & Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'hi' ? 'शर्तें व भुगतान नियम:' : 'Terms & Payment Schedule:'}
            </label>
            <textarea
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>{lang === 'hi' ? 'कुल सबटोटल:' : 'Subtotal:'}</span>
              <span className="font-mono font-bold text-slate-800 tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>{lang === 'hi' ? 'विशेष छूट (Discount):' : 'Discount:'}</span>
              <div className="flex items-center gap-1">
                <span>- ₹</span>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="w-20 text-right font-mono text-emerald-700 font-bold border-b border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-800">{lang === 'hi' ? 'कुल देय राशि:' : 'Total Payable:'}</span>
              <span className="font-mono font-extrabold text-base text-slate-900 tabular-nums">
                ₹{totalAfterDiscount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="text-emerald-700 font-medium">{lang === 'hi' ? 'टोकन / एडवांस प्राप्त:' : 'Advance Received:'}</span>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(Number(e.target.value))}
                  className="w-24 text-right font-mono text-emerald-700 font-bold border-b border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-bold text-amber-900 text-sm">
              <span>{lang === 'hi' ? 'शेष बकाया राशि (Balance Due):' : 'Remaining Balance:'}</span>
              <span className="font-mono text-base tabular-nums">₹{balanceDue.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Footer Seal */}
        <div className="pt-8 flex justify-between items-end text-xs text-slate-500 border-t border-slate-100">
          <div>
            <p className="font-semibold text-slate-700">RangSathi Platform Verified</p>
            <p className="text-[11px] text-slate-400">Digital Contractor Document</p>
          </div>
          <div className="text-right">
            <div className="w-36 border-b border-slate-400 mb-1"></div>
            <p className="font-bold text-slate-800">{activePainter.name}</p>
            <p className="text-[11px] text-slate-400">{lang === 'hi' ? 'अधिकृत हस्ताक्षर' : 'Authorized Signature'}</p>
          </div>
        </div>

      </div>

    </div>
  );
};

interface QuoteGeneratorProps {}
