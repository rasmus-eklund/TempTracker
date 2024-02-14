import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.js";

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client);
