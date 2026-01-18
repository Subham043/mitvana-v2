import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewMainUserEntity, UpdateMainUserEntity, MainUserEntity } from "../entity/user.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface UserRepositoryInterface {
    getByEmail(email: string, cacheConfig?: CustomQueryCacheConfig): Promise<MainUserEntity | null>;
    getByPhone(phone: string, cacheConfig?: CustomQueryCacheConfig): Promise<MainUserEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<MainUserEntity | null>;
    createUser(user: NewMainUserEntity): Promise<MainUserEntity | null>;
    updateUser(id: string, user: UpdateMainUserEntity): Promise<MainUserEntity | null>;
    deleteUser(id: string): Promise<void>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<MainUserEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    toggleUserBlock(id: string, is_blocked: boolean): Promise<MainUserEntity | null>;
    verifyUser(id: string): Promise<MainUserEntity | null>;
}