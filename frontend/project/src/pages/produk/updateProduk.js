import React, { useRef } from "react";

export default function UpdatedUser({ handleOnSubmit, value, handlechange }) {
  const closeRef = useRef();

  const handleCancel = () => {
    
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  return (
    <div id="editEmployeeModal" className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit(value);
            }}
          >
            <div className="modal-header">
              <h4 className="modal-title">Edit Produk</h4>
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
                <label className="form-label">Nama Produk</label>
                <input
                  type="text"
                  value={value.nama_produk}
                  name="nama_produk"
                  onChange={handlechange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  value={value.stock}
                  name="stock"
                  onChange={handlechange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Harga</label>
                <input
                  type="number"
                  value={value.harga}
                  name="harga"
                  onChange={handlechange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
                ref={closeRef}
                onFocus={(e) => e.target.blur()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
