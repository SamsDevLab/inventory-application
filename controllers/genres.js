// genres controller
const genresModel = require("../models/genres");

async function getAllGenres(req, res) {
  const result = await genresModel.queryAllGenres();
  res.render("genres/index", { genres: result });
}

function renderAddGenreForm(req, res) {
  res.render("genres/add", { title: "Add Genre" });
}

async function addGenreToDatabase(req, res) {
  const genre = req.body.genre;
  await genresModel.addGenre(genre);

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

async function deleteGenre(req, res) {
  console.log(req.params.id);
  // add query that deletes the row id from the database
  res.redirect("/genres");
}

module.exports = {
  getAllGenres,
  renderAddGenreForm,
  addGenreToDatabase,
  renderEditForm,
  addEditedGenreToDatabase,
  deleteGenre,
};
