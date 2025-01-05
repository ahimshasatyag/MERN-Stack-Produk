const customerModels = require("../models/customer");

async function createcustomer(customerData) {
    const { nama_customer, email, phone } = customerData;
    const newcustomer = new customerModels({ nama_customer, email, phone });

    const savedcustomer = await newcustomer.save();
    return savedcustomer;
}

async function getAllcustomer() {
    return await customerModels.find();
}

async function getcustomerById(customerId) {
    return await customerModels.findById(customerId); 
}

async function updatecustomer(customerId, updateData) {
    return await customerModels.findByIdAndUpdate(customerId, updateData, { new: true });
}

async function deletecustomer(customerId) {
    return await customerModels.findByIdAndDelete(customerId);
}

module.exports = {
    createcustomer,
    getAllcustomer,
    updatecustomer,
    getcustomerById,
    deletecustomer
};
