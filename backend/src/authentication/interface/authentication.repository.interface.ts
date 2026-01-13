import { NewUserEntity, UpdateUserEntity, UserEntity } from "../entity/user.entity";

export interface AuthenticationRepositoryInterface {
    getByEmail(email: string): Promise<UserEntity | null>;
    getByPhone(phone: string): Promise<UserEntity | null>;
    getById(id: number): Promise<UserEntity | null>;
    createUser(user: NewUserEntity): Promise<UserEntity | null>;
    updateUser(id: number, user: UpdateUserEntity): Promise<UserEntity | null>;
    deleteUser(id: number): Promise<void>;
}