// genres router
const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genres");

router.get("/", genresController.getAllGenres);

router.get("/add", genresController.renderAddGenreForm);
router.post("/add", genresController.addGenreToDatabase);

router.get("/edit/:id", genresController.renderEditForm);
router.post("/edit/:id", genresController.addEditedGenreToDatabase);

module.exports = router;
