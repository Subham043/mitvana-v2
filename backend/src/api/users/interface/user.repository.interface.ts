import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewMainUserEntity, UpdateMainUserEntity, MainUserEntity } from "../entity/user.entity";
import { UserFilterDto } from "../schema/user-filter.schema";

export interface UserRepositoryInterface {
    getByEmail(email: string): Promise<MainUserEntity | null>;
    getByPhone(phone: string): Promise<MainUserEntity | null>;
    getById(id: string): Promise<MainUserEntity | null>;
    createUser(user: NewMainUserEntity): Promise<MainUserEntity | null>;
    updateUser(id: string, user: UpdateMainUserEntity): Promise<MainUserEntity | null>;
    deleteUser(id: string): Promise<void>;
    getAll(query: PaginationQuery<UserFilterDto>): Promise<MainUserEntity[]>;
    count(query: CountQuery<UserFilterDto>): Promise<number>
    toggleUserBlock(id: string, is_blocked: boolean): Promise<MainUserEntity | null>;
    verifyUser(id: string): Promise<MainUserEntity | null>;
}