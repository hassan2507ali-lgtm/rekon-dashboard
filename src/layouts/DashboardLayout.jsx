import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Kolom Kiri: Sidebar (Lebarnya tetap) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8">rekon</h2>
        
        {/* Nanti daftar menu masuk di sini */}
        <nav className="flex-1">
          <ul className="space-y-2 text-slate-600 font-medium">
            <li className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">Overview</li>
            <li className="p-3 hover:bg-slate-50 rounded-lg">Reporting</li>
            <li className="p-3 hover:bg-slate-50 rounded-lg">Detail Rekon</li>
          </ul>
        </nav>
      </aside>

      {/* Kolom Kanan: Area Konten Dinamis */}
      <main className="flex-1 flex flex-col">
        {/* Nanti Header Atas (Pencarian, Notifikasi) masuk di sini */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <span className="text-sm text-slate-500">Workspace / Overview</span>
        </header>

        {/* Area utama tempat halaman Overview/Reporting muncul */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Outlet adalah tempat komponen Pages akan disisipkan oleh React Router */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}