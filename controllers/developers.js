// developers controller
const db = require("../db/queries");

async function getAllDevelopers(req, res) {
  // console.log("Retrieved all Developers");
  res.render("developers/index");
}

function renderAddDeveloperForm(req, res) {
  res.render("developers/add", { title: "Add New Developer" });
}
async function addDeveloperToDatabase(req, res) {
  // console.log(req.body);
  // add query to send dev to DB. ex: await db.addDeveloper
  res.redirect("/developers");
}

module.exports = {
  getAllDevelopers,
  renderAddDeveloperForm,
  addDeveloperToDatabase,
};
