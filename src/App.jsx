import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import DetailRekon from './pages/DetailRekon';
import Reporting from './pages/Reporting';
import RekonResult from './pages/RekonResult';
import Resolution from './pages/Resolution'; // 1. Tambahkan import ini
import Login from './pages/Login';
import Settings from './pages/Settings';

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
          <Route path="settings" element={<Settings />} /> 
          <Route path="resolution" element={<Resolution />} /> {/* 2. Tambahkan rute ini */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;