import { Download, ArrowUpRight, Search, ChevronDown, AlertCircle } from 'lucide-react';

export default function DetailRekon() {
  // Data dummy tabel untuk kebutuhan UI awal
  const tableData = [
    { id: 'TXN-104892', ref: 'PAY-883921', ledger: '$1,250.00', bank: '$1,250.00', diff: '$0.00', status: 'Matched', note: 'Exact match' },
    { id: 'TXN-104893', ref: 'PAY-883922', ledger: '$875.00', bank: '$850.00', diff: '+$25.00', status: 'Exception', note: 'Amount mismatch' },
    { id: 'TXN-104894', ref: 'PAY-883923', ledger: '$420.00', bank: '—', diff: '+$420.00', status: 'Unmatched', note: 'Bank record missing' },
    { id: 'TXN-104895', ref: 'PAY-883924', ledger: '$2,300.00', bank: '$2,300.00', diff: '$0.00', status: 'Exception', note: 'Duplicate reference' },
    { id: 'TXN-104896', ref: 'PAY-883925', ledger: '$168.00', bank: '$168.00', diff: '$0.00', status: 'Matched', note: 'Exact match' },
    { id: 'TXN-104897', ref: 'PAY-883926', ledger: '$95.00', bank: '—', diff: '+$95.00', status: 'Unmatched', note: 'Bank record missing' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-sm font-semibold text-indigo-600 mb-1">RCN-20261012-001</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Detail Rekon</h1>
          <p className="text-slate-500 mt-1 text-sm">Card payments • Daily settlement reconciliation • 12 Oct 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download className="w-4 h-4" /> Download source
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700">
            <ArrowUpRight className="w-4 h-4" /> View result
          </button>
        </div>
      </div>

      {/* --- BATCH INFORMATION --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
        <div className="absolute top-6 right-6 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Review required
        </div>
        <h3 className="font-semibold text-slate-900 text-lg mb-4">Batch information</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div><p className="text-xs text-slate-500 mb-1">Settlement date</p><p className="text-sm font-semibold text-slate-900">12 Oct 2026</p></div>
          <div><p className="text-xs text-slate-500 mb-1">Payment channel</p><p className="text-sm font-semibold text-slate-900">Card payments</p></div>
          <div><p className="text-xs text-slate-500 mb-1">Matching rule</p><p className="text-sm font-semibold text-slate-900">Reference + amount • v2.4</p></div>
          <div><p className="text-xs text-slate-500 mb-1">Initiated by</p><p className="text-sm font-semibold text-slate-900">Alex Lee</p></div>
          <div><p className="text-xs text-slate-500 mb-1">Completed at</p><p className="text-sm font-semibold text-slate-900">12 Oct 2026, 09:42 UTC</p></div>
        </div>
      </div>

      {/* --- SOURCE COMPARISON (Blue Border) --- */}
      <div className="bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-lg mb-1">Source comparison</h3>
        <p className="text-xs text-slate-500 mb-4">Validated files used in this reconciliation</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 min-w-[140px]"><p className="text-xs text-slate-500 mb-1">Server</p><p className="text-lg font-bold text-slate-800">ECO H1</p></div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 min-w-[140px]"><p className="text-xs text-slate-500 mb-1">Mitra / produk</p><p className="text-lg font-bold text-slate-800">Mitra A</p></div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 min-w-[140px]"><p className="text-xs text-slate-500 mb-1">Status modul</p><p className="text-lg font-bold text-emerald-600">Aktif</p></div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 min-w-[140px]"><p className="text-xs text-slate-500 mb-1">Status SLA</p><p className="text-lg font-bold text-emerald-600">Tepat waktu</p></div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 min-w-[140px]"><p className="text-xs text-slate-500 mb-1">Server</p><p className="text-lg font-bold text-slate-800">ECO H1</p></div>
        </div>
      </div>

      {/* --- TRANSACTION COMPARISON TABLE --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">Transaction comparison</h3>
            <p className="text-sm text-slate-500">Compare internal ledger records against the bank statement</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" /> Export comparison
          </button>
        </div>

        {/* Tabs & Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
          <div className="flex gap-6 text-sm font-medium border-b border-slate-100 pb-2">
            <span className="text-indigo-600 border-b-2 border-indigo-600 pb-2 -mb-2.5">All records <span className="text-indigo-600">12,480</span></span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">Matched <span className="text-slate-400">12,106</span></span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">Unmatched <span className="text-slate-400">252</span></span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">Exception <span className="text-slate-400">122</span></span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="relative w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search transaction or reference" className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>Difference = ledger - bank</span>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 font-medium">
                All statuses <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold">
              <tr>
                <th className="px-5 py-3">Transaction ID</th><th className="px-5 py-3">Reference</th><th className="px-5 py-3">Ledger Amount</th>
                <th className="px-5 py-3">Bank Amount</th><th className="px-5 py-3">Difference</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Matching Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row, i) => (
                <tr key={i} className={`hover:bg-slate-50/50 ${row.id === 'TXN-104893' ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-5 py-3 font-semibold text-slate-900">{row.id}</td>
                  <td className="px-5 py-3">{row.ref}</td>
                  <td className="px-5 py-3 font-medium">{row.ledger}</td>
                  <td className="px-5 py-3 font-medium">{row.bank}</td>
                  <td className={`px-5 py-3 font-semibold ${row.diff === '$0.00' ? 'text-slate-500' : 'text-amber-600'}`}>{row.diff}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                      ${row.status === 'Matched' ? 'bg-emerald-50 text-emerald-700' : row.status === 'Exception' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Matched' ? 'bg-emerald-500' : row.status === 'Exception' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}