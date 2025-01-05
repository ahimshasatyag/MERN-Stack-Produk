import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUser({ onDataAdded }) {
  const [value, setValue] = useState({
    nama_produk: "",
    stock: "",
    harga: "",
  });

  const modalRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        modalElement.removeAttribute('inert');
      });
      modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.setAttribute('inert', 'true');
      });
    }
  }, []);

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", value);
    try {
      const addUser = await axios.post(
        "http://localhost:5000/apiproduk/create",
        value
      );
      const response = addUser.data;
      if (response.success) {
        console.log("Produk ID:", response.newProduct.id);
        alert("Produk berhasil dibuat!\nNama: " + response.newProduct.nama_produk);
        toast.success(response.Message);
        closeRef.current.click();
        setValue({ nama_produk: "", stock: "", harga: "" });
        onDataAdded(response.newProduct);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <>
      <div
        id="AddTableProduk"
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        inert
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Tambah Produk</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeRef}
                  onFocus={(e) => e.target.blur()}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nama_produk" className="form-label">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    id="nama_produk"
                    name="nama_produk"
                    value={value.nama_produk}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan nama produk"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stok
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={value.stock}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan jumlah stok"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="harga" className="form-label">
                    Harga
                  </label>
                  <input
                    type="number"
                    id="harga"
                    name="harga"
                    value={value.harga}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan harga produk"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeRef}
                  onFocus={(e) => e.target.blur()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
