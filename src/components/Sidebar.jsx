import { LayoutDashboard, FileText, ArrowLeftRight, CheckCircle, ChevronDown, Circle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  // Fungsi untuk mengecek apakah path saat ini sedang aktif
  const isActive = (path) => location.pathname === path;

  // Variabel untuk gaya menu (aktif vs tidak aktif)
  const baseMenuClass = "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
  const activeClass = "bg-indigo-50 text-indigo-600";
  const inactiveClass = "text-slate-600 hover:bg-slate-50";

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen hidden md:flex shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6">
        <div className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="bg-indigo-600 rounded p-1">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
          rekon
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Acme Finance</div>
              <div className="text-xs text-slate-500">Enterprise workspace</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-4 py-2 flex-1">
        <div className="text-xs font-semibold text-slate-400 mb-4 px-2 uppercase tracking-wider">Workspace</div>
        <nav className="space-y-1">
          <Link to="/" className={`${baseMenuClass} ${isActive('/') ? activeClass : inactiveClass}`}>
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link to="/reporting" className={`${baseMenuClass} ${isActive('/reporting') ? activeClass : inactiveClass}`}>
            <FileText className="w-5 h-5" />
            Reporting
          </Link>
          <Link to="/detail-rekon" className={`${baseMenuClass} ${isActive('/detail-rekon') ? activeClass : inactiveClass}`}>
            <ArrowLeftRight className="w-5 h-5" />
            Detail Rekon
          </Link>
          <Link to="/rekon-result" className={`${baseMenuClass} ${isActive('/rekon-result') ? activeClass : inactiveClass}`}>
            <CheckCircle className="w-5 h-5" />
            Rekon Result
          </Link>
        </nav>
      </div>
      
      {/* Connected Server */}
      <div className="px-4 py-6 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-400 mb-4 px-2 uppercase tracking-wider">Connected Server</div>
        <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
                <span>ECO H0</span>
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
                <span>ECO H1</span>
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            </div>
        </div>
      </div>
    </aside>
  );
}