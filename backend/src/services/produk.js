const ProdukModels = require("../models/produk");

async function createProduk(produkData) {
    const { nama_produk, stock, harga } = produkData;
    const newProduk = new ProdukModels({ nama_produk, stock, harga });

    const savedProduk = await newProduk.save();
    return savedProduk;
}

async function getAllProduk() {
    return await ProdukModels.find();
}

async function getProdukById(produkId) {
    return await ProdukModels.findById(produkId); 
}

async function updateProduk(produkId, updateData) {
    return await ProdukModels.findByIdAndUpdate(produkId, updateData, { new: true });
}

async function deleteProduk(produkId) {
    return await ProdukModels.findByIdAndDelete(produkId);
}

module.exports = {
    createProduk,
    getAllProduk,
    updateProduk,
    getProdukById,
    deleteProduk
};
