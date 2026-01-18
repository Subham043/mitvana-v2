import { CreateUserDto } from "../schema/create-user.schema";
import { UpdateUserDto } from "../schema/update-user.schema";
import { MainUserEntity } from "../entity/user.entity";
import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";

export interface UserServiceInterface {
    createUser(dto: CreateUserDto): Promise<MainUserEntity>;
    updateUser(id: string, dto: UpdateUserDto): Promise<MainUserEntity>;
    deleteUser(id: string): Promise<void>;
    getById(id: string): Promise<MainUserEntity>;
    getByEmail(email: string): Promise<MainUserEntity>;
    getByPhone(phone: string): Promise<MainUserEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<MainUserEntity>>;
}