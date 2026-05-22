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

function renderEditForm(req, res) {
  res.render("developers/edit", { title: "Edit Developer" });
}

async function addEditedDevToDatabase(req, res) {
  console.log(req.body);
  // console.log(req.params.id);
  // add query from databse to replace values with edited dev
  res.redirect("/developers");
}

async function deleteDeveloper(req, res) {
  console.log(req.params.id);
  // Create query to delete the developer row based on id
  res.redirect("/developers");
}

module.exports = {
  getAllDevelopers,
  renderAddDeveloperForm,
  addDeveloperToDatabase,
  renderEditForm,
  addEditedDevToDatabase,
  deleteDeveloper,
};
