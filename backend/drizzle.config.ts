import "dotenv/config";
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: "mysql",
    schema: "./src/database/schema/**/*",
    out: "./src/database/migration",
    dbCredentials: {
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT) as number,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
    }
});
