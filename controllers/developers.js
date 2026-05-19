// developers controller
const db = require("../db/queries");

async function getAllDevelopers(req, res) {
  // console.log("Retrieved all Developers");
  res.render("developers/index");
}

module.exports = {
  getAllDevelopers,
};
