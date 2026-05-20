// genres router
const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genres");

router.get("/", genresController.getAllGenres);

router.get("/add", genresController.renderAddGenreForm);
router.post("/add", genresController.addGenreToDatabase);

module.exports = router;
