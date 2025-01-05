import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTableProduk from "./tambahProduk";
import DeleteProduk from "./deleteProduk";
import Edit from "./updateProduk"; 

export default function Table() {
  const [data, setData] = useState([]); 
  const [deleteProductId, setDeleteProductId] = useState(null); 
  const [editProduct, setEditProduct] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah baris per halaman

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/apiproduk/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data);
        if (Array.isArray(response.data.produks)) {
          setData(response.data.produks);
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

  // Filter data berdasarkan nama produk
  const filteredData = data.filter((product) =>
    product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menentukan indeks awal dan akhir dari data yang ditampilkan
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const addProduct = (newProduct) => {
    setData((prevData) => [...prevData, newProduct]); 
  };

  const handleDelete = async () => {
    try {
      if (deleteProductId) {
        await axios.delete(`http://localhost:5000/apiproduk/delete/${deleteProductId}`);
        setData(data.filter((product) => product._id !== deleteProductId)); 
        setDeleteProductId(null); 

        alert("Produk berhasil dihapus!");

        console.log("Deleted product:", deleteProductId);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product); 
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:5000/apiproduk/update/${updatedProduct._id}`, updatedProduct);

      setData((prevData) =>
        prevData.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
      );

      alert("Produk berhasil diupdate!");

      console.log("Updated product:", updatedProduct);

      setEditProduct(null); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Fungsi untuk mengubah halaman yang aktif
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      <div className="container mt-4">
        <div className="table-wrapper card shadow">
          <div className="table-title bg-primary text-white py-3 px-4 rounded-top">
            <div className="row">
              <div className="col-sm-6">
                <h2>Data Produk</h2>
              </div>
              <div className="col-sm-6 text-end">
                <a
                  href="#"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#AddTableProduk"
                >
                  <i className="material-icons">&#xE147;</i> <span>Buat Produk Baru</span>
                </a>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="px-4 py-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan nama produk..."
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
              <tr style={{ textAlign: "center" }}>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Stok</th>
                <th>Harga</th>
                <th style={{ textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((elem, index) => (
                  <tr key={elem._id || index}>
                    <td style={{ textAlign: "center" }}>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    <td>{elem.nama_produk}</td>
                    <td style={{ textAlign: "center" }}>{elem.stock}</td>
                    <td style={{ textAlign: "center" }}>{elem.harga}</td>
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
                        onClick={() => setDeleteProductId(elem._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
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

      <AddTableProduk addProduct={addProduct} />
      <DeleteProduk handleUserDelet={handleDelete} />

      {editProduct && (
        <Edit
          handleOnSubmit={handleUpdate}
          value={editProduct}
          handlechange={(e) => {
            setEditProduct({
              ...editProduct,
              [e.target.name]: e.target.value,
            });
          }}
        />
      )}
    </>
  );
}
