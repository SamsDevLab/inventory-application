const pool = require("../db/pool");

async function queryAllGenres() {
  try {
    const result = await pool.query(
      `SELECT * FROM genres
        ORDER BY genres.genre
      `,
    );
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

async function editGenre(genreId, genre) {
  await pool.query(
    `UPDATE genres
      SET genre = $2
      WHERE genres.id = $1
    `,
    [genreId, genre],
  );
}

/*********************/
/*** Delete Genre ***/
/*******************/

async function deleteGenre(genreId) {
  await pool.query(
    `DELETE FROM genres
      WHERE genres.id = $1
    `,
    [genreId],
  );
}

async function deleteGenreRelation(genreId) {
  await pool.query(
    `DELETE FROM game_genres
      WHERE game_genres.genre_id = $1
    `,
    [genreId],
  );
}

module.exports = {
  queryAllGenres,
  queryGenreByGameId,
  addGenre,
  queryGenreForEditing,
  editGenre,
  deleteGenre,
  deleteGenreRelation,
};
