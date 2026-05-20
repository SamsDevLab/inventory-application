// developers router
const express = require("express");
const router = express.Router();
const developersController = require("../controllers/developers");

router.get("/", developersController.getAllDevelopers);

router.get("/add", developersController.renderAddDeveloperForm);
router.post("/add", developersController.addDeveloperToDatabase);

module.exports = router;
