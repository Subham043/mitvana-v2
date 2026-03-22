import { CreateUserDto } from "../schema/create-user.schema";
import { UpdateUserDto } from "../schema/update-user.schema";
import { MainUserEntity } from "../entity/user.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ToggleUserBlockDto } from "../schema/toggle-user-block.schema";
import { PassThrough } from 'stream'
import { UserFilterDto } from "../schema/user-filter.schema";

export interface UserServiceInterface {
    createUser(dto: CreateUserDto): Promise<MainUserEntity>;
    updateUser(id: string, dto: UpdateUserDto): Promise<MainUserEntity>;
    deleteUser(id: string): Promise<void>;
    getById(id: string): Promise<MainUserEntity>;
    getByEmail(email: string): Promise<MainUserEntity>;
    getByPhone(phone: string): Promise<MainUserEntity>;
    getAll(query: UserFilterDto): Promise<PaginationResponse<MainUserEntity, UserFilterDto>>;
    toggleUserBlock(id: string, dto: ToggleUserBlockDto): Promise<MainUserEntity>;
    verifyUser(id: string): Promise<MainUserEntity>;
    exportUsers(query: UserFilterDto): Promise<PassThrough>;
}