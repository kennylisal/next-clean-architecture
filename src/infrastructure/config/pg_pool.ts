import { Pool } from "pg";
import { config } from "dotenv";
config({ path: ".env" });

export const pool = new Pool({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER || "your_database_user",
  password: process.env.DATABASE_PASSWORD || "your_database_password",
  database: process.env.DATABASE_NAME || "your_database_name",
  max: 10, // Pool size
  idleTimeoutMillis: 30000,
});

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully");
    const res = await client.query("SELECT NOW()");
    console.log("Current time:", res.rows[0]);
    client.release();
    return true;
  } catch (err) {
    console.error("Database connection error:", err);
    return false;
  }
}
