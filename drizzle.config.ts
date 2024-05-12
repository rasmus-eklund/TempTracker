import { env } from "~/env.js";

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  tablesFilter: ["WamPerature_*"],
  dbCredentials: { url: env.DATABASE_URL },
});