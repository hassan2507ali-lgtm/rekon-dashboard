import { useState } from 'react';
import { Calendar, Plus, Layers, CheckCircle2, RefreshCcw, AlertTriangle, ArrowRight, ArrowUpRight, User, Search, ChevronDown, ChevronRight, X } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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

// --- DATA DUMMY GRAFIK PIE (OUTCOMES) ---
const pieToday = [{ name: 'Matched', value: 12106, color: '#4f46e5' }, { name: 'Unmatched', value: 252, color: '#f59e0b' }, { name: 'Exception', value: 122, color: '#ef4444' }];
const pie7Days = [{ name: 'Matched', value: 85420, color: '#4f46e5' }, { name: 'Unmatched', value: 1450, color: '#f59e0b' }, { name: 'Exception', value: 410, color: '#ef4444' }];
const pie30Days = [{ name: 'Matched', value: 342100, color: '#4f46e5' }, { name: 'Unmatched', value: 4500, color: '#f59e0b' }, { name: 'Exception', value: 1200, color: '#ef4444' }];
const pieCustom = [{ name: 'Matched', value: 1250000, color: '#4f46e5' }, { name: 'Unmatched', value: 15000, color: '#f59e0b' }, { name: 'Exception', value: 4000, color: '#ef4444' }];

// --- DATA TABEL STATIS ---
const tableData = [
  { id: 'RCN-20261012-001', date: '12 Oct 2026', tx: '12,480', rate: '97.00%', status: 'Review required', time: '09:42' },
  { id: 'RCN-20261011-001', date: '11 Oct 2026', tx: '11,240', rate: '97.33%', status: 'Review required', time: '09:38' },
  { id: 'RCN-20261010-001', date: '10 Oct 2026', tx: '10,600', rate: '100.00%', status: 'Reconciled', time: '09:40' },
  { id: 'RCN-20261009-001', date: '09 Oct 2026', tx: '11,300', rate: '100.00%', status: 'Reconciled', time: '09:36' },
];
const modulTableData = [
  { no: 1, modul: 'Modul 03', server: 'ECO H1', status: 'Aktif', sla: 'Tepat waktu', match: '18.240', unmatch: '820' },
  { no: 2, modul: 'Modul 11', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '15.110', unmatch: '610' },
  { no: 3, modul: 'Modul 07', server: 'ECO H1', status: 'Aktif', sla: 'Terlambat', match: '12.870', unmatch: '450' },
  { no: 4, modul: 'Modul 15', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '11.430', unmatch: '380' },
  { no: 5, modul: 'Modul 21', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '9.920', unmatch: '120' },
  { no: 6, modul: 'Modul 09', server: 'ECO H0', status: 'Aktif', sla: 'Tepat waktu', match: '8.310', unmatch: '95' },
  { no: 7, modul: 'Modul 18', server: 'CTO H1', status: 'Aktif', sla: 'Tepat waktu', match: '7.640', unmatch: '40' },
  { no: 8, modul: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', sla: '-', match: '-', unmatch: '-' },
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

  // --- LOGIKA FILTER GRAFIK DINAMIS (SEMUA GRAFIK) ---
  let currentChartData = dataToday;
  let currentModulData = modulToday;
  let currentPieData = pieToday;
  let currentPiePercentage = '97%';
  let totalModulRecords = '1,225';
  let totalOutcomeRecords = '12,480';

  if (activeFilter === '7 days') {
    currentChartData = data7Days;
    currentModulData = modul7Days;
    currentPieData = pie7Days;
    currentPiePercentage = '98%';
    totalModulRecords = '8,540';
    totalOutcomeRecords = '87,280';
  } else if (activeFilter === '30 days') {
    currentChartData = data30Days;
    currentModulData = modul30Days;
    currentPieData = pie30Days;
    currentPiePercentage = '98.3%';
    totalModulRecords = '34,210';
    totalOutcomeRecords = '347,800';
  } else if (activeFilter === 'Custom') {
    currentChartData = dataCustomRange;
    currentModulData = modulCustom;
    currentPieData = pieCustom;
    currentPiePercentage = '98.5%';
    totalModulRecords = '120,400';
    totalOutcomeRecords = '1,269,000';
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
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">{currentPiePercentage}</h3></div><p className="text-xs text-indigo-600 underline cursor-pointer">View match breakdown</p></div>
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

      {/* Grafik */}
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
          <h3 className="font-semibold text-slate-900 capitalize">{activeFilter === 'Today' ? "Today's" : activeFilter} Moduls</h3>
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
        
        {/* Outcomes Pie Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-slate-900 capitalize">{activeFilter === 'Today' ? "Today's" : activeFilter} Outcomes</h3>
          <p className="text-xs text-slate-500 mb-2">{totalOutcomeRecords} records • Card payments</p>
          <div className="flex-1 flex flex-col justify-center relative">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart key={`pie-${activeFilter}`}>
                  <Pie data={currentPieData} innerRadius={40} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">
                    {currentPieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
              <span className="text-xl font-bold text-slate-900">{currentPiePercentage}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-800 font-medium text-sm"><AlertTriangle className="w-5 h-5" />74 records need your attention. Review unmatched transactions and exceptions.</div>
        <button className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900">Review results <ArrowRight className="w-4 h-4" /></button>
      </div>

      {/* Tabel Status Modul */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8 mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari modul atau server..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto relative">
            <div className="relative">
              <select value={serverFilter} onChange={(e) => setServerFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer">
                <option value="Semua">Server: Semua</option><option value="ECO H0">ECO H0</option><option value="ECO H1">ECO H1</option><option value="CTO H1">CTO H1</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer">
                <option value="Semua">Status: Semua</option><option value="Aktif">Aktif</option><option value="Tidak aktif">Tidak aktif</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4 w-16">No</th><th className="px-5 py-4">Modul</th><th className="px-5 py-4">Server</th>
                <th className="px-5 py-4">Status</th><th className="px-5 py-4">SLA</th><th className="px-5 py-4">Match</th>
                <th className="px-5 py-4">Unmatch</th><th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredModulData.length > 0 ? (
                filteredModulData.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">{row.no}</td><td className="px-5 py-4 font-medium text-slate-900">{row.modul}</td><td className="px-5 py-4">{row.server}</td>
                    <td className="px-5 py-4"><span className={`font-medium ${row.status === 'Aktif' ? 'text-emerald-600' : 'text-red-500'}`}>{row.status}</span></td>
                    <td className="px-5 py-4"><span className={`font-medium ${ row.sla === 'Tepat waktu' ? 'text-emerald-600' : row.sla === 'Terlambat' ? 'text-amber-500' : 'text-slate-400' }`}>{row.sla}</span></td>
                    <td className="px-5 py-4">{row.match}</td><td className={`px-5 py-4 ${row.unmatch !== '-' ? 'text-red-500 font-medium' : 'text-slate-400'}`}>{row.unmatch}</td>
                    <td className="px-5 py-4"><button className="text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800 transition-colors">Lihat <ChevronRight className="w-3.5 h-3.5" /></button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="px-5 py-8 text-center text-slate-500">Tidak ada modul yang cocok dengan filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Area (Next steps dll) bisa ditambahkan jika perlu */}
    </div>
  );
}