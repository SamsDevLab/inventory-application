const pool = require("./pool");

// General rule: if it has been commented out it has already been migrated

async function addGameToGamesTable(newGameTitle) {
  try {
    await pool.query(`INSERT INTO games (game) VALUES ($1)`, [newGameTitle]);
  } catch (error) {
    console.log(error);
  }
}

async function queryGameId(gameTitle) {
  try {
    console.log(gameTitle);
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

module.exports = {
  // queryAllGames,
  // queryCurrentGames,
  // queryCurrentGenres,
  // queryCurrentDevelopers,
  // queryAllDevelopers,
  // queryAllGenres,
  addGameToGamesTable,
  queryGameId,
  addToGameDevelopersTable,
  addToGameGenresTable,
};
