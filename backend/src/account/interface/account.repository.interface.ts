import { UserEntity } from "src/authentication/entity/user.entity";
import { UpdateProfileEntity } from "../entity/profile.entity";


export interface AccountRepositoryInterface {
    updateUser(id: string, user: UpdateProfileEntity): Promise<UserEntity | null>;
    getByEmail(email: string): Promise<UserEntity | null>;
    getByPhone(phone: string): Promise<UserEntity | null>;
    getById(id: string): Promise<UserEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    verifyProfile(id: string): Promise<void>;
}