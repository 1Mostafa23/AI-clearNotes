
import type { Config } from "drizzle-kit";

export default {
  schema: "./libs/db/schema/*.schema.ts",
  out: "./libs/db/migrations",
  dialect: "postgresql", // Используем dialect вместо driver
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;