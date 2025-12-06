import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

const dialect = process.env.DB_DIALECT || "postgresql";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: dialect as "postgresql" | "mysql" | "sqlite" | "turso",
  dbCredentials: dialect === "postgresql" 
    ? {
        url: process.env.DATABASE_URL,
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "1433"),
        user: process.env.DB_USER || "sa",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "master",
      },
});
