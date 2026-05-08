import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import * as schema from "./schema";
import { ConfigService } from "@nestjs/config";
import { AppConfigType } from "src/config/schema";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private pool: mysql.Pool;
    public db: MySql2Database<typeof schema>;

    constructor(
        private configService: ConfigService<AppConfigType>
    ) {
        this.pool = mysql.createPool({
            host: this.configService.get('DB_HOST', { infer: true }),
            port: Number(this.configService.get('DB_PORT', { infer: true }) || 3306),
            user: this.configService.get('DB_USER', { infer: true }),
            password: this.configService.get('DB_PASSWORD', { infer: true }),
            database: this.configService.get('DB_NAME', { infer: true }),
            connectionLimit: 10,
        });

        this.db = drizzle(this.pool, {
            schema,
            mode: "default",
            logger: this.configService.get<string>('DB_LOGGING') === 'true' ? true : false,
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
