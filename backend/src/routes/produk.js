const express = require('express');
const { createProduk, getProduk, getProdukById, updateProduk, deleteProduk } = require('../controllers/produk.js');
const cors = require('cors');

const produk = express.Router();
produk.use(cors());

produk.post('/create', createProduk); 
produk.get('/get', getProduk);
produk.get('/get/:id', getProdukById);
produk.put('/update/:id', updateProduk);
produk.delete('/delete/:id', deleteProduk);

module.exports = produk;
