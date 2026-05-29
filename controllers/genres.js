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

async function renderEditForm(req, res) {
  const genreId = req.params.id;
  const genre = await genresModel.queryGenreForEditing(genreId);

  res.render("genres/edit", { title: "Edit Genre", genre: genre });
}

async function addEditedGenreToDatabase(req, res) {
  const genreId = Number(req.params.id);
  const genre = req.body.genre;

  await genresModel.editGenre(genreId, genre);

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
