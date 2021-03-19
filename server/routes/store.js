var express = require("express");
var router = express.Router();

// Require controllers
var store_controller = require("../controllers/storeController");

router.post("/prices", store_controller.getPrices);

module.exports = router;
