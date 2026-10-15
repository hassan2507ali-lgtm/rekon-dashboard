import { CheckCircle, Search, Calendar, ChevronDown, CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';

export default function RekonResult() {
  const resultData = [
    { batch: 'RCN-20261010-001', date: '10 Oct 2026', totalTx: '10,600', matchVal: '$1,820,400', rate: '100.00%', status: 'Reconciled', auditor: 'Alex Lee' },
    { batch: 'RCN-20261009-001', date: '09 Oct 2026', totalTx: '11,300', matchVal: '$2,100,550', rate: '100.00%', status: 'Reconciled', auditor: 'System (Auto)' },
    { batch: 'RCN-20261008-001', date: '08 Oct 2026', totalTx: '9,840', matchVal: '$1,540,200', rate: '99.98%', status: 'Reconciled (Forced)', auditor: 'Sarah Connor' },
    { batch: 'RCN-20261007-001', date: '07 Oct 2026', totalTx: '10,120', matchVal: '$1,750,000', rate: '100.00%', status: 'Reconciled', auditor: 'System (Auto)' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Rekon Result</h1>
          <p className="text-slate-500 mt-1 text-sm">Review final outcomes and audit trails of closed reconciliation batches.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search batch ID..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Calendar className="w-4 h-4 text-slate-500" /> Oct 2026 <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Batches Closed (Oct)</p>
          <div className="flex items-end gap-2"><h3 className="text-2xl font-bold text-slate-900">24</h3><span className="text-xs text-emerald-600 font-medium mb-1">All verified</span></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Avg Match Rate</p>
          <div className="flex items-end gap-2"><h3 className="text-2xl font-bold text-slate-900">99.94%</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Total Value Reconciled</p>
          <div className="flex items-end gap-2"><h3 className="text-2xl font-bold text-slate-900">$42.8M</h3></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Manual Resolutions</p>
          <div className="flex items-end gap-2"><h3 className="text-2xl font-bold text-slate-900">14</h3><span className="text-xs text-amber-600 font-medium mb-1">Requires audit</span></div>
        </div>
      </div>

      {/* Results Archive Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 text-lg">Historical Results Archive</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4">Batch ID</th><th className="px-5 py-4">Close Date</th><th className="px-5 py-4">Total Tx</th>
                <th className="px-5 py-4">Matched Value</th><th className="px-5 py-4">Match Rate</th><th className="px-5 py-4">Final Status</th>
                <th className="px-5 py-4">Closed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resultData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-indigo-600 cursor-pointer hover:underline">{row.batch}</td>
                  <td className="px-5 py-4">{row.date}</td>
                  <td className="px-5 py-4">{row.totalTx}</td>
                  <td className="px-5 py-4 font-medium">{row.matchVal}</td>
                  <td className="px-5 py-4">{row.rate}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.status.includes('Forced') ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {row.status.includes('Forced') ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 flex items-center gap-2">
                    {row.auditor.includes('System') ? <RefreshCcw className="w-3.5 h-3.5 text-slate-400" /> : <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">SC</div>}
                    {row.auditor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}