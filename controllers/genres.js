// genres controller
const db = require("../db/queries");

async function getAllGenres(req, res) {
  // console.log("Retrieved all Genres");
  res.render("genres");
}

module.exports = {
  getAllGenres,
};
