import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Panggil komponen Sidebar di sini */}
      <Sidebar />

      {/* Kolom Kanan: Area Konten */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Atas */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="text-sm text-slate-500 font-medium">
            Workspace / <span className="text-slate-900 font-semibold">Overview</span>
          </div>
          
          {/* Menu Kanan Header */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_4px_#10b981]"></span>
              <span className="text-xs font-medium text-emerald-700">Live data</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Bell className="w-5 h-5" />
            </button>
            <div className="text-sm text-slate-500 font-medium border-l border-slate-200 pl-6">
              12 Oct 2026
            </div>
          </div>
        </header>

        {/* Area utama tempat halaman disisipkan */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}