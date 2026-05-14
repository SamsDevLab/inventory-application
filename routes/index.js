// index router
const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");

router.get("/", indexController.getHomepageData);

module.exports = router;
