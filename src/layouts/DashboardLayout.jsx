import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, Bell, AlertCircle, CheckCircle2, Clock, LogOut, Settings, User } from 'lucide-react';
import Sidebar from '../components/Sidebar'; 
import logoMandiri from '../assets/mandiri-logo.png';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: 'warning', text: 'SLA T+1 Warning: 45 transaksi belum match pada ECO H0.', time: '10 mins ago', read: false },
    { id: 2, type: 'critical', text: 'Koneksi CTO H1 terputus sementara. Menunggu auto-retry.', time: '1 hour ago', read: false },
    { id: 3, type: 'success', text: 'Settlement batch #8821 berhasil diproses tanpa selisih.', time: '2 hours ago', read: true },
  ];

  const handleLogout = () => {
    // Tutup modal dan arahkan ke halaman login
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-20">
          
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logoMandiri} alt="Logo Mandiri" className="h-6 w-auto object-contain" />
          </div>

          <div className="hidden md:block">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Workspace</h2>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* Dropdown Notifikasi */}
            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                        <div className="flex gap-3">
                          {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
                          {notif.type === 'critical' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                          {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                          <div>
                            <p className="text-sm text-slate-800 font-medium">{notif.text}</p>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Profile */}
            <div className="relative">
              <button 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white hover:bg-indigo-700 transition-colors"
              >
                HA
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in slide-in-from-top-2 fade-in duration-200 py-1">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-900">Hassan Ali</p>
                    <p className="text-xs text-slate-500 truncate">hassan@bankmandiri.co.id</p>
                  </div>
                  <Link 
                    to="/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button 
                    onClick={() => { setIsProfileOpen(false); setIsLogoutModalOpen(true); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
        
      </div>

      {/* --- MODAL KONFIRMASI LOGOUT --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-rose-600 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to leave?</h3>
              <p className="text-slate-500 text-sm">
                You are about to securely log out from the Mandiri Reconciliation system. You will need to re-enter your credentials to access the workspace.
              </p>
            </div>
            <div className="p-4 bg-slate-50 flex items-center gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-2.5 px-4 bg-rose-600 text-white font-semibold text-sm rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}