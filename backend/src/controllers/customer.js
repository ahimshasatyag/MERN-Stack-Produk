const customerService = require("../services/customer");

async function createcustomer(req, res) {
    try {
        const customerData = req.body;
        const customer = await customerService.createcustomer(customerData);
        res.status(201).json({ customer: customer, message: "customer berhasil dibuat" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function getcustomer(req, res) {
    try {
        const customers = await customerService.getAllcustomer();  
        if (!customers) {
            return res.status(404).json({ success: false, message: 'customer tidak ditemukan' });
        }
        res.status(200).json({ customers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function getcustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await customerService.getcustomerById(customerId);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'customer tidak ditemukan' });
        }
        res.status(200).json({ success: true, customer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


async function updatecustomer(req, res) {
    try {
        const customerId = req.params.id;
        const updatedcustomer = await customerService.updatecustomer(customerId, req.body);
        if (!updatedcustomer) {
            return res.status(404).json({ success: false, message: 'customer tidak ditemukan' });
        }
        res.status(200).json({ success: true, message: 'customer berhasil diupdate', updatedcustomer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function deletecustomer(req, res) {
    try {
        const customerId = req.params.id;
        const deletedcustomer = await customerService.deletecustomer(customerId);
        if (!deletedcustomer) {
            return res.status(404).json({ success: false, message: 'customer tidak ditemukan' });
        }
        res.status(200).json({ success: true, message: 'customer berhasil dihapus' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { createcustomer, getcustomer, updatecustomer, deletecustomer, getcustomerById };
