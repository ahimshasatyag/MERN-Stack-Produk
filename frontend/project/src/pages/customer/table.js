import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTablecustomer from "./tambahCustomer";
import Deletecustomer from "./deleteCustomer";
import Edit from "./updateCustomer"; 

export default function Table() {
  const [data, setData] = useState([]); 
  const [deletecustomerId, setDeletecustomerId] = useState(null); 
  const [editcustomer, setEditcustomer] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah baris per halaman

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/apicustomer/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data);
        if (Array.isArray(response.data.customers)) {
          setData(response.data.customers);
        } else {
          console.error("Data format invalid. Expected array.");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    }

    fetchData();
  }, []);

  // Filter data berdasarkan nama customer
  const filteredData = data.filter((customer) =>
    customer.nama_customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menentukan indeks awal dan akhir dari data yang ditampilkan
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Fungsi untuk mengubah halaman yang aktif
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset halaman ke 1 saat baris per halaman diubah
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const addcustomer = (newcustomer) => {
    setData((prevData) => [...prevData, newcustomer]); 
  };

  const handleDelete = async () => {
    try {
      if (deletecustomerId) {
        await axios.delete(`http://localhost:5000/apicustomer/delete/${deletecustomerId}`);
        setData(data.filter((customer) => customer._id !== deletecustomerId)); 
        setDeletecustomerId(null); 

        alert("customer berhasil dihapus!");

        console.log("Deleted customer:", deletecustomerId);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEdit = (customer) => {
    setEditcustomer(customer); 
  };

  const handleUpdate = async (updatedcustomer) => {
    try {
      await axios.put(`http://localhost:5000/apicustomer/update/${updatedcustomer._id}`, updatedcustomer);

      setData((prevData) =>
        prevData.map((customer) => (customer._id === updatedcustomer._id ? updatedcustomer : customer))
      );

      alert("customer berhasil diupdate!");

      console.log("Updated customer:", updatedcustomer);

      setEditcustomer(null); 
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="table-wrapper card shadow">
          <div className="table-title bg-primary text-white py-3 px-4 rounded-top">
            <div className="row">
              <div className="col-sm-6">
                <h2>Data Customer</h2>
              </div>
              <div className="col-sm-6 text-end">
                <a
                  href="#"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#AddTablecustomer"
                >
                  <i className="material-icons">&#xE147;</i> <span>Add New Customer</span>
                </a>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="px-4 py-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan nama customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Baris Per Halaman */}
          <div className="px-4 py-2">
            <label>Rows per page:</label>
            <select
              className="form-control d-inline-block w-auto"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr style={{textAlign:"center"}}>
                <th>No</th>
                <th>Nama customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{textAlign:"left"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((elem, index) => (
                  <tr key={elem._id || index}>
                    <td style={{textAlign:"center"}}>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    <td>{elem.nama_customer}</td>
                    <td style={{textAlign:"center"}}>{elem.email}</td>
                    <td style={{textAlign:"center"}}>{elem.phone}</td>
                    <td>
                      <a
                        href="#"
                        className="edit text-warning me-2"
                        data-bs-toggle="tooltip"
                        title="Edit"
                        onClick={() => handleEdit(elem)} 
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                      <a
                        href="#"
                        className="delete text-danger"
                        data-bs-toggle="tooltip"
                        title="Delete"
                        onClick={() => setDeletecustomerId(elem._id)} 
                        data-bs-toggle="modal"
                        data-bs-target="#deletecustomerModal"
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="d-flex justify-content-center py-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(1)}>
                  Utama
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Sebelum
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page + 1}
                  className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(totalPages)}
                >
                  Last
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AddTablecustomer addcustomer={addcustomer} />

      <Deletecustomer handleUserDelet={handleDelete} />

      {editcustomer && (
        <Edit
          handleOnSubmit={handleUpdate} 
          value={editcustomer} 
          handlechange={(e) => {
            setEditcustomer({
              ...editcustomer,
              [e.target.name]: e.target.value,
            });
          }} 
        />
      )}
    </>
  );
}
