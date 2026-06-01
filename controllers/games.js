// games controller
const gamesModel = require("../models/games");
const developersModel = require("../models/developers");
const genresModel = require("../models/genres");

async function getCurrentGames(req, res) {
  const gamesWithAllDetails = await gamesModel.getAllGamesWithDetails();
  res.render("games/index", { title: "Games", rows: gamesWithAllDetails });
}

async function renderAddGameForm(req, res) {
  const developersResult = await developersModel.queryAllDevelopers();
  const genresResult = await genresModel.queryAllGenres();

  res.render("games/add", {
    title: "Add New Game",
    developerRows: developersResult,
    genreRows: genresResult,
  });
}

async function addGameToDatabase(req, res) {
  const newGameTitle = req.body.game;
  const gameImgUrl = req.body.gameImgUrl;
  const developerIds = req.body.developers;
  const genreIds = req.body.genres;

  await gamesModel.addNewGameWithDetails(
    newGameTitle,
    gameImgUrl,
    developerIds,
    genreIds,
  );

  res.redirect("/games/");
}

async function renderEditForm(req, res) {
  const gameId = req.params.id;
  const gameData = await gamesModel.queryGameForEditing(gameId);

  res.render("games/edit", {
    title: "Edit Game",
    gameData: gameData,
  });
}

async function addEditedGameToDatabase(req, res) {
  const gameDetails = req.body;
  await gamesModel.editGameDetails(gameDetails);

  res.redirect("/games/");
}

async function deleteGameFromDatabase(req, res) {
  const gameId = Number(req.params.id);
  await gamesModel.deleteGame(gameId);

  res.redirect("/games");
}

module.exports = {
  getCurrentGames,
  renderAddGameForm,
  addGameToDatabase,
  renderEditForm,
  addEditedGameToDatabase,
  deleteGameFromDatabase,
};
