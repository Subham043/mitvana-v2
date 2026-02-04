import { NewAuthEntity, UpdateAuthEntity, AuthEntity } from "../entity/auth.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface AuthenticationRepositoryInterface {
    getByEmail(email: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    getByPhone(phone: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    createUser(user: NewAuthEntity): Promise<AuthEntity | null>;
    updateUser(id: string, user: UpdateAuthEntity): Promise<AuthEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}