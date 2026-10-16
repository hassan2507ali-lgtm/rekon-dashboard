import { useState } from 'react';
import { User, Clock, Server, Shield, Bell, Save, CheckCircle2, X } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulasi proses simpan ke server (1 detik)
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true); // Munculkan toast
      
      // Sembunyikan toast otomatis setelah 3 detik
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative h-full">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account settings and system configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pb-20">
        
        {/* Sidebar Navigasi Settings */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" /> Profile
            </button>
            <button
              onClick={() => setActiveTab('sla')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'sla' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-4 h-4" /> SLA Configuration
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'system' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Server className="w-4 h-4" /> System Connections
            </button>
          </nav>
        </div>

        {/* Area Konten Utama */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 lg:p-8">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">
                  MA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Muhammad Ali</h3>
                  <p className="text-slate-500 text-sm">m.ali@bankmandiri.co.id</p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mt-2">
                    <Shield className="w-3 h-3" /> System Administrator
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input type="text" defaultValue="Muhammad Ali" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">NIP (Nomor Induk Pegawai)</label>
                  <input type="text" defaultValue="12345678" disabled className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                  <input type="text" defaultValue="IT Operation & Reconciliation" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                    <option>Admin</option>
                    <option>Auditor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SLA CONFIGURATION */}
          {activeTab === 'sla' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Service Level Agreement</h3>
                <p className="text-slate-500 text-sm mb-6">Configure timeout thresholds for reconciliation processes.</p>
              </div>

              <div className="space-y-5">
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-amber-900">Warning Threshold</label>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-200/50 px-2 py-0.5 rounded">T+1</span>
                  </div>
                  <p className="text-sm text-amber-800 mb-3">Time before an unmatched record is flagged as a warning.</p>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue="2" className="w-20 px-3 py-2 border border-amber-300 rounded-lg text-sm" />
                    <span className="text-sm font-medium text-amber-900">Hours</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-rose-200 bg-rose-50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-rose-900">Critical Threshold</label>
                    <span className="text-xs font-semibold text-rose-700 bg-rose-200/50 px-2 py-0.5 rounded">T+2</span>
                  </div>
                  <p className="text-sm text-rose-800 mb-3">Time before an unmatched record triggers a critical alert.</p>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue="4" className="w-20 px-3 py-2 border border-rose-300 rounded-lg text-sm" />
                    <span className="text-sm font-medium text-rose-900">Hours</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM CONNECTIONS */}
          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Data Sources</h3>
                <p className="text-slate-500 text-sm mb-6">Manage connections to Mandiri internal systems.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'ECO H0', status: 'Connected', ip: '10.12.45.101', uptime: '99.9%' },
                  { name: 'ECO H1', status: 'Connected', ip: '10.12.45.102', uptime: '99.8%' },
                  { name: 'CTO H0', status: 'Warning', ip: '10.15.88.22', uptime: '94.2%' },
                ].map((sys) => (
                  <div key={sys.name} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${sys.status === 'Connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{sys.name}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{sys.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${sys.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {sys.status}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">Uptime: {sys.uptime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tombol Save General */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <p className="text-sm font-medium">Settings saved successfully.</p>
          <button 
            onClick={() => setShowToast(false)} 
            className="ml-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}