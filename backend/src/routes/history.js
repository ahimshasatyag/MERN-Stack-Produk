const express = require('express');
const { getHistory } = require('../controllers/history.js');
const cors = require('cors');

const history = express.Router();
history.use(cors());

history.get('/get', getHistory);

module.exports = history;
