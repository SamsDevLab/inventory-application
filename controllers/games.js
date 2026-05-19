// games controller
const db = require("../db/queries");

async function getAllGames(req, res) {
  res.render("games/index", { title: "Games" });
}

function renderAddGameForm(req, res) {
  res.render("games/new", { title: "Add New Game" });
}

async function addGameToDatabase(req, res) {
  console.log(req.body);
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

module.exports = {
  getAllGames,
  renderAddGameForm,
  addGameToDatabase,
  renderEditForm,
  addEditedGameToDatabase,
};
