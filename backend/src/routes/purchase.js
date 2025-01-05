const express = require('express');
const { createPurchase, getPurchase } = require('../controllers/purchase.js');
const cors = require('cors');

const purchase = express.Router();
purchase.use(cors());

purchase.post('/create', createPurchase);
purchase.get('/get', getPurchase);

module.exports = purchase;
