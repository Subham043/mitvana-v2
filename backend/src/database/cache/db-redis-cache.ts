import { Cache, MutationOption } from 'drizzle-orm/cache/core';
import { CacheConfig } from 'drizzle-orm/cache/core/types';
import { Table, is } from 'drizzle-orm';
import { getTableName } from 'drizzle-orm';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

type RedisCacheOptions = {
    /** Redis connection URL */
    url: string;

    /** Cache everything or only .$withCache() */
    global?: boolean;

    /** Default TTL in seconds */
    ttl?: number;

    /** Key namespace */
    namespace?: string;

    /** Enable metrics */
    metrics?: boolean;
};

export function redisCache(options: RedisCacheOptions) {
    return new RedisDrizzleCache(options);
}

class RedisDrizzleCache extends Cache {
    private kv: Keyv;
    private global: boolean;
    private defaultTtlMs: number;
    private namespace: string;
    private metrics: boolean;

    /** table -> keys */
    private usedTablesPerKey = new Map<string, Set<string>>();

    /** metrics */
    private hits = 0;
    private misses = 0;

    constructor(options: RedisCacheOptions) {
        super();

        this.namespace = options.namespace ?? 'drizzle';
        this.kv = new Keyv({
            store: new KeyvRedis(options.url),
            namespace: this.namespace,
        });

        this.global = options.global ?? false;
        this.defaultTtlMs = (options.ttl ?? 60) * 1000;
        this.metrics = options.metrics ?? false;
    }

    /* ---------------- Strategy ---------------- */

    override strategy(): 'explicit' | 'all' {
        return this.global ? 'all' : 'explicit';
    }

    /* ---------------- Metrics ---------------- */

    getMetrics() {
        return {
            hits: this.hits,
            misses: this.misses,
        };
    }

    /* ---------------- Cache Get ---------------- */

    override async get(
        key: string,
        _tables: string[],
        _isTag: boolean,
    ): Promise<any[] | undefined> {

        const value = await this.kv.get(key);

        if (value === undefined) {
            if (this.metrics) {
                this.misses++;
                console.log('[DRIZZLE CACHE] ❌ MISS:', key);
            }
            return undefined;
        }

        if (this.metrics) {
            this.hits++;
            console.log('[DRIZZLE CACHE] ✅ HIT:', key);
        }

        return value;
    }

    /* ---------------- Cache Put ---------------- */

    override async put(
        key: string,
        response: any,
        tables: string[],
        _isTag: boolean,
        config?: CacheConfig,
    ): Promise<void> {
        const ttlMs =
            config?.px ??
            (config?.ex ? config.ex * 1000 : this.defaultTtlMs);

        await this.kv.set(key, response, ttlMs);

        // Track which tables this key depends on
        for (const table of tables) {
            if (!this.usedTablesPerKey.has(table)) {
                this.usedTablesPerKey.set(table, new Set());
            }
            this.usedTablesPerKey.get(table)!.add(key);
        }
    }

    /* ---------------- Mutation Invalidation ---------------- */

    override async onMutate(params: MutationOption): Promise<void> {
        const tags = params.tags
            ? Array.isArray(params.tags)
                ? params.tags
                : [params.tags]
            : [];

        const tables = params.tables
            ? Array.isArray(params.tables)
                ? params.tables
                : [params.tables]
            : [];

        const keysToDelete = new Set<string>();

        // Invalidate by table
        for (const table of tables) {
            const tableName = is(table, Table)
                ? getTableName(table)
                : (table as string);

            const keys = this.usedTablesPerKey.get(tableName);
            if (keys) {
                for (const key of keys) keysToDelete.add(key);
                this.usedTablesPerKey.delete(tableName);
            }
        }

        // Invalidate by tag
        for (const tag of tags) {
            await this.kv.delete(tag);
        }

        // Delete collected keys
        for (const key of keysToDelete) {
            await this.kv.delete(key);
        }
    }
}
