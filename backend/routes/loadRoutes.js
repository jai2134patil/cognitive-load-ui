const express = require("express");
const router = express.Router();

const controller = require("../controllers/loadController");

router.post("/", controller.calculateLoad);

module.exports = router;