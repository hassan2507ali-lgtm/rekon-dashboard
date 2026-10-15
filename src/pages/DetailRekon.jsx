import { useState } from 'react';
import { Search, ChevronDown, CheckCircle2, AlertTriangle, RefreshCcw, FileSpreadsheet, Download, Filter, ChevronRight } from 'lucide-react';

// --- DATA DUMMY TRANSAKSI (SOURCE COMPARISON) ---
const initialDetailData = [
  { id: 'TRX-82910', date: '12 Oct 2026 08:12', module: 'Modul 03', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 12.500.000', bankAmt: 'Rp 12.500.000', match: 'Matched' },
  { id: 'TRX-82911', date: '12 Oct 2026 08:15', module: 'Modul 11', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 4.350.000', bankAmt: 'Rp 4.350.000', match: 'Matched' },
  { id: 'TRX-82912', date: '12 Oct 2026 08:18', module: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', internalAmt: 'Rp 8.900.000', bankAmt: '-', match: 'Unmatched' },
  { id: 'TRX-82913', date: '12 Oct 2026 08:22', module: 'Modul 15', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 1.150.000', bankAmt: 'Rp 1.100.000', match: 'Exception' },
  { id: 'TRX-82914', date: '12 Oct 2026 08:30', module: 'Modul 07', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 5.500.000', bankAmt: 'Rp 5.500.000', match: 'Matched' },
  { id: 'TRX-82915', date: '12 Oct 2026 08:45', module: 'Modul 09', server: 'ECO H0', status: 'Aktif', internalAmt: 'Rp 3.200.000', bankAmt: 'Rp 3.200.000', match: 'Matched' },
  { id: 'TRX-82916', date: '12 Oct 2026 09:05', module: 'Modul 21', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 7.800.000', bankAmt: '-', match: 'Unmatched' },
  { id: 'TRX-82917', date: '12 Oct 2026 09:12', module: 'Modul 18', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 2.400.000', bankAmt: 'Rp 2.450.000', match: 'Exception' },
];

// --- DATA DUMMY TIMELINE & RINGKASAN DINAMIS ---
const serverSummaryData = {
  'Semua': {
    timeline: [
      { time: '07:45', text: 'Data mitra diterima' },
      { time: '07:50', text: 'Data internal tersedia' },
      { time: '08:00', text: 'Proses rekon dimulai' },
      { time: '08:21', text: 'Selesai (SLA 09:00)' }
    ],
    summary: { total: '19.060', match: '18.240', matchPct: '95,7', unmatch: '820', nomUnmatch: 'Rp410 jt', barPct: 95.7 }
  },
  'ECO H0': {
    timeline: [
      { time: '06:30', text: 'Data mitra diterima' },
      { time: '06:40', text: 'Data internal tersedia' },
      { time: '06:50', text: 'Proses rekon dimulai' },
      { time: '07:15', text: 'Selesai (SLA 08:00)' }
    ],
    summary: { total: '5.200', match: '5.100', matchPct: '98,0', unmatch: '100', nomUnmatch: 'Rp45 jt', barPct: 98.0 }
  },
  'ECO H1': {
    timeline: [
      { time: '11:00', text: 'Data mitra diterima' },
      { time: '11:05', text: 'Data internal tersedia' },
      { time: '11:15', text: 'Proses rekon dimulai' },
      { time: '11:45', text: 'Selesai (SLA 12:00)' }
    ],
    summary: { total: '10.500', match: '10.000', matchPct: '95,2', unmatch: '500', nomUnmatch: 'Rp250 jt', barPct: 95.2 }
  },
  'CTO H1': {
    timeline: [
      { time: '14:20', text: 'Data mitra diterima' },
      { time: '14:25', text: 'Data internal tersedia' },
      { time: '14:30', text: 'Proses rekon dimulai' },
      { time: '14:55', text: 'Selesai (SLA 15:30)' }
    ],
    summary: { total: '3.360', match: '3.140', matchPct: '93,4', unmatch: '220', nomUnmatch: 'Rp115 jt', barPct: 93.4 }
  }
};

export default function DetailRekon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serverFilter, setServerFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [matchFilter, setMatchFilter] = useState('Semua');

  const filteredData = initialDetailData.filter((row) => {
    const matchSearch = row.id.toLowerCase().includes(searchTerm.toLowerCase()) || row.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchServer = serverFilter === 'Semua' || row.server === serverFilter;
    const matchStatus = statusFilter === 'Semua' || row.status === statusFilter;
    const matchResult = matchFilter === 'Semua' || row.match === matchFilter;
    return matchSearch && matchServer && matchStatus && matchResult;
  });

  // Ambil data timeline dan ringkasan yang sesuai dengan server yang dipilih
  const currentSummary = serverSummaryData[serverFilter];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Detail Rekon</h1>
          <p className="text-slate-500 mt-1 text-sm">Drill down into transaction-level reconciliation data and compare sources.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Advanced Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><FileSpreadsheet className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Total Transactions</p><h3 className="text-2xl font-bold text-slate-900">12,480</h3></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Perfect Match</p><h3 className="text-2xl font-bold text-slate-900">12,106</h3></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><RefreshCcw className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Requires Audit</p><h3 className="text-2xl font-bold text-slate-900">374</h3></div>
        </div>
      </div>

      {/* --- SOURCE COMPARISON TABLE AREA --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        
        {/* Table Header & Title */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">Source Comparison</h3>
            <p className="text-sm text-slate-500">Internal Ledger vs Bank Statement</p>
          </div>
          
          {/* SEARCH & FILTERS */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari TRX ID atau Modul..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              />
            </div>
            
            <div className="relative">
              <select 
                value={serverFilter}
                onChange={(e) => setServerFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="Semua">Server: Semua</option>
                <option value="ECO H0">ECO H0</option>
                <option value="ECO H1">ECO H1</option>
                <option value="CTO H1">CTO H1</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="Semua">Status: Semua</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak aktif">Tidak aktif</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="Semua">Result: Semua</option>
                <option value="Matched">Matched</option>
                <option value="Unmatched">Unmatched</option>
                <option value="Exception">Exception</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- TIMELINE PROSES & RINGKASAN HASIL (BARU) --- */}
        <div className="p-5 bg-slate-50 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Timeline Proses */}
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
              <h4 className="text-slate-800 font-semibold mb-4">Timeline proses ({serverFilter})</h4>
              <div className="space-y-3">
                {currentSummary.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800 mr-2">{item.time}</span> 
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Hasil */}
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
              <h4 className="text-slate-800 font-semibold mb-4">Ringkasan hasil ({serverFilter})</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Total transaksi</span>
                  <span className="font-bold text-slate-800">{currentSummary.summary.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Match</span>
                  <span className="font-bold text-emerald-600">{currentSummary.summary.match} ({currentSummary.summary.matchPct}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Unmatch</span>
                  <span className="font-bold text-red-500">{currentSummary.summary.unmatch}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Nominal unmatch</span>
                  <span className="font-bold text-amber-600">{currentSummary.summary.nomUnmatch}</span>
                </div>
              </div>
              
              {/* Progress Bar Visual */}
              <div className="mt-4 h-3 w-full bg-red-500 rounded-full flex overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${currentSummary.summary.barPct}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>
        {/* --- END OF TIMELINE & RINGKASAN --- */}

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4">TRX ID</th>
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">Modul</th>
                <th className="px-5 py-4">Server</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 bg-indigo-50/50">Internal Ledger</th>
                <th className="px-5 py-4 bg-emerald-50/50">Bank Statement</th>
                <th className="px-5 py-4">Match Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.id}</td>
                    <td className="px-5 py-4 text-slate-500">{row.date}</td>
                    <td className="px-5 py-4 font-medium">{row.module}</td>
                    <td className="px-5 py-4">{row.server}</td>
                    <td className="px-5 py-4">
                      <span className={`font-medium ${row.status === 'Aktif' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800 bg-indigo-50/30">{row.internalAmt}</td>
                    <td className="px-5 py-4 font-medium text-slate-800 bg-emerald-50/30">{row.bankAmt}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                        ${row.match === 'Matched' ? 'bg-emerald-50 text-emerald-700' : 
                          row.match === 'Unmatched' ? 'bg-amber-50 text-amber-700' : 
                          'bg-red-50 text-red-700'}`}
                      >
                        {row.match === 'Matched' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                         row.match === 'Unmatched' ? <RefreshCcw className="w-3.5 h-3.5" /> : 
                         <AlertTriangle className="w-3.5 h-3.5" />}
                        {row.match}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-indigo-600 font-medium inline-flex items-center gap-1 hover:text-indigo-800 transition-colors">
                        Compare <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="font-medium text-slate-900">Tidak ada transaksi ditemukan</p>
                      <p className="text-sm mt-1">Ubah kata kunci pencarian atau sesuaikan filter server dan status.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}