const express = require('express');
const { createcustomer, getcustomer, getcustomerById, updatecustomer, deletecustomer } = require('../controllers/customer.js');
const cors = require('cors');

const customer = express.Router();
customer.use(cors());

customer.post('/create', createcustomer); 
customer.get('/get', getcustomer);
customer.get('/get/:id', getcustomerById);
customer.put('/update/:id', updatecustomer);
customer.delete('/delete/:id', deletecustomer);

module.exports = customer;
