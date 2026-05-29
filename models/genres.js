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
    const allGenres = result.rows;
    return allGenres;
  } catch (error) {
    console.log(error);
  }
}

async function queryGenreByGameId(gameId) {
  const result = await pool.query(
    `SELECT *
            FROM genres
                JOIN game_genres ON genres.id = game_genres.genre_id
                WHERE game_genres.game_id = $1
        `,
    [gameId],
  );

  const genres = result.rows;
  return genres;
}

/******************/
/*** Add Genre ***/
/****************/

async function addGenre(genre) {
  await pool.query(
    `INSERT INTO genres (genre)
      VALUES ($1)
    `,
    [genre],
  );
}

/*******************/
/*** Edit Genre ***/
/*****************/

async function queryGenreForEditing(genreId) {
  const result = await pool.query(
    ` SELECT *
        FROM genres
        WHERE genres.id = $1
    `,
    [genreId],
  );

  return result.rows[0];
}

module.exports = {
  queryGenresForCurrentGames,
  queryAllGenres,
  queryGenreByGameId,
  addGenre,
  queryGenreForEditing,
};
