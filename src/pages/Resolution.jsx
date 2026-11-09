import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, AlertOctagon, Database, Landmark, 
  CheckCircle2, Save, AlertTriangle, FileText
} from 'lucide-react';

export default function Resolution() {
  const location = useLocation();
  const navigate = useNavigate();

  // Tangkap data yang dikirim dari halaman Overview
  const alertDetail = location.state?.alertDetail;

  // State untuk form resolusi
  const [actionType, setActionType] = useState('');
  const [auditNotes, setAuditNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  // --- DATA TRANSAKSI DINAMIS ---
  // Jika masuk dari klik Alert di Overview, pakai data alertDetail. Jika dari Sidebar, pakai dummy default.
  const trxData = {
    id: alertDetail?.title || 'TRX-ECOH1-9988',
    date: '12 Oct 2026',
    errorType: alertDetail ? 'Amount Mismatch (Simulated Error)' : 'Amount Mismatch (Fee Difference)',
    internal: {
      system: alertDetail?.module ? `${alertDetail.module} (${alertDetail.server})` : 'ECO H1 (E-Channel Ops)',
      refNo: `INT-${alertDetail?.title ? alertDetail.title.slice(-4) : '9988'}-ABC`,
      time: alertDetail?.time || '08:14:22',
      account: '1122334455',
      amount: 'Rp 1.500.000', // Nominal Internal
    },
    bank: {
      system: alertDetail?.server ? `Mutasi Bank Server ${alertDetail.server}` : 'Mutasi Bank BNI',
      refNo: `BNK-${alertDetail?.title ? alertDetail.title.slice(-4) : '099'}-XYZ`,
      time: alertDetail?.time || '08:15:01',
      account: '1122334455',
      amount: 'Rp 1.502.500', // Nominal Bank (Selisih 2.500)
    }
  };

  const handleResolve = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi hit API ke backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsResolved(true);
    }, 1500);
  };

  if (isResolved) {
    return (
      <div className="max-w-4xl mx-auto mt-20 bg-white p-10 rounded-2xl border border-slate-200 shadow-xl text-center animate-in zoom-in-95">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Transaksi Resolved!</h2>
        <p className="text-slate-500 mb-8">Transaksi {trxData.id} telah berhasil disesuaikan dengan status "{actionType}".</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Exception Resolution</h1>
            <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5" /> Unmatched
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Selesaikan selisih atau anomali data sebelum closing harian.</p>
        </div>
      </div>

      {/* 2. ALERT STATUS BAR */}
      <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl shadow-sm mb-6 flex items-start gap-4">
        <div className="p-2 bg-rose-100 rounded-full shrink-0">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <h3 className="font-bold text-rose-900 text-lg">System Alert: {trxData.errorType}</h3>
          <p className="text-sm text-rose-700 mt-1">
            Transaksi <strong>{trxData.id}</strong> terdeteksi memiliki selisih nominal antara pencatatan internal dan mutasi bank. Harap lakukan pengecekan manual.
          </p>
        </div>
      </div>

      {/* 3. SPLIT SCREEN COMPARISON (INTERNAL VS BANK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* PANEL KIRI: Internal Data */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-lg">Internal Ledger</h2>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sistem / Modul</p>
              <p className="font-medium text-slate-900">{trxData.internal.system}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reference No.</p>
              <p className="font-medium text-slate-900">{trxData.internal.refNo}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Waktu Transaksi</p>
              <p className="font-medium text-slate-900">{trxData.date} • {trxData.internal.time}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nomor Rekening</p>
              <p className="font-medium text-slate-900">{trxData.internal.account}</p>
            </div>
            
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg mt-4">
              <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Nominal (Amount)</p>
              <p className="text-2xl font-black text-rose-700">{trxData.internal.amount}</p>
            </div>
          </div>
        </div>

        {/* PANEL KANAN: Bank Data */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-800 text-lg">Bank Statement</h2>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sistem / Modul</p>
              <p className="font-medium text-slate-900">{trxData.bank.system}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reference No.</p>
              <p className="font-medium text-slate-900">{trxData.bank.refNo}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Waktu Transaksi</p>
              <p className="font-medium text-slate-900">{trxData.date} • {trxData.bank.time}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nomor Rekening</p>
              <p className="font-medium text-slate-900">{trxData.bank.account}</p>
            </div>
            
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg mt-4">
              <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Nominal (Amount)</p>
              <p className="text-2xl font-black text-rose-700">{trxData.bank.amount}</p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. FORM RESOLUSI (ACTION PANEL) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
          <FileText className="w-5 h-5 text-slate-600" />
          <h2 className="font-bold text-slate-800 text-lg">Resolution Action</h2>
        </div>
        
        <form onSubmit={handleResolve} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Kiri: Pilihan Aksi */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tindakan Resolusi (Action Type) *</label>
              <div className="space-y-3">
                {[
                  { id: 'force-match', label: 'Force Match (Sesuaikan dengan Bank)', desc: 'Mengubah nominal internal mengikuti data mutasi bank.' },
                  { id: 'write-off', label: 'Write-off (Biaya Admin/Selisih Kecil)', desc: 'Memasukkan selisih ke dalam akun kerugian/biaya.' },
                  { id: 'refund', label: 'Proses Refund / Reversal', desc: 'Kembalikan dana atau batalkan transaksi di internal.' },
                ].map((act) => (
                  <label key={act.id} className={`flex items-start p-3 border rounded-xl cursor-pointer transition-all ${actionType === act.label ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input 
                      type="radio" 
                      name="actionType" 
                      value={act.label} 
                      onChange={(e) => setActionType(e.target.value)} 
                      className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600"
                      required
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-bold text-slate-900">{act.label}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{act.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Kanan: Catatan Audit & Tombol Submit */}
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-slate-700 mb-2">Catatan Audit (Audit Notes) *</label>
              <textarea 
                required
                value={auditNotes}
                onChange={(e) => setAuditNotes(e.target.value)}
                placeholder="Jelaskan alasan resolusi ini dilakukan. Cth: Selisih Rp 2.500 dikarenakan biaya admin transfer antar bank..."
                className="w-full flex-1 p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none mb-6"
              ></textarea>

              <div className="flex items-center gap-3 mt-auto">
                <button 
                  type="button" 
                  onClick={() => navigate(-1)}
                  className="px-5 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors w-1/3"
                >
                  Batalkan
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !actionType}
                  className={`px-5 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 flex-1 ${isSubmitting || !actionType ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isSubmitting ? 'Memproses Data...' : (
                    <>
                      <Save className="w-4 h-4" /> Execute Resolution
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}