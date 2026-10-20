import { useState } from 'react';
import { Calendar, Plus, Layers, CheckCircle2, RefreshCcw, AlertTriangle, ArrowRight, ArrowUpRight, User, Search, ChevronDown, ChevronRight, X } from 'lucide-react';
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

// --- DATA DUMMY ALERT TERBARU (Sesuai Gambar) ---
const alertsData = [
  { id: 1, title: 'Modul 07 · ECO H1', desc: 'Data belum masuk, lewat cut-off 09:00', type: 'danger' },
  { id: 2, title: 'Modul 15 · CTO H1', desc: 'Proses rekon > 30 menit dari SLA', type: 'warning' },
  { id: 3, title: 'Modul 02 · ECO H0', desc: 'Modul tidak aktif sejak 07 Okt', type: 'danger' },
  { id: 4, title: 'Modul 11 · ECO H1', desc: 'Data terlambat, sudah selesai 10:12', type: 'success' },
];

// --- DATA DUMMY BATCH LAMA DIPERBANYAK ---
const tableData = [
  { id: 'RCN-20261012-004', date: '12 Oct 2026', tx: '12,480', rate: '97.00%', status: 'Review required', time: '09:42' },
  { id: 'RCN-20261012-003', date: '12 Oct 2026', tx: '8,120', rate: '99.10%', status: 'Reconciled', time: '08:15' },
  { id: 'RCN-20261012-002', date: '12 Oct 2026', tx: '4,050', rate: '95.50%', status: 'Review required', time: '07:30' },
  { id: 'RCN-20261012-001', date: '12 Oct 2026', tx: '9,800', rate: '100.00%', status: 'Reconciled', time: '06:00' },
  { id: 'RCN-20261011-002', date: '11 Oct 2026', tx: '11,240', rate: '97.33%', status: 'Review required', time: '09:38' },
  { id: 'RCN-20261011-001', date: '11 Oct 2026', tx: '15,300', rate: '100.00%', status: 'Reconciled', time: '06:10' },
  { id: 'RCN-20261010-001', date: '10 Oct 2026', tx: '10,600', rate: '100.00%', status: 'Reconciled', time: '09:40' },
  { id: 'RCN-20261009-001', date: '09 Oct 2026', tx: '11,300', rate: '100.00%', status: 'Reconciled', time: '09:36' },
];

// --- DATA DUMMY TABEL STATUS MODUL DIPERBANYAK ---
const modulTableData = [
  { no: 1, modul: 'Modul 03', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '18.240', unmatch: '820' },
  { no: 2, modul: 'Modul 11', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '15.110', unmatch: '610' },
  { no: 3, modul: 'Modul 07', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '12.870', unmatch: '450' },
  { no: 4, modul: 'Modul 15', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '11.430', unmatch: '380' },
  { no: 5, modul: 'Modul 21', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '9.920', unmatch: '120' },
  { no: 6, modul: 'Modul 09', server: 'ECO H0', status: 'Aktif', sla: 'Tepat waktu', match: '8.310', unmatch: '95' },
  { no: 7, modul: 'Modul 18', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '7.640', unmatch: '40' },
  { no: 8, modul: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
  { no: 9, modul: 'Modul 22', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '22.100', unmatch: '10' },
  { no: 10, modul: 'Modul 14', server: 'CTO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
  { no: 11, modul: 'Modul 05', server: 'ECO H0', status: 'Aktif', sla: 'Terlambat', match: '5.400', unmatch: '300' },
  { no: 12, modul: 'Modul 08', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '19.550', unmatch: '22' },
  { no: 13, modul: 'Modul 19', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '14.200', unmatch: '180' },
  { no: 14, modul: 'Modul 01', server: 'ECO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
  { no: 15, modul: 'Modul 25', server: 'CTO H1', status: 'Aktif', sla: 'Terlambat', match: '6.700', unmatch: '115' },
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
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" />New reconciliation
          </button>
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
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">97.00%</h3></div><p className="text-xs text-indigo-600 underline cursor-pointer">View match breakdown</p></div>
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

      {/* --- GRID 3 KOLOM: Trend | Moduls | ALERT TERBARU (Baru) --- */}
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
        
        {/* --- ALERT TERBARU WIDGET (Menggantikan Pie Chart) --- */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[275px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Alert terbaru</h3>
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
              3
            </div>
          </div>
          
          {/* Daftar Alert (Scrollable) */}
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {alertsData.map((alert) => (
              <div key={alert.id} className="flex gap-3 items-start">
                <div className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                  alert.type === 'danger' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-amber-800 font-medium text-sm"><AlertTriangle className="w-5 h-5" />74 records need your attention. Review unmatched transactions and exceptions.</div>
        <button className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900">Review results <ArrowRight className="w-4 h-4" /></button>
      </div>

      {/* --- TABEL STATUS MODUL --- */}
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

        {/* Isi Tabel Modul */}
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

      {/* --- TABEL RECENT BATCHES --- */}
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

    </div>
  );
}