import { AuthEntity } from "src/api/authentication/entity/auth.entity";
import { UpdateProfileEntity } from "../entity/profile.entity";


export interface AccountRepositoryInterface {
    updateUser(id: string, user: UpdateProfileEntity): Promise<AuthEntity | null>;
    getByEmail(email: string): Promise<AuthEntity | null>;
    getByPhone(phone: string): Promise<AuthEntity | null>;
    getById(id: string): Promise<AuthEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    verifyProfile(id: string): Promise<void>;
}