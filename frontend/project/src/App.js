import './App.css';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "./pages/header/header";
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import Dashboard from './pages/dashboard/dashboard';
import Index from './pages/Index';
import TableProduk from './pages/produk/table';
import TableCustomer from './pages/customer/table';
import TablePurchase from './pages/purchase/table';
import TableHistory from './pages/history/history';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  // Menggunakan useLocation untuk mendapatkan informasi lokasi saat ini
  const location = useLocation();

  return (
    <>
      {/* Menampilkan Header hanya jika path bukan /login atau /register */}
      {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' && <Header />}
      
      <Routes>

        <Route path='/login' element={<Login />} />
        
        <Route path='/register' element={<Register />} />
        
        <Route path='/' element={<Index />} />
        
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/produk' element={<TableProduk />}></Route>
          
        <Route path='/customer' element={<TableCustomer />}></Route>

        <Route path='/purchase' element={<TablePurchase />}></Route>

        <Route path='/history' element={<TableHistory />}></Route>
        
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
