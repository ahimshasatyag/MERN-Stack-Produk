const crypto = require("crypto");

// Hasil random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
    secretKey: secretKey
};