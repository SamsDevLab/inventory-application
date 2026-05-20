// games router
const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAllGames);

router.get("/add", gamesController.renderAddGameForm);
router.post("/add", gamesController.addGameToDatabase);

router.get("/edit/:id", gamesController.renderEditForm);
router.post("/edit/:id", gamesController.addEditedGameToDatabase);

module.exports = router;
