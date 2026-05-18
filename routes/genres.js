// genres router
const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genres");

router.get("/", genresController.getAllGenres);

module.exports = router;
