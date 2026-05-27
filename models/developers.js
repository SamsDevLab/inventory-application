const pool = require("../db/pool");

async function queryCurrentDevelopers() {
  const developers = await pool.query(
    `SELECT game_id, developers.developer
        FROM games
          JOIN game_developers ON game_developers.game_id = games.id
          JOIN developers ON game_developers.developer_id = developers.id
    `,
  );
  return developers.rows;
}

module.exports = { queryCurrentDevelopers };
