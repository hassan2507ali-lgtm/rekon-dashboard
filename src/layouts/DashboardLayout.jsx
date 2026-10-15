import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
// Path ini mundur satu folder (../) lalu masuk ke components/assets
import Sidebar from '../components/Sidebar'; 
import logoMandiri from '../assets/mandiri-logo.png';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* Mengirim state ke Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        {/* --- HEADER MOBILE (Hanya muncul di HP) --- */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-30">
          <div className="flex items-center gap-3">
            {/* Tombol Hamburger Menu */}
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <img src={logoMandiri} alt="Logo Mandiri" className="h-6 w-auto object-contain" />
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            HA
          </div>
        </header>

        {/* Halaman dinamis akan dimuat di sini */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}