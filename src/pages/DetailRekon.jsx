import { useState } from 'react';
import { Search, ChevronDown, CheckCircle2, AlertTriangle, RefreshCcw, FileSpreadsheet, Download, Filter, ChevronRight, Eye, X, FileText, UserPlus } from 'lucide-react';

// --- DATA DUMMY DIPERBANYAK (Banyak Unmatched & Exception) ---
const initialDetailData = [
  { id: 'TRX-82910', date: '12 Oct 2026 08:12', module: 'Modul 03', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 12.500.000', bankAmt: 'Rp 12.500.000', match: 'Matched', intRef: 'INT-991029', bnkRef: 'BNK-991029', merchant: 'MDR-PAY-01' },
  { id: 'TRX-82911', date: '12 Oct 2026 08:15', module: 'Modul 11', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 4.350.000', bankAmt: 'Rp 4.350.000', match: 'Matched', intRef: 'INT-991030', bnkRef: 'BNK-991030', merchant: 'MDR-PAY-02' },
  { id: 'TRX-82912', date: '12 Oct 2026 08:18', module: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', internalAmt: 'Rp 8.900.000', bankAmt: '-', match: 'Unmatched', intRef: 'INT-991031', bnkRef: '-', merchant: 'EDC-JKT-11', reason: 'Data tidak ditemukan di rekening koran bank (Missing on Bank).' },
  { id: 'TRX-82913', date: '12 Oct 2026 08:22', module: 'Modul 15', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 1.150.000', bankAmt: 'Rp 1.100.000', match: 'Exception', intRef: 'INT-991032', bnkRef: 'BNK-991032', merchant: 'QRIS-MDR-99', reason: 'Selisih nominal sebesar Rp 50.000.' },
  { id: 'TRX-82914', date: '12 Oct 2026 08:30', module: 'Modul 07', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 5.500.000', bankAmt: 'Rp 5.500.000', match: 'Matched', intRef: 'INT-991033', bnkRef: 'BNK-991033', merchant: 'MDR-PAY-01' },
  { id: 'TRX-82915', date: '12 Oct 2026 08:45', module: 'Modul 09', server: 'ECO H0', status: 'Aktif', internalAmt: '-', bankAmt: 'Rp 3.200.000', match: 'Unmatched', intRef: '-', bnkRef: 'BNK-991034', merchant: 'UNKNOWN', reason: 'Terdapat dana masuk di bank tanpa pencatatan internal (Unidentified Fund).' },
  { id: 'TRX-82916', date: '12 Oct 2026 09:05', module: 'Modul 21', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 7.800.000', bankAmt: '-', match: 'Unmatched', intRef: 'INT-991035', bnkRef: '-', merchant: 'EDC-BDO-04', reason: 'Data tidak ditemukan di rekening koran bank.' },
  { id: 'TRX-82917', date: '12 Oct 2026 09:12', module: 'Modul 18', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 2.400.000', bankAmt: 'Rp 2.450.000', match: 'Exception', intRef: 'INT-991036', bnkRef: 'BNK-991036', merchant: 'MDR-PAY-03', reason: 'Selisih nominal sebesar Rp 50.000 (Kurang bayar).' },
  { id: 'TRX-82918', date: '12 Oct 2026 09:20', module: 'Modul 03', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 15.000.000', bankAmt: '-', match: 'Unmatched', intRef: 'INT-991037', bnkRef: '-', merchant: 'EDC-JKT-12', reason: 'Data tidak ditemukan di bank (Pending settlement).' },
  { id: 'TRX-82919', date: '12 Oct 2026 09:25', module: 'Modul 02', server: 'ECO H0', status: 'Tidak aktif', internalAmt: '-', bankAmt: 'Rp 900.000', match: 'Unmatched', intRef: '-', bnkRef: 'BNK-991038', merchant: 'FEE-REVERSAL', reason: 'Pembalikan biaya admin otomatis oleh bank.' },
  { id: 'TRX-82920', date: '12 Oct 2026 09:30', module: 'Modul 11', server: 'ECO H1', status: 'Aktif', internalAmt: 'Rp 1.500.000', bankAmt: 'Rp 1.500.000', match: 'Matched', intRef: 'INT-991039', bnkRef: 'BNK-991039', merchant: 'MDR-PAY-02' },
  { id: 'TRX-82921', date: '12 Oct 2026 09:40', module: 'Modul 15', server: 'CTO H1', status: 'Aktif', internalAmt: 'Rp 500.000', bankAmt: 'Rp 500.000', match: 'Exception', intRef: 'INT-991040', bnkRef: 'BNK-991040', merchant: 'QRIS-MDR-99', reason: 'Duplikasi ID Transaksi terdeteksi di sisi bank.' },
];

const serverSummaryData = {
  'Semua': {
    timeline: [{ time: '07:45', text: 'Data mitra diterima' }, { time: '07:50', text: 'Data internal tersedia' }, { time: '08:00', text: 'Proses rekon dimulai' }, { time: '08:21', text: 'Selesai (SLA 09:00)' }],
    summary: { total: '19.060', match: '18.240', matchPct: '95,7', unmatch: '820', nomUnmatch: 'Rp410 jt', barPct: 95.7 }
  },
  'ECO H0': {
    timeline: [{ time: '06:30', text: 'Data mitra diterima' }, { time: '06:40', text: 'Data internal tersedia' }, { time: '06:50', text: 'Proses rekon dimulai' }, { time: '07:15', text: 'Selesai (SLA 08:00)' }],
    summary: { total: '5.200', match: '5.100', matchPct: '98,0', unmatch: '100', nomUnmatch: 'Rp45 jt', barPct: 98.0 }
  },
  'ECO H1': {
    timeline: [{ time: '11:00', text: 'Data mitra diterima' }, { time: '11:05', text: 'Data internal tersedia' }, { time: '11:15', text: 'Proses rekon dimulai' }, { time: '11:45', text: 'Selesai (SLA 12:00)' }],
    summary: { total: '10.500', match: '10.000', matchPct: '95,2', unmatch: '500', nomUnmatch: 'Rp250 jt', barPct: 95.2 }
  },
  'CTO H1': {
    timeline: [{ time: '14:20', text: 'Data mitra diterima' }, { time: '14:25', text: 'Data internal tersedia' }, { time: '14:30', text: 'Proses rekon dimulai' }, { time: '14:55', text: 'Selesai (SLA 15:30)' }],
    summary: { total: '3.360', match: '3.140', matchPct: '93,4', unmatch: '220', nomUnmatch: 'Rp115 jt', barPct: 93.4 }
  }
};

export default function DetailRekon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serverFilter, setServerFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [matchFilter, setMatchFilter] = useState('Semua');
  
  // --- STATE UNTUK DRAWER DETAIL ---
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredData = initialDetailData.filter((row) => {
    const matchSearch = row.id.toLowerCase().includes(searchTerm.toLowerCase()) || row.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchServer = serverFilter === 'Semua' || row.server === serverFilter;
    const matchStatus = statusFilter === 'Semua' || row.status === statusFilter;
    const matchResult = matchFilter === 'Semua' || row.match === matchFilter;
    return matchSearch && matchServer && matchStatus && matchResult;
  });

  const currentSummary = serverSummaryData[serverFilter];

  // Fungsi Buka Drawer
  const openDetail = (trx) => {
    setSelectedTrx(trx);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 relative">
      
      {/* Header & Filter Controls (Tetap sama) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Detail Rekon</h1>
          <p className="text-slate-500 mt-1 text-sm">Drill down into transaction-level reconciliation data and compare sources.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"><Filter className="w-4 h-4" /> Advanced Filter</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700"><Download className="w-4 h-4" /> Export Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><FileSpreadsheet className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Total Transactions</p><h3 className="text-2xl font-bold text-slate-900">12,480</h3></div></div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Perfect Match</p><h3 className="text-2xl font-bold text-slate-900">12,106</h3></div></div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><RefreshCcw className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Requires Audit</p><h3 className="text-2xl font-bold text-slate-900">374</h3></div></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
          <div><h3 className="font-semibold text-slate-900 text-lg">Source Comparison</h3><p className="text-sm text-slate-500">Internal Ledger vs Bank Statement</p></div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64"><Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" /><input type="text" placeholder="Cari TRX ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></div>
            <div className="relative"><select value={serverFilter} onChange={(e) => setServerFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 cursor-pointer"><option value="Semua">Server: Semua</option><option value="ECO H0">ECO H0</option><option value="ECO H1">ECO H1</option><option value="CTO H1">CTO H1</option></select><ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" /></div>
            <div className="relative"><select value={matchFilter} onChange={(e) => setMatchFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 font-medium text-slate-700 cursor-pointer"><option value="Semua">Result: Semua</option><option value="Matched">Matched</option><option value="Unmatched">Unmatched</option><option value="Exception">Exception</option></select><ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" /></div>
          </div>
        </div>

        <div className="p-5 bg-slate-50 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm"><h4 className="text-slate-800 font-semibold mb-4">Timeline proses ({serverFilter})</h4><div className="space-y-3">{currentSummary.timeline.map((item, idx) => (<div key={idx} className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div><p className="text-sm text-slate-600"><span className="font-semibold text-slate-800 mr-2">{item.time}</span> {item.text}</p></div>))}</div></div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
              <h4 className="text-slate-800 font-semibold mb-4">Ringkasan hasil ({serverFilter})</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center"><span className="text-slate-500">Total transaksi</span><span className="font-bold text-slate-800">{currentSummary.summary.total}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Match</span><span className="font-bold text-emerald-600">{currentSummary.summary.match} ({currentSummary.summary.matchPct}%)</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Unmatch</span><span className="font-bold text-red-500">{currentSummary.summary.unmatch}</span></div>
              </div>
              <div className="mt-4 h-3 w-full bg-red-500 rounded-full flex overflow-hidden"><div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${currentSummary.summary.barPct}%` }}></div></div>
            </div>
          </div>
        </div>

        {/* --- TABEL DATA --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4">TRX ID</th>
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">Modul</th>
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
                    <td className="px-5 py-4 font-medium text-slate-800 bg-indigo-50/30">{row.internalAmt}</td>
                    <td className="px-5 py-4 font-medium text-slate-800 bg-emerald-50/30">{row.bankAmt}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                        ${row.match === 'Matched' ? 'bg-emerald-50 text-emerald-700' : row.match === 'Unmatched' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}
                      >
                        {row.match === 'Matched' ? <CheckCircle2 className="w-3.5 h-3.5" /> : row.match === 'Unmatched' ? <RefreshCcw className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {row.match}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {/* --- TOMBOL DETAIL BARU --- */}
                      <button 
                        onClick={() => openDetail(row)}
                        className="text-indigo-600 font-semibold inline-flex items-center gap-1.5 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" /> Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="px-5 py-12 text-center text-slate-500">Tidak ada transaksi ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================
          DRAWER DETAIL TRANSAKSI (Muncul di Kanan) 
          ========================================= */}
      {isDrawerOpen && selectedTrx && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay Gelap di Background */}
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          
          {/* Panel Putih di Kanan */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Transaction Detail 
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    selectedTrx.match === 'Matched' ? 'bg-emerald-100 text-emerald-700' : 
                    selectedTrx.match === 'Unmatched' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedTrx.match}
                  </span>
                </h2>
                <p className="text-sm text-slate-500 mt-1">{selectedTrx.id} • {selectedTrx.date}</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Bisa di-scroll) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Pesan Error (Hanya muncul jika Unmatched/Exception) */}
              {selectedTrx.match !== 'Matched' && (
                <div className={`p-4 rounded-xl border flex gap-3 ${selectedTrx.match === 'Unmatched' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                  <AlertTriangle className={`w-5 h-5 shrink-0 ${selectedTrx.match === 'Unmatched' ? 'text-amber-600' : 'text-red-600'}`} />
                  <div>
                    <h4 className={`font-semibold text-sm ${selectedTrx.match === 'Unmatched' ? 'text-amber-800' : 'text-red-800'}`}>Discrepancy Detected</h4>
                    <p className={`text-sm mt-1 ${selectedTrx.match === 'Unmatched' ? 'text-amber-700' : 'text-red-700'}`}>
                      {selectedTrx.reason || 'Terjadi ketidaksesuaian pencatatan antara Ledger dan Bank.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tabel Perbandingan Side-by-Side */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" /> Data Comparison
                </h3>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200">
                    <div className="p-3 px-4 font-semibold text-sm text-indigo-700 border-r border-slate-200">Internal Ledger</div>
                    <div className="p-3 px-4 font-semibold text-sm text-emerald-700">Bank Statement</div>
                  </div>
                  
                  {/* Baris: Waktu */}
                  <div className="grid grid-cols-2 border-b border-slate-100 text-sm">
                    <div className="p-3 px-4 border-r border-slate-100">
                      <span className="block text-xs text-slate-400 mb-0.5">Time recorded</span>
                      {selectedTrx.intRef !== '-' ? '08:12:45 UTC' : '-'}
                    </div>
                    <div className="p-3 px-4">
                      <span className="block text-xs text-slate-400 mb-0.5">Time recorded</span>
                      {selectedTrx.bnkRef !== '-' ? '08:12:46 UTC' : '-'}
                    </div>
                  </div>

                  {/* Baris: Merchant */}
                  <div className="grid grid-cols-2 border-b border-slate-100 text-sm">
                    <div className="p-3 px-4 border-r border-slate-100">
                      <span className="block text-xs text-slate-400 mb-0.5">Merchant / Terminal</span>
                      {selectedTrx.intRef !== '-' ? selectedTrx.merchant : '-'}
                    </div>
                    <div className="p-3 px-4">
                      <span className="block text-xs text-slate-400 mb-0.5">Merchant / Terminal</span>
                      {selectedTrx.bnkRef !== '-' ? selectedTrx.merchant : '-'}
                    </div>
                  </div>

                  {/* Baris: Reference */}
                  <div className="grid grid-cols-2 border-b border-slate-100 text-sm">
                    <div className="p-3 px-4 border-r border-slate-100">
                      <span className="block text-xs text-slate-400 mb-0.5">Reference No.</span>
                      <span className="font-mono text-slate-700">{selectedTrx.intRef}</span>
                    </div>
                    <div className="p-3 px-4">
                      <span className="block text-xs text-slate-400 mb-0.5">Reference No.</span>
                      <span className="font-mono text-slate-700">{selectedTrx.bnkRef}</span>
                    </div>
                  </div>

                  {/* Baris: Nominal Amount (Disorot merah jika beda) */}
                  <div className="grid grid-cols-2 text-sm bg-slate-50/50">
                    <div className="p-3 px-4 border-r border-slate-100">
                      <span className="block text-xs text-slate-400 mb-0.5">Amount</span>
                      <span className={`font-bold text-lg ${selectedTrx.internalAmt !== selectedTrx.bankAmt && selectedTrx.match !== 'Matched' ? 'text-red-600' : 'text-slate-900'}`}>
                        {selectedTrx.internalAmt}
                      </span>
                    </div>
                    <div className="p-3 px-4">
                      <span className="block text-xs text-slate-400 mb-0.5">Amount</span>
                      <span className={`font-bold text-lg ${selectedTrx.internalAmt !== selectedTrx.bankAmt && selectedTrx.match !== 'Matched' ? 'text-red-600' : 'text-slate-900'}`}>
                        {selectedTrx.bankAmt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer (Tombol Aksi Resolusi) */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              {selectedTrx.match === 'Matched' ? (
                <div className="flex justify-end">
                  <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">Close</button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                    <UserPlus className="w-4 h-4" /> Assign to Auditor
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm">
                      Force Match & Resolve
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}