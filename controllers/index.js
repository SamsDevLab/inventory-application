// index controller
const db = require("../db/queries");

async function getHomepageData(req, res) {
  console.log("Retrieved all Homepage data");
  res.render("index", { title: "Homepage" });
}

module.exports = {
  getHomepageData,
};
