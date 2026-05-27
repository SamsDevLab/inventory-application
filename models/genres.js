const pool = require("../db/pool");

async function queryCurrentGenres() {
  const genres = await pool.query(
    `SELECT game_id, genres.genre
        FROM games
          JOIN game_genres ON game_genres.game_id = games.id
          JOIN genres ON game_genres.genre_id = genres.id
    `,
  );
  return genres.rows;
}

module.export = { queryCurrentGenres };
