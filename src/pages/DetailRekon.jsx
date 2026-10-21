import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Search, ChevronDown, CheckCircle2, AlertTriangle, RefreshCcw, 
  FileSpreadsheet, Download, Filter, Eye, X, FileText, Activity, Ban, Plus, Loader2 
} from 'lucide-react';

export default function DetailRekon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serverFilter, setServerFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [matchFilter, setMatchFilter] = useState('Semua');
  
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [rekonData, setRekonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    server: 'ECO_H1',
    merchant: '',
    module: '',
    status: 'Active',
    date: new Date().toISOString().replace('T', ' ').slice(0, 19),
    statusRekon: 'Rekonsiliasi Daily Jalan',
    statusTransaksi: 'Masih Terdapat Transaksi',
    match: 'Matched'
  });

  // 1. FUNGSI TARIK DATA (Dibuat useCallback agar bisa dipanggil setelah submit form)
  const fetchSupabaseData = useCallback(async () => {
    setIsLoading(true);
    
    const [resEcoH0, resEcoH1, resCtoH0] = await Promise.all([
      supabase.from('ECO_H0').select('*'),
      supabase.from('ECO_H1').select('*'),
      supabase.from('CTO_H0').select('*')
    ]);
    
    let combined = [];

    const formatData = (data, serverName) => {
      if (!data) return [];
      return data.map(item => ({
        id: `TRX-${serverName.replace(' ', '')}-${String(item.id || Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
        date: item.Terakhir_Jalan || item.date || '-',
        module: item.ObjectiveName || item.module || '-',
        server: serverName, 
        status: item['Active/Inactive'] || item.status || 'Active',
        match: item.match || 'Matched', 
        merchant: item.NAME || item.merchant || '-',
        statusRekon: item.STATUS_REKON || item.statusRekon || '-',
        statusTransaksi: item.STATUS_TRANSAKSI || item.statusTransaksi || '-'
      }));
    };

    if (!resEcoH0.error && resEcoH0.data) combined = [...combined, ...formatData(resEcoH0.data, 'ECO H0')];
    if (!resEcoH1.error && resEcoH1.data) combined = [...combined, ...formatData(resEcoH1.data, 'ECO H1')];
    if (!resCtoH0.error && resCtoH0.data) combined = [...combined, ...formatData(resCtoH0.data, 'CTO H0')];

    setRekonData(combined);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSupabaseData();
  }, [fetchSupabaseData]);

  // 2. FUNGSI SUBMIT DATA BARU KE SUPABASE
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Konversi nama server jadi nama tabel (ECO H1 -> ECO_H1)
    const tableName = formData.server.replace(' ', '_'); 

    const payload = {
      NAME: formData.merchant,
      ObjectiveName: formData.module,
      'Active/Inactive': formData.status,
      Terakhir_Jalan: formData.date,
      STATUS_REKON: formData.statusRekon,
      STATUS_TRANSAKSI: formData.statusTransaksi,
      match: formData.match
    };

    const { error } = await supabase.from(tableName).insert([payload]);
    
    setIsLoading(false);
    if(error) {
      alert("Gagal menambahkan data: " + error.message);
    } else {
      setIsFormOpen(false);
      // Bersihkan form
      setFormData({...formData, merchant: '', module: ''});
      // Tarik ulang data agar tabel langsung ter-update
      fetchSupabaseData();
    }
  };

  // 3. LOGIKA FILTERING
  const filteredData = useMemo(() => {
    return rekonData.filter((row) => {
      const matchSearch = row.id.toLowerCase().includes(searchTerm.toLowerCase()) || row.module.toLowerCase().includes(searchTerm.toLowerCase());
      const matchServer = serverFilter === 'Semua' || row.server === serverFilter;
      
      let matchStatus = true;
      if (statusFilter === 'Aktif') matchStatus = row.status === 'Active' || row.status === 'Aktif';
      if (statusFilter === 'Tidak aktif') matchStatus = row.status === 'Inactive' || row.status === 'Tidak aktif';
      
      const matchResult = matchFilter === 'Semua' || row.match === matchFilter;
      
      return matchSearch && matchServer && matchStatus && matchResult;
    });
  }, [rekonData, searchTerm, serverFilter, statusFilter, matchFilter]);

  const totalTrx = filteredData.length;
  const matchTrx = filteredData.filter(d => d.match === 'Matched').length;
  const unmatchTrx = filteredData.filter(d => d.match !== 'Matched').length;

  // 4. STATISTIK MODUL (3 KATEGORI)
  const moduleStats = useMemo(() => {
    const uniqueModules = new Map();
    filteredData.forEach(trx => {
      if (!uniqueModules.has(trx.module)) {
        const isActive = trx.status === 'Active' || trx.status === 'Aktif';
        const isNoTrx = (trx.statusTransaksi || '').toLowerCase().includes('tidak ada');
        
        let cat = 'notActive';
        if (isActive && !isNoTrx) cat = 'activeNormal';
        if (isActive && isNoTrx) cat = 'activeWarning'; // Active tapi tidak ada transaksi

        uniqueModules.set(trx.module, { statusCategory: cat });
      }
    });

    const mods = Array.from(uniqueModules.values());
    const total = mods.length || 1; 
    const activeNormal = mods.filter(m => m.statusCategory === 'activeNormal').length;
    const activeWarning = mods.filter(m => m.statusCategory === 'activeWarning').length;
    const notActive = mods.filter(m => m.statusCategory === 'notActive').length;

    return {
      total: mods.length,
      activeNormal: { count: activeNormal, percentage: ((activeNormal/total)*100).toFixed(1) },
      activeWarning: { count: activeWarning, percentage: ((activeWarning/total)*100).toFixed(1) },
      notActive: { count: notActive, percentage: ((notActive/total)*100).toFixed(1) },
    };
  }, [filteredData]);

  const openDetail = (trx) => {
    setSelectedTrx(trx);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10 relative animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Detail Rekon</h1>
          <p className="text-slate-500 mt-1 text-sm">Monitor module statuses, anomalies, and drill down into transaction-level data.</p>
        </div>
        <div className="flex items-center gap-3">
          
          <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Tambah Data
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-slate-600 font-medium text-sm">Menyinkronkan data dengan database...</p>
        </div>
      ) : (
        <>
          {/* SECTION 1: MODULE MONITORING (3 KARTU) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Module Status Overview ({serverFilter})</h2>
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" /> System Modules Health
                </h3>
                <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Total: {moduleStats.total} Modules
                </span>
              </div>

              {/* PROGRESS BAR 3 WARNA */}
              <div className="w-full h-4 flex rounded-full overflow-hidden mb-6 bg-slate-100">
                <div style={{ width: `${moduleStats.activeNormal.percentage}%` }} className="bg-emerald-500 transition-all"></div>
                <div style={{ width: `${moduleStats.activeWarning.percentage}%` }} className="bg-amber-400 transition-all"></div>
                <div style={{ width: `${moduleStats.notActive.percentage}%` }} className="bg-slate-300 transition-all"></div>
              </div>

              {/* 3 KARTU KATEGORI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-emerald-100 bg-emerald-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span className="text-sm font-bold text-emerald-900">Active (Normal)</span></div>
                    <span className="text-lg font-black text-emerald-700">{moduleStats.activeNormal.count}</span>
                  </div>
                  <p className="text-xs text-emerald-700/70 font-medium">Normal operational ({moduleStats.activeNormal.percentage}%)</p>
                </div>
                
                {/* KARTU BARU: WARNING ORANYE */}
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /><span className="text-sm font-bold text-amber-900">Active (Warning)</span></div>
                    <span className="text-lg font-black text-amber-700">{moduleStats.activeWarning.count}</span>
                  </div>
                  <p className="text-xs text-amber-700/80 font-medium">Tidak ada transaksi tercatat ({moduleStats.activeWarning.percentage}%)</p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2"><Ban className="w-4 h-4 text-slate-500" /><span className="text-sm font-bold text-slate-700">Not Active</span></div>
                    <span className="text-lg font-black text-slate-700">{moduleStats.notActive.count}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Inactive modules ({moduleStats.notActive.percentage}%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: TRANSACTION TABLE */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Transaction Detail & Comparison</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><FileSpreadsheet className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Total Transactions</p><h3 className="text-2xl font-bold text-slate-900">{totalTrx}</h3></div></div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Matched</p><h3 className="text-2xl font-bold text-slate-900">{matchTrx}</h3></div></div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-rose-50 text-rose-600 rounded-lg"><RefreshCcw className="w-6 h-6" /></div><div><p className="text-sm font-medium text-slate-500">Requires Audit</p><h3 className="text-2xl font-bold text-slate-900">{unmatchTrx}</h3></div></div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
              <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-64"><Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" /><input type="text" placeholder="Cari TRX ID/Modul..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none" /></div>
                  
                  <div className="relative">
                    <select value={serverFilter} onChange={(e) => setServerFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white font-medium text-slate-700 cursor-pointer">
                      <option value="Semua">Server: Semua</option>
                      <option value="ECO H0">ECO H0</option>
                      <option value="ECO H1">ECO H1</option>
                      <option value="CTO H0">CTO H0</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>

                  <div className="relative"><select value={matchFilter} onChange={(e) => setMatchFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white font-medium text-slate-700 cursor-pointer"><option value="Semua">Result: Semua</option><option value="Matched">Matched</option><option value="Unmatched">Unmatched</option></select><ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" /></div>
                  <div className="relative"><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm bg-white font-medium text-slate-700 cursor-pointer"><option value="Semua">Status: Semua</option><option value="Aktif">Aktif</option><option value="Tidak aktif">Tidak aktif</option></select><ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" /></div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] text-slate-600 whitespace-nowrap">
                  <thead className="bg-white text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-4">TRX ID & Name</th>
                      <th className="px-4 py-4">ObjectiveName</th>
                      <th className="px-4 py-4">Active/Inactive</th>
                      <th className="px-4 py-4">Terakhir Jalan</th>
                      <th className="px-4 py-4">Status Rekon</th>
                      <th className="px-4 py-4">Status Transaksi</th>
                      <th className="px-4 py-4">Match Result</th>
                      <th className="px-4 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 block">{row.id}</span>
                            <span className="text-xs text-indigo-600 font-semibold">{row.merchant} ({row.server})</span>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-700">{row.module}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${(row.status === 'Active' || row.status === 'Aktif') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                              {(row.status === 'Active' || row.status === 'Aktif') ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{row.date}</td>
                          <td className="px-4 py-3 font-semibold text-[12px] text-slate-600">{row.statusRekon}</td>
                          <td className="px-4 py-3 font-semibold text-[12px] text-amber-600">{row.statusTransaksi}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${row.match === 'Matched' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                              {row.match === 'Matched' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                              {row.match}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => openDetail(row)} className="text-indigo-600 font-bold inline-flex items-center gap-1 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1.5 rounded-lg">
                              <Eye className="w-4 h-4" /> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="8" className="px-5 py-12 text-center text-slate-500">Tidak ada transaksi yang ditemukan.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL FORM INPUT DATA */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <h2 className="text-lg font-bold text-slate-900">Tambah Data Transaksi</h2>
              <button onClick={() => setIsFormOpen(false)} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Server (Target Tabel)</label>
                  <select value={formData.server} onChange={(e) => setFormData({...formData, server: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">
                    <option value="ECO H0">ECO H0</option>
                    <option value="ECO H1">ECO H1</option>
                    <option value="CTO H0">CTO H0</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Match Result</label>
                  <select value={formData.match} onChange={(e) => setFormData({...formData, match: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">
                    <option value="Matched">Matched</option>
                    <option value="Unmatched">Unmatched</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Merchant (NAME)</label>
                <input required type="text" placeholder="Cth: TELKOMSEL" value={formData.merchant} onChange={(e) => setFormData({...formData, merchant: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ObjectiveName (Modul)</label>
                <input required type="text" placeholder="Cth: TELKOMSEL PREPAID OBJ" value={formData.module} onChange={(e) => setFormData({...formData, module: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Active/Inactive</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Rekonsiliasi</label>
                  <select value={formData.statusRekon} onChange={(e) => setFormData({...formData, statusRekon: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">
                    <option value="Rekonsiliasi Daily Jalan">Rekonsiliasi Daily Jalan</option>
                    <option value="Sudah Tidak Jalan">Sudah Tidak Jalan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Transaksi</label>
                <select value={formData.statusTransaksi} onChange={(e) => setFormData({...formData, statusTransaksi: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50">
                  <option value="Masih Terdapat Transaksi">Masih Terdapat Transaksi</option>
                  <option value="Sudah Tidak Ada Transaksi">Sudah Tidak Ada Transaksi</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER VIEW */}
      {isDrawerOpen && selectedTrx && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Transaction Detail 
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${selectedTrx.match === 'Matched' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {selectedTrx.match}
                  </span>
                </h2>
                <p className="text-sm text-slate-500 mt-1">{selectedTrx.id} • {selectedTrx.date}</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedTrx.match !== 'Matched' && (
                <div className="p-4 rounded-xl border flex gap-3 bg-rose-50 border-rose-200">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-sm text-rose-800">Unmatched / Anomaly</h4>
                    <p className="text-sm mt-1 text-rose-700">Data perlu dilakukan audit manual oleh tim terkait.</p>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-500" /> Data Detail</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 p-3 px-4 font-semibold text-sm text-indigo-700">Informasi Modul ({selectedTrx.server})</div>
                  <div className="grid grid-cols-2 text-sm bg-white border-b border-slate-100">
                    <div className="p-3 px-4 border-r"><span className="block text-xs text-slate-400">Modul / ObjectiveName</span><span className="font-bold text-md text-slate-700">{selectedTrx.module}</span></div>
                    <div className="p-3 px-4"><span className="block text-xs text-slate-400">Merchant / Name</span><span className="font-bold text-md text-slate-700">{selectedTrx.merchant}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}