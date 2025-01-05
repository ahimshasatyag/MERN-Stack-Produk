import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";

export default function HistoryTable() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Ambil data dari API
  useEffect(() => {
    async function fetchPurchases() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/apipurchase/get");
        if (response.data && Array.isArray(response.data.purchases)) {
          setPurchases(response.data.purchases);
          setFilteredPurchases(response.data.purchases);
        } else {
          console.error("Gagal respon format:", response.data);
          setPurchases([]);
          setFilteredPurchases([]);
        }
      } catch (error) {
        console.error("Error mengambil pembelian:", error.message);
        setPurchases([]);
        setFilteredPurchases([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredData = purchases.filter((purchase) =>
        purchase.customer_id?.nama_customer.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPurchases(filteredData);
    } else {
      setFilteredPurchases(purchases);
    }
  };

  // Tentukan kolom tabel untuk tabel utama
  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (_, record) => record.customer_id?.nama_customer || "Unknown",
    },
    {
      title: "Total Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      render: (_, record) =>
        record.items.reduce((total, item) => total + item.quantity, 0),
    },
    {
      title: "Total Harga",
      dataIndex: "harga",
      key: "harga",
      align: "right",
      render: (_, record) =>
        `Rp ${record.items
          .reduce((total, item) => total + item.harga, 0)
          .toLocaleString()}`,
    },
  ];

  // Tentukan kolom untuk baris yang diperluas
  const expandedRowRender = (record) => {
    const innerColumns = [
      {
        title: "Product Name",
        dataIndex: "product_name",
        key: "product_name",
        render: (_, item) => item.produk_id?.nama_produk || "Unknown",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        align: "right",
      },
      {
        title: "Harga per Item",
        dataIndex: "unit_price",
        key: "unit_price",
        align: "right",
        render: (_, item) =>
          `Rp ${item.produk_id?.harga?.toLocaleString() || 0}`,
      },
      {
        title: "Total Harga",
        dataIndex: "harga",
        key: "harga",
        align: "right",
        render: (harga) => `Rp ${harga.toLocaleString()}`,
      },
    ];

    // Pastikan setiap item memiliki kunci yang unik
    const expandedDataSource = record.items.map((item, index) => ({
      ...item,
      key: item._id || index, // Add unique key untuk item
    }));

    return (
      <Table
        columns={innerColumns}
        dataSource={expandedDataSource}
        pagination={false}
      />
    );
  };

  return (
    <div className="container mt-4">
      <div className="table-wrapper card shadow">
        <div className="table-title bg-primary text-white py-3 px-4 rounded-top d-flex justify-content-between align-items-center">
          <h2>Riwayat Pembelian</h2>
          <Input.Search
            placeholder="Cari nama customer..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 250 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredPurchases.map((purchase, index) => ({
            ...purchase,
            key: purchase._id || index, // Add unique key untuk bagian purchase
          }))}
          rowKey="_id"
          expandable={{ expandedRowRender }}
          loading={loading}
        />
      </div>
    </div>
  );
}
