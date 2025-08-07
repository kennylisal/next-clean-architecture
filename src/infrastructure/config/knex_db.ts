import knex from "knex";
import { config } from "dotenv";
config({ path: ".env" });

const knexDB = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

export default knexDB;
