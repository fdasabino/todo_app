const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DATABASE_URL,
  port: process.env.DB_PORT || 5000,
  database: process.env.DB_NAME,
});

module.exports = pool;
