import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell } from 'lucide-react';

// --- Data Dummy Notifikasi ---
const notifications = [
  { id: 1, title: 'Weekly settlement summary', desc: '06–12 Oct • All daily batches', type: 'Multiple batches', time: '12 Oct, 09:47', format: 'PDF' },
  { id: 2, title: 'Weekly settlement summary', desc: '06–12 Oct • All daily batches', type: 'Multiple batches', time: '12 Oct, 09:47', format: 'PDF' },
  { id: 3, title: 'Weekly settlement summary', desc: '06–12 Oct • All daily batches', type: 'Multiple batches', time: '12 Oct, 09:47', format: 'PDF' },
  { id: 4, title: 'Weekly settlement summary', desc: '06–12 Oct • All daily batches', type: 'Multiple batches', time: '12 Oct, 09:47', format: 'PDF' },
];

export default function DashboardLayout() {
  // State untuk mengontrol buka/tutup dropdown notifikasi
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Atas */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="text-sm text-slate-500 font-medium">
            Workspace / <span className="text-slate-900 font-semibold">Overview</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_4px_#10b981]"></span>
              <span className="text-xs font-medium text-emerald-700">Live data</span>
            </div>
            
            {/* --- WRAPPER NOTIFIKASI --- */}
            <div className="relative">
              {/* Tombol Lonceng */}
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-1.5 rounded-full transition-colors ${
                  isNotifOpen 
                    ? 'bg-slate-100 text-slate-800' // Berubah warna saat ditekan
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bell className="w-5 h-5" />
              </button>

              {/* Popup Dropdown Notifikasi */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-[550px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-800">{notif.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                        </div>
                        <div className="w-32 text-sm text-slate-500">{notif.type}</div>
                        <div className="w-24 text-right text-sm text-slate-500">{notif.time}</div>
                        <div className="w-12 text-right text-sm text-slate-500">{notif.format}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-sm text-slate-500 font-medium border-l border-slate-200 pl-6">
              12 Oct 2026
            </div>
          </div>
        </header>

        {/* Area utama konten (Z-index lebih rendah agar tidak menutupi popup) */}
        <div className="p-6 flex-1 overflow-auto relative z-10">
          <Outlet /> 
        </div>
      </main>
    </div>
    
  );
}