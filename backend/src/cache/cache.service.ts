import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    Inject,
    Injectable,
} from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { }

    // ======================
    // SET WITH TAGS
    // ======================
    async set(
        key: string,
        value: any,
        tags: string[] = [],
        ttl = 24 * 60 * 60 * 1000,
    ) {
        await this.cacheManager.set(key, value, ttl);

        for (const tag of tags) {
            const tagKey = `tag:${tag}`;

            const existing =
                (await this.cacheManager.get<string[]>(
                    tagKey,
                )) || [];

            const keys = new Set(existing);

            keys.add(key);

            await this.cacheManager.set(
                tagKey,
                [...keys],
                ttl,
            );
        }
    }

    // ======================
    // GET
    // ======================
    async get<T>(key: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(key);
    }

    // ======================
    // DELETE SINGLE
    // ======================
    async del(key: string) {
        await this.cacheManager.del(key);
    }

    // ======================
    // INVALIDATE TAG
    // ======================
    async invalidateTag(tag: string) {
        const tagKey = `tag:${tag}`;

        const keys =
            (await this.cacheManager.get<string[]>(
                tagKey,
            )) || [];

        await Promise.all(
            keys.map((key) =>
                this.cacheManager.del(key),
            ),
        );

        await this.cacheManager.del(tagKey);
    }

    // ======================
    // WRAP
    // ======================
    async wrap<T>({
        key,
        callback,
        options,
    }: {
        key: string;
        callback: () => Promise<T>;
        options?: {
            ttl?: number;
            tags?: string[];
        };
    }): Promise<T> {
        const cached =
            await this.get<T>(key);

        if (cached !== undefined) {
            return cached;
        }

        const result = await callback();

        await this.set(
            key,
            result,
            options?.tags || [],
            options?.ttl,
        );

        return result;
    }
}