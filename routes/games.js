// games router
const express = require("express");
const router = express.Router();
const { validateAddGame } = require("../middleware/validators");
const { handleErrors } = require("../middleware/errors");
const gamesController = require("../controllers/games");

router.get("/", gamesController.getCurrentGames);

router.get("/add", gamesController.renderAddGameForm);
router.post(
  "/add",
  validateAddGame,
  handleErrors,
  gamesController.addGameToDatabase,
);

router.get("/edit/:id", gamesController.renderEditForm);
router.post(
  "/edit/:id",
  validateAddGame,
  handleErrors,
  gamesController.addEditedGameToDatabase,
);

router.post("/delete/:id", gamesController.deleteGame);

module.exports = router;
