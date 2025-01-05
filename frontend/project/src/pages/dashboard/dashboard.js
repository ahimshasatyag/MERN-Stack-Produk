import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logos.png';
import './dashboard.css';

const Dashboard = () => {

  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        setUsers(result);
        if (token)
          fetchUsers();
        else
          navigate("/login");
      } catch (error){
        console.log(error);
      }
    }
  }, [token, navigate]);

  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <section className="description">
        <p>
          <b>PT. EKA MAJU MESININDO</b> adalah perusahaan distribusi dan servis mesin grafis, pengemasan, karton box, plastik, dan peralatan terkait, yang telah melayani pasar Indonesia sejak 1982. Dengan pengalaman lebih dari 35 tahun, perusahaan ini telah memasang lebih dari 30.000 mesin dan menawarkan layanan purna jual lengkap, termasuk dukungan teknis dan konsultasi. Kami memahami kebutuhan klien akan efisiensi produksi di era modern dan menyediakan mesin manual, semi-otomatis, hingga otomatis penuh sesuai kebutuhan mereka. Dengan gudang dan bengkel utama seluas 5000 meter persegi di Jakarta serta jaringan distribusi dan penjualan yang luas di seluruh Indonesia, kami menjadi mitra terpercaya untuk mendistribusikan produk berkualitas dari Tiongkok, Hong Kong, Taiwan, dan India. Kami juga terbuka untuk kerja sama global, membantu mitra memperluas pasar ke Indonesia, yang merupakan pasar terbesar di Asia Tenggara. Mengutamakan etika bisnis, kami berkomitmen untuk menciptakan kemitraan yang baik dan berkelanjutan.
        </p>
      </section>

      <section className="vision-mission">
        <div className="vision">
          <h2>Nilai Kami</h2>
          <p>
            Kami percaya dalam menyediakan solusi terbaik bagi pelanggan. Setiap pelanggan memiliki kebutuhannya sendiri dan karenanya kami berusaha untuk menyediakan solusi terbaik bagi pelanggan kami.
          </p>
          <p>
            Kami menggunakan keahlian dan pengetahuan kami untuk memberdayakan pelanggan kami. Kami ingin berbagi pengetahuan dan tumbuh bersama dengan pelanggan kami.
          </p>
          <p>
            Kami memadukan kejujuran, integritas, dan etika bisnis ke dalam semua aspek fungsi bisnis kami.
          </p>
        </div>
        <div className="mission">
          <h2>Mengapa milih kami</h2>
          <ul>
            <li>Perusahaan kami telah berpengalaman melayani Indonesia sejak tahun 1982 di bidang distribusi dan layanan purna jual permesinan.</li>
            <li>Kami memiliki tim teknis yang mumpuni dan berpengalaman untuk membantu mengoptimalkan operasi bisnis Anda.</li>
            <li>Merupakah perusahaan yang berstandarisasi ISO9001:2015. Menjamin kualitas pelayanan kami.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard
