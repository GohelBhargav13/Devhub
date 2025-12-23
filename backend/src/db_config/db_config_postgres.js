import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // Important for Neon!
});

await client.connect();
export const db = drizzle(client)