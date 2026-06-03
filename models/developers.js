const pool = require("../db/pool");

async function queryAllDevelopers() {
  try {
    const result = await pool.query(
      `SELECT * FROM developers 
        ORDER BY developers.developer 
      `,
    );
    const allDevelopers = result.rows;
    return allDevelopers;
  } catch (error) {
    console.log(error);
  }
}

async function queryDevelopersByGameId(gameId) {
  const result = await pool.query(
    `SELECT *
        FROM developers
            JOIN game_developers ON developers.id = game_developers.developer_id
            WHERE game_developers.game_id = $1
    `,
    [gameId],
  );

  const developers = result.rows;
  return developers;
}

/**********************/
/*** Add Developer ***/
/********************/

async function addDeveloper(newDeveloper, developerImgUrl) {
  await pool.query(
    `INSERT INTO developers (developer, img_url)
        VALUES ($1, $2)
    `,
    [newDeveloper, developerImgUrl],
  );
}

/***********************/
/*** Edit Developer ***/
/*********************/

async function queryDeveloperForEditing(developerId) {
  const result = await pool.query(
    `SELECT * FROM developers
      WHERE developers.id = $1
    `,
    [developerId],
  );

  const [developer] = result.rows;

  return developer;
}

async function editDeveloper(developerId, developer, developerImgUrl) {
  await pool.query(
    `UPDATE developers
      SET 
      developer = $2,
      img_url = $3
      WHERE developers.id = $1
    `,
    [developerId, developer, developerImgUrl],
  );
}

async function deleteDeveloper(developerId) {
  await pool.query(
    `DELETE FROM developers
      WHERE developers.id = $1
    `,
    [developerId],
  );
}

async function deleteDeveloperRelation(developerId) {
  await pool.query(
    `DELETE FROM game_developers
      WHERE game_developers.developer_id = $1
    `,
    [developerId],
  );
}

/***********************/
/**** Filter Views ****/
/*********************/

async function filterByDeveloper(developerId) {
  const result = await pool.query(
    `
    SELECT  games.id, game, games.img_url, ARRAY_AGG(DISTINCT developer) AS developers, ARRAY_AGG(DISTINCT genre) AS genres
      FROM developers
        JOIN game_developers ON game_developers.developer_id = developers.id
        JOIN games ON game_developers.game_id = games.id
        JOIN game_genres ON games.id = game_genres.game_id
        JOIN genres ON game_genres.genre_id = genres.id
          WHERE developers.id = $1
          GROUP BY games.id
    `,
    [developerId],
  );

  return result.rows;
}

module.exports = {
  queryAllDevelopers,
  queryDevelopersByGameId,
  addDeveloper,
  queryDeveloperForEditing,
  editDeveloper,
  deleteDeveloper,
  deleteDeveloperRelation,
  filterByDeveloper,
};
