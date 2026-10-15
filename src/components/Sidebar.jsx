import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, FileSpreadsheet, CheckCircle2, Settings } from 'lucide-react';
// Import logo Mandiri dari folder assets (sesuaikan nama fail jika berbeda)
import logoMandiri from '../assets/mandiri-logo.png';

export default function Sidebar() {
  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Reporting', path: '/reporting', icon: FileText },
    { name: 'Detail Rekon', path: '/detail-rekon', icon: FileSpreadsheet },
    { name: 'Rekon Result', path: '/rekon-result', icon: CheckCircle2 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      
      {/* --- LOGO / HEADER SIDEBAR (Hanya Logo, Bersih & Profesional) --- */}
      <div className="h-16 border-b border-slate-200 flex items-center px-6">
        <img 
          src={logoMandiri} 
          alt="Logo Mandiri" 
          className="h-30 w-auto object-contain object-left" 
        />
      </div>

      {/* --- MENU NAVIGASI --- */}
      <div className="p-4 flex-1 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
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

      {/* --- CONNECTED SOURCES & SETTINGS DI BAWAH --- */}
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Sources</p>
          <div className="space-y-1 px-3 text-sm text-slate-600">
            <div className="flex items-center justify-between py-1">
              <span>ECO H0</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>ECO H1</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>CTO H0</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            </div>
          </div>
        </div>

 

        {/* Profil Singkat di Bawah */}
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            HA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Admin</p>
            <p className="text-[10px] text-slate-500 truncate">Mandiris</p>
          </div>
        </div>
      </div>

    </aside>
  );
}