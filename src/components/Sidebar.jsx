import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, FileSpreadsheet, CheckCircle2, Settings, X } from 'lucide-react';
// Pastikan path logo sesuai dengan milikmu
import logoMandiri from '../assets/mandiri-logo.png';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Reporting', path: '/reporting', icon: FileText },
    { name: 'Detail Rekon', path: '/detail-rekon', icon: FileSpreadsheet },
    { name: 'Rekon Result', path: '/rekon-result', icon: CheckCircle2 },
  ];

  return (
    <>
      {/* --- OVERLAY GELAP UNTUK MOBILE --- */}
      {/* Muncul di belakang sidebar saat dibuka di HP. Jika diklik, sidebar tertutup */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Header Sidebar */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <img 
            src={logoMandiri} 
            alt="Logo Mandiri" 
            className="h-7 w-auto object-contain object-left" 
          />
          {/* Tombol Close (Hanya muncul di Mobile) */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Navigasi */}
        <div className="p-4 flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)} // Otomatis tutup sidebar saat menu diklik di HP
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* Connected Sources & Settings */}
        <div className="p-4 border-t border-slate-200 space-y-4 shrink-0 bg-white">
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Sources</p>
            <div className="space-y-1 px-3 text-sm text-slate-600">
              <div className="flex items-center justify-between py-1">
                <span>ECO H0</span><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>ECO H1</span><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>CTO H0</span><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">HA</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">Admin</p>
              <p className="text-[10px] text-slate-500 truncate">Mandiris</p>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}