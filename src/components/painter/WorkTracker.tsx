import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveProject } from '../../types';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Plus, 
  Share2, 
  DollarSign, 
  Sliders, 
  X 
} from 'lucide-react';

export const WorkTracker: React.FC = () => {
  const { lang, projects, updateProjectProgress, addProject } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newTotalAmount, setNewTotalAmount] = useState(30000);
  const [newAdvancePaid, setNewAdvancePaid] = useState(10000);
  const [newStartDate, setNewStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newEndDate, setNewEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [newNotes, setNewNotes] = useState('');

  // Financial statistics
  const totalAgreed = projects.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalCollected = projects.reduce((sum, p) => sum + p.advancePaid, 0);
  const totalPending = totalAgreed - totalCollected;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      clientName: newClientName,
      phone: newPhone,
      address: newAddress,
      serviceType: 'interior',
      totalAmount: newTotalAmount,
      advancePaid: newAdvancePaid,
      status: 'surface_prep',
      progressPercent: 20,
      startDate: newStartDate,
      targetEndDate: newEndDate,
      notes: newNotes,
    });
    setIsAddModalOpen(false);
    setNewClientName('');
    setNewPhone('');
    setNewAddress('');
  };

  const handleSendReminder = (project: ActiveProject) => {
    const remaining = project.totalAmount - project.advancePaid;
    const message = encodeURIComponent(
      `नमस्ते ${project.clientName} जी, रंगसाथी के माध्यम से आपकी पेंटिंग का कार्य ${project.progressPercent}% पूरा हो गया है। कृपया बकाया राशि ₹${remaining.toLocaleString('en-IN')} का भुगतान ऑनलाइन या नकद करें। धन्यवाद - आपका पेंटर।`
    );
    window.open(`https://wa.me/${project.phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {lang === 'hi' ? 'कुल चालू प्रोजेक्ट मूल्य' : 'Total Project Bookings'}
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            ₹{totalAgreed.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            {projects.length} {lang === 'hi' ? 'ग्राहक कार्य' : 'active projects'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            {lang === 'hi' ? 'प्राप्त अग्रिम / पेमेंट' : 'Payment Received'}
          </span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            {lang === 'hi' ? 'खाते में जमा राशि' : 'Collected in bank / cash'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            {lang === 'hi' ? 'शेष बकाया वसूली' : 'Pending Customer Dues'}
          </span>
          <div className="text-2xl font-bold text-amber-700 mt-1 tabular-nums">
            ₹{totalPending.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            {lang === 'hi' ? 'काम पूरा होने पर देय' : 'Due upon milestones'}
          </span>
        </div>

      </div>

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'hi' ? 'चालू प्रोजेक्ट्स व दैनिक प्रगति (Daily Progress)' : 'Active Sites & Progress Ledger'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi' ? 'प्रत्येक साइट की प्रगति ट्रैक करें और ग्राहकों को व्हाट्सएप अपडेट भेजें' : 'Track daily site completion stages and payment collections'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'hi' ? '+ नई साइट जोड़ें' : '+ Add New Project'}</span>
        </button>
      </div>

      {/* Projects Cards List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const balance = project.totalAmount - project.advancePaid;

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
            >
              {/* Top info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.clientName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {project.address}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {project.phone}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs text-slate-500">
                    {lang === 'hi' ? 'कुल ठेका राशि:' : 'Contract Value:'}
                  </div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    ₹{project.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold tabular-nums">
                    {lang === 'hi' ? 'जमा:' : 'Paid:'} ₹{project.advancePaid.toLocaleString('en-IN')} 
                    <span className="text-amber-700 ml-2">({lang === 'hi' ? 'बकाया:' : 'Due:'} ₹{balance.toLocaleString('en-IN')})</span>
                  </div>
                </div>
              </div>

              {/* Progress Slider & Milestones */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">
                    {lang === 'hi' ? 'काम की प्रगति (Completion):' : 'Work Progress:'}
                  </span>
                  <span className="font-bold text-amber-700 font-mono text-sm">
                    {project.progressPercent}%
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>

                {/* Milestone Buttons to Quick Change */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  {[
                    { label: 'घिसाई व स्क्रैपिंग (25%)', val: 25, status: 'surface_prep' as const },
                    { label: 'पुट्टी व प्राइमर (50%)', val: 50, status: 'putty_primer' as const },
                    { label: 'पहला कोट इमल्शन (75%)', val: 75, status: 'final_coat' as const },
                    { label: 'फाइनल टचअप व पूरा (100%)', val: 100, status: 'completed' as const },
                  ].map((m) => (
                    <button
                      key={m.val}
                      type="button"
                      onClick={() => updateProjectProgress(project.id, m.val, m.status)}
                      className={`p-1.5 rounded border text-center transition-colors cursor-pointer ${
                        project.progressPercent >= m.val 
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {project.notes && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">{lang === 'hi' ? 'दैनिक नोट:' : 'Daily Note:'}</span> {project.notes}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
                <div className="text-slate-500">
                  <span>{lang === 'hi' ? 'तारीख:' : 'Timeline:'} {project.startDate} to {project.targetEndDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${project.phone}`}
                    className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                  </a>

                  <button
                    onClick={() => handleSendReminder(project)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'व्हाट्सएप पेमेंट तगादा / अपडेट' : 'Send WhatsApp Reminder'}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add New Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-6 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'hi' ? 'नई पेंटिंग साइट दर्ज करें' : 'Add New Active Project'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'क्लाइंट का नाम व साइट' : 'Client Name / Site'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. शर्मा जी (3BHK फ्लैट)"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98111..."
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'साइट का पता' : 'Site Address'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sector / Colony / Flat"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'hi' ? 'कुल तय रकम (₹)' : 'Total Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newTotalAmount}
                    onChange={(e) => setNewTotalAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'hi' ? 'एडवांस प्राप्त (₹)' : 'Advance Paid (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newAdvancePaid}
                    onChange={(e) => setNewAdvancePaid(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  {lang === 'hi' ? 'दर्ज करें' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
