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

function renderEditForm(req, res) {
  res.render("genres/edit", { title: "Edit Genre" });
}

async function addEditedGenreToDatabase(req, res) {
  console.log(req.body);
  console.log(req.params.id);
  // add query from databse to replace values with edited dev
  res.redirect("/genres");
}

module.exports = {
  getAllGenres,
  renderAddGenreForm,
  addGenreToDatabase,
  renderEditForm,
  addEditedGenreToDatabase,
};
