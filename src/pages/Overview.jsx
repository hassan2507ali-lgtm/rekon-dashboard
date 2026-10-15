import { Calendar, Plus, Layers, CheckCircle2, RefreshCcw, AlertTriangle, ArrowRight, ArrowUpRight, User, Search, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// --- Data Palsu (Dummy) ---
const trendData = [
  { name: '06 Oct', matched: 8800 }, { name: '07 Oct', matched: 9500 },
  { name: '08 Oct', matched: 11200 }, { name: '09 Oct', matched: 10800 },
  { name: '10 Oct', matched: 12000 }, { name: '11 Oct', matched: 13500 },
];
const modulData = [
  { name: 'ECT H0', aktif: 12, tidakAktif: 8 },
  { name: 'ECO H0', aktif: 5, tidakAktif: 10 },
  { name: 'ECO H1', aktif: 18, tidakAktif: 8 },
];
const pieData = [
  { name: 'Matched', value: 12106, color: '#4f46e5' }, 
  { name: 'Unmatched', value: 252, color: '#f59e0b' }, 
  { name: 'Exception', value: 122, color: '#ef4444' }, 
];
const tableData = [
  { id: 'RCN-20261012-001', date: '12 Oct 2026', tx: '12,480', rate: '97.00%', status: 'Review required', time: '09:42' },
  { id: 'RCN-20261011-001', date: '11 Oct 2026', tx: '11,240', rate: '97.33%', status: 'Review required', time: '09:38' },
  { id: 'RCN-20261010-001', date: '10 Oct 2026', tx: '10,600', rate: '100.00%', status: 'Reconciled', time: '09:40' },
  { id: 'RCN-20261009-001', date: '09 Oct 2026', tx: '11,300', rate: '100.00%', status: 'Reconciled', time: '09:36' },
];

export default function Overview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">transaction.</h1>
          <p className="text-slate-500 mt-1">Monitor reconciliation performance and keep your daily close on track.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm"><Calendar className="w-4 h-4 text-slate-500" />12 Oct 2026</button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm"><Plus className="w-4 h-4" />New reconciliation</button>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-lg w-fit border border-slate-200/50">
        <button className="px-5 py-1.5 bg-white text-indigo-600 font-semibold rounded shadow-sm text-sm">Today</button>
        <button className="px-5 py-1.5 text-slate-500 font-medium text-sm">7 days</button>
        <button className="px-5 py-1.5 text-slate-500 font-medium text-sm">30 days</button>
      </div>

      {/* --- KARTU METRIK --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... (Kode 4 Kartu Metrik sama seperti sebelumnya, dipersingkat di sini agar fokus ke tabel bawah) ... */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Transactions processed</span><div className="p-1.5 bg-indigo-50 rounded text-indigo-600"><Layers className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">12,480</h3><span className="text-xs font-medium text-indigo-600 flex items-center">↑ 11.0%</span></div><p className="text-xs text-slate-500">$2,486,920.40 total ledger value</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Match rate</span><div className="p-1.5 bg-emerald-50 rounded text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">97.00%</h3><span className="text-xs font-medium text-emerald-600 flex items-center">↑ 0.8 pp</span></div><p className="text-xs text-indigo-600 underline">12,106 transactions matched</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Unmatched records</span><div className="p-1.5 bg-amber-50 rounded text-amber-600"><RefreshCcw className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">252</h3></div><p className="text-xs text-slate-500">No matching bank record found</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4"><span className="text-sm font-medium text-slate-600">Exceptions</span><div className="p-1.5 bg-red-50 rounded text-red-600"><AlertTriangle className="w-4 h-4" /></div></div>
          <div><div className="flex items-end gap-3 mb-1"><h3 className="text-3xl font-bold text-slate-900">122</h3></div><p className="text-xs text-slate-500">Amount or duplicate discrepancies</p></div>
        </div>
      </div>

      {/* --- GRAFIK --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div><h3 className="font-semibold text-slate-900">Reconciliation trend</h3><p className="text-xs text-slate-500">Matched transactions over 7 days</p></div>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">+11.0% volume</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}><defs><linearGradient id="colorMatched" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="name" hide /><Tooltip /><Area type="monotone" dataKey="matched" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMatched)" /></AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Moduls */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900">Today's Moduls</h3><p className="text-xs text-slate-500 mb-6">1,225 records • Report Of Day</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={modulData} barSize={20}><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} /><Tooltip cursor={{fill: 'transparent'}} /><Bar dataKey="aktif" fill="#34d399" radius={[4, 4, 0, 0]} /><Bar dataKey="tidakAktif" fill="#f87171" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
          </div>
        </div>
        {/* Outcomes */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-slate-900">Today's outcomes</h3><p className="text-xs text-slate-500 mb-2">12,480 records • Card payments</p>
          <div className="flex-1 flex flex-col justify-center relative">
            <div className="h-32"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} innerRadius={40} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2"><span className="text-xl font-bold text-slate-900">97%</span></div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-800 font-medium text-sm"><AlertTriangle className="w-5 h-5" />74 records need your attention. Review unmatched transactions and exceptions in the latest batch.</div>
        <button className="flex items-center gap-1 text-sm font-semibold text-amber-700">Review results <ArrowRight className="w-4 h-4" /></button>
      </div>

      {/* --- TABEL BATCH BARU --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">Recent reconciliation batches</h3>
            <p className="text-sm text-slate-500">Daily settlement • Internal ledger ↔ Bank statement</p>
          </div>
          <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">View all batches <ArrowRight className="w-4 h-4" /></button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold">
              <tr>
                <th className="px-5 py-4">Batch ID</th><th className="px-5 py-4">Settlement Date</th><th className="px-5 py-4">Transactions</th>
                <th className="px-5 py-4">Match Rate</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Completed</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-4 font-medium text-slate-900">{row.id}</td>
                  <td className="px-5 py-4">{row.date}</td>
                  <td className="px-5 py-4">{row.tx}</td>
                  <td className="px-5 py-4">{row.rate}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Reconciled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Reconciled' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{row.time}</td>
                  <td className="px-5 py-4"><button className="text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800">View detail <ArrowUpRight className="w-3.5 h-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-400 px-1">All amounts in USD • Times shown in UTC</p>

      {/* --- NEXT STEPS --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-8">
        <h3 className="font-semibold text-slate-900 text-lg mb-1">Next steps</h3>
        <p className="text-sm text-slate-500 mb-6">Keep your close moving forward</p>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600"><User className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Review assigned to Alex Lee</p>
              <p className="text-xs text-slate-500 mt-0.5">374 open records · Due today, 17:00 UTC</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-600"><Search className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Verify discrepancies with the bank</p>
              <p className="text-xs text-slate-500 mt-0.5">Confirm missing records, fees, and duplicate references</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600"><FileText className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Resolve records and export the final report</p>
              <p className="text-xs text-slate-500 mt-0.5">An audit trail is saved for every resolution</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}