import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TablePurchase({ handleTablePurchase, selectedCustomerId, closeModal }) {
  const [value, setValue] = useState({
    customer_id: "",
    items: [], 
  });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [produks, setProduks] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProdukData() {
      try {
        const produkResponse = await axios.get("http://localhost:5000/apiproduk/get");
        if (Array.isArray(produkResponse.data.produks)) {
          setProduks(produkResponse.data.produks);
        } else {
          console.error("Invalid produk data structure:", produkResponse.data);
        }
      } catch (error) {
        console.error("Error fetching produk data:", error);
        toast.error("Failed to fetch product data from server");
      }
    }
    fetchProdukData();
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      async function fetchCustomer() {
        try {
          const response = await axios.get(`http://localhost:5000/apicustomer/get/${selectedCustomerId}`);
          if (response.data.customer) {
            setValue((prevValue) => ({
              ...prevValue,
              customer_id: response.data.customer._id, 
            }));
          } else {
            console.error("Customer not found");
            toast.error("Customer data not found");
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
          toast.error("Failed to fetch customer data");
        }
      }
      fetchCustomer();
    }
  }, [selectedCustomerId]);

  const handleAddItem = () => {
    const product = produks.find((produk) => produk.nama_produk === selectedProduct);
    if (product && quantity > 0) {
      const harga = product.harga * quantity;

      setValue((prevValue) => ({
        ...prevValue,
        items: [
          ...prevValue.items,
          {
            produk_id: product._id,
            quantity,
            harga,
          },
        ],
      }));
      setTotal((prevTotal) => prevTotal + harga);
      setSelectedProduct("");
      setQuantity(0);
    } else {
      toast.error("Please select a product and enter a valid quantity");
    }
  };

  const handleRemoveItem = (index) => {
    const itemToRemove = value.items[index];
    setValue((prevValue) => ({
      ...prevValue,
      items: prevValue.items.filter((_, i) => i !== index),
    }));
    setTotal((prevTotal) => prevTotal - itemToRemove.harga);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/apipurchase/create", value);
      if (response.data.message === "Purchase berhasil dibuat") {
        toast.success("Purchase added successfully");
        handleTablePurchase(response.data.purchase);
        closeModal();
      } else {
        toast.error("Failed to add purchase");
      }
    } catch (error) {
      console.error("Error submitting purchase:", error);
      toast.error("Failed to add purchase");
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Purchase</h5>
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="nama_customer" className="form-label">Nama Customer</label>
                <input type="text" id="nama_customer" name="nama_customer" value={selectedCustomerId} className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="nama_produk" className="form-label">Nama Produk</label>
                <select
                  id="nama_produk"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Pilih Produk</option>
                  {produks.map((produk) => (
                    <option key={produk._id} value={produk.nama_produk}>{produk.nama_produk}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="form-control"
                  required
                />
              </div>
              <button type="button" className="btn btn-success mb-3" onClick={handleAddItem}>Add Item</button>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">Total Harga</label>
                <input type="number" id="total" value={total} className="form-control" readOnly />
              </div>
              <ul>
                {value.items.map((item, index) => (
                  <li key={index}>
                    {item.produk_id}: {item.quantity} x Rp{item.harga} <button type="button" className="btn btn-sm btn-danger ms-2" onClick={() => handleRemoveItem(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="submit" className="btn btn-primary">Purchase</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
