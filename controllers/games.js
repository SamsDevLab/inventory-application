// games controller
const db = require("../db/queries");

async function getAllGames(req, res) {
  const result = await db.queryAllGames();
  res.render("games/index", { title: "Games", rows: result.rows });
}

async function renderAddGameForm(req, res) {
  const developersResult = await db.queryAllDevelopers();
  const genresResult = await db.queryAllGenres();

  res.render("games/add", {
    title: "Add New Game",
    developerRows: developersResult.rows,
    genreRows: genresResult.rows,
  });
}

async function addGameToDatabase(req, res) {
  console.log(req.body);
  /* for the queries think about:
  – Does the req.body contain a developer/developers
  - a genre/genres
  – If so you'll have to INSERT INTO game_genres and game_developers as well with
  this set of queries.
  – If not, you'll just INSERT INTO the games table
  */
  res.redirect("/games/");
}

async function renderEditForm(req, res) {
  // console.log(req.params.id);
  // const queryResults = await db.queryGameById(req.params.id)
  res.render("games/edit", { title: "Edit Game" });
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
  getAllGames,
  renderAddGameForm,
  addGameToDatabase,
  renderEditForm,
  addEditedGameToDatabase,
  deleteGame,
};
