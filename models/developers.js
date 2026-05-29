const pool = require("../db/pool");

async function queryDevelopersForCurrentGames() {
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

async function addDeveloper(newDeveloper) {
  await pool.query(
    `INSERT INTO developers (developer)
        VALUES ($1)
    `,
    [newDeveloper],
  );
}

module.exports = {
  queryDevelopersForCurrentGames,
  queryAllDevelopers,
  queryDevelopersByGameId,
  addDeveloper,
};
