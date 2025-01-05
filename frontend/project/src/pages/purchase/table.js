import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TablePurchase from "./tablePurchase"; 

export default function Table() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); 
  const [showPurchaseModal, setShowPurchaseModal] = useState(false); 

  // Fungsi untuk mengambil data customer
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/apicustomer/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.customers)) {
          setData(response.data.customers);
        } else {
          console.error("Invalid customer data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch customer data");
      }
    }

    fetchData();
  }, []);

  const filteredData = data.filter((customer) =>
    customer.nama_customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePurchaseClick = (customerId) => {
    setSelectedCustomerId(customerId); 
    setShowPurchaseModal(true); 
  };

  const closeModal = () => {
    setShowPurchaseModal(false);
  };

  const handleTablePurchase = (newPurchase) => {
    toast.success("Purchase added successfully");
  };

  return (
    <div className="container mt-4">
      <div className="table-wrapper card shadow">
        <div className="table-title bg-primary text-white py-3 px-4 rounded-top">
          <div className="row">
            <div className="col-sm-6">
              <h2>Data Proses Pembelian</h2>
            </div>
            <div className="col-sm-6 text-end">
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr style={{textAlign:"center"}}>
              <th>No</th>
              <th>Nama Customer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((customer, index) => (
                <tr key={customer._id || index}>
                  <td style={{textAlign:"center"}}>{index + 1}</td>
                  <td>{customer.nama_customer}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePurchaseClick(customer._id)} 
                    >
                      Beli Produk
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tampilkan Tabel Modal Pembelian jika diperlukan */}
      {showPurchaseModal && (
        <TablePurchase
          handleTablePurchase={handleTablePurchase}
          selectedCustomerId={selectedCustomerId} 
          closeModal={closeModal} 
        />
      )}
    </div>
  );
}
