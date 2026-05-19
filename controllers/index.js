// index controller
const db = require("../db/queries");

async function getHomepageData(req, res) {
  // console.log("Retrieved all Homepage data");
  res.render("index");
}

module.exports = {
  getHomepageData,
};
