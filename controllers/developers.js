// developers controller
const db = require("../db/queries");

async function getAllDevelopers(req, res) {
  console.log("Retrieved all Developers");
  res.render("developers", { title: "Developers" });
}

module.exports = {
  getAllDevelopers,
};
