// developers controller
const developersModel = require("../models/developers");

async function getAllDevelopers(req, res) {
  const allDevelopers = await developersModel.queryAllDevelopers();
  res.render("developers/index", { developers: allDevelopers });
}

function renderAddDeveloperForm(req, res) {
  res.render("developers/add", { title: "Add New Developer" });
}

async function addDeveloperToDatabase(req, res) {
  const newDeveloper = req.body.developer;
  await developersModel.addDeveloper(newDeveloper);

  res.redirect("/developers");
}

async function renderEditForm(req, res) {
  const developerId = req.params.id;
  const developer = await developersModel.queryDeveloperForEditing(developerId);

  res.render("developers/edit", {
    title: "Edit Developer",
    developer: developer,
  });
}

async function addEditedDevToDatabase(req, res) {
  const developer = req.body.developer;
  const developerId = req.params.id;

  await developersModel.editDeveloper(developerId, developer);

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
