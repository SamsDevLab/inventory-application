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
    developerRows: developersResult.rows,
    genreRows: genresResult.rows,
  });
}

async function addGameToDatabase(req, res) {
  const newGameTitle = req.body.game;
  const developerIds = req.body.developers;
  const genreIds = req.body.genres;

  await gamesModel.addNewGameWithDetails(newGameTitle, developerIds, genreIds);

  res.redirect("/games/");
}

async function renderEditForm(req, res) {
  const gameId = req.params.id;
  const allDevelopers = await developersModel.queryAllDevelopers();
  const allGenres = await genresModel.queryAllGenres();

  // const resultsForEditing = await gamesModel.queryGameForEditing(gameId);
  res.render("games/edit", {
    title: "Edit Game",
    developers: allDevelopers,
    genres: allGenres,
  });
}

async function addEditedGameToDatabase(req, res) {
  console.log(req.params.id);
  console.log(req.body);
  // Use a query like this to overwrite existing data:
  // await db.overWriteGameDetails
  res.redirect("/games/");
}

async function deleteGame(req, res) {
  console.log(req.params.id);
  // Create query that deletes this id from Games table
  res.redirect("/games");
}

module.exports = {
  getCurrentGames,
  renderAddGameForm,
  addGameToDatabase,
  renderEditForm,
  addEditedGameToDatabase,
  deleteGame,
};
