const ProdukService = require("../services/produk");

async function createProduk(req, res) {
    try {
        const produkData = req.body;
        const produk = await ProdukService.createProduk(produkData);
        res.status(201).json({ produk: produk, message: "Produk berhasil dibuat" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function getProduk(req, res) {
    try {
        const produks = await ProdukService.getAllProduk();  
        if (!produks) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ produks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function getProdukById(req, res) {
    try {
        const produkId = req.params.id;
        const produk = await ProdukService.getProdukById(produkId);
        if (!produk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ success: true, produk });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


async function updateProduk(req, res) {
    try {
        const produkId = req.params.id;
        const updatedProduk = await ProdukService.updateProduk(produkId, req.body);
        if (!updatedProduk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ success: true, message: 'Produk berhasil diupdate', updatedProduk });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function deleteProduk(req, res) {
    try {
        const produkId = req.params.id;
        const deletedProduk = await ProdukService.deleteProduk(produkId);
        if (!deletedProduk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ success: true, message: 'Produk berhasil dihapus' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { createProduk, getProduk, updateProduk, deleteProduk, getProdukById };
