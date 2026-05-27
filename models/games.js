const pool = require("./pool");
const genreModel = require("../models/genres");
const developerModel = require("../models/developers");

async function queryCurrentGames() {
  const allGames = await pool.query(`SELECT * FROM games`);
  return allGames.rows;
}

async function getAllGamesWithDetails() {
  const allGames = await queryCurrentGames();
  const gameGenres = await genreModel.queryGenresForCurrentGames();
  const gameDevelopers = await developerModel.queryDevelopersForCurrentGames();
}

module.exports = { getAllGamesWithDetails };
