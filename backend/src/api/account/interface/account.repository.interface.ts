import { AuthEntity } from "src/api/authentication/entity/auth.entity";
import { UpdateProfileEntity } from "../entity/profile.entity";
import { CustomQueryCacheConfig } from "src/utils/types";


export interface AccountRepositoryInterface {
    updateUser(id: string, user: UpdateProfileEntity): Promise<AuthEntity | null>;
    getByEmail(email: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    getByPhone(phone: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<AuthEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    verifyProfile(id: string): Promise<void>;
    resetVerificationCode(id: string, verification_code: string): Promise<void>
}