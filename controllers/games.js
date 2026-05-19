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

module.exports = {
  getAllGames,
  renderAddGameForm,
  addGameToDatabase,
};
