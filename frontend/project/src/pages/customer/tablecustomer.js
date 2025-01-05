import React, { useState } from 'react';
import Table from './table';
import Addcustomer from './tambahCustomer';
import Updatecustomer from './updateCustomer';
import Deletecustomer from './deleteCustomer';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function customerTable() {
  const [customerId, setcustomerId] = useState(null);
  const [updatedcustomerId, setUpdatedcustomerId] = useState(null);
  const [value, setValue] = useState({
    nama_customer: "",
    stock: "",
    harga: ""
  });

  const handleDeletecustomer = async () => {
    if (!customerId) {
      toast.error('Pilih customer yang akan dihapus');
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/apicustomer/delete/${customerId}`);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Gagal menghapus customer');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus customer');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatecustomerData = (updatedId) => {
    setUpdatedcustomerId(updatedId);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!updatedcustomerId) {
      toast.error('Pilih customer yang akan diperbarui');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/apicustomer/update/${updatedcustomerId}`, value);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Gagal memperbarui customer');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui customer');
      console.error(error);
    }
  };

  return (
    <>
      <Table 
        onDelete={setcustomerId} 
        onUpdate={handleUpdatecustomerData} 
      />
      <Addcustomer />
      <Updatecustomer 
        onSubmit={handleOnSubmit} 
        value={value} 
        onChange={handleChange} 
      />
      <Deletecustomer onDelete={handleDeletecustomer} />
    </>
  );
}
