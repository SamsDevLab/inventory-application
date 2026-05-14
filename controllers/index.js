// index controller
const db = require("../db/queries");

async function getHomepageData() {
  const data = await db.getAllData();
  res.render("index", { title: "Game Inventory Manager", data: data });
}

module.exports = {
  getHomepageData,
};
