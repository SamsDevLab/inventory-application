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
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { queryDevelopersForCurrentGames, queryAllDevelopers };
