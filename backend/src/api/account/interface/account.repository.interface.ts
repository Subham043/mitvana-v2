import { UserEntity } from "src/api/authentication/entity/user.entity";
import { UpdateProfileEntity } from "../entity/profile.entity";
import { CustomQueryCacheConfig } from "src/utils/types";


export interface AccountRepositoryInterface {
    updateUser(id: string, user: UpdateProfileEntity): Promise<UserEntity | null>;
    getByEmail(email: string, cacheConfig?: CustomQueryCacheConfig): Promise<UserEntity | null>;
    getByPhone(phone: string, cacheConfig?: CustomQueryCacheConfig): Promise<UserEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<UserEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    verifyProfile(id: string): Promise<void>;
    resetVerificationCode(id: string, verification_code: string): Promise<void>
}