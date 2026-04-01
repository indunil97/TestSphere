const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testsphere_db",
  password: "admin123",
  port: 5432,
});

module.exports = pool;