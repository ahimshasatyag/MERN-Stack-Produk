import React, { useState } from 'react';
import Table from './table';
import AddProduk from './tambahProduk';
import UpdateProduk from './updateProduk';
import DeleteProduk from './deleteProduk';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProdukTable() {
  const [produkId, setProdukId] = useState(null);
  const [updatedProdukId, setUpdatedProdukId] = useState(null);
  const [value, setValue] = useState({
    nama_produk: "",
    stock: "",
    harga: ""
  });

  const handleDeleteProduk = async () => {
    if (!produkId) {
      toast.error('Pilih produk yang akan dihapus');
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/apiproduk/delete/${produkId}`);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Gagal menghapus produk');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus produk');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProdukData = (updatedId) => {
    setUpdatedProdukId(updatedId);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!updatedProdukId) {
      toast.error('Pilih produk yang akan diperbarui');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/apiproduk/update/${updatedProdukId}`, value);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Gagal memperbarui produk');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui produk');
      console.error(error);
    }
  };

  return (
    <>
      <Table 
        onDelete={setProdukId} 
        onUpdate={handleUpdateProdukData} 
      />
      <AddProduk />
      <UpdateProduk 
        onSubmit={handleOnSubmit} 
        value={value} 
        onChange={handleChange} 
      />
      <DeleteProduk onDelete={handleDeleteProduk} />
    </>
  );
}
