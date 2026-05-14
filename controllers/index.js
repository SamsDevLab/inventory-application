// index controller
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getHomepageData() {
  const data = await db.getAllData();
  res.render("index", { title: "Game Inventory Manager", data: data });
}
