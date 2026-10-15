import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DashboardLayout menjadi bungkus (parent) untuk semua halaman */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Overview menjadi halaman default (index) yang tampil pertama kali */}
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;