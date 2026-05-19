// games router
const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAllGames);
router.get("/new", gamesController.renderAddGameForm);
router.post("/new", gamesController.addGameToDatabase);

module.exports = router;
