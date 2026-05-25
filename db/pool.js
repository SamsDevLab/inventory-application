const { Pool } = require("pg");
const databaseUrl = process.env.DATABASE_URL;

module.exports = new Pool({
  connectionString: `${databaseUrl}`,
  // ssl: {
  //   rejectUnauthorized: true,
  // },
});
