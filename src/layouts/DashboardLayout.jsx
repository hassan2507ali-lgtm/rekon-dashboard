import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Bell, AlertCircle, CheckCircle2, Clock, User, Settings, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar'; 
import logoMandiri from '../assets/mandiri-logo.png';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const navigate = useNavigate();

  // Simulasi data notifikasi
  const notifications = [
    { id: 1, type: 'warning', text: 'SLA T+1 Warning: 45 transaksi belum match pada ECO H0.', time: '10 mins ago', read: false },
    { id: 2, type: 'critical', text: 'Koneksi CTO H1 terputus sementara. Menunggu auto-retry.', time: '1 hour ago', read: false },
    { id: 3, type: 'success', text: 'Settlement batch #8821 berhasil diproses tanpa selisih.', time: '2 hours ago', read: true },
  ];

  const handleLogout = () => {
    // Di sini nanti bisa ditambahkan logika clear token/session
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        {/* --- HEADER --- */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-20">
          
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <img src={logoMandiri} alt="Logo Mandiri" className="h-6 w-auto object-contain" />
          </div>

          <div className="hidden md:block">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Workspace</h2>
          </div>

          {/* Sisi Kanan: Notifikasi & Avatar */}
          <div className="flex items-center gap-4 ml-auto relative">
            
            {/* 1. Tombol & Dropdown Notifikasi */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false); // Tutup profil jika notif dibuka
                }}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full relative transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    <button className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Mark all read</button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : 'bg-slate-50/50'}`}>
                        <div className="flex gap-3">
                          {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                          {notif.type === 'critical' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
                          {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                          <div>
                            <p className="text-sm text-slate-800 font-medium leading-snug">{notif.text}</p>
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400"><Clock className="w-3 h-3" /> {notif.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Avatar & Dropdown Profil */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false); // Tutup notif jika profil dibuka
                }}
                className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white hover:bg-indigo-700 transition-all focus:outline-none focus:ring-indigo-200"
              >
                HA
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-900">Hassan Ali</p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button 
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Halaman Konten */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
        
      </div>

      {/* 3. MODAL KONFIRMASI LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-rose-600 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to leave?</h3>
              <p className="text-slate-500 text-sm">
                You are about to sign out from your Mandiri Reconciliation workspace. You will need to enter your credentials to access it again.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors text-sm shadow-sm"
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