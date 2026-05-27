const pool = require("../db/pool");
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

async function addGameToGamesTable(newGameTitle) {
  try {
    await pool.query(`INSERT INTO games (game) VALUES ($1)`, [newGameTitle]);
  } catch (error) {
    console.log(error);
  }
}

async function queryGameId(gameTitle) {
  try {
    const result = await pool.query(
      `SELECT games.id FROM games WHERE games.game = $1`,
      [gameTitle],
    );

    const gameId = result.rows[0].id;
    return gameId;
  } catch (error) {
    console.log(error);
  }
}

async function addToGameDevelopersTable(gameId, developerId) {
  try {
    await pool.query(
      `INSERT INTO game_developers (game_id, developer_id) VALUES($1, $2)`,
      [gameId, developerId],
    );
  } catch (error) {
    console.log(error);
  }
}

async function addToGameGenresTable(gameId, genreId) {
  try {
    await pool.query(
      `INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)`,
      [gameId, genreId],
    );
  } catch (error) {
    console.log(error);
  }
}

async function addNewGameWithDetails(newGameTitle, developerIds, genreIds) {
  await addGameToGamesTable(newGameTitle);
  const gameId = await queryGameId(newGameTitle);

  for (const developerId of developerIds) {
    await addToGameDevelopersTable(gameId, developerId);
  }

  for (const genreId of genreIds) {
    await addToGameGenresTable(gameId, genreId);
  }
}

module.exports = {
  getAllGamesWithDetails,
  addGameToGamesTable,
  queryGameId,
  addToGameDevelopersTable,
  addToGameGenresTable,
  addNewGameWithDetails,
};
