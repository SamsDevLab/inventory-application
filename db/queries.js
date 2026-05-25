const pool = require("./pool");

async function queryAllGames() {
  try {
    const result = await pool.query(
      `SELECT games.id, games.game, developers.developer, genres.genre 
          FROM games 
          JOIN game_developers ON game_developers.game_id = games.id 
          JOIN game_genres ON game_genres.game_id = games.id 
          JOIN developers ON game_developers.developer_id = developers.id 
          JOIN genres ON game_genres.genre_id = genres.id`,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
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

module.exports = { queryAllGames, queryAllDevelopers, queryAllGenres };
