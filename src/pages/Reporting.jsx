import { useState } from 'react';
import { 
  FileText, Download, Filter, Calendar, FileSpreadsheet, MoreVertical, Plus, 
  Search, ChevronLeft, ChevronRight, CheckCircle2, Loader2, AlertCircle, Trash2, X 
} from 'lucide-react';

// --- DATA DUMMY LAPORAN ---
const initialReports = [
  { id: 'REP-1048', name: 'Daily Settlement Report - ECO H1', type: 'Settlement', date: '12 Oct 2026, 09:15', size: '2.4 MB', status: 'Completed' },
  { id: 'REP-1047', name: 'Exception Summary (Unmatched)', type: 'Exception', date: '11 Oct 2026, 17:30', size: '845 KB', status: 'Completed' },
  { id: 'REP-1046', name: 'Weekly Reconciliation Master', type: 'Master', date: '10 Oct 2026, 08:00', size: '14.1 MB', status: 'Generating' },
  { id: 'REP-1045', name: 'Daily Settlement Report - ECT H0', type: 'Settlement', date: '09 Oct 2026, 09:10', size: '2.1 MB', status: 'Completed' },
  { id: 'REP-1044', name: 'Failed Transaction Log - CTO H1', type: 'Exception', date: '08 Oct 2026, 14:22', size: '120 KB', status: 'Failed' },
  { id: 'REP-1043', name: 'Monthly Audit Trail', type: 'Master', date: '01 Oct 2026, 01:00', size: '45.2 MB', status: 'Completed' },
];

export default function Reporting() {
  // --- STATE MANAJEMEN ---
  const [activeTab, setActiveTab] = useState('All Reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOGIKA FILTERING ---
  const filteredReports = initialReports.filter((report) => {
    const matchesTab = activeTab === 'All Reports' || report.type === activeTab;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- LOGIKA CHECKBOX (BULK ACTION) ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredReports.map(r => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 relative">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reporting</h1>
          <p className="text-slate-500 mt-1 text-sm">Generate, view, and download your financial reconciliation reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-colors"
          >
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

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        
        {/* Table Toolbar (Tabs & Search) */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-lg w-full md:w-auto border border-slate-200/50">
            {['All Reports', 'Settlement', 'Exception', 'Master'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-4 py-1.5 text-sm rounded transition-colors shadow-sm ${ activeTab === tab ? 'bg-white text-indigo-600 font-semibold' : 'text-slate-500 font-medium hover:text-slate-700 shadow-none hover:bg-slate-200/50' }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search report name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
            />
          </div>
        </div>

        {/* --- BULK ACTION BANNER (Muncul jika ada row yang dicentang) --- */}
        {selectedRows.length > 0 && (
          <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-indigo-700">
              {selectedRows.length} report(s) selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-md text-xs font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download ZIP
              </button>
              <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-md text-xs font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        )}

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === filteredReports.length && filteredReports.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-4">Report ID</th>
                <th className="px-4 py-4">Report Name</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Date Generated</th>
                <th className="px-4 py-4">Size</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((row) => (
                <tr key={row.id} className={`hover:bg-slate-50/50 transition-colors ${selectedRows.includes(row.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-5 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{row.id}</td>
                  <td className="px-4 py-4 font-medium text-slate-800 flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${row.type === 'Master' ? 'text-purple-500' : row.type === 'Exception' ? 'text-amber-500' : 'text-blue-500'}`} /> 
                    {row.name}
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {/* Badge Status Laporan */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                      ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                        row.status === 'Generating' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                        'bg-red-50 text-red-700 border border-red-100'}`}
                    >
                      {row.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {row.status === 'Generating' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      {row.status === 'Failed' && <AlertCircle className="w-3.5 h-3.5" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row.date}</td>
                  <td className="px-4 py-4 font-medium">{row.size}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {row.status === 'Completed' ? (
                        <>
                          <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-xs transition-colors"><Download className="w-3.5 h-3.5" /> PDF</button>
                          <button className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 text-xs transition-colors"><Download className="w-3.5 h-3.5" /> CSV</button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic font-medium px-2">Unavailable</span>
                      )}
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-5 py-10 text-center text-slate-500">
                    Tidak ada laporan yang ditemukan untuk pencarian "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION FOOTER --- */}
        <div className="p-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredReports.length}</span> of <span className="font-semibold text-slate-700">124</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-slate-200 rounded-md bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1 border border-indigo-600 rounded-md bg-indigo-600 text-white text-sm font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 text-sm font-medium">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 text-sm font-medium">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 text-sm font-medium">13</button>
            <button className="p-1.5 border border-slate-200 rounded-md bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* --- POPUP MODAL: GENERATE NEW REPORT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-lg">Generate New Report</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200"><X className="w-5 h-5"/></button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Report Type</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                  <option>Daily Settlement Report</option>
                  <option>Exception Summary</option>
                  <option>Weekly Master Reconciliation</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Output Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="format" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" /> PDF
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="format" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" /> Excel (CSV)
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin hidden" /> {/* Hidden by default, just for dev reference */}
                Generate Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}