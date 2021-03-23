var express = require("express");
var router = express.Router();

// Require controllers
var user_controller = require("../controllers/userController");

// POST request for creating a new post
router.post("/register", user_controller.create);

// POST request for creating a new post
router.post("/login", user_controller.login);

router.post("/authenticate", user_controller.authenticate);

module.exports = router;
