import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "os1",
});

export default pool;
