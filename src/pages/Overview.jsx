import { useState, useMemo } from 'react';
import { 
  Calendar, Layers, CheckCircle2, RefreshCcw, AlertTriangle, 
  ArrowRight, ArrowUpRight, Search, ChevronDown, ChevronRight, X,
  PieChart, Server, TrendingDown, Bell
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- DATA DUMMY GRAFIK AREA (TREND) ---
const dataToday = [{ name: '08:00', matched: 1200 }, { name: '10:00', matched: 3500 }, { name: '12:00', matched: 6800 }, { name: '14:00', matched: 8900 }, { name: '16:00', matched: 11200 }, { name: '18:00', matched: 12106 }];
const data7Days = [{ name: '06 Oct', matched: 8800 }, { name: '07 Oct', matched: 9500 }, { name: '08 Oct', matched: 11200 }, { name: '09 Oct', matched: 10800 }, { name: '10 Oct', matched: 12000 }, { name: '11 Oct', matched: 13500 }, { name: '12 Oct', matched: 12106 }];
const data30Days = [{ name: 'Week 1', matched: 54000 }, { name: 'Week 2', matched: 61000 }, { name: 'Week 3', matched: 59500 }, { name: 'Week 4', matched: 68000 }];
const dataCustomRange = [{ name: 'Jan', matched: 150000 }, { name: 'Feb', matched: 180000 }, { name: 'Mar', matched: 175000 }, { name: 'Apr', matched: 190000 }];

// --- DATA DUMMY GRAFIK BAR (MODUL) ---
const modulToday = [{ name: 'ECT H0', aktif: 12, tidakAktif: 8 }, { name: 'ECO H0', aktif: 5, tidakAktif: 10 }, { name: 'ECO H1', aktif: 18, tidakAktif: 8 }];
const modul7Days = [{ name: 'ECT H0', aktif: 85, tidakAktif: 20 }, { name: 'ECO H0', aktif: 40, tidakAktif: 45 }, { name: 'ECO H1', aktif: 120, tidakAktif: 30 }];
const modul30Days = [{ name: 'ECT H0', aktif: 320, tidakAktif: 50 }, { name: 'ECO H0', aktif: 150, tidakAktif: 100 }, { name: 'ECO H1', aktif: 480, tidakAktif: 110 }];
const modulCustom = [{ name: 'ECT H0', aktif: 1200, tidakAktif: 150 }, { name: 'ECO H0', aktif: 800, tidakAktif: 300 }, { name: 'ECO H1', aktif: 1800, tidakAktif: 400 }];

// --- DATA DUMMY TABEL STATUS MODUL ---
const modulTableData = [
  { no: 1, modul: 'Modul 03', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '18.240', unmatch: '820' },
  { no: 2, modul: 'Modul 11', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '15.110', unmatch: '610' },
  { no: 3, modul: 'Modul 07', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '12.870', unmatch: '450' },
  { no: 4, modul: 'Modul 15', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '11.430', unmatch: '380' },
  { no: 5, modul: 'Modul 21', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '9.920', unmatch: '120' },
  { no: 6, modul: 'Modul 09', server: 'ECO H0', status: 'Aktif', sla: 'Tepat waktu', match: '8.310', unmatch: '95' },
  { no: 7, modul: 'Modul 18', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '7.640', unmatch: '40' },
  { no: 8, modul: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
  { no: 9, modul: 'Modul 22', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '22.100', unmatch: '0' },
  { no: 10, modul: 'Modul 14', server: 'CTO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
  { no: 11, modul: 'Modul 05', server: 'ECO H0', status: 'Aktif', sla: 'Terlambat', match: '5.400', unmatch: '300' },
  { no: 12, modul: 'Modul 08', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '19.550', unmatch: '22' },
];

const tableData = [
  { id: 'RCN-20261012-004', date: '12 Oct 2026', tx: '12,480', rate: '97.00%', status: 'Review required', time: '09:42' },
  { id: 'RCN-20261012-003', date: '12 Oct 2026', tx: '8,120', rate: '100.00%', status: 'Reconciled', time: '08:15' },
  { id: 'RCN-20261012-002', date: '12 Oct 2026', tx: '4,050', rate: '95.50%', status: 'Review required', time: '07:30' },
  { id: 'RCN-20261012-001', date: '12 Oct 2026', tx: '9,800', rate: '100.00%', status: 'Reconciled', time: '06:00' },
  { id: 'RCN-20261011-002', date: '11 Oct 2026', tx: '11,240', rate: '97.33%', status: 'Review required', time: '09:38' },
];

const serverBreakdown = [
  { name: 'ECO H0', total: 1500, match: 1480, unmatch: 20 },
  { name: 'ECO H1', total: 1820, match: 1720, unmatch: 100 }, 
  { name: 'CTO H0', total: 1200, match: 1185, unmatch: 15 },
];

const topAnomalies = [
  { reason: 'Data not found in Bank Statement', count: 85 },
  { reason: 'System Timeout during sync', count: 30 },
  { reason: 'Amount mismatch (Fee diff)', count: 20 },
];

export default function Overview() {
  const [activeFilter, setActiveFilter] = useState('Today');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayDate, setDisplayDate] = useState('12 Oct 2026');

  const [searchTerm, setSearchTerm] = useState('');
  const [serverFilter, setServerFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  
  // State untuk Tab pada Widget Notifikasi & Alert
  const [feedTab, setFeedTab] = useState('All'); 

  let currentChartData = dataToday;
  let currentModulData = modulToday;
  let totalModulRecords = '1,225';

  if (activeFilter === '7 days') {
    currentChartData = data7Days;
    currentModulData = modul7Days;
    totalModulRecords = '8,540';
  } else if (activeFilter === '30 days') {
    currentChartData = data30Days;
    currentModulData = modul30Days;
    totalModulRecords = '34,210';
  } else if (activeFilter === 'Custom') {
    currentChartData = dataCustomRange;
    currentModulData = modulCustom;
    totalModulRecords = '120,400';
  }

  const handleApplyDate = () => {
    if (startDate && endDate) {
      setDisplayDate(`${startDate} to ${endDate}`);
      setActiveFilter('Custom');
      setIsDatePickerOpen(false);
    }
  };

  const handleResetDate = () => {
    setDisplayDate('12 Oct 2026');
    setStartDate('');
    setEndDate('');
    setActiveFilter('Today');
    setIsDatePickerOpen(false);
  };

  const filteredModulData = modulTableData.filter((row) => {
    const matchSearch = row.modul.toLowerCase().includes(searchTerm.toLowerCase()) || row.server.toLowerCase().includes(searchTerm.toLowerCase());
    const matchServer = serverFilter === 'Semua' || row.server === serverFilter;
    const matchStatus = statusFilter === 'Semua' || row.status === statusFilter;
    return matchSearch && matchServer && matchStatus;
  });

  // --- LOGIKA GENERATE ALERTS & NOTIFIKASI SECARA REAL-TIME DARI DATA ---
  const dynamicFeeds = useMemo(() => {
    const feeds = [];
    let idCounter = 1;

    // 1. Cek Data Modul untuk mencari ALERTS (Masalah)
    filteredModulData.forEach(modul => {
      if (modul.status === 'Tidak aktif') {
        feeds.push({ id: idCounter++, title: `${modul.modul} · ${modul.server}`, desc: 'Koneksi modul terputus / tidak aktif', category: 'alert', color: 'bg-rose-500' });
      } else if (modul.sla === 'Terlambat') {
        feeds.push({ id: idCounter++, title: `${modul.modul} · ${modul.server}`, desc: 'Proses melewati batas SLA', category: 'alert', color: 'bg-amber-500' });
      } else if (modul.unmatch !== '-' && parseInt(modul.unmatch) > 500) {
        feeds.push({ id: idCounter++, title: `${modul.modul} · ${modul.server}`, desc: `Lonjakan ${modul.unmatch} data unmatched`, category: 'alert', color: 'bg-rose-500' });
      } else if (modul.status === 'Aktif' && modul.unmatch === '0' && modul.sla === 'Tepat waktu') {
        // Modul sempurna -> Masuk jadi NOTIFIKASI
        feeds.push({ id: idCounter++, title: `${modul.modul} · ${modul.server}`, desc: 'Berjalan mulus tanpa ada data unmatched', category: 'notif', color: 'bg-emerald-500' });
      }
    });

    // 2. Cek Data Batch untuk mencari NOTIFIKASI (Sukses)
    tableData.forEach(batch => {
      if (batch.status === 'Reconciled' && batch.rate === '100.00%') {
        feeds.push({ id: idCounter++, title: `Batch ${batch.id}`, desc: `Selesai direkonsiliasi dengan akurasi 100% pada ${batch.time}`, category: 'notif', color: 'bg-emerald-500' });
      }
    });

    // Urutkan agar Alert (Masalah) berada di paling atas
    return feeds.sort((a, b) => {
      if (a.category === 'alert' && b.category === 'notif') return -1;
      if (a.category === 'notif' && b.category === 'alert') return 1;
      return 0;
    });
  }, [filteredModulData]);

  // Filter tampilan berdasarkan Tab yang diklik user
  const displayFeeds = feedTab === 'All' ? dynamicFeeds : dynamicFeeds.filter(f => f.category === feedTab.toLowerCase());
  const alertCount = dynamicFeeds.filter(f => f.category === 'alert').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">transaction.</h1>
          <p className="text-slate-500 mt-1">Monitor reconciliation performance and keep your daily close on track.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-lg text-sm font-semibold shadow-sm transition-colors ${isDatePickerOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              {displayDate}
            </button>
            {isDatePickerOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-slate-900">Custom Date Range</h4>
                  <button onClick={() => setIsDatePickerOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100">
                  <button onClick={handleResetDate} className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Reset</button>
                  <button onClick={handleApplyDate} className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Filter Waktu */}
      <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-lg w-fit border border-slate-200/50">
        {['Today', '7 days', '30 days'].map((filterName) => (
          <button 
            key={filterName} 
            onClick={() => {
              setActiveFilter(filterName);
              if(filterName === 'Today') setDisplayDate('12 Oct 2026');
            }} 
            className={`px-5 py-1.5 text-sm rounded transition-colors shadow-sm ${ activeFilter === filterName ? 'bg-white text-indigo-600 font-semibold' : 'text-slate-500 font-medium hover:text-slate-700 shadow-none hover:bg-slate-200/50' }`}
          >
            {filterName}
          </button>
        ))}
        {activeFilter === 'Custom' && (
          <button className="px-5 py-1.5 text-sm rounded transition-colors shadow-sm bg-white text-indigo-600 font-semibold">Custom</button>
        )}
      </div>

      {/* Metrik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Transactions processed</span><div className="p-1.5 bg-indigo-50 rounded text-indigo-600"><Layers className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">{activeFilter === 'Today' ? '12,480' : activeFilter === '7 days' ? '87,280' : activeFilter === '30 days' ? '347,800' : '1,269,000'}</h3></div><p className="text-xs text-slate-500">Total ledger value processed</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Match rate</span><div className="p-1.5 bg-emerald-50 rounded text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div></div>
          <div>
            <div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">97.00%</h3></div>
            <p onClick={() => setIsBreakdownOpen(true)} className="text-xs text-indigo-600 font-semibold underline cursor-pointer hover:text-indigo-800 transition-colors">View match breakdown</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Unmatched records</span><div className="p-1.5 bg-amber-50 rounded text-amber-600"><RefreshCcw className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">{activeFilter === 'Today' ? '252' : activeFilter === '7 days' ? '1,450' : activeFilter === '30 days' ? '4,500' : '15,000'}</h3></div><p className="text-xs text-slate-500">No matching bank record found</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Exceptions</span><div className="p-1.5 bg-red-50 rounded text-red-600"><AlertTriangle className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">{activeFilter === 'Today' ? '122' : activeFilter === '7 days' ? '410' : activeFilter === '30 days' ? '1,200' : '4,000'}</h3></div><p className="text-xs text-slate-500">Amount or duplicate discrepancies</p></div>
        </div>
      </div>

      {/* GRID 3 KOLOM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Trend Area Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Reconciliation trend</h3>
              <p className="text-xs text-slate-500">Matched transactions ({activeFilter})</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart key={`area-${activeFilter}`} data={currentChartData}>
                <defs><linearGradient id="colorMatched" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="matched" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMatched)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Modul Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 capitalize">{activeFilter === 'Today' ? "" : activeFilter} Moduls</h3>
          <p className="text-xs text-slate-500 mb-6">{totalModulRecords} records • All Servers</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart key={`bar-${activeFilter}`} data={currentModulData} barSize={20}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="aktif" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tidakAktif" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* --- DYNAMIC ALERTS & NOTIFIKASI WIDGET --- */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[275px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" /> Live Feed
            </h3>
            {alertCount > 0 && (
              <div className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold shadow-sm">
                {alertCount} Issues
              </div>
            )}
          </div>

          {/* TABS untuk filter isi widget */}
          <div className="flex gap-2 border-b border-slate-100 pb-2 mb-3">
            <button onClick={() => setFeedTab('All')} className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${feedTab === 'All' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>Semua</button>
            <button onClick={() => setFeedTab('Alert')} className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${feedTab === 'Alert' ? 'bg-rose-50 text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}>Alerts</button>
            <button onClick={() => setFeedTab('Notif')} className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${feedTab === 'Notif' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 hover:text-slate-600'}`}>Notif</button>
          </div>
          
          {/* Feed List (Scrollable) */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {displayFeeds.length > 0 ? (
              displayFeeds.map((feed) => (
                <div key={feed.id} className="flex gap-3 items-start animate-in fade-in duration-300">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${feed.color}`}></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{feed.title}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{feed.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-6 font-medium">Tidak ada data untuk kategori ini.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-amber-800 font-medium text-sm"><AlertTriangle className="w-5 h-5" />74 records need your attention. Review unmatched transactions and exceptions.</div>
        <button className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900">Review results <ArrowRight className="w-4 h-4" /></button>
      </div>

      {/* TABEL STATUS MODUL */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8 mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari modul atau server..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto relative">
            <div className="relative">
              <select value={serverFilter} onChange={(e) => setServerFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm">
                <option value="Semua">Server: Semua</option><option value="ECO H0">ECO H0</option><option value="ECO H1">ECO H1</option><option value="CTO H1">CTO H1</option><option value="CTO H0">CTO H0</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm">
                <option value="Semua">Status: Semua</option><option value="Aktif">Aktif</option><option value="Tidak aktif">Tidak aktif</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 relative">
            <thead className="bg-white text-xs uppercase text-slate-400 font-semibold border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-5 py-4 w-16">No</th><th className="px-5 py-4">Modul</th><th className="px-5 py-4">Server</th>
                <th className="px-5 py-4">Status</th><th className="px-5 py-4">SLA</th><th className="px-5 py-4">Match</th>
                <th className="px-5 py-4">Unmatch</th><th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredModulData.length > 0 ? (
                filteredModulData.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">{row.no}</td><td className="px-5 py-4 font-bold text-slate-800">{row.modul}</td><td className="px-5 py-4">{row.server}</td>
                    <td className="px-5 py-4"><span className={`font-semibold ${row.status === 'Aktif' ? 'text-emerald-600' : 'text-red-500'}`}>{row.status}</span></td>
                    <td className="px-5 py-4"><span className={`font-semibold ${ row.sla === 'Tepat waktu' ? 'text-emerald-600' : row.sla === 'Terlambat' ? 'text-amber-500' : 'text-slate-400' }`}>{row.sla}</span></td>
                    <td className="px-5 py-4 font-medium">{row.match}</td><td className={`px-5 py-4 ${row.unmatch !== '-' ? 'text-red-500 font-bold' : 'text-slate-400'}`}>{row.unmatch}</td>
                    <td className="px-5 py-4"><button className="text-indigo-600 font-bold flex items-center gap-1 hover:text-indigo-800 transition-colors">Lihat <ChevronRight className="w-4 h-4" /></button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="px-5 py-8 text-center text-slate-500">Tidak ada modul yang cocok dengan filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABEL RECENT BATCHES */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8 mb-4">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div><h3 className="font-bold text-slate-900 text-lg">Recent reconciliation batches</h3><p className="text-sm text-slate-500 mt-1">Daily settlement • Internal ledger ↔ Bank statement</p></div>
          <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg">View all batches <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="max-h-[350px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 relative">
            <thead className="bg-white text-xs uppercase text-slate-400 font-semibold border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-5 py-4">Batch ID</th><th className="px-5 py-4">Settlement Date</th><th className="px-5 py-4">Transactions</th>
                <th className="px-5 py-4">Match Rate</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Completed</th><th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-800">{row.id}</td><td className="px-5 py-4">{row.date}</td><td className="px-5 py-4 font-medium">{row.tx}</td><td className="px-5 py-4 font-bold">{row.rate}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${row.status === 'Reconciled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}><span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Reconciled' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>{row.status}</span></td>
                  <td className="px-5 py-4 text-slate-500">{row.time}</td>
                  <td className="px-5 py-4"><button className="text-indigo-600 font-bold flex items-center gap-1 hover:text-indigo-800">Detail <ArrowUpRight className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL MATCH BREAKDOWN */}
      {isBreakdownOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsBreakdownOpen(false)}></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" /> Match Rate Breakdown
                </h2>
                <p className="text-sm text-slate-500 mt-1">Analisis mendalam transaksi Matched vs Unmatched</p>
              </div>
              <button onClick={() => setIsBreakdownOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Tingkat Kesuksesan Rekonsiliasi</p>
                    <p className="text-xs text-slate-500">12,480 Total Transaksi (Today)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">97.00%</span>
                  </div>
                </div>
                <div className="w-full h-3 flex rounded-full overflow-hidden bg-rose-500">
                  <div style={{ width: `97%` }} className="bg-emerald-500 h-full border-r-2 border-white"></div>
                </div>
                <div className="flex justify-between mt-3 text-xs font-semibold">
                  <span className="text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Matched (12,106)</span>
                  <span className="text-rose-700 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5"/> Unmatched (374)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4 text-slate-500" /> Performa per Server
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {serverBreakdown.map((server, idx) => {
                    const failRate = ((server.unmatch / server.total) * 100).toFixed(1);
                    const isHighRisk = server.unmatch > 50;

                    return (
                      <div key={idx} className={`p-4 rounded-xl border ${isHighRisk ? 'bg-rose-50/50 border-rose-200' : 'bg-white border-slate-200'}`}>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-slate-900">{server.name}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                            {failRate}% Gagal
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Total:</span>
                            <span className="font-semibold text-slate-700">{server.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Match:</span>
                            <span className="font-semibold text-emerald-600">{server.match}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-200/60">
                            <span className="font-semibold text-slate-700">Unmatch:</span>
                            <span className="font-bold text-rose-600">{server.unmatch}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-slate-500" /> Top Alasan Unmatched
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  {topAnomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{anomaly.reason}</span>
                      </div>
                      <span className="text-sm font-bold text-rose-600">{anomaly.count} tx</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setIsBreakdownOpen(false)} className="px-5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                Tutup Laporan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}