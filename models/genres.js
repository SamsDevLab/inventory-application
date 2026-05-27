const pool = require("../db/pool");

async function queryGenresForCurrentGames() {
  const genres = await pool.query(
    `SELECT game_id, genres.genre
        FROM games
          JOIN game_genres ON game_genres.game_id = games.id
          JOIN genres ON game_genres.genre_id = genres.id
    `,
  );
  return genres.rows;
}

async function queryAllGenres() {
  try {
    const result = await pool.query(`SELECT * FROM genres`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.export = { queryGenresForCurrentGames, queryAllGenres };
