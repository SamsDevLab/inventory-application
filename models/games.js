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

  const gamesWithFullData = [];

  allGames.forEach((game) => {
    let developers = [];
    let genres = [];
    let currentGame = { ...game, developers, genres };

    gameDevelopers.forEach((developer) => {
      if (developer.game_id === currentGame.id) {
        developers.push(developer.developer);
        currentGame = {
          ...currentGame,
        };
      } else return;
    });

    gameGenres.forEach((genre) => {
      if (genre.game_id === currentGame.id) {
        genres.push(genre.genre);
        currentGame = {
          ...currentGame,
        };
      } else return;
    });

    gamesWithFullData.push(currentGame);
  });

  return gamesWithFullData;
}

module.exports = { getAllGamesWithDetails };
