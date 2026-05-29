// genres router
const express = require("express");
const router = express.Router();
const { validateAddOrEditGenre } = require("../middleware/validators");
const { handleErrors } = require("../middleware/errors");
const genresController = require("../controllers/genres");

router.get("/", genresController.getAllGenres);

router.get("/add", genresController.renderAddGenreForm);
router.post(
  "/add",
  validateAddOrEditGenre,
  handleErrors,
  genresController.addGenreToDatabase,
);

router.get("/edit/:id", genresController.renderEditForm);
router.post(
  "/edit/:id",
  validateAddOrEditGenre,
  handleErrors,
  genresController.addEditedGenreToDatabase,
);

router.post("/delete/:id", genresController.deleteGenreFromDatabase);

module.exports = router;
