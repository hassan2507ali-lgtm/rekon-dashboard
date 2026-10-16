import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoMandiri from '../assets/mandiri-logo.png'; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* SISI KIRI: Branding & Visual (Menyesuaikan dengan Mockup) */}
      <div className="hidden lg:flex w-1/2 bg-[#0A1128] relative flex-col justify-between p-12 overflow-hidden">
        
        {/* Efek Pendaran Cahaya Ungu/Biru (Pengganti grafis gelombang jika tidak ada aset gambar) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 blur-[100px]"></div>
          {/* Fokus cahaya ungu pekat di kanan bawah */}
          <div className="absolute -bottom-[20%] -right-[10%] w-[90%] h-[90%] rounded-full bg-indigo-600/30 blur-[130px]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]"></div>
        </div>

        {/* --- Bagian Atas: Logo & Teks Utama --- */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <img 
              src={logoMandiri} 
              alt="Logo Mandiri" 
              className="h-40 w-auto object-contain" 
            />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            IRS <br/>
        
            <span className="text-indigo-400">RECONTILATION</span>
          </h1>
          <p className="text-slate-400 text-base max-w-md leading-relaxed">
            Enterprise-grade platform for matching internal ledgers with bank statements securely and efficiently.
          </p>
        </div>

        {/* --- SISI KIRI BAWAH: Avatar (Ungu, Hijau, Kuning) --- */}
        <div className="relative z-10">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#0A1128] bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">MA</div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0A1128] bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">AD</div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0A1128] bg-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">RW</div>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Form Login Bersih & Fokus */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md">
          
          {/* Logo Mandiri Cadangan Hanya Muncul di Mobile */}
          <div className="flex justify-center lg:hidden mb-10">
            <img src={logoMandiri} alt="Logo Mandiri" className="h-9 w-auto object-contain" />
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-slate-500 text-sm">Please enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email/NIP */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email or NIP</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm font-medium"
                  placeholder="name@bankmandiri.co.id"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-2">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#3B4BE8] hover:bg-[#2C3E93] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-12 text-center lg:text-left text-xs text-slate-400 font-medium leading-relaxed">
            &copy; 2026 PT Bank Mandiri (Persero) Tbk. <br className="md:hidden" /> All rights reserved. <br/>
            Secure connection authorized.
          </p>

        </div>
      </div>
    </div>
  );
}