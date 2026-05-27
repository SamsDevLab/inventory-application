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
  const developers = pool.query(
    `SELECT *
        FROM developers
            JOIN game_developers ON developers.id = game_developers.developer_id
            WHERE game_developers.game_id = $1
    `,
    [gameId],
  );

  return developers;
}

module.exports = {
  queryDevelopersForCurrentGames,
  queryAllDevelopers,
  queryDevelopersByGameId,
};
