const Purchase = require("../models/purchase");  
const Produk = require("../models/produk");  

async function createPurchase(purchaseData) {
    const { customer_id, items } = purchaseData; 

    // Pastikan harga dihitung untuk setiap item
    const updatedItems = await Promise.all(items.map(async (item) => {
        const produk = await Produk.findById(item.produk_id); 
        if (produk) {
            item.harga = produk.harga * item.quantity; 
        }
        return item;
    }));

    const newPurchase = new Purchase({ 
        customer_id,
        items: updatedItems
    });

    const savedPurchase = await newPurchase.save();
    return savedPurchase;
}

async function getAllPurchase() {
    const purchases = await Purchase.find() 
        .populate('customer_id', 'nama_customer')
        .populate('items.produk_id', 'nama_produk harga'); 
    return purchases;
}

module.exports = {
    createPurchase, getAllPurchase
};

