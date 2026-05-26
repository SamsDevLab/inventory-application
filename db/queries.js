const pool = require("./pool");

async function queryCurrentGames() {
  const allGames = await pool.query(`SELECT * FROM games`);
  return allGames.rows;
}

async function queryCurrentGameGenres() {
  const genres = await pool.query(
    `SELECT game_id, genres.genre
        FROM games
          JOIN game_genres ON game_genres.game_id = games.id
          JOIN genres ON game_genres.genre_id = genres.id
    `,
  );
  return genres.rows;
}

async function queryCurrentGameDevelopers() {
  const developers = await pool.query(
    `SELECT game_id, developers.developer
        FROM games
          JOIN game_developers ON game_developers.game_id = games.id
          JOIN developers ON game_developers.developer_id = developers.id
    `,
  );
  return developers.rows;
}

async function queryAllDevelopers() {
  try {
    const result = await pool.query(`SELECT * FROM developers`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function queryAllGenres() {
  try {
    const result = await pool.query(`SELECT * FROM genres`);
    return result;
  } catch (error) {
    console.log(error);
  }
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
  queryCurrentGames,
  queryCurrentGameGenres,
  queryCurrentGameDevelopers,
  queryAllDevelopers,
  queryAllGenres,
  addGameToGamesTable,
  queryGameId,
  addToGameDevelopersTable,
  addToGameGenresTable,
};
