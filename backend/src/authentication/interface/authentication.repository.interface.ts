import { ResetPasswordEntity } from "../entity/reset_password.entity";
import { NewUserEntity, UpdateUserEntity, UserEntity } from "../entity/user.entity";

export interface AuthenticationRepositoryInterface {
    getByEmail(email: string): Promise<UserEntity | null>;
    getByPhone(phone: string): Promise<UserEntity | null>;
    getById(id: string): Promise<UserEntity | null>;
    createUser(user: NewUserEntity): Promise<UserEntity | null>;
    updateUser(id: string, user: UpdateUserEntity): Promise<UserEntity | null>;
    getResetPasswordTokenByUserId(user_id: string): Promise<ResetPasswordEntity | null>;
    getResetPasswordTokenByToken(token: string): Promise<ResetPasswordEntity | null>;
    deleteResetPasswordTokenByUserId(user_id: string): Promise<void>;
    generateResetPasswordToken(user_id: string): Promise<ResetPasswordEntity | null>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}