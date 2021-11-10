const { MySQL } = require("mysql-promisify");

const db = new MySQL({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const conn = {
  query: async function (sql, params) {
    const { results } = await db.query({ sql, params });
    return results;
  },
};

module.exports = conn;
