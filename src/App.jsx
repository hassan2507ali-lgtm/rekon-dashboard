import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import DetailRekon from './pages/DetailRekon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DashboardLayout membungkus semua halaman */}
        <Route path="/" element={<DashboardLayout />}>
          
          {/* Halaman default (Overview) */}
          <Route index element={<Overview />} />
          
          {/* Halaman Detail Rekon */}
          <Route path="detail-rekon" element={<DetailRekon />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;