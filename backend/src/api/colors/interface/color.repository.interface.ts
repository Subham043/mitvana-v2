import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewColorEntity, UpdateColorEntity, ColorEntity } from "../entity/color.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface ColorRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ColorEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ColorEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createColor(color: NewColorEntity): Promise<ColorEntity | null>;
    updateColor(id: string, color: UpdateColorEntity): Promise<ColorEntity | null>;
    deleteColor(id: string): Promise<void>;
}