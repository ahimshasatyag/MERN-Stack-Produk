const express = require("express");
const cors = require("cors");
const {register} = require("../controllers/register");

const router = express.Router();

router.use(cors());

router.post("/login", register);

module.exports = router;