// genres controller
const db = require("../db/queries");

async function getAllGenres(req, res) {
  // console.log("Retrieved all Genres");
  res.render("genres/index");
}

function renderAddGenreForm(req, res) {
  res.render("genres/add", { title: "Add Genre" });
}

async function addGenreToDatabase(req, res) {
  console.log(req.body);
  // add query to send genre to DB. ex: await db.addGenre
  res.redirect("/genres");
}

module.exports = {
  getAllGenres,
  renderAddGenreForm,
  addGenreToDatabase,
};
