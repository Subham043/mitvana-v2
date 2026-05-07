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

            const existingKeys =
                (await this.cacheManager.get<string[]>(tagKey)) || [];

            if (!existingKeys.includes(key)) {
                existingKeys.push(key);

                await this.cacheManager.set(
                    tagKey,
                    existingKeys,
                    ttl,
                );
            }
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
            (await this.cacheManager.get<string[]>(tagKey)) || [];

        for (const key of keys) {
            await this.cacheManager.del(key);
        }

        await this.cacheManager.del(tagKey);
    }
}