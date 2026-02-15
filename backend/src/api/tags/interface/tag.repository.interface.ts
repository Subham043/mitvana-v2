import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewTagEntity, UpdateTagEntity, TagEntity } from "../entity/tag.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface TagRepositoryInterface {
    getByName(name: string, cacheConfig?: CustomQueryCacheConfig): Promise<TagEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<TagEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<TagEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createTag(tag: NewTagEntity): Promise<TagEntity | null>;
    updateTag(id: string, tag: UpdateTagEntity): Promise<TagEntity | null>;
    deleteTag(id: string): Promise<void>;
    checkIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
}