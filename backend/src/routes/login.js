const express = require("express");
const loginController = require("../controllers/login");

const router = express.Router();

router.post("/register", loginController.createUser);

module.exports = router;