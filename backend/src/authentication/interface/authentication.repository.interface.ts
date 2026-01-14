import { NewUserEntity, UpdateUserEntity, UserEntity } from "../entity/user.entity";

export interface AuthenticationRepositoryInterface {
    getByEmail(email: string): Promise<UserEntity | null>;
    getByPhone(phone: string): Promise<UserEntity | null>;
    getById(id: string): Promise<UserEntity | null>;
    createUser(user: NewUserEntity): Promise<UserEntity | null>;
    updateUser(id: string, user: UpdateUserEntity): Promise<UserEntity | null>;
    deleteUser(id: string): Promise<void>;
}