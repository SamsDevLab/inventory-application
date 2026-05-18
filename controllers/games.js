// games controller
const db = require("../db/queries");

async function getAllGames(req, res) {
  res.render("games", { title: "Games" });
}

module.exports = {
  getAllGames,
};
