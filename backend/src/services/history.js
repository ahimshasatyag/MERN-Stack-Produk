const historyModels = require("../models/history");
const mongoose = require("mongoose");

async function getAllHistory() {
    const histories = await historyModels.find()
        .populate('customer_id', 'nama_customer')
        .populate('purchase_id')
        .populate('produk_id', 'nama_produk');
    return histories;
}

module.exports = {
    getAllHistory
};
