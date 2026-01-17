import { CacheConfig } from "drizzle-orm/cache/core/types";

export type CustomQueryCacheConfig = {
    config?: CacheConfig;
    tag?: string;
    autoInvalidate?: boolean;
} | false