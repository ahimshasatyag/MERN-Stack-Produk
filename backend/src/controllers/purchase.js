const purchaseService = require('../services/purchase');

async function createPurchase(req, res) {
    try {
        const purchaseData = req.body;
        const purchase = await purchaseService.createPurchase(purchaseData);
        res.status(201).json({ purchase, message: 'Purchase berhasil dibuat' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

async function getPurchase(req, res) {
    try {
        const purchases = await purchaseService.getAllPurchase(); 
        if (!purchases) {
            return res.status(404).json({ success: false, message: 'purchase tidak ditemukan' });
        }
        res.status(200).json({ purchases });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports = { createPurchase, getPurchase };
