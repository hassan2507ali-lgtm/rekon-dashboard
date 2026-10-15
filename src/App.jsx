import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import DetailRekon from './pages/DetailRekon';
import Reporting from './pages/Reporting';
import RekonResult from './pages/RekonResult';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DashboardLayout membungkus semua halaman agar Sidebar dan Header tetap ada */}
        <Route path="/" element={<DashboardLayout />}>
          
          {/* Halaman default (Overview) saat user membuka localhost:5173/ */}
          <Route index element={<Overview />} />
          
          {/* Halaman Reporting */}
          <Route path="reporting" element={<Reporting />} />
          
          {/* Halaman Detail Rekon */}
          <Route path="detail-rekon" element={<DetailRekon />} />
          
          {/* Halaman Rekon Result */}
          <Route path="rekon-result" element={<RekonResult />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;