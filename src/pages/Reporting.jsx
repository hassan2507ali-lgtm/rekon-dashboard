import { FileText, Download, Filter, Calendar, FileSpreadsheet, MoreVertical, Plus } from 'lucide-react';

export default function Reporting() {
  const reportsData = [
    { id: 'REP-1048', name: 'Daily Settlement Report - ECO H1', date: '12 Oct 2026', type: 'Settlement', size: '2.4 MB', status: 'Generated' },
    { id: 'REP-1047', name: 'Exception Summary (Unmatched)', date: '11 Oct 2026', type: 'Exception', size: '845 KB', status: 'Generated' },
    { id: 'REP-1046', name: 'Weekly Reconciliation Master', date: '10 Oct 2026', type: 'Master', size: '14.1 MB', status: 'Generated' },
    { id: 'REP-1045', name: 'Daily Settlement Report - ECT H0', date: '09 Oct 2026', type: 'Settlement', size: '2.1 MB', status: 'Generated' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reporting</h1>
          <p className="text-slate-500 mt-1 text-sm">Generate, view, and download your financial reconciliation reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Generate New Report
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><FileText className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Total Reports (This Month)</p><h3 className="text-2xl font-bold text-slate-900">124</h3></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><FileSpreadsheet className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Storage Used</p><h3 className="text-2xl font-bold text-slate-900">1.2 GB</h3></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><Calendar className="w-6 h-6" /></div>
          <div><p className="text-sm font-medium text-slate-500">Next Scheduled Report</p><h3 className="text-lg font-bold text-slate-900">Today, 18:00</h3></div>
        </div>
      </div>

      {/* Report History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-900 text-lg">Report History</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="Search reports..." className="px-3 py-1.5 border border-slate-200 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4">Report ID</th><th className="px-5 py-4">Report Name</th><th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Date Generated</th><th className="px-5 py-4">Size</th><th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportsData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-900">{row.id}</td>
                  <td className="px-5 py-4 flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400" /> {row.name}</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">{row.type}</span></td>
                  <td className="px-5 py-4">{row.date}</td>
                  <td className="px-5 py-4 text-slate-500">{row.size}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-xs"><Download className="w-3.5 h-3.5" /> PDF</button>
                      <button className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 text-xs"><Download className="w-3.5 h-3.5" /> CSV</button>
                      <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
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