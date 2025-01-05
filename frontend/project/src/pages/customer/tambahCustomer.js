import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUser({ onDataAdded }) {
  const [value, setValue] = useState({
    nama_customer: "",
    email: "",
    phone: "",
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
        "http://localhost:5000/apicustomer/create",
        value
      );
      const response = addUser.data;
      if (response.success) {
        console.log("Customer ID:", response.newcustomer.id);
        alert("Customer berhasil dibuat!\nNama: " + response.newcustomer.nama_customer);
        toast.success(response.Message);
        closeRef.current.click();
        setValue({ nama_customer: "", email: "", phone: "" });
        onDataAdded(response.newcustomer);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal buat customer");
    }
  };

  return (
    <>
      <div
        id="AddTablecustomer"
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        inert
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Tambah Customer</h5>
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
                  <label htmlFor="nama_customer" className="form-label">
                    Nama customer
                  </label>
                  <input
                    type="text"
                    id="nama_customer"
                    name="nama_customer"
                    value={value.nama_customer}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan nama customer"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={value.email}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={value.phone}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Masukkan telephone"
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
