import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import DetailRekon from './pages/DetailRekon';
import Reporting from './pages/Reporting';
import RekonResult from './pages/RekonResult';
import Login from './pages/Login';
import Settings from './pages/Settings'; // 1. Tambahkan import ini

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="reporting" element={<Reporting />} />
          <Route path="detail-rekon" element={<DetailRekon />} />
          <Route path="rekon-result" element={<RekonResult />} />
          <Route path="settings" element={<Settings />} /> {/* 2. Tambahkan rute ini */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;