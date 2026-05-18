// developers router
const express = require("express");
const router = express.Router();
const developersController = require("../controllers/developers");

router.get("/", developersController.getAllDevelopers);

module.exports = router;
