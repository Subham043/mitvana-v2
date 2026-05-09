import { NewAuthEntity, UpdateAuthEntity, AuthEntity } from "../entity/auth.entity";

export interface AuthenticationRepositoryInterface {
    getByEmail(email: string): Promise<AuthEntity | null>;
    getByPhone(phone: string): Promise<AuthEntity | null>;
    getById(id: string): Promise<AuthEntity | null>;
    createUser(user: NewAuthEntity): Promise<AuthEntity | null>;
    updateUser(id: string, user: UpdateAuthEntity): Promise<AuthEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}